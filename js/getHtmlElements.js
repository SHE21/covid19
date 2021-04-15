function getBoxInfo(){
	var htmlf = '<div class="box-left">';
	htmlf+='<h4>COVID 19</h4>';
    htmlf+=getMonth();
    htmlf+=getDay();

	htmlf+='<br><input checked onchange="changeRadio(this);"type="radio" name="data_type" value="confirmed" data-toggle="tooltip" data-placement="top" title="Tooltip na parte superior"> Casos* <input onchange="changeRadio(this);" type="radio" name="data_type" value="obitos"> Óbitos';
	htmlf+='<div id="name_mun" class="name_mun"></div></div>';

	htmlf+='<div class="box-right legend">';

	var grades = [0, 10, 20, 50, 100, 200, 500, 1000];

	for (var i = 0; i < grades.length; i++) {
	        htmlf +=
	            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
	            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	}

	htmlf+='</div>';

	return htmlf;
}

function getHtmlPopup(layer, data){
	var layer = layer.feature;

	var htmlPop = "<h4>" +layer.properties.municipio+ "</h4>";
	htmlPop+="<div class='box-data'>"
	//htmlPop+='<button type="button" class="" data-toggle="modal" data-whatever="'+layer.properties.municipio+ '" data-target="#ModalLongoExemplo">Maias</button>';
	htmlPop +='<div class="numbs confirmed">Casos*<h3>'+layer.properties.confirmados+'</h3></div>'+
	'<div class="numbs obts">Óbitos<h3>'+layer.properties.obitos+'</div></div>';
	htmlPop+='<div id="copyData">Dia: '+data+' *Casos confirmados.<br>Fonte: Secretaria de Estado da Saúde do Maranhão</div>';
	htmlPop+="</div>";

	return htmlPop;
}

function getAlert(){
	return '<div class="alert alert-warning alert-dismissible fade show" role="alert">'+
	'<strong>ERROR: </strong>Algo deu errado ao processar esta informação.<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
	'<span aria-hidden="true">&times;</span></button></div>';
}

function getTable(){
	var html ='<div id="tableTop"><div id="tableTitle"><input onclick="closeList(this);" id="queryText" placeholder="Pesquisar município" class="form-control form-control-sm" type="text"/></div><div id="btnClose" onclick="closeList(this);" class="fechar">&times;</div></div>';
	html+='<div id="card" style="margin-top:10px;position:relative;display:none;height:300px;"></div>';
    return html;
}

var superA = [[],[]];
var rect = null;
var marker = null;
var thisData = [];
var polygon1 = null;
var geoToPolygon = [];

function setContentTable(mydata) {
	var table = document.getElementById("card");
	thisData = [];
	var html = "";

	if (mydata!=null) {
		html+='<ul id="listMuni" class="list-group">';

		for (var i=0;i<mydata.features.length;i++){
			var muni = mydata.features[i].properties.municipio;
			var confirmed = mydata.features[i].properties.confirmados;
			var obitos = mydata.features[i].properties.obitos;
			var geocodigo = mydata.features[i].properties.GEOCODIGO;
			var geo = mydata.features[i].geometry.coordinates;
			var date = mydata.data;

			thisData.push([confirmed, obitos, muni, date]);

			geoToPolygon.push(geo);//array com coordenadas para o poligon de destaque

			var	polygon = L.polygon(geo, {color: 'red'});//console.log(geo);
			var bounds = polygon.getBounds();
			superA[i] = [bounds.toBBoxString()];
			//console.log(thisData[i][2]+'-'+thisData[i][0]+'-'+thisData[i][1]);

			html+='<a onclick="getBounds('+i+');" href="#"><li class="list-group-item">'+thisData[i][2]+'</li></a>';
		}

		html+='</ul>';
	
	table.innerHTML = html;

	}else{
		table.innerHTML="Algo deu errado!";
		//console.log(html);
	}
}

function getPopupMarker(i,thisData){
	var htmlPop = "<h4>" +thisData[i][2]+ "</h4>";
	htmlPop+="<div class='box-data'>"
	htmlPop+='<div class="numbs confirmed">Casos*<h3>'+thisData[i][0]+' </h3></div>'+
	'<div class="numbs obts">Óbitos<h3>'+thisData[i][1]+' </div></div>';
	htmlPop+='<div id="copyData">Dia: '+thisData[i][3]+' *Casos confirmados.';
	htmlPop+="</div>";

	return htmlPop;
}

function getDeveloped() {
	return 'Desenvolvido por: <a data-toggle="tooltip" data-placement="bottom" title="Some tooltip text!" target = "_blanck" href="https://www.linkedin.com/in/santiagolenil">Santiago, L.C.</a><br>Dados geográficos: IBGE<br>Dados Covid19: Secretaria de Estado da Saúde do Maranhão<br>Com as tecnologias: HTML, JavaScript, PHP<br> API Leaflet';
}

function getBounds(i) {
	var string = superA[i][0];
	var array = string.split(',');

	corner1 = L.latLng(array[0], array[1]);
	corner2 = L.latLng(array[2], array[3]);

	bounds = L.latLngBounds(corner1, corner2);console.log(bounds);

	if(marker!=null)marker.remove();
	marker = L.marker(bounds.getCenter()).addTo(map);
	marker.bindPopup(getPopupMarker(i,thisData)).openPopup();

	map.fitBounds(bounds);
	//if (rect!=null) {rect.remove();}
	//rect = L.rectangle(bounds, {color: "red", weight: 1});//.addTo(map);
	//rect.bringToBack();
}