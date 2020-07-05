function getBoxInfo(){
	var htmlf = '<div class="box-left">';
	htmlf+='<h4>COVID 19</h4>';
    htmlf+=getMonth();
    htmlf+=getDay();

	htmlf+='<br><input checked onchange="changeRadio(this);"type="radio" name="data_type" value="confirmed"> Casos* <input onchange="changeRadio(this);" type="radio" name="data_type" value="obitos"> Óbitos';
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

function getHtmlPopup(layer){
	var layer = layer.feature;

	var htmlPop = "<h4>" +layer.properties.municipio+ "</h4>";
	htmlPop+="<div class='box-data'>"
	htmlPop +='<div class="numbs confirmed">Casos*<h3>'+layer.properties.confirmados+'</h3></div>'+
	'<div class="numbs obts">Óbitos<h3>'+layer.properties.obitos+'</div></div>';
	htmlPop+="</div>";

	return htmlPop;
}