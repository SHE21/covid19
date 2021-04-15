function changeRadio(data){
	selected = data.value;
	console.log(selected);
	geojson.resetStyle();
}

function selectedMonth() {
	var enb04 = [2,3,30];
	var enb06 = [30];
	var option = document.getElementById("days");
	var select = document.getElementById("month");
	enableOpt(option,null, false);

	switch(select.value){
		case "04":
			enableOpt(option,enb04, true);
		break;

		case "06":
			enableOpt(option,enb06, true);
		break;

		default:
		enableOpt(option,null, false);
	}

	monthSelected = select.value;
}

function enableOpt(option, disable, status) {
	if (disable!=null) {
		for (var i = 0; i<disable.length; i++) {
			option.options[disable[i]].disabled  = status;
		}
	}else{
		for (var i = 0; i<31; i++) {
			option.options[i].disabled  = false;
		}
	}
}

function selectedDay(element) {
	day = document.getElementById(element.id).value;
	var file;

	if (monthSelected!=null) {
		//index.php?day=01&month=05
		file = "day="+day+"&month="+monthSelected;
		var get = url+file;
		loadJsonFile(get);console.log(get);

	}else{
		alert("A variavel mont está nula. Diretório incorreto!");
	}
	//console.log(file);
}

function getMonth(){
    	var options = "<select class='select' id='month' onchange='selectedMonth();'>";
	    
		for(var i = 0; i < month.length;i++){
	    	options+="<option value='"+month[i]+"'>" + month[i];
		}
        
        return options+="</select>";
	}

function getDay(){
    var options = '<select id="days" onchange="selectedDay(this);" class="select">';
	    
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

function closeList(input) {
	var c = 0;
	if (input.id=="queryText") c = 1;

	var list = document.getElementById('card').style.display;

	if (list=='block'&& c==0) {
		document.getElementById('btnClose').style.backgroundImage="url('img/icons/up-arrow.svg')";
		document.getElementById('card').style.display = 'none';

	}else{
		document.getElementById('btnClose').style.backgroundImage="url('img/icons/arrow-down.svg')";
		document.getElementById('card').style.display = 'block';
	}

	console.log(list);
}