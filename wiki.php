<?php
header('Content-type:application/json;');
$search = transform($_POST['search']);//
//$search = transform("BARRA DO CORDA");//
//$d = $_POST['search'];
//echo "search-> ".$search."<br>";
$key = urlencode($search).'_Maranhao';

//echo "key-> ".$key."<br>";

$url = 'https://pt.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles='.$key;
$data = file_get_contents($url);
$json = json_decode($data);

$query = $json->query->pages;
$obj = get_object_vars($query);

foreach($obj as $key => $value){
    echo $value->extract;
}

function transform($string)
{
	$array = explode(" ", $string);
	$t = count($array);

	if ($t > 0 & $t != 2) {

		$str = "";
		for ($i=0; $i < $t; $i++) {
		
			if(strlen($array[$i])<=3){

				if ($i==0) {
					$str.= ucwords(strtolower($array[0])." ");
					
				}else{
					$str.= " ".strtolower($array[$i])." ";
				}

			}else{
				$str.= ucwords(strtolower($array[$i]));
			}
		}

		return $str;

	}else{
		return ucwords(strtolower($string.""));
	}
}
?>