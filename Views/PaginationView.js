/**
 * View de los algoritmos de Paginacion y Memoria virtual
 * @author Kevin David Sanchez Solis
 */

import React from 'react';
import { View , ScrollView} from 'react-native';
import * as funciones from '../domain/PaginationFuntions';
import ButtonA from '../componentes/ButtonComponent';
import TextI from '../componentes/TextInputComponent';
import ProcessList from '../componentes/PaginationComponents/ProcessListComponent';
import TableInput from '../componentes/PaginationComponents/TableInputProccessesComponent';

function paginacion() {

    //Variable que almacena el indice de la pagina a eliminar
    const [eliminarItem,   setEliminarItem]       = React.useState("");
    //Variable que almacena la palabra que corresponde al proceso creado
    const [palabra,   setPalabra] = React.useState("");
    //Variable que almacena la el numero de pagina que se solicita
    const [paginaSolicitada,   setPaginaSolicitada] = React.useState("");
    //Variable que almacena la posicion del item solicitado
    const [posicionSolicitada,   setPosicionSolicitada] = React.useState("");

    const [tablaEntrada, setTablaEntrada] = React.useState([]);

    /**
     * Crear un Proceso representado por una palabra ingresada
     */
    function crearProceso() {

        // Variable auxiliar 
        let palabraClone = palabra.trim();  
        
        // Valida que la palabra no este vacia
        if (palabraClone == "") {          
            return alert("No se admiten Palabras vacias");
        }

        // Valida que la palabra sea maximo del tamaño del bloque
        if (palabra.length <= funciones.TamañoBloque) {
            // Invoca al metodo crear proceso
            return funciones.crearProceso(palabra);
        }

        return alert("EL TAMAÑO DEL PROCESO ES DE MAXIMO 3 CARACTERES");
    }

    /**
     * Permite traer de la memoria fisica el dato solicitado
     */
    function solictarItem() {

        // Invoca el metodo que trae el item solicitado
        funciones.solicitarItem(paginaSolicitada, posicionSolicitada);
        
    }

    /**
     * Permite eliminar o vaciar el bloque que contiene una palabra que se especifica por un indice
     */
    function eliminarPalabra() {
        
        // Invoca el metodo que elimina de los array la palabra indicada
        funciones.eliminarPalabra(eliminarItem);

    }

    /**
     * Tabla
     * @returns 
     */
    function tableInputProcessesComponent (){
        
        return(<TableInput height={7} tablaEntrada={tablaEntrada} setTablaEntrada={setTablaEntrada} />);
        
        
    }

    /**
     * Inicializa la tabla de procesos
     */
    function inicializarTabla(){
        crearTablaEntrada();
    }
      
    /**
     * Crea la tabla de entrada de los procesos
     */
    function crearTablaEntrada(){
        setTablaEntrada([]);
        let tablaEntrada = [];
        for (let index = 0; index < 7; index++) {
          tablaEntrada.push({proceso: "S"+(index+1), solicita: "", libera: ""})
        }
        setTablaEntrada(tablaEntrada);
    }

    /**
     * Retorna la vista con los componentes
     */
    return(

        // View Global
        <ScrollView>
            {/**View de los Input */}
            <View >
                <TextI
                    onChangeText={(val) => setPalabra(val)}
                    value={palabra}
                    placeholder="Palabra"
                    keyboardType='default' 
                />
            </View>
            {/**View del boton */}
            <View>
                <ButtonA 
                    title   = "Crear Proceso"
                    onPress= { ()=>crearProceso() }
                />
            </View>
            <View>
                <TextI
                    onChangeText={(val) => setPaginaSolicitada(val)}
                    value={paginaSolicitada}
                    placeholder="Pagina"
                    keyboardType='default' 
                />
                <TextI
                    onChangeText={(val) => setPosicionSolicitada(val)}
                    value={posicionSolicitada}
                    placeholder="Posicion"
                    keyboardType='default' 
                />
            </View>
            <View>
                <ButtonA 
                    title   = "Realizar Solicitud"
                    onPress= { ()=>solictarItem() }
                />
            </View>

            <View>
                <TextI
                    onChangeText={(val) => setEliminarItem(val)}
                    value={eliminarItem}
                    placeholder="Indice de palabra a eliminar"
                    keyboardType='default' 
                />
            </View>
            <View>
                <ButtonA 
                    title   = "Eliminar palabra"
                    onPress= { ()=>eliminarPalabra() }
                />
            </View>

        </ScrollView>

    )
    
}
export default paginacion;