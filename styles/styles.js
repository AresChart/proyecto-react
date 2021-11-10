import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';


export const styles = StyleSheet.create({
    
    title: {
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center"

    },

    input: {
      height: 40,
      width: (Dimensions.get('window').width) - 250,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      alignItems: "center",
      justifyContent: "center"
    },

    area: {

        alignContent: "center",
        alignItems: "center",
        justifyContent: "center"

    },

    button: {

        backgroundColor: "blue",
        padding: 1,
        marginTop: 1,
        margin: 12,
        borderWidth: 1,
       
        
    },

    container_table: {
        width:600,
        height:200,
        
    },

    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 1,
      paddingRight: 1,
      paddingBottom: 2,
      fontSize: 9,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
      width:50,
      height:18,
    },
    item: {
      padding: 2,
      fontSize: 7,
      height: 12,
      width:30,
      fontWeight: 'bold',
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      borderColor: 'black',
      borderWidth: 1
    },

    itemFatList: {
      fontSize: 30,
      height: 50,
      fontWeight: 'bold',
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    view: {
      flex: 1,
      flexDirection: 'row',
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    }

  });



