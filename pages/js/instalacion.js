$( document ).ready(function() {
    cargarEmpresas();
    cargarKits();
    cargarUsuarios();
    cargarSim();
});

var arrayEmpresa = [];
var arrayEmpresaNombre = [];
var arrayBus = [];
var arrayUser = [];
var arrayKit = [];
var arraySim = [];
var tablaKits;
var tablaSim;

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
    var salida = '<select class="form-control" tabindex="-1" id="sEmpresa" onclick="filtrarBuses();">';  
    salida += '<option value="-1">Todos</option>';                  
    $("#cbEmpresaFiltrar").html("");
    for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.Nombre+'</option>';
        arrayEmpresa[i] = obj.ID;
        arrayEmpresaNombre[i] = obj.Nombre;
    }
    salida += "</select>";
    $("#cbEmpresa").html(salida);
    filtrarBuses();
}

function cargarBuses(){
    var parametros = {
        opcion : "obtenerBusesNoKit"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta2    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta2(r){
    var doc = JSON.parse(r);
    var salida = '<select class="form-control" tabindex="-1" id="sBus">';                   
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

function filtrarBuses(){
    var index = document.getElementById('sEmpresa').selectedIndex;
    if (index == 0) {
        cargarBuses();
    } else {
        index = index -1;
        var id = arrayEmpresa[index];
        var parametros = {
            opcion : "filtrarBusesNoKit",
            id : id
        }

        var post = $.post(
                             "php/mysql.php",    // Script que se ejecuta en el servidor
                             parametros,                               
                             siRespuesta3    // Función que se ejecuta cuando el servidor responde
                             );
        }
}

function siRespuesta3(r){
    try{
        arrayBus = [];
        removeOptions('sBus');
        //console.log("largo "+doc.length);
        var doc = JSON.parse(r);
        var salida = '<select class="form-control" tabindex="-1" id="sBus">';                   
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
    }catch(e){
        alert("La empresa "+ arrayEmpresaNombre[document.getElementById('sEmpresa').selectedIndex-1] + " no tiene buses disponibles");
        document.getElementById('sEmpresa').value = -1;
        filtrarBuses();
    }
}

function removeOptions(box){
    var selectbox = document.getElementById(box);
    var i;
    for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }
}

function cargarKits(){
    var parametros = {
        opcion : "cargarKitsDisponibles"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta4    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta4(r){
    try{
        var doc = JSON.parse(r);             
        tablaKits = $('#tablaKits').DataTable();
        tablaKits.clear();
        for (var i = 0; i < doc.length; i++) {
            var obj = doc[i]; 
            arrayKit[i] = obj.codigoKit;
            tablaKits.row.add([
                obj.codigoKit,
                obj.TX1,
                obj.RX1,
                obj.RX3,
                obj.TX3,
                '<button class="btn btn-danger" onclick="seleccionarKit('+obj.codigoKit+')" >Usar</button>'
            ]).draw(false);
        }
    }catch(e){
        alert("No hay kits disponibles");;
    }
}

function seleccionarKit(codigoKit){
    document.getElementById('txtKit').value = codigoKit;
}

function cargarUsuarios(){
    var parametros = {
        opcion : "cargarUsuarios"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta5    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta5(r){
    var doc = JSON.parse(r);
    var salida = '<select class="form-control" tabindex="-1" id="sUser">';                    
    $("#cbTecnico").html("");
    for (var i = 0; i < doc.length; i++) {
        var j = i;
        var obj = doc[i];
        salida += '<option value="'+i+'">'+obj.nombre+" "+obj.apellido1+" "+obj.apellido2+'</option>';
        arrayUser[i] = obj.user;
    }
    salida += "</select>";
    $("#cbTecnico").html(salida);
}

function programarInstalacion(){
    var placa = arrayBus[document.getElementById('sBus').selectedIndex];
    var tecnico = arrayUser[document.getElementById('sUser').selectedIndex];
    var parametros = {
        opcion : "programarInstalacion",
        txtFecha: $('#txtFecha').val(),
        placa: placa,
        kit: $('#txtKit').val(),
        tecnico: tecnico
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta6    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta6(r){
    alert(r);
    asignarKit();
}

function asignarKit(){
    var placa = arrayBus[document.getElementById('sBus').selectedIndex];
    var parametros = {
        opcion : "asignarKit",
        placa: placa,
        kit: $('#txtKit').val()
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta7    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta7(){
    asignarSim();
}

function cargarSim(){
    var parametros = {
        opcion : "cargarSimDisponibles"
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta8    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta8(r){
    try{
        var doc = JSON.parse(r);             
        tablaSim = $('#tablaSim').DataTable();
        tablaSim.clear();
        for (var i = 0; i < doc.length; i++) {
            var obj = doc[i]; 
            arraySim[i] = obj.numeroTelefono;
            tablaSim.row.add([
                obj.numeroTelefono,
                obj.pin,
                obj.puk,
                obj.codigo,
                obj.fechaRegistro,
                obj.Estado,
                '<button class="btn btn-danger" onclick="seleccionarSim('+obj.numeroTelefono+')" >Usar</button>'
            ]).draw(false);
        }
    }catch(e){
        alert("No hay SIM disponibles");;
    }
}

function seleccionarSim(sim){
    document.getElementById('txtSim').value = sim;
}

function asignarSim(){
    var placa = arrayBus[document.getElementById('sBus').selectedIndex];
    var parametros = {
        opcion : "asignarSim",
        placa: placa,
        sim: $('#txtSim').val()
    }

    var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
                         parametros,                               
                         siRespuesta9    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta9(){
    limpiar();
}

function limpiar(){
    cargarEmpresas();
    cargarKits();
    cargarSim();
    document.getElementById('txtFecha').value = "";
}