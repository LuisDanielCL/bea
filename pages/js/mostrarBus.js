window.onload = alert(localStorage.getItem("busID"));

$( document ).ready(function() {
    cargarEmpresas();
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var tablaBuses;

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
        arrayEmpresaNombre[i] = obj.Nombre;
    }
    salida += "</select>";
    $("#cbEmpresa").html(salida);
    cargarEmpresa();
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
    document.getElementById('txtTelefono').value = obj.Telefono;
    document.getElementById('txtCorreo').value = obj.Correo;
    document.getElementById('txtDireccion').value = obj.Direccion;
    cargarBuses();
}

function cargarBuses(){
    var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex];
    var parametros = {
        opcion : "mostrarBuses",
        id : id
    };

    // Realizar la petición
    var post = $.post(
                          "php/mysql.php",    // Script que se ejecuta en el servidor
                          parametros,                              
                          siRespuesta3    // Función que se ejecuta cuando el servidor responde
                          ); 
}

function siRespuesta3(r){
    try{
        var doc = JSON.parse(r);             
        tablaBuses = $('#tablaBuses').DataTable();
        tablaBuses.clear();
        for (var i = 0; i < doc.length; i++) {
            var obj = doc[i]; 
            tablaBuses.row.add([
                obj.Placa,
                obj.Nombre,
                '<button class="btn btn-danger" onclick="mostrarBus(this)" >Mostrar</button>'
            ]).draw(false);
        }
    }catch(e){
        alert("La empresa "+arrayEmpresaNombre[document.getElementById('sEmpresa').selectedIndex]+" no tiene buses registrados")
        document.getElementById('sEmpresa').value = 0;
        cargarEmpresa();
    }
}

function mostrarBus(btn){
    setTimeout("location.href='mostrarBus.html'",0);
}
