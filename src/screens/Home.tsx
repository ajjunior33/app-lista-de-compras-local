import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Button, TextInput, FlatList, Pressable, Text, Alert, ToastAndroid, Modal, TouchableHighlight, TouchableOpacity } from "react-native";
import * as productsSchema from '../database/schemas/productSchema'
import { asc, createOne, eq, like } from "drizzle-orm";
import { creatorStyles, primaryColor } from '../styled'
type Data = {
  id: number;
  name: string
}
export function Home() {
  const [name, setName] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [search, setSearch] = useState('');

  const database = useSQLiteContext();
  const db = drizzle(database, { schema: productsSchema })

  async function fetchProducts() {
    try {
      const response = await db.query.product.findMany({
        where: like(productsSchema.product.name, `%${search}%`),
        orderBy: asc(productsSchema.product.name)
      });
      setData(response.filter(r => r.checked === false))
    } catch (err) {
      console.error(err);
    }
  }

  async function onUpdate(id: number) {
    Alert.alert('Comprado?', "Deseja marcar produto como comprado?", [
      {
        text: "Cancelar",
        style: 'cancel'
      },
      {
        text: "Sim",
        onPress: async () => {
          await db
            .update(productsSchema.product)
            .set({ checked: true })
            .where(eq(productsSchema.product.id, id))

          ToastAndroid.showWithGravityAndOffset(
            'Produto marcado como comprado.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );

          await fetchProducts();
        }
      }
    ])
  }

  async function onRemove(id: number) {
    Alert.alert('Remover', "Deseja remover o produto?", [
      {
        text: "Cancelar",
        style: 'cancel'
      },
      {
        text: "Sim",
        onPress: async () => {
          await db
            .delete(productsSchema.product)
            .where(eq(productsSchema.product.id, id))

          ToastAndroid.showWithGravityAndOffset(
            'Produto deletado com sucesso.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );

          await fetchProducts();
        }
      }
    ])
  }

  async function onSave() {
    try {
      if (name.length === 0) {
        ToastAndroid.showWithGravityAndOffset(
          'O nome do produto não pode estar vazio.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        return;
      }
      const response = await db.insert(productsSchema.product).values({ name });
      // Alert.alert(`Cadastrado com o ID: ${response.lastInsertRowId}`);
      ToastAndroid.showWithGravityAndOffset(
        'Produto cadastrado com sucesso.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );

      setName('');
      await fetchProducts();

    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [search])

  return (
    <View style={{ flex: 1, padding: 42, gap: 16 }}>

      <View style={{ display: 'flex', alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}
          style={creatorStyles.buttonAdd}>
          <Text style={creatorStyles.buttonSaveText}>
            Novo Produto
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Pesquisa"
        style={creatorStyles.input}
        onChangeText={setSearch}
        value={search}
      />

      <FlatList
        data={data}
        keyExtractor={i => String(i.id)}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onUpdate(item.id)}
            onLongPress={() => onRemove(item.id)}
            style={{ padding: 16, borderWidth: 1, borderRadius: 7 }}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ gap: 16 }}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text>Sua lista está vazia.</Text>
          </View>
        )}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={creatorStyles.centeredView}>
          <View style={creatorStyles.modalView}>
            <View style={creatorStyles.topActions}>
              <Text style={{ margin: 5, fontSize: 18 }}>Adicione o nome do produto: </Text>
              <TouchableHighlight
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={creatorStyles.topCloseButton}>×</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TextInput
                style={creatorStyles.input}
                placeholder="Nome do produto"
                onChangeText={(text) => setName(text)}
                value={name}
              />
              <TouchableOpacity
                onPress={onSave}
                style={creatorStyles.buttonSave}
              >
                <Text style={creatorStyles.buttonSaveText}>Salvar</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>

      </Modal>
    </View>
  )
}