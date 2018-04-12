function agregarTecnico(){
    if (document.getElementById('txtNombre').value == "") {
        alert('El nombre es requerido');
    }else{ 
        if (document.getElementById('txtApellidoUno').value == "") {
            alert('El primer apellido es requerido');
        }else{
            if (document.getElementById('txtApellidoDos').value == "") {
                alert('El segundo apellido es requerido');
            }else{
                if (document.getElementById('txtUser').value == "") {
                    alert('El usuario es requerido');
                }else{
                    if (document.getElementById('txtPass').value == "") {
                        alert('El password es requerido');
                    }else{
                        var parametros = {
                            opcion : "agregarUsuario",
                            txtNombre: $('#txtNombre').val(),
                            txtApellidoUno: $('#txtApellidoUno').val(),
                            txtApellidoDos: $('#txtApellidoDos').val(),
                            txtUser: $('#txtUser').val(),
                            txtPass: $('#txtPass').val(),
                            txtNombre: $('#txtNombre').val(),
                            txtTelefono: $('#txtTelefono').val(),
                            txtCorreo: $('#txtCorreo').val()
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
        }
    }
}

function siRespuesta(r){
    limpiar();
    alert(r);
}

function limpiar(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtApellidoUno').value = "";
    document.getElementById('txtApellidoDos').value = "";
    document.getElementById('txtUser').value = "";
    document.getElementById('txtPass').value = "";
    document.getElementById('txtTelefono').value = "";
    document.getElementById('txtCorreo').value = "";
}