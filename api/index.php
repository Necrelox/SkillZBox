<?php
    require_once($_SERVER["DOCUMENT_ROOT"] . "Controller/MainController.php");
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    (new MainController())->run();




/*
 * token_react_server permet de verifier que ce soit que le server react qui a envoyé la requete
 * Ce token changera grace à un worker qui va se charger de générer le token toutes les heures
 *
 * Roadmap:
 * /api/token_react_server/user/
 * + filtre : /uuid=../ , /username=../ ,  /password=../, /email=../ , /token=../ , /status=../, /role=../
 *
 * /api/token_react_server/category/
 * + filtre : /uuid=../ , /name=../
 *
 * /api/token_react_server/room/
 * + filtre : /uuid=../ , /owner=../, /category=../, /room_has_tags_uuid=../
 *
 * /api/token_react_server/room_has_tag/
 * + filtre : /tag_uuid=../ , /name=../ , /room_uuid=../
 *
 * /api/token_react_server/tag/
 * + filtre : /uuid=../ , /name=../ , category_uuid=../
 *
 *
 * POST MAP :
 *
 * /api/token_react_server/user/
 * POST => ["Create" => ""
 *          "username" => "",
 *          "password" => "",
 *          "email" => "",
 *          "role" => "",]
 *
 * POST => ["Read" => ""]
 *   + filtre : /uuid=../ , /username=../ ,  /password=../, /email=../ , /token=../ , /status=../, /role=../
 *
 * POST => ["Update" => ""
 *          "uuid" => "",
 *          "username" => "",
 *          "password" => "",
 *          "email" => "",
 *          "role" => "",]
 *
 * POST => ["Delete" => ""
 *          "uuid" => "",
 * ]
 */


//<!--<form action="/api/600623AFEDFD2B037D8C375B3CE8C323/user" method="post">-->
//<!--    <input type="hidden" name="Create" value=''/>-->
//<!--    <input type="text" name="username" placeholder="name">-->
//<!--    <input type="text" name="email" placeholder="email">-->
//<!--    <input type="text" name="password" placeholder="password">-->
//<!--    <input type="number" name="role" placeholder="role">-->
//<!--    <input type="submit" value="submit">-->
//<!--</form>-->


/*

                       json
[server api php: 80] <------> [server site react: 3000] <-- [client]
                                        |
                                        |
*/
?>
