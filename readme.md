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

### Définir 2 joueurs
Grace à la factory Players, injectée dans le controller, je vais créer à la main 2 joueurs par défaut
et prendre le joueur 1 comme étant le premier joueur à jouer.
Pour la création des joueurs au travers de l'interface graphique, on verra plutard c'est pas important.
J'ajoute aussi dans le titre le nom des deux joueurs.

### Quand on clique sur une case ?
Je veux récupérer le click sur un élément de la grille. Une première méthode simple est d'ajouter un ngClick
sur chaque élément cliquable de la grille. C'est pas très DRY mais ca fera bien l'affaire.

### Switch to the next player
Une fois que le joueur à cliquer sur une cellule, il faut que ca soit au joueur suivant de jouer, et ainsi de suite.
Je crée un méthode nextPlayer().

### Colorer la cellule cliquée par le joueur
C'est le coup de la pièce qui tombe. Je vais pas faire l'animation pour l'instant, c'est pas dans les priorités.
Je vais simplement coloré la case libre la plus basse de la colonne où à cliqué le joueur.
Pour ca je vais utiliser la classe définie dans le joueur et ajouter aussi une classe ```taken``` pour
différencier les case prises des cases libres.
Je vais pas faire de jetons non plus, simplement changer le ```background-color``` de la div en question.

### Qui gagne ?
Reste maintenant a vérifier après chaque coup si le joueur courant à gagner !
Pour ca il faut vérifier 4 cas du plus simple au plus complex :

- Alignement vertical : 4 jetons sur une même colonne
- Alignement horizontal : 4 jetons sur une même ligne
- Alignement diagonal : Dans ce cas il faut encore regarder  choses :

   - Alignement du haut à droite vers le bas à gauche
   - Alignement du haut à gauche vers le bas à droite.

Bon là ca mériterait peut être des tests... Pas le temps de regarder le testing avec AngularJS, on verra plus tard
si j'ai du temps. En même temps c'est pas non plus incroyable comme algo.
Je ferai plutard aussi la gestion d'une fin de partie. Pas important pour l'instant.

### Conclusion
Voilà, il est 16h00 pile ! j'ai un puissance 4 qui fonctionne.
On est encore loin d'avoir tout ce qui est demandé mais le plus important est là, le client peut jouer au puissance 4 !

La suite au prochain épisode, je dois fermer le laptop.

Une démo en ligne est disponible ici : [http://abnt.fr/pApp](http://abnt.fr/pApp)