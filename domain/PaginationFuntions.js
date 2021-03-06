/**
 * Funcionalidades y variables de los algortimos de Paginacion
 * 
 * @author Kevin David Sanchez Solis
 */

//--------------------------------------Importaciones----------------------------------------------------

import React from 'react';

//--------------------------------------Variables--------------------------------------------------------

// Cantidad de procesos en memoria fisica
let NumeroProcesos          = 7;
// Cantidad de procesos en memoria virtual
let CapacidadMemoriaVirtual = 4;
// Cantidad total de paginas o procesos
let NumeroPaginas           = NumeroProcesos + CapacidadMemoriaVirtual;
// Cantidad de marcos disponibles en memoria fisica
let EspaciosDisponibles     = NumeroProcesos;
// Cantidad de bloques de datos disponibles en memoria virtual
let EspaciosMemoriaVirtual  = CapacidadMemoriaVirtual;
// Tamaño de cada marco o bloque de memoria
export let TamañoBloque     = 3;

// Inicializa el array de memoria fisica
export let MemoriaFisica   = crearArrayProcesos();
// Inicializa el array de memoria virtual
export let MemoriaVirtual  = crearArrayMemoriaVirtual();
// Inicializa el array de tabla de procesos
export let TablaProcesos   = new Array();
// Inicializa el array de tabla de procesos que ve el usuario
export let TablaUsuario    = crearArrayUsuario();
// Inicializa el array de tabla de paginas
export let TablaPaginas    = crearTablaPaginas();

// Texto con las acciones realizadas
export let paginationLog = '';

//---------------------------------------Metodos---------------------------------------------------------

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

    // Ingresa registro al log
    paginationLog += 'Se solicita eliminar el proceso número '+ indicePagina +'\n';

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
                
                let indice = TablaPaginas[index][1];
                // Invoca el metodo que elimina una palabra que esta en memoria virtual
                eliminarPalabraMemoriaVirtual(indice);

            } else {
                // Toma el indice de la palabar en el array de memoria fisica
                indiceMemoria      = TablaPaginas[index][1]-1;
                // Invoca el metodo para limpiar los espacios del bloque de memoria
                limpiarArray(MemoriaFisica[indiceMemoria]);
                // Ingresa registro al log
                paginationLog += ' Se elimina el proceso del espacio '+ parseInt(indiceMemoria+1) +' de la memoria fisica\n';
            }
            // Toma el indice de la palabar en el array que ve el usuario
            indiceTablaPaginas = TablaPaginas[index][0]-1;
            // Invoca el metodo para limpiar los espacios del bloque de memoria
            limpiarArray(TablaUsuario[indiceTablaPaginas]);

            TablaPaginas[index][0] = "";
            TablaPaginas[index][1] = "";
            EspaciosDisponibles++;

            // Ingresa registro al log
            paginationLog += ' Se liberan los espacios ocupados por el proceso en la tabla de páginas \n';

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
                console.log("Log");
                console.log(paginationLog);
            //*/ 
            break;
        }
    }
}

/**
 * Elimina un proceso que se encuentra en memoria virtual
 */
function eliminarPalabraMemoriaVirtual(indice) {

    // Separa los datos dentro del array de paginas
    let posicion = indice.split('-');
    // Ubica la posicion dentro de la memoria virtual 
    let array = MemoriaVirtual[posicion[1]];
    // Limpia el bloque de datos
    limpiarArray(array);
    
    // Ingresa registro al log
    paginationLog += ' Se elimina el proceso del espacio '+ parseInt(posicion[1])+1 +' de la memoria virtual\n';
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
  * Metodo que devuelve el item solicitado tanto en memoria fisica como en la del usuario
  * 
  * @param {*} numPagina Pagina solicitada
  * @param {*} numPos Item solicitado
  */
export function solicitarItem (numPagina, numPos) {

    // Ingresa registro al log
    paginationLog += 'Se solicita el item '+ numPos +' de la página '+ numPagina +'\n';

    // Imprime el dato solictado de la pagina
    console.log("En paginas (vista usuario) "+TablaUsuario[numPagina-1][numPos-1]);
    // Recorre la tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida si el numero de la pagina coincide
        if (TablaPaginas[index][0] == numPagina) {
            // Valida si esta en memoria virtual
            if (/^MV/.test(TablaPaginas[index][1])) {
                // Trae el item solicitado
                let item = solicitarItemMemoriaVirtual(TablaPaginas[index], numPos);

                // Imprime el dato desde la memoria fisica
                console.log("En memoria Fisica "+ MemoriaFisica[item][numPos-1]);
                break;

            } else {
                // Ingresa registro al log
                paginationLog += 'Se obtiene el item solicitado: '+ MemoriaFisica[TablaPaginas[index][1]-1][numPos-1] +'\n';
                // Imprime el dato desde la memoria fisica
                console.log("En memoria Fisica "+ MemoriaFisica[TablaPaginas[index][1]-1][numPos-1]);
            }
            break;
        }
        
    }

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
        console.log("Log");
        console.log(paginationLog);
        //*/ 
    
}

/**
 * Trae un item que esta en memoria virtual
 * 
 * @param {*} indiceMV indices en tabla de paginas del proceso que se solicta el item
 * @param {*} numPos posicion del item solicitado
 * 
 * @returns 
 */
function solicitarItemMemoriaVirtual (indiceMV, numPos) {
    // Ingresa registro al log
    paginationLog += ' Proceso ubicado en memoria virtual \n';
    
    // Separa los datos dentro del array de paginas
    let posicion = indiceMV[1].split('-');
    // clona la informcion del array a subir
    let arraySubir = Object.assign({}, MemoriaVirtual[posicion[1]]);
    // Ubica la posicion dentro de la memoria virtual 
    let arrayBajar;
    // Variable que limita el while
    let centinela = true;
    // Almacena el numero aleatorio para bajar un array
    let numero;
    // Almacen ael indice en la tabla de paginas
    let indiceTabla;

    // Cicla mientras encuentra un array a bajar
    while (centinela) {
        // Genera numero aleatorio
        numero = Math.floor(Math.random() * (NumeroProcesos - 0)) + 0;
        // Recorre la tabla de paginas
        for (let index = 0; index < TablaPaginas.length; index++) {
            // Valida si el registro coincide con el aleatorio
            if (TablaPaginas[index][1] == numero) {
                // Clona la informacion del array a bajar
                arrayBajar = Object.assign({}, MemoriaFisica[numero]);
                // Inidice en tabla de paginas
                indiceTabla = index;
                // Sale del ciclo
                centinela = false;
                break;
            }
        }
    }
    // Ingresa registro al log
    paginationLog += ' Se baja el proceso '+ parseInt(numero) +' a memoria virtual \n';
    // Ingresa registro al log
    paginationLog += ' Se sube el proceso '+ parseInt(indiceMV[0]) +'a memoria fisica \n';

    // Ingresa registro al log
    paginationLog += ' Se actualizan los datos en la tabla de páginas \n';
    
    // Sube el array a memoria fisica
    MemoriaFisica[numero] = Object.values(arraySubir);
    // Actualiza el indice en la tabla de paginas
    indiceMV[1] = numero;

    // Baja el array a memoria virtual
    MemoriaVirtual[posicion[1]] = Object.values(arrayBajar);
    // Actualiza el indice en la tabla de paginas
    TablaPaginas[indiceTabla][1] = "MV-"+posicion[1];

    // Ingresa registro al log
    paginationLog += 'Se obtiene el item solicitado: '+ MemoriaFisica[numero][numPos] +'\n';

    return numero;
}

/**
  * Metodo que crea un proceso y lo agrega a las tablas correspondientes
  * 
  * @param {*} palabra palabra que representa el proceso 
  */
export function crearProceso(palabra) {

    // Ingresa registro al log
    paginationLog += 'Se solicita crear el proceso: '+palabra+'\n';

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
        console.log("Log");
        console.log(paginationLog);
        //*/  

    }else{ // No existe memoria disponible para el ingreso de la palabra
        console.log("Memoria Insuficiente para almacenar el proceso");
        // Ingresa registro al log
        paginationLog += 'No hay memoria suficiente para almacenar el proceso, por lo cual se reporta un fallo en la operación. \n';
    }
}

/**
 * Agrega un proceso haciendo uso de la memoria virtual
 * 
 * @param {*} palabra 
 */
function agregarPalabraMemoriaVirtual (palabra) {

    // Genera numero aleatorio
    let numero = Math.floor(Math.random() * (NumeroProcesos - 0)) + 0;

    // Ingresa registro al log
    paginationLog += 'Memoria fisica llena, se realiza la solicitud para hacer uso de la memoria virtual. \n';

    // Obtiene espacio libre en memoria virtual
    let disponible = validarMemoriaVirtual();

    // Indices para cambio a memoria virtual
    let indices;

    // Recorre la tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida si el registro coincide con el aleatorio
        if (TablaPaginas[index][1] == numero) {
            // Clona el registro de indices
            indices = Object.assign({}, TablaPaginas[index]);
            // Asigna un indicativo de que el bloque se traslado a memoria virtual
            TablaPaginas[index][1] = 'MV-'+(parseInt(disponible)+1);
            break;
            
        }
    }

    // Ingresa registro al log
    paginationLog += ' Se baja el proceso '+ indices[0] +' a memoria virtual. \n';
    paginationLog += ' Se actualiza el cambio en la tabla de páginas. \n';

    // Baja proceso a memoria virtual
    for (let index = 0; index < MemoriaFisica[0].length; index++) {
        MemoriaVirtual[parseInt(disponible)][index] = MemoriaFisica[parseInt(indices[1]-1)][index];
    }

    // Pone el bloque de memoria en vacio
    limpiarArray(MemoriaFisica[indices[1]-1]);

    // Obtiene posicion en tabla de paginas del proceso nuevo
    let tabla = buscarProcesoPendiente();

    // Ingresa registro al log
    paginationLog += ' Se relaciona en tabla de paginas que el proceso '+ parseInt(TablaPaginas[parseInt(tabla)][0]) +' quedo en el espacio '+ parseInt(indices[1]) +' de la memoria vírtual. \n';

    // Setea dato del proceso nuevo en memoria fisica
    TablaPaginas[parseInt(tabla)][1] = parseInt(indices[1]);

    // Recorre el bloque de memoria disponible
    for (let index = 0; index < MemoriaFisica[0].length; index++) {
        // Agrega el item del proceso en el espacio de memoria
        MemoriaFisica[parseInt(indices[1])-1][index] = palabra.charAt(index);
    }

    EspaciosMemoriaVirtual--;

}

/**
 * Busca en tabla de paginas donde se ubica el proceso nuevo
 */
function buscarProcesoPendiente() {
    // Recorre tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valiada que sea donde se ubico el proceso nuevo
        if (TablaPaginas[index][0] != '' && TablaPaginas[index][1] == '') {
            return index;
        }
    }
}

/**
 * Busca bloque de memoria vacio 
 *
 * @returns indice de bloque de memoria virtual vacio
 */
function validarMemoriaVirtual() {
    // Recorre memoria virtual
    for (let index  = 0; index < MemoriaVirtual.length; index++) {
        // Indica si esta vacio
        let centinela = true;
        // Recorre los espacios de memoria del bloque
        for (let index1 = 0; index1 < MemoriaVirtual[0].length; index1++) {
            // Valida si el espacio esta vacio
            if (MemoriaVirtual[index][index1] != '') {
                centinela = false;
            }
        }
        // Valida si el bloque de memoria esta vacio
        if (centinela) {
            return index;
        }
    }
}

/**
 * Metodo que agrega el proceso en el array que ve el usuario
 * 
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
                // Ingresa registro al log
                paginationLog += ' Se ingresa el proceso en la posición '+(parseInt(index)+1)+' de la tabla de procesos. \n';

                // Bucle que recorre el bloque de datos
                for (let asignacion = 0; asignacion < TablaUsuario[0].length; asignacion++) {
                    // Ingresa en la posicion el caracter de la palabra
                    TablaUsuario[index][asignacion] = palabra.charAt(asignacion);
                }
                // Asigna el valor de la pagina en la tabla de paginas
                TablaPaginas[index][0] = index+1;

                // Ingresa registro al log
                paginationLog += ' En la tabla de paginas en la posición '+ (parseInt(index)+1) +
                ' se relaciona la posición del proceso en la tabla de procesos. \n';
                break;
            }
        }
    }
}

/**
 * Metodo que agrega la palabra del proceso en memoria fisica
 * 
 * @param {*} palabra que representa el proceso
 * 
 * @returns indice de la posicion en palabra en la que va o -1 si ya se termino
 */
function agregarPalabraMemoriaFisica(palabra) { 

    // Genera un aleatorio en el rango de espacios de la memoria fisica
    let aleatorio = validarMemoriaFisica();
    // Valida si el aleatorio es numero valido
    if (aleatorio != -1) {
        // Ingresa registro al log
        paginationLog += ' El sistema ubica de forma aleatoria el proceso en la memoria física. El proceso se ubica en el espacio '+ (parseInt(aleatorio)+1) +' de memoria física .\n';

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

        // Se ingresa el registro al log
        paginationLog += 'No hay memoria suficiente para almacenar el proceso, por lo cual se reporta un fallo en la operación. \n';
    }

}

/**
 * Metodo que agrega la posicion usada en memoria fisica en la tabla de paginas
 * 
 * @param {*} posicionFisica posicion que se consume en la memoria fisica
 */
function agregarTablaPaginas(posicionFisica) {
    // Recorre la tabla de paginas
    for (let index = 0; index < TablaPaginas.length; index++) {
        // Valida que exista datos en el array del usuario
        if (TablaPaginas[index][0] !== "" || parseInt(TablaPaginas[index][0]) == 0) {
            // Valida que falte el dato de la memoria fisica
            if ((TablaPaginas[index][1] === "")) {
                // Asigna el valor
                TablaPaginas[index][1] = posicionFisica+1;

                // Ingresa registro al log
                paginationLog += ' En la tabla de páginas en la posición '+ (parseInt(index)+1) +
                ' se relaciona que se consumió el espacio '+(posicionFisica+1)+' en memoria física. \n';
                // Sale de la ejecucion
                break;
            }
        }
        else{
            console.log("else"+ index);
        }
    }
}

/**
 * Metodo que retorna un numero aleatorio de espacio disponible de la memoria fisica
 * 
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
    return parseInt(numero, 10);
}



