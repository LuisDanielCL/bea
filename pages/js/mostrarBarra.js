var barraID = localStorage.getItem("barraCodigo");
var codigoKit = localStorage.getItem("kitCodigo");
var salidaTX1 = '<div class="panel-heading">TX1</div><div class="panel-body"><div class="row"><div class="col-lg-offset-2 col-lg-8"><form id="componentesForm"><div class="form-group row "><label for="inputPassword" class="col-sm-2 col-form-label">Serie</label><div class="col-sm-10"><input class="form-control" id="serieTX1" disabled></div></div><div class="form-group row"><label class="col-sm-2 col-form-label">8KTX1</label><div class="col-sm-10"><input class="form-control" id="8kTX1" disabled></div></div><div class="col-lg-offset-2"><div class="form-group row"><label  class="col-sm-2 col-form-label">Clave corta</label><div class="col-sm-10"><input class="form-control" id="claveCortaTX1" disabled></div></div><div class="form-group row"><label  class="col-sm-2 col-form-label">Clave larga</label><div class="col-sm-10"><input class="form-control" id="claveLargaTX1" disabled></div></div></div><div class="form-group row"><label  class="col-sm-2 col-form-label">MODEM</label><div class="col-sm-10"><input class="form-control" id="modemTX1" disabled></div>  </div><div class="col-lg-offset-2"><div class="form-group row"><label  class="col-sm-2 col-form-label">IMEI</label><div class="col-sm-10"><input class="form-control" id="imeiModem" disabled></div>  </div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">PRO</label><div class="col-sm-10"><input class="form-control" id="pro" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">PRO2</label><div class="col-sm-10"><input class="form-control" id="pro2" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">MAX</label><div class="col-sm-10"><input class="form-control" id="inputMAX" disabled></div></div><div class="form-group row"><label for="inputPassword" class="col-sm-2 col-form-label">MAX2</label><div class="col-sm-10"><input class="form-control" id="inputMAX2" disabled></div></div><hr style="width: 100%; color: black; height: 1px; background-color:black;" /></form></div><!-- /.col-lg-6 (nested) --></div><!-- /.row (nested) --></div>'

$( document ).ready(function() {
    cargarBarra();
});

function cargarBarra(){
	var parametros = {
		opcion : "cargarBarra",
		barra : barraID
	}

	var post = $.post(
                         "php/mysql.php",    // Script que se ejecuta en el servidor
	                     parametros,    	                       
	                     siRespuesta    // Función que se ejecuta cuando el servidor responde
                         );
}

function siRespuesta(r){
	var doc = JSON.parse(r);
	var tipoID = doc[0].tipoBarra;
	document.getElementById('txtKit').value = codigoKit;
	document.getElementById('txtBarra').value = barraID;
	switch(tipoID){
		case '1':
			$("#panelBarra").html(salidaTX1);
			document.getElementById('serieTX1').value = barraID;
			document.getElementById('txtKit').value = codigoKit;
			document.getElementById('8kTX1').value = doc[0].componenteCod;


			document.getElementById('modemTX1').value = doc[1].componenteCod;

			document.getElementById('pro').value = doc[2].componenteCod;
			document.getElementById('pro2').value = doc[3].componenteCod;	
			document.getElementById('inputMAX').value = doc[4].componenteCod;	
			document.getElementById('inputMAX2').value = doc[5].componenteCod;					
	}
}