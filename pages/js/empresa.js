function agregarEmpresa(){
	if (document.getElementById('txtNombre').value == "") {
		alert('El nombre es requerido');
	}else{	
		var parametros = {
	        opcion : "agregarEmpresa",
	        txtNombre: $('#txtNombre').val(),
	        txtTelefono: $('#txtTelefono').val(),
	        txtCorreo: $('#txtCorreo').val(),
	        txtDireccion: $('#txtDireccion').val()
	    };

	    // Realizar la petición
		var post = $.post(
	                          "php/mysql.php",    // Script que se ejecuta en el servidor
		                      parametros,    	                       
		                      siRespuesta    // Función que se ejecuta cuando el servidor responde
	                          );
	}
}

function siRespuesta(r){
	limpiar();
	alert(r);
}

function limpiar(){
	document.getElementById('txtNombre').value = "";
	document.getElementById('txtTelefono').value = "";
	document.getElementById('txtCorreo').value = "";
	document.getElementById('txtDireccion').value = "";
}
