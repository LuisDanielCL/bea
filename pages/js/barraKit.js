var listTipo = [];
var tablaComponente;
var tablaKit;
var componenteActual;
$( document ).ready(function() {
    cargarTipoComponente();

    tablaComponente = $('#tablaComponentes').DataTable( {
        "scrollX": true,
        "columns": [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
              "data": null,
              "defaultContent": '<button class="btn btn-primary" onclick="cargarEditar(this)" >Editar</button><button class="btn btn-danger" onclick="eliminarComponente(this)" >Eliminar</button>'
            }
        ],
        "columnDefs": [
            {
                "targets": [ 6 ],
                "visible": false,
                "searchable": false
            }
        ],
        "processing": true,
        "serverSide": true,
        "ajax": "php/tablas/tablaComponentes.php"
        
    } );


    tablaKit = $('#tablKits').DataTable( {
        "scrollX": true,
        "processing": true,
        "serverSide": true,
        "ajax": "php/tablas/tablaKit.php"
        
    } );

});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayBus = [];

<<<<<<< HEAD
function revisarComponente(inputComponente){
    componenteActual = inputComponente;
    var parametros = {
    opcion : "revisarComponente",
    componente : inputComponente.value
    }
=======
function cargarTipoComponente(){
	var parametros = {
		opcion : "cargarTipoComponente"
	}
>>>>>>> parent of 3f74064... Merge branch 'master' of https://github.com/LuisDanielCL/bea

    var post = $.post(
                         "php/kit.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         respuestaRevisarComponente    // Función que se ejecuta cuando el servidor responde
                         );
    
}

function respuestaRevisarComponente(r){
    alert(r);
}


function cargarEditar(boton){
    var data = tabla.row( (boton.closest('tr').rowIndex) -1 ).data();
    console.log(data);
    document.getElementById('txtCodigo').value = data[0];
    document.getElementById("txtLote").value = data[2];
    document.getElementById("txtFecha").value = data[3];
    document.getElementById("imeiInput").value = data[5];
    revisarTipoTexto(data[1]);
    revisarEstado(data[4]);
    document.getElementById('txtCodigo').disabled = true;
    document.getElementById("btnAgregarComponente").style.display="none";
    document.getElementById("btnEditarComponente").style.display="inline-block";


    alert("editar")
}

function revisarTipo(){
    var tipo = document.getElementById("tipoComponente");
    var codigoTexto = document.getElementById("txtCodigo").value;
    var txt = "";
    var stringBusqueda = ""
    for (var i = 0; i < tipo.length; i++) {        
        stringBusqueda = tipo.options[i].value;
        var isType= codigoTexto.toUpperCase().includes(stringBusqueda);
        if (isType == true){
            tipo.selectedIndex = i;
            revisarIMEI(tipo);        
        }
    }
}

function revisarTipoTexto(texto){
    var tipo = document.getElementById("tipoComponente");
    var txt = "";
    var stringBusqueda = ""
    for (var i = 0; i < tipo.length; i++) {        
        stringBusqueda = tipo.options[i].text;
        var isType= texto.toUpperCase().includes(stringBusqueda.toUpperCase());
        if (isType == true){
            tipo.selectedIndex = i;
            revisarIMEI(tipo);        
        }
    }
}

function revisarEstado(texto){
    var tipo = document.getElementById("listEstado");
    var txt = "";
    var stringBusqueda = ""
    for (var i = 0; i < tipo.length; i++) {        
        stringBusqueda = tipo.options[i].text;
        var isType= texto.toUpperCase().includes(stringBusqueda.toUpperCase());
        if (isType == true){
            tipo.selectedIndex = i;      
        }
    }
}




function revisarIMEI(tipoComponente){
    var tipoNombre = tipoComponente.options[tipoComponente.selectedIndex].text;
            var imeiSec =document.getElementById("rImei");
            if(tipoNombre.toUpperCase() == "MODEM"){
                imeiSec.style.display = "block";
                document.getElementById("imeiInput").required = true;
            }else{
                imeiSec.style.display = "none";
                document.getElementById("imeiInput").required = false;
                document.getElementById("imeiInput").text = "";
            }
}




$( "#componentesForm" ).submit(function( event ) {
    var editarBoton = document.getElementById("btnEditarComponente").style.display;
    console.log(editarBoton);
    if(editarBoton=="none"){
        agregarComponente();
    }else{
        editarComponente();
    }

    return false;
});


function agregarComponente(){
    var tipoComponente = document.getElementById("tipoComponente");
    var parametros = {
        opcion : "agregarComponente",
        txtCodigo: $('#txtCodigo').val(),
        txtFecha: $('#txtFecha').val(),
        txtEstado: $('#listEstado').val(),
        txtlote: $('#txtLote').val(),
        txtIMEI: $('#imeiInput').val(),
        txtTipoComponente: listTipo[tipoComponente.selectedIndex]
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/componentes.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          componenteAgregado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function componenteAgregado(r){
        limpiar();
        alert(r);
        tabla.ajax.reload();
        
}


function editarComponente(){
    var tipoComponente = document.getElementById("tipoComponente");
    var parametros = {
        opcion : "editarComponente",
        txtCodigo: $('#txtCodigo').val(),
        txtFecha: $('#txtFecha').val(),
        txtEstado: $('#listEstado').val(),
        txtlote: $('#txtLote').val(),
        txtIMEI: $('#imeiInput').val(),
        txtTipoComponente: listTipo[tipoComponente.selectedIndex]
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/componentes.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          componenteEditado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function componenteEditado(r){
        limpiarTodo();
        alert(r);
        tabla.ajax.reload();
        
}

function eliminarComponente(boton){
    var tipoComponente = document.getElementById("tipoComponente");
    var data = tabla.row( (boton.closest('tr').rowIndex) -1 ).data();
    
    var parametros = {
        opcion : "eliminarComponente",
        txtCodigo: data[0]
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/componentes.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          componenteEliminado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function componenteEliminado(r){
        alert(r);
        tabla.ajax.reload();
        
}


function limpiar(){
    document.getElementById('txtCodigo').value = "";
    document.getElementById("imeiInput").required = false;
    document.getElementById("imeiInput").value = ""; 
    document.getElementById("tipoComponente").selectedIndex = 0;
    document.getElementById("rImei").style.display = "none";
}

function limpiarTodo(){
    document.getElementById('txtCodigo').value = "";
    document.getElementById("imeiInput").required = false;
    document.getElementById("imeiInput").value = "";
    document.getElementById("txtFecha").value = "";
    document.getElementById("txtCodigo").value = "";
    document.getElementById("txtLote").value = "";
    document.getElementById("listEstado").selectedIndex = 0;
    document.getElementById("tipoComponente").selectedIndex = 0;
    document.getElementById('txtCodigo').disabled = false;
    document.getElementById("rImei").style.display = "none";
    document.getElementById("btnAgregarComponente").style.display="inline-block";
    document.getElementById("btnEditarComponente").style.display="none";
}