var placa = localStorage.getItem("busPlaca");
localStorage.setItem("busPlaca","");

$( document ).ready(function() {
    cargarEmpresas();
});

var arrayBus = [];
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
	var salida = '<select class="form-control" tabindex="-1" id="sEmpresa" onclick="cargarBuses();">';                    
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
    cargarBuses();
}

function cargarBuses(){
    var id = arrayEmpresa[document.getElementById('sEmpresa').selectedIndex];
    var parametros = {
        opcion : "filtrarBuses",
        id : id
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta2    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta2(r){
    try{
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
        cargarBus();
    }catch(e){
        alert("La empresa "+ arrayEmpresaNombre[document.getElementById('sEmpresa').selectedIndex] + " no tiene buses registrados");
        document.getElementById('sEmpresa').value = 0;
        cargarBuses();
    }
}

function cargarBus(){
    alert(localStorage.getItem("busPlaca"));
    if (placa.localeCompare("") == 0) {
        placa = arrayBus[document.getElementById('sBus').selectedIndex];
    }else{
        setBus(placa);
    }
    alert(arrayBus[document.getElementById('sBus').selectedIndex]);
    alert(placa);
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
    setEmpresa(obj.ID_Empresa);
}

function setEmpresa(id){
    var index=0;
    for (var i = 0; i <= arrayEmpresa.length; i++) {
        if (id == arrayEmpresa[i]) {
            index = i;
        }
    }
    console.log(index);
    document.getElementById('sEmpresa').value = index;
}

function setBus(placa){
    var index=0;
    for (var i = 0; i <= arrayBus.length; i++) {
        if (placa == arrayBus[i]) {
            index = i;
        }
    }
    console.log(index);
    document.getElementById('sBus').value = index;
}

function removeOptions(){
    var selectbox = document.getElementById('sBus');
    var i;
    for(i = arrayBus.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}
