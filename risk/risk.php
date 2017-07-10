<?php

require_once('php-jwt/src/JWT.php');
require_once ('Common.php');
use \Firebase\JWT\JWT;


$name=$_REQUEST['name'];
$iden=$_REQUEST['iden'];
$matchBaseline=$_REQUEST['match_baseline'];

$name_api='/namelist';

$common=new Common();
$header=$common->get_header();

$param=array(
    'name'=>$name,
    'iden'=>$iden,
    'match_baseline'=>$matchBaseline
);	
$namelist=$common->curl_request($name_api,$header,$param,'GET');

?>
<link rel="stylesheet" href="css/json-viewer.css">
<div id="namelist" style="background-color: #FFFAE9;width:600px;margin:0 auto;"></div>
<script src="js/jquery.min.js"></script>
<script src="js/json-viewer.js"></script>

<script language="JavaScript">
	$('#namelist').jsonview(<?php echo $namelist;?>);
</script>
