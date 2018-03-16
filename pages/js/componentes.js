$( document ).ready(function() {
    cargarTipoComponente();
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

function RespuestaCargarTipoComponente(r){
	var doc = JSON.parse(r);
    console.log(doc);
    var sel = document.getElementById('tipoComponente') // find the drop down
    for (var i = 0; i < doc.length; i++) {
        var obj = doc[i];
        var opt = document.createElement("option"); // Create the new element
        opt.value = obj.codigo; // set the value
        opt.text = obj.nombre; // set the text

        sel.appendChild(opt); // add it to the select
    }
}

function revisarTipo(){

}