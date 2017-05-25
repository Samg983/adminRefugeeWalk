<?php

function testGet () {

  //Generate TimeStamp
$TimeStamp = (string) time();

$Login="demo-user";
$Key="demo-key";

//Initialise URl where we want to work
$url = "http://data.iraiser.eu/contact/am.martel@gmail.com";
//$url=str_replace(' ','',$url);
//Generate Token and initialize TypeMethod (string)
$Token=md5(utf8_encode ($Login . $Key . $TimeStamp));
$method = 'GET';



//echo '<br/><h1><b> GET Method : </b> </h1>';
//echo '<br/><b> TimeStamp : </b> '. $TimeStamp . '<br/>';
//echo '<br/><b> Token : </b>'. $Token . '<br/><br/>';



//Define the header contents for method: Content-type, Login, Timestamp and Token
$headers = array('Accept: application/json',  'secureLogin: '.$Login, 'secureTimestamp: '.$TimeStamp, 'secureToken: '.$Token);//"Authorization: $OA_header");
//$data = json_encode(array('title'=>'Test dataset', 'description'=>'Test description', 'defined_type'=>'dataset'));

//Initialise GET Request
$ch = curl_init();

curl_setopt($ch, CURLOPT_HTTPGET, TRUE); //Clean GET request
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method); // Inform the type of method
curl_setopt($ch, CURLOPT_VERBOSE, 1); 
    //curl_setopt($ch, CURLOPT_TIMEOUT, 60); // Time before failure

curl_setopt($ch, CURLOPT_URL, $url); //Inform URL
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); //Inform the table "headers" define above
 curl_setopt($ch, CURLOPT_HEADER, true); //We want that cURL return Response Header if success
//curl_setopt($ch, CURLOPT_POST, 1);
//curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

$response = curl_exec($ch); //execute the GET method, Response is its result

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE); //stock response
$header = substr($response, 0, $header_size); // separate response header
$body = substr($response, $header_size); //separate response body


//echo '<br/><b> response header : </b> '. $header . '<br/>';
//echo '<p style="font-size:12px;"><br/><b> response body: </b> '. $body . '<br/></p>';




return '<br/><h1><b> GET Method : </b> </h1></b><br/><b> response header : </b>'.$header . "<br/> repsonse body :". $body;


}



function testPut () {

  //Generate TimeStamp
$TimeStamp = (string) time();

$Login="demo-user";
$Key="demo-key";

//Initialise URl where we want to work
$url = "http://data.iraiser.eu/contact/am.martel@gmail.com";
//$url=str_replace(' ','',$url);
//Generate Token and initialize TypeMethod (string)
$Token=md5(utf8_encode ($Login . $Key . $TimeStamp));
$method = 'GET';



//echo '<br/><h1><b> GET Method : </b> </h1>';
//echo '<br/><b> TimeStamp : </b> '. $TimeStamp . '<br/>';
//echo '<br/><b> Token : </b>'. $Token . '<br/><br/>';



//Define the header contents for method: Content-type, Login, Timestamp and Token
$headers = array('Accept: application/json',  'secureLogin: '.$Login, 'secureTimestamp: '.$TimeStamp, 'secureToken: '.$Token);//"Authorization: $OA_header");
//$data = json_encode(array('title'=>'Test dataset', 'description'=>'Test description', 'defined_type'=>'dataset'));

//Initialise GET Request
$ch = curl_init();

curl_setopt($ch, CURLOPT_HTTPGET, TRUE); //Clean GET request
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method); // Inform the type of method
curl_setopt($ch, CURLOPT_VERBOSE, 1); 
    //curl_setopt($ch, CURLOPT_TIMEOUT, 60); // Time before failure

curl_setopt($ch, CURLOPT_URL, $url); //Inform URL
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); //Inform the table "headers" define above
 curl_setopt($ch, CURLOPT_HEADER, true); //We want that cURL return Response Header if success
//curl_setopt($ch, CURLOPT_POST, 1);
//curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 

$response = curl_exec($ch); //execute the GET method, Response is its result

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE); //stock response
$header = substr($response, 0, $header_size); // separate response header
$body = substr($response, $header_size); //separate response body


return '<br/><h1><b> PUT Method : </b> </h1><br/><b> response header : </b> '. $header . '<br/>';

//echo '<br/><b> response header : </b> '. $header . '<br/>';
//echo '<p style="font-size:12px;"><br/><b> response body: </b> '. $body . '<br/></p>';


}




echo testGet();
echo "<br/>";

echo testPut();


?>


