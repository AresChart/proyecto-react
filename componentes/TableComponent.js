import React, { Component,useState } from 'react';
import { View,TextInput} from 'react-native';
import { Button, DataTable} from 'react-native-paper';
import TextInputComponent from '../componentes/TextInputComponent';
import {styles} from '../styles/styles';

const TableComponent = (props) => {

  const [lista,setLista] = useState([[1,2],[3,4]]);
  const numero =1;
  const [bandera,setBandera] = useState(false);

  const pressHandler = () =>{

    if(bandera==true){
      return (
        <DataTable id="tabla">
            <DataTable.Header>
              <DataTable.Title>{props.nombre}</DataTable.Title>
              <DataTable.Title numeric>{props.tamaño}</DataTable.Title>
              <DataTable.Title >{props.tipo}</DataTable.Title>
            </DataTable.Header>

  {/**   {[...Array(lista.length).keys()].map(
            ()=>(
         <DataTable.Row>
            <DataTable.Cell><TextInputComponent/></DataTable.Cell>
            <DataTable.Cell numeric>{lista[0][0]}</DataTable.Cell>
            <DataTable.Cell numeric>{lista[0][1]}</DataTable.Cell>
          </DataTable.Row>
            )
          )}
            */ }           
      </DataTable> 
      
      );
    }else{
      return (<></>);
    }
  }

      return(
        <View style={styles.container_table}>
        {pressHandler()}
        <Button onPress={()=>setBandera(!bandera)}>Disco</Button>
      </View>
      );
    
}

export default TableComponent;
