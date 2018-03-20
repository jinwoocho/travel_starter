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
//$post_params_JSON = file_get_contents('php://input');
$test_params = [
    'userId'=>4,
    'filters'=>[
 //       'page'=>4,
 //       'search_userId'=>4,
 //       'city'=>'Madrid',
        'status'=>'draft'
    ]
];
$post_params_JSON = json_encode($test_params);
$post_params = json_decode($post_params_JSON,true);

print("test:".print_r($post_params,true)."*");

/*
 *
 * {
 *      userId: 42,  // (int) (required) id of the active user
 *      itinId: 1111,  // (int) (optional) id of the itinerary to get info for, if any
 *      filters : {   // (object) (optional) map of the values to filter itineraries by
 *          page: 4,  // (int) (optional) the page of values to return.  default is currently 10 items per page.  so page 4 would return items 40-49
 *          search_userId: 42, // (int) (optional) the user ID to search by.  If it is the same as the user id, we will include drafts if no status is specified
 *          city: 'Madrid,  // (str) (optional) the city for which to fetch itineraries
 *          status: 'drafts'  // (str) (optional) the type of itineryary ('draft' or 'published') to filter for.  If not searching own itineraries, 'draft' will be invalid
 *      }
 * }
 *
 */

$ITEMS_PER_PAGE = 10;
$additionalWHEREClause = [];
$limit_clause = 'LIMIT 10';
if(empty($post_params['filters']['search_userId'])){
    $post_params['filters']['status']='published';
}
print_r($post_params);
if(!empty($post_params['filters'])){
    foreach($post_params['filters'] AS $filterKey => $filterValue){
        switch($filterKey){
            case 'page':
                $offset = $ITEMS_PER_PAGE * intval($filterValue);
                $limit_clause = "LIMIT $offset, $ITEMS_PER_PAGE";
                break;
            case 'search_userId':
                $additionalWHEREClause['creator_id'] = "creator_id = '{$filterValue}'";
                if($post_params['userId']!==$filterValue){
                    $additionalWHEREClause['status'] = "i.progress=published";
                }
                break;
            case 'city':
                $additionalWHEREClause['city'] = "city = '$filterValue'";
                break;
            case 'status':
                print("filter value = {$filterValue}");
                if($filterValue === 'draft'){
                    print("testing {$post_params['filters']['search_userId']} VERSUS {$post_params['userId']}");
                    if(!empty($post_params['filters']['search_userId']) && $post_params['filters']['search_userId']!==$post_params['userId']){
                        $filterValue = 'published';
                    }
                }
                $additionalWHEREClause['status'] = "i.progress = '$filterValue'";
                break;

            default:
                error_log(date('Y-m-d H:i:s'). " illegal filter value '$filterKey'=>'$filterValue' FROM {$_SERVER['REMOTE_ADDR']}");
                break;
        }
    }

}

if(!empty($additionalWHEREClause)){
    $additionalWHEREClause = 'AND ' . implode(" AND ",$additionalWHEREClause);
} else {
    $additionalWHEREClause = '';
}
//checks database for all existing itineraries and sends that data

$query = "SELECT i.id AS itinerary_id, 
          i.itinerary_name AS itinerary_name,
          i.creator_id, i.progress,
          a.city_id AS city_id,
          a.images AS image_list
          FROM itineraries AS i 
          JOIN items_in_itinerary AS IinI ON i.id = IinI.itinerary_id {$additionalWHEREClause}
          JOIN activities AS a ON a.id = IinI.activity_id 
          {$limit_clause}";

print("<br>query = $query");
exit();

//$query = "SELECT `id`, `itinerary_name`, `creator_id`, `timestamp` FROM `itineraries` LIMIT 10";

/* "SELECT i.id AS itinerary_id, i.itinerary_name AS itinerary_name, i.creator_id,
	IinI.index_in_itinerary,
    a.name AS activity_name,
    a.city_id AS city_id,
    a.latitude AS latitude,
    a.longitude AS longitude,
    a.tag_label AS category,
    a.images AS image_list
    FROM itineraries AS i
    JOIN items_in_itinerary AS IinI
	ON i.id = IinI.itinerary_id
    JOIN activities AS a
	ON a.id = IinI.activity_id
    WHERE i.id = 1";
*/
//make a query to read all itineraries
$result = mysqli_query($conn, $query);

//check if $result is empty
if(empty($result)) {
    //if yes, report the error in the output
    $output['errors'][] = 'result variable is empty';
    //if no,     check if any results were passed in
}else {
    if(mysqli_num_rows($result) !== 0){
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