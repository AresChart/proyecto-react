/**
 * Aplicativo de gestion de particiones de disco
 * @author Kevin David Sanchez Solis
 */
 import { StatusBar } from 'expo-status-bar';
 import React from 'react';
 import { SafeAreaView, Text, TextInput, View, Picker} from 'react-native';
 import { styles } from '../styles/styles';
 import TextI from '../componentes/TextInputComponent';
 import ButtonA from '../componentes/ButtonComponent';
 import { Button, DataTable} from 'react-native-paper';
 import * as arreglo from '../domain/PartitionsFuntions';
 import Speaker from '../componentes/Speaker';
 
 /**
  * Metodo que Gestiona la vista principal del aplicativo
  * @returns La vista Principal del Programa
  */
const App = () => {
 
  const [datosEso, setDatosEso]  = React.useState([]);
  const [aux, setAux]  = React.useState(false);
  //Variable que acciona el refresco de la tabla
  const [refreshing, setRefreshing]               = React.useState(false);

  /**
   * Metodo que realiza la espera mientras se ejecuta una accion
   * @param {*} timeout Tiempo de espera que se quiere
   * @returns El tiempo de espera
   */
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  } 

  /**
   * Metodo que realiza las operaciones para el refresco de la tabla
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
 
  const mostrarParticiones = () => {
 
    if (bandera ) {

      return (

        <View style={styles.container_table}>
          <DataTable id="tabla_salida">
            <DataTable.Header>
              <DataTable.Title>Esp.Libre</DataTable.Title>
              <DataTable.Title>Tam.Nuevo</DataTable.Title>
              <DataTable.Title>EspL.acontinuacion</DataTable.Title>
              <DataTable.Title>Alinear</DataTable.Title>
              <DataTable.Title>Tipo</DataTable.Title>
              <DataTable.Title>Nombre</DataTable.Title>
              <DataTable.Title>System</DataTable.Title>
              <DataTable.Title>Etiqueta</DataTable.Title>
            </DataTable.Header>
        
          {datosEso.map((row, index) => (
            <DataTable.Row>
              <DataTable.Cell>{row[index][0]}</DataTable.Cell>
              <DataTable.Cell>{row[index][1]}</DataTable.Cell>
              <DataTable.Cell>{row[index][2]}</DataTable.Cell>
              <DataTable.Cell>{row[index][3]}</DataTable.Cell>
              <DataTable.Cell>{row[index][4]}</DataTable.Cell>
              <DataTable.Cell>{row[index][5]}</DataTable.Cell>
              <DataTable.Cell>{row[index][6]}</DataTable.Cell>
              <DataTable.Cell>{row[index][7]}</DataTable.Cell>
            </DataTable.Row>
            ))}
          </DataTable > 
        </View> 

      )
    } else if (!aux) {
      
    }

    return (<></>);
 
  }
 
  /**
   * Metodo que sirve para eliminar el disco seleccionado en el picker
   */
  const EliminarDisco = () => {

    //Llama a la funcion de eliminar disco
    arreglo.EliminarDisco(discos);

      //Set para el selector de discos
      setitemsInPicker(    
        arreglo.discosC.map( data => {
        return (
          <Picker.Item label={data[0]}  value={data[0]}/>
        )}));
    onRefresh();
  }
  /**
   * Metodo que recopila los datos para crear una particion en un disco en especifico
   */
  const llenarDatosParticion = async() => {

    //[Espacio libre, tama??o nuevo, espacio libre acontinuacion, alinear con,
    //crear Como, nombre particion, Sistema de archivos, Etiqueta]
    var array = [];
    //Espacio libre
    array.push(parseInt(tLibre, 10));
    //Tama??o nuevo
    array.push(parseInt(tNuevo, 10));
    //Espacio libre a continuacion
    array.push(parseInt(libreA, 10));
    //Alinear con: MiB - GiB
    array.push(alinear);
    //Crear como: Primaria, logica, extendida
    array.push(tipoP);
    //Nombre de la particion
    array.push(nombreP);
    //Tipo de sistema de archivos: Ext, Fat32, etc...
    array.push(sistemaA);
    //Etiqueta
    array.push(etiqueta);

    //alert(array[0]);
    //alert(array[1]);
    
    //Llamado al metodo para el ingreso de la particion.
    await arreglo.ingresarParticion(discos, array);
    let qwerty = await arreglo.datosPorDisco(discos);

    console.log("eso");
    console.log(qwerty);
  
    datosEso.push(qwerty);

    //;
    setBandera(true);
    onRefresh();
  }
 
   /**
    * Metodo que crear un disco con la informacion proporcionada por el usuario
    * La informacion: Tama??o Disco, Nombre Disco y Tipo Disco (MBR -GPT)
    */
   const CrearDisco = ()=>{
 
     //Array que almacena la informacion del disco a crear
     let array = [];
     //Nombre del disco a crear
     array.push(nombre);
     //Tama??o del disco a crear
     array.push(parseInt(tama??o, 10));
     //Tipo del disco a crear
     array.push(tipo);
 
     //Llamado al metodo que almacena los discos
     arreglo.crearDisco(array);
     
     //Set para el selector de discos
     setitemsInPicker(    
       arreglo.discosC.map( data => {
       return (
           
           <Picker.Item label={data[0]}  value={data[0]}/>
         )
         }
       )
     );
 
     //setDisco(nombre);
   }
 
   /**
    * Metodo que muestra el selector de discos
    * @returns Selector de discos
    */
  const llamarPicker = ()=> {
 
    return(
      <Picker
        selectedValue={discos}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setDisco(itemValue)}
        >
        {itemsInPicker}
      </Picker>
    );
  }
 
  //----------------------Datos creacion de Disco nuevo ----------------------------------------------------
 
  //Tama??o del disco nuevo en MiB
  const [tama??o, setTama??o]  = React.useState(0);
  //Nombre del disco nuevo
  const [nombre, setNombre]  = React.useState("");
  //Tipo de disco [MBR, GPT]
  const [tipo, setTipo]      = React.useState("MBR");

  //Picker Selector de disco a usar para crear las particiones
  const [discos, setDisco]   = React.useState("");

  //Datos del picker de discos creados
  const [itemsInPicker, setitemsInPicker]  = React.useState();

  //Bandera que sirve para mostrar o no un componente
  const [bandera,setBandera] = React.useState(false);
   
  //---------------------Datos de la tabla de creacion de particiones---------------------------------------

  //Espacio libre
  const [tLibre,     settLibre] = React.useState(0);
  //Tama??o nuevo
  const [tNuevo,     settNuevo] = React.useState("");
  //Espacio libre a contuniacion
  const [libreA,     setlibreA] = React.useState("");
  //Alinear con: 
  const [alinear,   setalinear] = React.useState("MiB");
  //Crear como: [tipo de particion: primria, logica, extendida]
  const [tipoP,       settipoP] = React.useState("Primaria");
  //Nombre de la particion
  const [nombreP,   setnombreP] = React.useState("");
  //Sistema de archivos de la particion
  const [sistemaA, setsistemaA] = React.useState("Fat32");
  //Etiqueta
  const [etiqueta, setetiqueta] = React.useState("");

  //Lista de tipo de archivos que puede tener una particion.
  const archivos = ["Fat32", "NTFS", "exFAT", "Ext2", "Ext3", "Ext4", "HFS+"];
  //Lista de tipo de particion
  const listaParticionTipo = ["Primaria", "Logica", "Extendida"];
  //lista para alinear
  const metricas = ["MiB", "GiB"];
  
  //llena el combo box de sistema de archivos
  let sistemasArchivos = archivos.map( data=> {
    return (

        <Picker.Item label={data}  value={data}/>
      )});

  //llena el combo box de tipo de particion
  let listaTipo = listaParticionTipo.map( data=> {
    return (
      <Picker.Item label={data}  value={data}/>
    )});
  
  //llena el combo box de alinear
  let listaAlinear = metricas.map( data=> {
    return (
      <Picker.Item label={data}  value={data}/>
    )});
       
   return (
 
     <View>
       <View style={styles.area}>
         <Text style={styles.title}>Particiones del disco</Text>
         <SafeAreaView style={styles.area}>
           <TextI
             onChangeText={(val) => setTama??o(val)}
             value={tama??o}
             placeholder="Tama??o del disco"
             style={styles.input}
             keyboardType='numeric' 
           />
           <TextI
             onChangeText={(val) => setNombre(val)}
             value={nombre}
             placeholder="Nombre del disco"
             style={styles.input}
             keyboardType='text' 
           />
           <View style={{
 
             flex: 1,
             flexDirection: 'row',
             alignContent: "center",
             alignItems: "center",
             justifyContent: "center"
 
           }}>
             <Text> Tipo de Disco</Text>
             
             <Picker
               selectedValue={tipo}
               onValueChange={(itemValue, itemIndex) => setTipo(itemValue)}
               >
                 <Picker.Item label={"MBR"}  value={"MBR"}/>
                 <Picker.Item label={"GPT"}  value={"GPT"}/>
             </Picker>
           </View>
           
           <ButtonA 
             title   = "Crear Disco"
             onPress= { ()=>CrearDisco()}
           />
           
         </SafeAreaView>
         <StatusBar style="auto" />
 
         {llamarPicker()}
         {/** 
           <ButtonA 
           title   = "Eliminar Disco"
           onPress= { ()=>EliminarDisco()}
           />
           */
         }
 
 
       </View>
       <View >
         <DataTable id="tablaParticion">
             <DataTable.Header>
               <DataTable.Title></DataTable.Title>
               <DataTable.Title></DataTable.Title>
               <DataTable.Title ></DataTable.Title>
               <DataTable.Title ></DataTable.Title>
             </DataTable.Header>
 
          <DataTable.Row>
             <DataTable.Cell>Espacio Libre precedente (Mib)</DataTable.Cell>
             <DataTable.Cell numeric><TextInput
               onChangeText={(val) => settLibre(val)}
               value={tLibre}
               placeholder="espacio libre"
               keyboardType='numeric' /></DataTable.Cell>
             <DataTable.Cell text>Crear Como</DataTable.Cell>
             <DataTable.Cell text><Picker
             selectedValue={tipoP}
             onValueChange={(itemValue, itemIndex) => settipoP(itemValue)}
             >
             {listaTipo}
           </Picker></DataTable.Cell>
           </DataTable.Row>
 
           <DataTable.Row>
             <DataTable.Cell>Tama??o nuevo (Mib)</DataTable.Cell>
             <DataTable.Cell numeric><TextInput
               onChangeText={(val) => settNuevo(val)}
               value={tNuevo}
               placeholder="tama??o nuevo"
               keyboardType='numeric'/></DataTable.Cell>
             <DataTable.Cell numeric>Nombre de la particion</DataTable.Cell>
             <DataTable.Cell text><TextInput
               onChangeText={(val) => setnombreP(val)}
               value={nombreP}
               placeholder="nombre particion"
               keyboardType='text'
               /></DataTable.Cell>
           </DataTable.Row>
 
           <DataTable.Row>
             <DataTable.Cell>Espacio Libre a continuacion (Mib)</DataTable.Cell>
             <DataTable.Cell numeric><TextInput
               onChangeText={(val) => setlibreA(val)}
               value={libreA}
               placeholder="libre acontinuacion"
               keyboardType='numeric'/></DataTable.Cell>
             <DataTable.Cell numeric>Sistema de archivos</DataTable.Cell>
             <DataTable.Cell numeric><Picker
             selectedValue={sistemaA}
             //style={{ height: 50, width: 150 }}
             onValueChange={(itemValue, itemIndex) => setsistemaA(itemValue)}
             >
               {sistemasArchivos}
             </Picker></DataTable.Cell>
           </DataTable.Row>
 
           <DataTable.Row>
             <DataTable.Cell>alinear con: </DataTable.Cell>
             <DataTable.Cell text><Picker
               selectedValue={alinear}
               //style={{ height: 50, width: 150 }}
               onValueChange={(itemValue, itemIndex) => setalinear(itemValue)}
               >
                 {listaAlinear}
             </Picker></DataTable.Cell>
             <DataTable.Cell>Etiqueta</DataTable.Cell>
             <DataTable.Cell text><TextInput
               onChangeText={(val) => setetiqueta(val)}
               value={etiqueta}
               placeholder="etiqueta"
               keyboardType='text'/></DataTable.Cell>
           </DataTable.Row>
                        
       </DataTable> 
 
         <View style={{
 
           flex: 1,
           flexDirection: 'row',
           alignContent: "center",
           alignItems: "center",
           justifyContent: "center"
 
         }}>
           <ButtonA 
               title   = "Cancelar"
               onPress={() => arreglo.datosPorDisco(discos)}
 
           /> 
           <ButtonA 
             title   = "Aplicar"
             onPress={() =>{llenarDatosParticion()}}
 
           />
 
 
         </View>
       </View>
       {mostrarParticiones()}
     </View>
 
   );
 
   
 
 }
 
 export default App;