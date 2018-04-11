function iniciar(){
    if (document.getElementById('txtUser').value == "") {
        alert('El user es requerido');
    }else{ 
        if (document.getElementById('txtPass').value == "") {
            alert('El password es requerido');
        }else{
            var parametros = {
                opcion : "obtenerPass",
                txtUser: $('#txtUser').val(),
                txtPass: $('#txtPass').val()
            };

            // Realizar la petición
            var post = $.post(
                                  "php/mysql.php",    // Script que se ejecuta en el servidor
                                  parametros,                              
                                  siRespuesta    // Función que se ejecuta cuando el servidor responde
                                  );
        }
    }
}
function siRespuesta(r){
	try{
		var doc = JSON.parse(r);
		var user = document.getElementById('txtUser').value;  	
		if (user == doc[0].user) {
			alert('Bien');
			setTimeout("location.href='index.html'",0);
		}else{
			alert('Password incorrecto');
		}
	}catch(e){
		alert('Password incorrecto');
	}
	            
}