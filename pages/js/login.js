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
	var doc = JSON.parse(r);
	var pass = document.getElementById('txtPass').value;   
	if (pass == doc[0].password) {
		alert('Bien');
		setTimeout("location.href='index.html'", 10);
	}else{
		alert('Password incorrecto');
	}            
}