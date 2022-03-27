# API

### Présentation de l'API

!!! note "Definition de l'API"

    L'**api** est une interface de communication entre le serveur et le client.
    
    Elle permet de faire le lien entre la base de données et le client.

    Selon la route, l'api va effectuer un traitement sur les données récupéré.

### Routes
    

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

    - /PasDeNom/me (Récupération des informations de l'utilisateur)
        - GET
            - Paramètres Header:
                - token: string

            - Retour:
                - status: string
                - message: string
                - user: object

    - /PasDeNom/me/logo (Récupération des logo de l'utilisateur)
      - GET
        - Paramètres Header:
          - uuid_user: string
        - Paramètre:
          - token: string
        - Retour:
          - status: string
          - message: string
          - user_logo: array[object]

    - /PasDeNom/userFriends (Liste des amis)
        - GET
            - Paramètres Header:
                - token: string
            - Paramètre:
                - uuid_user: string 
            - Retour:
                - status: string
                - message: string
                - list user: array[object]

    - /PasDeNom/categorie (Liste des categories)
        - GET
            - Paramètre Header:
                - token: string
        - Retour:
            - status: string
            - message: string
            - categories: array[object]

    - /PasDeNom/tag (Liste des tags)
        - GET
            - Paramètre Header:
                - token: string
            - Retour:
                - status: string
                - message: string
                - tags: array[object]

    - /PasDeNom/room (Crée / met à jour / récupère la room auquel on veut accéder)
        - POST
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
    
    - /PasDeNom/room/tchat
        - POST
            - Paramètre Header :
                - token : string
            - Paramètre :
                - room_uuid : string 
                - user_uuid : string
                - ?has_files : string
                - message : string
                - ?file_uuid : string
                - ?size_mo : number
                - ?seed : number
                - ?path : string
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
                - room : Array of object
                        

    [ADMIN] (Pour les panels administratif)
    - /PasDeNom/UserReport
        - GET
            - Paramètre Header:
                -token: string
            - Paramètre:
                - ?user_send_report : string
                - ?