<?php

function print_arr($arr){
	echo '<pre> '.print_r($arr,true). ' </pre>';
}
$data = file_get_contents('https://statsapi.web.nhl.com/api/v1/standings');
$results=json_decode($data, true);
print_arr($results);
//echo count($results);
//echo $results['bank'];
//var_dump($results);
?>