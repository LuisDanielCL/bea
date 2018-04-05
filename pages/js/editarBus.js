$( document ).ready(function() {
    cargarEmpresas();
    cargarBuses();
    cargarEmpresasFiltrar();
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayBus = [];

function cargarEmpresas(){
	var parametros = {
		opcion : "cargarEmpresas"
	}

	var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
	                     parametros,    	                       
	                     siRespuesta    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta(r){
	var doc = JSON.parse(r);
	var salida = '<select class="form-control" tabindex="-1" id="sEmpresa">';                    
	$("#cbEmpresa").html("");
	for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Nombre+'</option>';
        arrayEmpresa[i] = obj.ID;
        arrayEmpresaNombre[i] = obj.Nombre;
        //console.log(arrayfamiliaridad[i]);
    }
    salida += "</select>";
    $("#cbEmpresa").html(salida);
}

function cargarBuses(){
    var parametros = {
        opcion : "cargarBuses"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta2    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta2(r){
    var doc = JSON.parse(r);
    var salida = '<select class="form-control" tabindex="-1" id="sBus" onclick="cargarBus();">';                   
    $("#cbBus").html("");
    for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Placa+"  "+obj.Nombre+'</option>';
        arrayBus[i] = obj.Placa;
        //console.log(arrayfamiliaridad[i]);
    }
    salida += "</select>";
    $("#cbBus").html(salida);
}

function cargarBus(){
    var placa = arrayBus[document.getElementById('sBus').selectedIndex];
    var parametros = {
        opcion : "cargarBus",
        placa : placa
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuesta3    // Función que se ejecuta cuando el servidor responde
                          ); 
}

function siRespuesta3(r){
    var doc = JSON.parse(r);         
    var obj = doc[0];     
    document.getElementById('txtNombre').value = obj.Nombre;
    document.getElementById('txtEmpresa').value = arrayEmpresaNombre[obj.ID_Empresa-1];
}

function editarBus(){
    if (document.getElementById('txtNombre').value == "") {
        alert('El nombre es requerido');
    }else{  
        var placa = arrayBus[document.getElementById('sBus').selectedIndex];
        var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex];
        var parametros = {
            opcion : "editarBus",
            placa : placa,
            txtNombre: $('#txtNombre').val(),
            id : id
        };

        // Realizar la petición
        var post = $.post(
                              "php/mysql.php",    // Script que se ejecuta en el servidor
                              parametros,                              
                              siRespuesta4    // Función que se ejecuta cuando el servidor responde
                              );
    }
}

function siRespuesta4(r){
    limpiar();
    cargarEmpresasFiltrar();
    filtrarBuses();
    alert(r);
}

function cargarEmpresasFiltrar(){
    var parametros = {
        opcion : "cargarEmpresas"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta5    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta5(r){
    var doc = JSON.parse(r);
    var salida = '<select class="form-control" tabindex="-1" id="sEmpresaFiltrar" onclick="filtrarBuses();">';  
    salida += '<option value="'+i+'">Todos</option>';                  
    $("#cbEmpresaFiltrar").html("");
    for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Nombre+'</option>';
    }
    salida += "</select>";
    $("#cbEmpresaFiltrar").html(salida);
}

function filtrarBuses(){
    var index = document.getElementById('sEmpresaFiltrar').selectedIndex;
    if (index == 0) {
        cargarBuses();
    } else {
        index = index -1;
        var id = arrayEmpresa[index];
        var parametros = {
            opcion : "filtrarBuses",
            id : id
        }

        var post = $.post(
                             "php/mysql.php",    // Script que se ejecuta en el servidor
                             parametros,                               
                             siRespuesta6    // Función que se ejecuta cuando el servidor responde
                             );
        }
}

function siRespuesta6(r){
    arrayBus = [];
    removeOptions();
    //console.log("largo "+doc.length);
    var doc = JSON.parse(r);
    var salida = '<select class="form-control" tabindex="-1" id="sBus" onclick="cargarBus();">';                   
    $("#cbBus").html("");
    for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Placa+"  "+obj.Nombre+'</option>';
        arrayBus[i] = obj.Placa;
        //console.log(arrayfamiliaridad[i]);
    }
    salida += "</select>"; 
    $("#cbBus").html(salida);
    limpiar();
}

function removeOptions(){
    var selectbox = document.getElementById('sBus');
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function limpiar(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtEmpresa').value = "";
}