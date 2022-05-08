# Bienvenue sur SkillZBox

### But du projet :

Le but du projet, est de pouvoir sélectionner une catégorie et tag(s), puis faire une recherche d’une room si elle n'est pas trouvé elle automatiquement crée.

???+ summary "Room"
    Une room ou salon est un rassemblement de différents outils :

    - Tchat vocal 
    - Tchat Textuel 
    - Possibilité d’avoir un flux video + partage d’ecran
    - Partage de fichiers plus ou moins gros l'objectif est d'avoir une limite assez élevée.
    - ainsi que des outils selon la catégorie choisie. (Exemple : avec la catégorie "Programmation" ou peut avoir un éditeur en ligne, ou un outil de test d'api comme postman)
    - Outils selon la catégorie (Programmation = éditeur en ligne ainsi que d’autres outils par exemple de reverse Engineering)
    - Possibilité de paramétrer la room, par exemple en limitant le nombre de personne qui peuvent y accéder.
    - vous pouvez aussi, si vous le voulez inviter des amis à la room.

**SkillZBox** a pour objectif de vous aider à faire de nouvelles rencontres avec des personnes qui pourraient avoir des intérêts communs.
    
Typiquement, si vous vous sentez seul ou que vous avez besoin d’aide ou même que vous souhaitez vous faire des amis, vous pouvez créer une room et ainsi faire de nouvelles rencontres que vous pourrez rajouter en amis.

### Differentes parties du projet :

- API (Avec clef d’authentification) en NodeJs + Express Js (Avec des modules c++ pour de gros traitement à voir)

- Front React Js (JS)

- Base de donnée (MySql / MariaDb)

- Documentation avec le module python mkdocs

- Librairie Dynamique de compression **sans perte** et de chiffrements des données (c ou c++)

- Programme permettant de clean une partie de la base de donnée si elle devient trop lourde, il aura pour but de déplacer ces données dans un dossier archive qui sera chiffré.

- Programme de recherche à partir d’une IP, permettant d’avoir une localisation. (c++) voir RIPE ou des tiers fournissant une base de données 
