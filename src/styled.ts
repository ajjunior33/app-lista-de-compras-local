import { Dimensions, StyleSheet } from 'react-native';
const windowDim = Dimensions.get('window');
export const windowHeight = windowDim.height;

export const primaryColor = '#FB8C00';

export const creatorStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "rgba(0,0,0,.5)",
  },
  modalView: {
    backgroundColor: '#f8f8f8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    height: windowHeight / 2,
    shadowColor: '#cacaca',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    display: 'flex',
    justifyContent: 'space-between'
  },

  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topCloseButton: {
    padding: 10,
    color: '#494949',
    fontWeight: 'bold',
    fontSize: 25,
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#999",
    paddingHorizontal: 16
  },

  buttonSave: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#222',
    borderRadius: 10,
    width: "100%",
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  buttonSaveText:{
    fontWeight: 'bold',
    color: "#fff"
  },
  buttonAdd: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#222',
    borderRadius: 10,
    width: 120,
    display:'flex',
    alignItems:'center',
    justifyContent: 'center'
  }


})