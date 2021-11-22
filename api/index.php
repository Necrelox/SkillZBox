<?php
    require_once("Controller/MainController.php");
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

/*

                       json
[server api php: 80] <------> [server site react: 3000] <-- [client]
                                        |
                                        |
*/
?>
