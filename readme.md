# Puissance 4

Je vais écrire ici les idées comme elles me viennent. Au fur et à mesure que j'avance dans le développement.

## Step 1 : Jeter les dés
On est samedi, il est 14h15, je pense avoir 2h devant moi, j'attaque.

### Init du projet
Je connais pas bien AngularJS (une petite app faite il y a 3 jours), mais tant pis, le framework à  l'air cool, je pars la dessus. Faut que l'appli soit respsonsive, je prend aussi Bootstrap ca nous fera gagner du temps (surtout que du temps je vais en manquer). Pour la gestion des librairies, je vais prendre ```bower```, on devrait là aussi gagner du temps. A priori ```ngRoute``` est efficace pour la gestion des routes, allons y. 


### Dessiner une grille
J'attaque par ce qui m'est le moins familier, la grille de jeu.
J'ai bien vu que la grille devrait pouvoir être modifiable par les joueurs dans une seconde version.
Pour l'instant, je vais aller au plus vite, je vais dessiner la grille en dur avec des ```<div>```. Plutôt des
```<div>``` qu'un tableau ca sera plus simple à rendre responsive. Pour l'instant je m'occupe pas du responsive.

### Définir des joueurs
Je vais ajouter des joueurs, chaque joueur aura une couleure de jetons. Je pense qu'une ```Factory``` a sa place
pour gérer ca, surtout si on envisage les parties online.

### Un premier controller pour gérer le jeu
Je vais créer un ```GameCtrl``` qui me permettra de gérer les interactions du joueur sur la grille.
Je l'injecte dans la vue ```home.html``` grace à ngRoute !