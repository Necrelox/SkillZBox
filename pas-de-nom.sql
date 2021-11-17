CREATE DATABASE IF NOT EXISTS PasDeNom;
USE PasDeNom;

CREATE TABLE IF NOT EXISTS user
(
    uuid VARCHAR(16) PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    status int(1) NOT NULL default 0,
    role enum('admin', 'user', 'moderator') NOT NULL default 'user',
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS category
(
    uuid VARCHAR(16) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tag
(
    uuid VARCHAR(16) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_uuid VARCHAR(16) NOT NULL,
    FOREIGN KEY (category_uuid) REFERENCES category(uuid),
    UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS room_has_tags
(
    tag_uuid VARCHAR(16) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    room_uuid VARCHAR(16) NOT NULL
);

CREATE TABLE IF NOT EXISTS room
(
    uuid     VARCHAR(16) PRIMARY KEY,
    owner    VARCHAR(16)  NOT NULL,
    category VARCHAR(255) NOT NULL,
    room_has_tags_uuid  VARCHAR(16) NOT NULL,
    foreign key (owner) references user (uuid)
);
