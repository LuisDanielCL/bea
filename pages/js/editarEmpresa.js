$( document ).ready(function() {
    cargarEmpresas();
});

var arrayEmpresa = [];

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
	var salida = '<select class="form-control" tabindex="-1" id="sEmpresa" onclick="cargarEmpresa();">';                   
	$("#cbEmpresa").html("");
	for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Nombre+'</option>';
        arrayEmpresa[i] = obj.ID;
        //console.log(arrayfamiliaridad[i]);
    }
    salida += "</select>";
    $("#cbEmpresa").html(salida);
}

function cargarEmpresa(){
    var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex];
    var parametros = {
        opcion : "cargarEmpresa",
        id : id
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuesta2    // Función que se ejecuta cuando el servidor responde
                          ); 
}

function siRespuesta2(r){
    var doc = JSON.parse(r);         
    var obj = doc[0];     
    document.getElementById('txtNombre').value = obj.Nombre;
    document.getElementById('txtTelefono').value = obj.Telefono;
    document.getElementById('txtCorreo').value = obj.Correo;
    document.getElementById('txtDireccion').value = obj.Direccion;
}

function editarEmpresa(){
    if (document.getElementById('txtNombre').value == "") {
        alert('El nombre es requerido');
    }else{  
        var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex];
        var parametros = {
            opcion : "editarEmpresa",
            id : id,
            txtNombre: $('#txtNombre').val(),
            txtTelefono: $('#txtTelefono').val(),
            txtCorreo: $('#txtCorreo').val(),
            txtDireccion: $('#txtDireccion').val()
        };

        // Realizar la petición
        var post = $.post(
                              "php/mysql.php",    // Script que se ejecuta en el servidor
                              parametros,                              
                              siRespuesta3    // Función que se ejecuta cuando el servidor responde
                              );
    }
}

function siRespuesta3(r){
    limpiar();
    alert(r);
    cargarEmpresas();
}

function limpiar(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtTelefono').value = "";
    document.getElementById('txtCorreo').value = "";
    document.getElementById('txtDireccion').value = "";
}