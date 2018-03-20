<?php
//ADDS NEW ENTRY INTO SPECIFIED ITINERARY

function debug($message){
    if(!empty($_GET['debug'])) {
        print($message);
    }
}
//if(!isset($_GET['itinID'], $_GET[''], $_GET['activity_id'])){
//    array_push($output['errors'], 'ERROR: Insufficient Data');
//};

//INTERNAL prevents direct access to this file from front-end query. Must access via switch statement in api.php
//check if INTERNAL is true.  If it isn't, or it isn't set, exit the code (die())
if(INTERNAL !== true) {
    die('Error: cannot directly access.');
}

//$_GET['itinID'] = 1;
//$_GET['activity_id'] = 6;

$itinerary_id = mysqli_real_escape_string($conn, $_GET['itinID']);
$activity_id = mysqli_real_escape_string($conn, $_GET['activity_id']);
$timestamp = date('Y-m-d H:i:s');

$query = "INSERT INTO `items_in_itinerary` SET `itinerary_id` = '$itinerary_id', `index_in_itinerary` = (SELECT MAX(i.index_in_itinerary)+1 FROM `items_in_itinerary` AS `i` WHERE `itinerary_id` = '$itinerary_id'), `activity_id` = '$activity_id', `timestamp` = '$timestamp'";

$result = mysqli_query($conn, $query);
debug($query);

if(empty($result)) {
    //if yes, report the error in the output
    $output['errors'][] = 'error forming query';
    error_log(date('Y-m-d H:i:s'). ' travel starter mysql error on insert: '.mysqli_error($conn));
    //if no,     check if any results were passed in
}else {

    if(mysqli_affected_rows($conn) !== 0){
        //if yes,
        $output['success']= true;
        //set the success to true
        //if no, report the error in the output
    }else{
        $output['errors'][]= 'No data.';
    }
}
?>