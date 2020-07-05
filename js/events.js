function changeRadio(data){
	selected = data.value;
	console.log(selected);
	geojson.resetStyle();
}

function selectedMonth() {
	var enb04= [2,3];
	var option = document.getElementById("days");
	var select = document.getElementById("month");

	switch(select.value){
		case "04":
			enableOpt(option,enb04, true);
		break;

		default:
		enableOpt(option,enb04, false);
	}
	monthSelected = select.value;
}

function enableOpt(option, disable, status) {
	for (var i = 0; i<disable.length; i++) {
		option.options[disable[i]].disabled  = status;
	}
}

function selectedDay() {
	day = document.getElementById("days").value;
	var file;

	if (monthSelected!=null) {
		file = "data/"+monthSelected+"/"+day+".geojson"
		loadJsonFile(file);

	}else{
		alert("A variavel mont está nula. Diretório incorreto!");
	}
	//console.log(file);
}

function getMonth(){
    	var options = "<select id='month' onchange='selectedMonth();' class='select'>";
	    
		for(var i = 0; i < month.length;i++){
	    	options+="<option value='"+month[i]+"'>" + month[i];
		}
        
        return options+="</select>";
	}

function getDay(){
    var options = "<select id='days' onchange='selectedDay();' class='select'>";
	    
	for(var i = 0; i < days.length;i++){
	    options+="<option value='"+days[i]+"'>" + days[i];
	}
        
    return options+="</select>";
}

// Include script file
function addScript(filename){

	 var head = document.getElementsByTagName('body')[0];
	 var script = document.createElement('script');
	 script.id = "dataJ";

	try{
		script.src = filename;
		script.type = 'text/javascript';
		head.append(script);

	}catch(err){
		alert("Erro ao procurar dados!");
	}
}