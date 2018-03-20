<?php
function debug($message){
    if(!empty($_GET['debug'])) {
        print($message);
    }
}

//INTERNAL prevents direct access to this file from front-end query. Must access via switch statement in api.php
//check if INTERNAL is true.  If it isn't, or it isn't set, exit the code (die())
if(INTERNAL !== true){
    die('Error: cannot directly access.');
}

mysqli_set_charset($conn,'utf8');

//checks database for all existing items and sends that data
$query = "SELECT `id`, `name`, `date_queried`, `place_id`, `city_id`, `longitude`, `latitude`, `images`, `snippet`, `hashtags`, `tag_label` FROM `activities`";

//make a query to read all items
$result = mysqli_query($conn, $query);

//check if $result is empty
if(empty($result)) {
    //if yes, report the error in the output
    $output['errors'][] = 'result variable is empty';
    //if no,     check if any results were passed in
}else {
    if(mysqli_affected_rows($conn) !== 0){
        //if yes,
        $output['success']= true;
        //set the success to true
        //do a while loop to fetch all the information, put it into an array
        while($row = mysqli_fetch_assoc($result)){
            $output['data'][] = $row;
        }
        //if no, report the error in the output
    }else{
        $output['errors'][]= 'No data.';
    }
}
?>