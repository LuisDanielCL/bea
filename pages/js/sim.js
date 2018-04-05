var listTipo = [];
var tabla;
$( document ).ready(function() {

    tabla = $('#tablaComponentes').DataTable( {

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
        "ajax": "php/tablas/tablaComponentes.php",
            initComplete: function () {
                this.api().columns().every( function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo( $(column.footer()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
      
                            column
                                .search( this.value ).draw();
                        } );
      
                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            }
        
    } );
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayBus = [];



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






$( "#componentesForm" ).submit(function( event ) {
    var editarBoton = document.getElementById("btnEditarComponente").style.display;
    console.log(editarBoton);
    if(editarBoton=="none"){
        agregarSim();
    }else{
        editarComponente();
    }

    return false;
});


function agregarSim(){
    var tipoComponente = document.getElementById("tipoComponente");
    var parametros = {
        opcion : "agregarSim",
        txtNumero: $('#txtNumero').val(),
        txtFecha: $('#txtFecha').val(),
        txtEstado: $('#listEstado').val(),
        txtPin: $('#txtPin').val(),
        txtPuk: $('#txtPuk').val(),
        txtCodigo: $('#txtCodigo').val()
    };
    console.log(parametros);
    // Realizar la petición
    var post = $.post(
                          "php/sim.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          simAgregado    // Función que se ejecuta cuando el servidor responde
                          );
    }

function simAgregado(r){
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
    document.getElementById('txtPin').value = "";
    document.getElementById('txtPuk').value = "";
    document.getElementById('txtNumero').value = "";
    document.getElementById('txtCodigo').value = "";
}

function limpiarTodo(){
    document.getElementById('txtPin').value = "";
    document.getElementById('txtPuk').value = "";
    document.getElementById('txtNumero').value = "";
    document.getElementById('txtCodigo').value = "";
    document.getElementById("txtFecha").value = "";
    document.getElementById("btnAgregarComponente").style.display="inline-block";
    document.getElementById("btnEditarComponente").style.display="none";
}