import React, { Component,useState } from 'react';
import { View,TextInput} from 'react-native';
import {DataTable} from 'react-native-paper';

const TableInputProccessesComponent = (props) => {

  const tablaEntrada = props.tablaEntrada;

  function updateLista (index,property,value){
    let nuevaLista = [...tablaEntrada];
    nuevaLista[index][property]=value;
    props.setTablaEntrada(nuevaLista);
  }

      return(
        <View style={{ width:200 ,height:props.height}}>
          <DataTable id="tabla">
            <DataTable.Header>
              <DataTable.Title >proceso</DataTable.Title>
              <DataTable.Title >solicita</DataTable.Title>
              <DataTable.Title >libera</DataTable.Title>
              
            </DataTable.Header>
        
           {tablaEntrada.map((row,index) => (
            <DataTable.Row>
              <DataTable.Cell ><TextInput value={row.proceso} onChangeText={(data)=>updateLista(index,"proceso",data)} /></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.solicita} onChangeText={(data)=>updateLista(index,"solicita",data)} /></DataTable.Cell>
              <DataTable.Cell ><TextInput value={row.libera} onChangeText={(data)=>updateLista(index,"libera",data)} /></DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
        </View>   
      );   
}


export default TableInputProccessesComponent;