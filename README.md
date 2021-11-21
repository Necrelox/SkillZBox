# GDP (Gestion de projet)

## Recueil des besoins
Un site pour échanger avec une personne sur un sujet donné:
- Créer, modifier, supprimer un compte utilisateur.
- Se connecter avec son compte au site.
- Créer, modifier, supprimer un salon de discussion.
- Le salon de discussion possède un titre, une categorie et un ou plusieurs tags.
- Un utilisateur peut naviguer sur la page d'accueil pour rechercher un salon qui l'interesse.
- La page d'accueil peut être filtré par categorie et/ou tag.
- Un administrateur doit pouvoir créer, modifier, supprimer une categorie.
- Un administrateur doit pouvoir créer, modifier, supprimer un tag.
- Un administrateur doit pouvoir supprimer un compte.


## User stories (liste des fonctionnalités)

| En tant que | Je veux pouvoir | Dans le but de |
|---|---|---|
|Visiteur| Acceder à l'espace de connexion | Se connecter au site |
|Visiteur| Acceder à l'espace de création de compte | Créer un compte |
|Utilisateur| Modifier ou supprimer son compte | Modifier son compte |
|Utilisateur| Créer un salon | Créer un espace de discussion |
|Utilisateur| Modifier son salon | Modifier le titre, la categorie ou les tags du salon |
|Utilisateur| Supprimer son salon | Clôre l'espace de discussion |
|Administrateur| Acceder à une page d'administration | Gérer et voir les informations du site |
|Administrateur| Créer/modifier/Supprimer une categorie | Gérer les categories |
|Administrateur| Créer/modifier/Supprimer un tag | Gérer les tags |
|Administrateur| Supprimer un compte | Gérer les comptes utilisateurs |

## SQL
``` SQL
CREATE DATABASE IF NOT EXISTS test2;
use test2;

/* suppression des tables existantes */
DROP TABLE IF EXISTS user, room, categorie, tag, room_has_tag, room_has_categorie;

/* table user */
CREATE TABLE user (
    uuid VARCHAR(16) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status INT NOT NULL DEFAULT 0,
    role enum('admin', 'user', 'moderator') NOT NULL default 'user',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* table room */
CREATE TABLE room (
    uuid VARCHAR(16) PRIMARY KEY,
    title TEXT NOT NULL,
    owner VARCHAR(16) NOT NULL,
    user_uuid VARCHAR(16),
    FOREIGN KEY (user_uuid) REFERENCES user(uuid) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* table categorie */
CREATE TABLE categorie (
    uuid VARCHAR(16) PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* table tag */
CREATE TABLE tag (
    uuid VARCHAR(16) PRIMARY KEY,
    name TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    categorie_uuid VARCHAR(16) NOT NULL,
    FOREIGN KEY (categorie_uuid) REFERENCES categorie(uuid)
);

/* table room_has_categorie */
CREATE TABLE room_has_categorie (
    room_uuid VARCHAR(16) NOT NULL,
    categorie_uuid VARCHAR(16) NOT NULL,
    FOREIGN KEY (room_uuid) REFERENCES room(uuid) ON DELETE CASCADE,
    FOREIGN KEY (categorie_uuid) REFERENCES categorie(uuid) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* table room_has_tag */
CREATE TABLE room_has_tag (
    room_uuid VARCHAR(16) NOT NULL,
    tag_uuid VARCHAR(16) NOT NULL,
    FOREIGN KEY (room_uuid) REFERENCES room(uuid) ON DELETE CASCADE,
    FOREIGN KEY (tag_uuid) REFERENCES tag(uuid) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

/* seeding */
INSERT INTO user (uuid, username, email, password, status, role)
VALUES ('1', 'admin', 'admin@admin.fr', 'passwordadmin', 1, 'admin');

INSERT INTO categorie (uuid, name)
VALUES ('1', 'code');

INSERT INTO categorie (uuid, name)
VALUES ('2', 'cuisine');

INSERT INTO categorie (uuid, name)
VALUES ('3', 'musique');

INSERT INTO tag (uuid, name, categorie_uuid)
VALUES ('1', 'javascript', '1');

INSERT INTO tag (uuid, name, categorie_uuid)
VALUES ('2', 'php', '1');

INSERT INTO tag (uuid, name, categorie_uuid)
VALUES ('3', 'patisserie', '2');

INSERT INTO tag (uuid, name, categorie_uuid)
VALUES ('4', 'asiatique', '2');

INSERT INTO tag (uuid, name, categorie_uuid)
VALUES ('5', 'guitare', '3');

INSERT INTO tag (uuid, name, categorie_uuid)
VALUES ('6', 'piano', '3');

INSERT INTO room (uuid, title, owner, user_uuid)
VALUES ('1', 'test room', '1', '1');

/* La room avec l'uuid 1 aura la categorie avec l'uuid 1 */
INSERT INTO room_has_categorie (room_uuid, categorie_uuid)
VALUES ('1', '1');

/* La room avec l'uuid 1 aura le tag avec l'uuid 1 */
INSERT INTO room_has_tag (room_uuid, tag_uuid)
VALUES ('1', '1');
```