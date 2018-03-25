var listTipo = [];
var tabla;
$( document ).ready(function() {
    cargarTipoComponente();

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
              "defaultContent": '<button class="btn btn-primary" onclick="cargarEditar(this)" >Editar</button><button class="btn btn-danger" onclick="cargarEliminar()" >Eliminar</button>'
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

function cargarTipoComponente(){
	var parametros = {
		opcion : "cargarTipoComponente"
	}

	var post = $.post(
                         "php/componentes.php",    // Script que se ejecuta en el servidor
	                     parametros,    	                       
	                     RespuestaCargarTipoComponente    // Función que se ejecuta cuando el servidor responde
                         );
}

function cargarEditar(boton){
    var data = tabla.row( (boton.closest('tr').rowIndex) -1 ).data();
    document.getElementById('txtCodigo').value = data[0];
    document.getElementById('txtCodigo').disabled = true;
    alert("editar")
}


function cargarEliminar(){
    alert("eliminar")
}

function RespuestaCargarTipoComponente(r){
	var doc = JSON.parse(r);
    var sel = document.getElementById('tipoComponente') // find the drop down
    listTipo = [];
    listTipo.push(-1); // Carga el espacio vacio primero
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        var opt = document.createElement("option"); // Create the new element
        listTipo.push(obj.id);
        opt.value = obj.codigo; // set the value
        opt.text = obj.nombre; // set the text
        sel.appendChild(opt); // add it to the select
    }
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
    agregarComponente();
    return false;
});


function agregarComponente(){
    var tipoComponente = document.getElementById("tipoComponente");
    console.log(listTipo[tipoComponente.selectedIndex]);
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

function limpiar(){
    document.getElementById('txtCodigo').value = "";
    document.getElementById("imeiInput").required = false;
    document.getElementById("imeiInput").text = "";
    document.getElementById("tipoComponente").selectedIndex = 0;
}