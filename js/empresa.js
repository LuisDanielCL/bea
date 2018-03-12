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
	document.getElementById('txtNombre').value = "";
	document.getElementById('txtTelefono').value = "";
	document.getElementById('txtCorreo').value = "";
	document.getElementById('txtDireccion').value = "";
	alert(r);
}

function limpiar(){
	alert("Hola");
	document.getElementById('txtNombre').value = "";
	document.getElementById('txtTelefono').value = "";
	document.getElementById('txtCorreo').value = "";
	document.getElementById('txtDireccion').value = "";
}

function eliminarFamiliaridad(){
	var id = arrayfamiliaridad[document.getElementById('sfamiliaridad').selectedIndex];
	console.log(id);
	var parametros = {
        opcion : "eliminarFamiliaridad",
        id : id
    };

    // Realizar la petición
	var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
	                      parametros,    	                       
	                      siRespuesta3    // Función que se ejecuta cuando el servidor responde
                          );
	post.fail(siError); 
}

function siRespuesta3(r){
	cargarFamiliaridad();
}

function siError(e){
	alert('La familiaridad "'+document.getElementById(sfamiliaridad).value+'" esta siendo utilizada por lo cual no puede ser borrada');
	//alert(e.statusText);
}
