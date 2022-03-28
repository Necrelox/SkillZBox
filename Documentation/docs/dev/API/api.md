# API

### Présentation de l'API

!!! note "Definition de l'API"

    L'**api** est une interface de communication entre le serveur et le client.
    
    Elle permet de faire le lien entre la base de données et le client.

    Selon la route, l'api va effectuer un traitement sur les données récupéré.

### Routes

???+ info "Account"

    ```
    - /PasDeNom/signup (Création d'un compte)
        - POST
            - Paramètres:
                - username: string
                - password: string
                - email: string

            - Retour:
                - status: string
                - message: string

    - /PasDeNom/verify (Vérification d'un compte et connection)
        - POST
            - Paramètres:
                - token: string
            - Retour:
                - status: string
                - message: string
                - token: string

    - /PasDeNom/login (Connection)
        - POST
            - Paramètres:
                - username: string
                - password: string

            - Retour:
                - status: string
                - message: string
                - token: string
    ```

???+ info "User"
    
    ```
    - /PasDeNom/me (Informations de l'utilisateur)
        - GET
            - Paramètres Header:
                - token: string
            - Retour:
                - status: string
                - message: string
                - user: object
        - PUT
            - Paramètres Header:
                - token: string
            - Paramètres:
                - username: string
                - password: string
                - email: string
            - Retour:
                - status: string
                - message: string
                - user: object
        

    - /PasDeNom/me/logo (Logo de l'utilisateur)
        - GET
            - Paramètres Header:
                - token: string
            - Paramètre:
                - uuid_user: string
            - Retour:
                - status: string
                - message: string
                - user_logo: array[object]
        - POST
            - Paramètres Header:
                - token: string
            - Paramètres:
                - uuid_user: string
                - logo: string
            - Retour:
                - status: string
                - message: string
        - PUT
            - Paramètres Header:
                - token: string
            - Paramètres:
                - uuid_user: string
                - ?user_logo_uuid_delete: boolean
            - Retour:
                - status: string
                - message: string

    - /PasDeNom/userFriends (Liste des amis)
        - GET
            - Paramètres Header:
                - token: string
            - Paramètre:
                - uuid_user: string
                - ?user_friend_uuid: string
            - Retour:
                - status: string
                - message: string
                - list user: array[object]
        - POST
            - Paramètres Header:
                - token: string
            - Paramètre:
                - uuid_user: string
                - uuid_user_friend: string
            - Retour:
                - status: string
                - message: string
        - DELETE
            - Paramètres Header:
                - token: string
            - Paramètre:
                - uuid_user: string
                - uuid_user_friend: string
            - Retour:
                - status: string
                - message: string
    ```

???+ info "Categories and Tag"

    ```
    - /PasDeNom/categorie (Categories)
       - GET
            - Paramètre Header:
                - token: string
            - Retour:
                - status: string
                - message: string
                - categories: array[object]

    - /PasDeNom/tag (Tags)
        - GET
            - Paramètre Header:
                - token: string
            - Retour:
                - status: string
                - message: string
                - tags: array[object]
    ```

???+ info "Room"

    ```
    - /PasDeNom/room (Room)
        - POST (Création)
            - Paramètre Header :
               - token: string
            - Paramètre :
                - uuid_user: string
                - categorie_uuid: string
                - tag_uuid: string
            - Retour :
                - status: string
                - message: string
       - GET
           - Paramètre Header :
                - token: string
           - Paramètre : 
                - ?uuid_user: string
                - ?categorie_uuid: string
                - ?tag_uuid: string
           - Retour :
                - status: string
                - message: string
                - room: object
       - PUT (à faire)
           - Paramètre Header :
                - token: string
           - Paramètre :
                - room_uuid: string
           - Retour :
                - status: string
                - message: string
    
    - /PasDeNom/room/users (Room User)
        - GET
            - Paramètre Header :
                - token: string
            - Paramètre :
                - room_uuid: string
                - ?uuid_user: string
            - Retour :
                - status: string
                - message: string
                - users: array[object]
       - POST
            - Paramètre Header :
                - token: string
            - Paramètre :
                - room_uuid: string
                - uuid_user: string
                - is_room_master: boolean
            - Retour :
                - status: string
                - message: string

    - /PasDeNom/room/action (TODO) // TODO
    
    - /PasDeNom/room/files (Liste des fichiers d'une room)
        - GET
            - Paramètre Header :
                - token: string
            - Paramètre :
                - room_uuid: string
            - Retour :
                - status: string
                - message: string
                - files: array[object]

    - /PasDeNom/room/message (Tchat de la room)
        - POST
            - Paramètre Header :
                - token : string
            - Paramètre :
                - room_uuid : string 
                - user_uuid : string
                - has_files : string
                - file: string
                - message : string
            - Retour :
                - status : string
                - message : string
        - GET 
            - Paramètre Header :
                - token : string
            - Paramètre :
                - room_uuid
            - Retour:
                - status : string
                - message : string
                - tchat : array[object]
        - POST
            - Paramètre Header :
                - token : string
            - Paramètre :
                - room_uuid : string
                - user_uuid : string
                - message_uuid : string

    - /PasDeNom/room/categories (Liste des categories d'une room)
        - GET
            - Paramètre Header :
                - token : string
            - Paramètre :
                - room_uuid : string
            - Retour :
                - status : string
                - message : string
                - categories : array[object]

    - /PasDeNom/room/tags (Liste des tags d'une room)
        - GET
            - Paramètre Header :
                - token : string
            - Paramètre :
                - room_uuid : string
           - Retour :
                - status : string
                - message : string
                - tags : array[object]

    - /PasDeNom/room/report (Signaler un utilisateur
        - POST
            - Paramètre Header :
                - token : string
            - Paramètre :
                - user_send_report_uuid : string
                - user_reported_uuid : string
                - reason : string
            - Retour :
                - status : string
                - message : string
    ``` 

