
import React from "react";
import { Text, View, SectionList, FlatList} from 'react-native';
import { styles } from "../../styles/styles";
import {DataTable} from 'react-native-paper';
import { setEnabled } from "react-native/Libraries/Performance/Systrace";

function ProcessList(props) {

    let array = props.procesos;

    const DATA = [
        {
            id: '0',
            title: '0',
        },
        {
            id: '1',
            title: '1',
        },
        {
            id: '2',
            title: '2',
        },
        {
            id: '3',
            title: '3',
        },
        {
            id: '4',
            title: '4',
        },
        {
            id: '5',
            title: '5',
        },
        {
            id: '6',
            title: '6',
        },
      ];
      
      const Item = ({ title }) => (
        <View style={styles.itemFatList}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
      const renderItem = ({ item }) => (
        <Item title={item.title} />
      );
    

    return(

        <View
        style={{
            flexDirection: 'row',
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            padding: 1,
            width:300 
         }}>
 
            <DataTable id="tabla_salida">
             <DataTable.Header style={{width:150}}>
               <DataTable.Title >Pagina</DataTable.Title>
               <DataTable.Title>Memoria</DataTable.Title>
             </DataTable.Header>
         
             {array.map((row, index) => (
             <DataTable.Row style={{width:150}}> 
               <DataTable.Cell style={{width:75}}>{index}</DataTable.Cell>
               <DataTable.Cell style={{width:75}}>
                <SectionList 
                    sections={[
                        {data: array[index]}
                    ]}
                    renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                    
                    keyExtractor={(item, index) => index}
                    
                />
               </DataTable.Cell>
             </DataTable.Row>
             ))}

           </DataTable > 

            <SectionList 
                sections={[
                    {title: 'Pagina 1', data: array[0]},
                    {title: 'Pagina 2', data: array[1]},
                    {title: 'Pagina 3', data: array[2]},
                    {title: 'Pagina 4', data: array[3]},
                    {title: 'Pagina 5', data: array[4]},
                    {title: 'Pagina 6', data: array[5]},
                    {title: 'Pagina 7', data: array[6]},
                ]}
                renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => index}
            />
        </View>

    );
    
}

export default ProcessList;