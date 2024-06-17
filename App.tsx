import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';


import { View, Text } from 'react-native'
import { Home } from './src/screens/Home';



const DATABASE_NAME = 'database.db';
const expoDb = openDatabaseSync(DATABASE_NAME);
const db = drizzle(expoDb);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <Home />
    </SQLiteProvider>
  )

}
