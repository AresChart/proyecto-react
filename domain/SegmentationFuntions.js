/**
 * Funcionalidades y variables de los algortimos de Paginacion
 * 
 * @author Kevin David Sanchez Solis
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

// Cantidad de memoria fisica
let CantidadMemoria = 20;

// Cantidad de marcos disponibles en memoria fisica
export let EspaciosDisponibles     = CantidadMemoria;
// Inicializa el array de memoria fisica
export let MemoriaFisica   = crearArrayProcesos();
// Inicializa el array de tabla de procesos
export let TablaProcesos   = new Array();

//---------------------------------------Metodos---------------------------------------------------------

/**
  * Metodo que inicializa el arreglo con los campos de los procesos
  * 
  * @returns El arreglo de Procesos inicializado
  */
function crearArrayProcesos() {

    //arreglo de Procesos totales
    let array = new Array(CantidadMemoria);
    //recorre el arreglo
    for (let index = 0; index < array.length; index++) {
        //inicializa la posicion en el arreglo en "".
        array.push();
        array[index] = [''];
    }

    return array;
}

/**
  * Limpia cada espacio del array, lo setea en ""
  * 
  * @param {*} array array a limpiar
  */
function limpiarArray(array) {

    // Recorre los espacios del array
    for (let index = 0; index < array.length; index++) {
        // setea el espacio en ""
        array[index] = "";
        
    }
    
}

/**
  * Metodo que crea un proceso y lo agrega a las tablas correspondientes
  * 
  * @param {*} palabra palabra que representa el proceso 
  */
export function crearProceso(palabra) {

    // Agrega la palabra en memoria fisica
    let estado = agregarPalabraMemoriaFisica(palabra);

    // Valida si el estado es negativo
    if (estado == -1) {
        return alert('No se encontro el espacio para almacenar la palabra en memoria fisica');
    }
    // Agrega el proceso en la tabla de procesos global
    TablaProcesos.push(palabra);

    // Visualizacion de datos
    console.log("Tabla de procesos");
    console.log(TablaProcesos);
    console.log("Memoria fisica");
    console.log(MemoriaFisica);

}

/**
 * Agrega la palabra en el array de memoria fisica
 *
 * @param {*} palabra palabra a agregar en array
 *
 * @returns estado de la solicitud
 */
function agregarPalabraMemoriaFisica(palabra) {

    // Maneja el estado de la validacion
    let estado = validarEspacioMemoriaFisica(palabra.length);

    // Valida si la validacion de espacio es negativa
    if (estado == -1) {
        // Devuelve estado negativo de la solicitud
        return -1;
    }

    // Caso de parada de asignacion de la palabra
    let tope = 0;

    // Bucle para asignar las letras de la palabra en memoria fisica
    while (tope != palabra.length) {
        // Asigna letra de la palabra en el espacio del segmento
        MemoriaFisica[estado] = palabra.charAt(tope);
        // Incrementa indices
        tope++;
        estado++;
    }

    return 0;
}

/**
 * Valida si existe espacio contiguo para la asignacion de la palabra 
 *
 * @param {*} tamaño tamaño de la palabra a asignar
 *
 * @returns indice de inicio para asignar o estado negativo (1)
 */
function validarEspacioMemoriaFisica(tamaño) {

    // Variable auxiliar para controlar si el espacio esta
    let aux = tamaño;

    // Bucle que recorre todo el array de memoria fisica
    for (let index = 0; index < MemoriaFisica.length; index++) {
        // Auxiliar que indica donde inicia a buscar
        let indexAux = index;
        // Bucle que busca si existe el espacio
        while (aux != 0) {
            // Valida si la posicion en la memoria fisica esta disponible
            if (MemoriaFisica[indexAux] == '') {
                // Ajusta los auxiliares
                aux--;
                indexAux++;
            } else {
                break;
            }
            // Valida si se cumple con el tamaño
            if (aux == 0) {
                return index;
            }
        }
        // Actualiza los indices
        index = indexAux;
        aux = tamaño;
    }

    return -1;
}
