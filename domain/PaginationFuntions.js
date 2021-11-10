/**
 * Funcionalidades y variables de los algortimos de Paginacion
 * @author Kevin David Sanchez Solis
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

let NumeroProcesos          = 7;
let CapacidadMemoriaVirtual = 4;
let NumeroPaginas           = NumeroProcesos + CapacidadMemoriaVirtual;
let EspaciosDisponibles     = NumeroProcesos;
let EspaciosMemoriaVirtual  = CapacidadMemoriaVirtual;
export let TamañoBloque     = 3;

export let MemoriaFisica   = crearArrayProcesos();
export let MemoriaVirtual  = crearArrayMemoriaVirtual();
export let TablaProcesos   = new Array();
export let TablaUsuario    = crearArrayUsuario();
export let TablaPaginas    = crearTablaPaginas();

//--------------------------------------Metodods---------------------------------------------------------

/**
  * Metodo que inicializa el arreglo con los campos de los procesos
  * 
  * @returns El arreglo de Procesos inicializado
  */
function crearArrayProcesos() {

    //arreglo de Procesos totales
    let array = new Array(NumeroProcesos);
    //recorre el arreglo
    for (let index = 0; index < array.length; index++) {
        //inicializa la posicion en el arreglo en "".
        array.push();
        array[index] = ['', '', ''];
        
    }

    return array;
    
}

/**
  * Metodo que inicializa el arreglo con los campos de la memoria virtual
  * 
  * @returns El arreglo de memoria virtual inicializado
  */
 function crearArrayMemoriaVirtual() {

    //arreglo de Capacidad total
    let array = new Array(CapacidadMemoriaVirtual);
    //recorre el arreglo
    for (let index = 0; index < array.length; index++) {
        //inicializa la posicion en el arreglo en "".
        array.push();
        array[index] = ["","",""];
        
    }

    return array;
    
}

/**
 * Metodo que inicializa el arreglo con los campos de la memoria virtual
 * 
 * @returns El arreglo de paginas que ve el usuario inicializado
 */
 function crearArrayUsuario() {

    //arreglo de Capacidad total
    let array = new Array(NumeroPaginas);
    //recorre el arreglo
    for (let index = 0; index < array.length; index++) {
        //inicializa la posicion en el arreglo en "".
        array.push();
        array[index] = ["","",""];
        
    }

    return array;
    
}

/**
  * Metodo que inicializa el arreglo con los campos de los procesos
  * 
  * @returns El arreglo de Procesos inicializado
  */
 function crearTablaPaginas() {

    //arreglo de Procesos totales
    let array = new Array(NumeroPaginas);
    //recorre el arreglo
    for (let index = 0; index < array.length; index++) {
        //inicializa la posicion en el arreglo en "".
        array.push();
        array[index] = ["", ""];
        
    }

    return array;
    
}

/**
  * Elimina la palabra contenida en el indice 
  * 
  * @param {*} indicePagina indice de la pagina a eliminar
  */
export function eliminarPalabra(indicePagina) {

    // Indice de la palabra en la tabla que ve el usuario
    let indiceTablaPaginas;
    // Indice de la palabra en memoria
    let indiceMemoria;

    // Recorre tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida si coincide el registro con el indice a eliminar
        if (TablaPaginas[index][0] == indicePagina) {
            // Valida si la palabra esta en memoria virtual
            if (/^MV/.test(TablaPaginas[index][1])) {
                return alert('Memoria Virtual');
            }
            // Toma el indice de la palabar en el array que ve el usuario
            indiceTablaPaginas = TablaPaginas[index][0];
            // Toma el indice de la palabar en el array de memoria fisica
            indiceMemoria      = TablaPaginas[index][1];
            // Invoca el metodo para limpiar los espacios del bloque de memoria
            limpiarArray(MemoriaFisica[indiceMemoria]);
            // Invoca el metodo para limpiar los espacios del bloque de memoria
            limpiarArray(TablaUsuario[indiceTablaPaginas]);

            TablaPaginas[index][0] = "";
            TablaPaginas[index][1] = "";

            ///** Visualizacion de datos
                console.log("Tabla Procesos");
                console.log(TablaProcesos);
                console.log("Memoria Fisica");
                console.log(MemoriaFisica);
                console.log("Memoria Virtual");
                console.log(MemoriaVirtual);
                console.log("Tabla Usuario");
                console.log(TablaUsuario);
                console.log("Tabla Paginas");
                console.log(TablaPaginas);
            //*/ 

            break;

        }
    }
}

/**
  * Limpia cada espacio del array, lo setea en ""
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
  * Metodo que devuelve el item solicitado tanto en memoria fisica como en la del usuario
  * @param {*} numPagina 
  * @param {*} numPos 
  */
export function solicitarItem (numPagina, numPos) {

    // Imprime el dato solictado de la pagina
    console.log("En paginas (vista usuario) "+TablaUsuario[numPagina][numPos]);
    // Recorre la tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida si el numero de la pagina coincide
        if (TablaPaginas[index][0] == numPagina) {
            // Imprime el dato desde la memoria fisica
            console.log("En memoria Fisica "+ MemoriaFisica[TablaPaginas[index][1]][numPos]);
            break;
        }
        
    }
    
}

/**
  * Metodo que crea un proceso y lo agrega a las tablas correspondientes
  * @param {*} palabra palabra que representa el proceso 
  */
export function crearProceso(palabra) {

    // Valida que en memoria fisica o en memoria virtual exista el espacio
    if (EspaciosDisponibles != 0 || EspaciosMemoriaVirtual != 0) {
        // Agrega la palabra en la tabla que ve el usuario
        agregarPalabraTablaUsuarios(palabra);
        // valida si en la memoria fisica hay espacio para almacenar
        if (EspaciosDisponibles != 0) {
            agregarPalabraMemoriaFisica(palabra);
        }else { // Se baja un proceso a memoria virtual para el ingreso del proceso
            agregarPalabraMemoriaVirtual(palabra);
        }

        // Agrega el proceso en la tabla de procesos global
        TablaProcesos.push(palabra);
        
        ///** Visualizacion de datos
        console.log("Tabla Procesos");
        console.log(TablaProcesos);
        console.log("Memoria Fisica");
        console.log(MemoriaFisica);
        console.log("Memoria Virtual");
        console.log(MemoriaVirtual);
        console.log("Tabla Usuario");
        console.log(TablaUsuario);
        console.log("Tabla Paginas");
        console.log(TablaPaginas);
        //*/  

    }else{ // No existe memoria disponible para el ingreso de la palabra
        console.log("Memoria Insuficiente para almacenar el proceso");
    }
}

/**
 * Agrega un proceso haciendo uso de la memoria virtual
 * @param {*} palabra 
 */
function agregarPalabraMemoriaVirtual (palabra) {

    // Genera numero aleatorio
    let numero = Math.floor(Math.random() * (NumeroProcesos - 0)) + 0;
    // Almacena los indices de memoria 
    let indices;
    // Recorre la tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida si el registro coincide con el aleatorio
        if (TablaPaginas[index][1] == numero) {
            // Clona el registro de indices
            indices = Object.assign({}, TablaPaginas[index]);
            // Asigna un indicativo de que el bloque se traslado a memoria virtual
            TablaPaginas[index][1] = 'MV';
            break;
            
        }
        
    }

    // Invoca el metodo que baja el bloque a memoria virtual
    asignarMemoriaVirtual(indices);
    // Invoca el metodo que asigna el proceso en el hueco que se deja
    asignarMemoriaFisica(palabra, indices[1]);
    
}

/**
 * Asigna el valor del espacio libre en memoria fisica en la tabla de paginas
 * @param {*} palabra Proceso a ingresar
 * @param {*} indice Posicion de bloque que se bajo a memoria virtual
 */
function asignarMemoriaFisica(palabra, indice) {
    
    // Recorre tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida si es la posicion del nuevo proceso
        if (TablaPaginas[index][0] != "" && TablaPaginas[index][1] == "") {
            // Asigna el espacio correspondiente
            TablaPaginas[index][1] = parseInt(indice, 10);
        }  
    }
    // Recorre el bloque de la memoria fisica
    for (let index = 0; index < MemoriaFisica[0].length; index++) {
        // Asigna el dato de la palabra que corresponde
        MemoriaFisica[indice][index] = palabra.charAt(index);  
    }

}

/**
 * Baja a memoria virtual un proceso
 * @param {*} indices indices que ocupa el proceso a bajar en las memorias
 */
function asignarMemoriaVirtual (indices) {
    
    // Indica la posicion vacia dentro de la memoria virtual
    let posicion;

    // Recorre los bloques de la memoria virtual
    for (let index = 0; index < MemoriaVirtual.length; index++) {
        // Valida si el primer espacio del bloque esta vacio
        if (MemoriaVirtual[index][0] == "") {
            let centinela = true;
            // Recorre cada espacio del bloque
            for (let index2 = 0; index2 < MemoriaVirtual[0].length; index2++) {
                // Valida si el espacio esta vacio
                if (MemoriaVirtual[index][index2] != "") {
                    centinela = false;
                    break;
                }
                
            }
            // Valida si todo el bloque esta vacio
            if (centinela == true) {
                posicion = index;
                break;
            }

        }
        
    }

    let pos = parseInt(indices[1], 10);
    // Recorre el bloque vacio encontrado
    for (let index = 0; index < MemoriaVirtual[0].length; index++) {
        // Asigna el valor que estaba en memoria fisica en memoria virtual
        MemoriaVirtual[posicion][index] = MemoriaFisica[pos][index];
        // Pone en vacio el espacio que se baja a memoria virtual
        MemoriaFisica[indices[1]][index] = "";
    }

}

/**
 * Metodo que agrega el proceso en el array que ve el usuario
 * @param {*} palabra que representa el proceso
 */
function agregarPalabraTablaUsuarios(palabra) {

    let centinela = true;
    // Recorre el array de posiciones disponibles
    for (let index = 0; index < TablaUsuario.length; index++) {
        // Valida si el bloque en la primera posicion esta vacia
        if (TablaUsuario[index][0] == "") {
            // Bucle que recorre las posiciones del bloque 
            for (let index2 = 0; index2 < TablaUsuario[0].length; index2++) {
                // Valida si no esta vacia la posicion
                if (TablaUsuario[index][index2] != "") {
                    centinela = false;
                    break;
                }

            }
            // Valida si todas las posiciones del bloque de datos estan vacias
            if (centinela == true) {
                // Bucle que recorre el bloque de datos
                for (let asignacion = 0; asignacion < TablaUsuario[0].length; asignacion++) {
                    // Ingresa en la posicion el caracter de la palabra
                    TablaUsuario[index][asignacion] = palabra.charAt(asignacion);
                }
                // Asigna el valor de la pagina en la tabla de paginas
                TablaPaginas[index][0] = index;
                break;
            }
        }
    }
}

/**
 * Metodo que agrega la palabra del proceso en memoria fisica
 * @param {*} palabra que representa el proceso
 * @returns indice de la posicion en palabra en la que va o -1 si ya se termino
 */
function agregarPalabraMemoriaFisica(palabra) { 

    // Genera un aleatorio en el rango de espacios de la memoria fisica
    let aleatorio = validarMemoriaFisica();
    // Valida si el aleatorio es numero valido
    if (aleatorio != -1) {
        // Bucle que recorre los espacios dentro del bloque de memoria
        for (let index1 = 0; index1 < TamañoBloque; index1++) {
            // Asigna la letra en el espacio
            MemoriaFisica[aleatorio][index1] = palabra.charAt(index1);   
        }
        // Agrega la posicion consumida en la tabla de paginas
        agregarTablaPaginas(aleatorio);
        // Disminuye contador de espacios disponibles de la memoria fisica
        EspaciosDisponibles--;

    }else {
        console.log("No hay espacio suficiente para almacenar la palabra");
    }

}

/**
 * Metodo que agrega la posicion usada en memoria fisica en la tabla de paginas
 * @param {*} posicionFisica posicion que se consume en la memoria fisica
 */
function agregarTablaPaginas(posicionFisica) {
    // Recorre la tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida que exista datos en el array del usuario
        if (TablaPaginas[index][0] != "" || parseInt(TablaPaginas[index][0]) == 0) {
            // Valida que falte el dato de la memoria fisica
            if ((TablaPaginas[index][1] == "")) {
                // Asigna el valor
                TablaPaginas[index][1] = posicionFisica;
                // Sale de la ejecucion
                break;
            }
        }
        else{
            console.log("else"+ index);
        }
    }
} // Falla cuando el primer valor es 0 (ya no)

/**
 * Metodo que retorna un numero aleatorio de espacio disponible de la memoria fisica
 * @returns Numero aleatorio
 */
function validarMemoriaFisica() {
    // Numero aleatorio
    let numero = -1;
    // Valida que si existan espacios disponibles en memoria fisica
    if (EspaciosDisponibles == 0) {
        return -1;
    }

    // Variable de salida
    let centinela = false;

    // Valida que el numero no sea negativo
    while( numero < 0 && centinela == false) {
        // Genera un numero aleatorio entero
        numero = Math.floor(Math.random() * (NumeroProcesos - 0)) + 0;
        // Valida que la posicion en memoria fisica este disponible
        if (MemoriaFisica[numero][0] == "") {
            // Bucle que recorre el bloque de datos
            for (let index2 = 0; index2 < MemoriaFisica[0].length; index2++) {
                // Valida si la posicion del bloque esta vacia
                if (MemoriaFisica[numero][index2] == "") {
                    centinela = true;
                } else { // Accion que ocurre porque tiene algun dato la posicion
                    centinela = false;
                    break;
                }
            }

        } else {
            numero = -1;
        }
    }
    return numero;
}



