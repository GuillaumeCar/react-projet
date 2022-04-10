<img src="header.jpg">

## Sommaire <!-- omit in toc -->
- [A. Objectif](#a-objectif)
- [B. Arborescence](#b-arborescence)
- [C. Fonctionnalités](#c-fonctionnalités)
	- [C.1. Page d'Accueil / Liste des jeux](#c1-page-daccueil-liste-des-jeux)
	- [C.2. Page Détail d'un jeu](#c2-page-détail-dun-jeu)
	- [C.3. Mes favoris](#c3-mes-favoris)
	- [C.4. Page L'équipe](#c4-page-léquipe)
- [D. Précisions techniques](#d-précisions-techniques)
	- [D.1. Recherche & liste jeux vidéos](#d1-recherche-liste-jeux-vidéos)
	- [D.2. favoris](#d2-favoris)
	- [D.3. UX](#d3-ux)
	- [D.4. UI](#d4-ui)
- [E. Critères d'évaluation](#e-critères-dévaluation)
- [F. Modalités de rendu et deadline](#f-modalités-de-rendu-et-deadline)
- [G. Questions](#g-questions)

## A. Objectif
**Au cours de ce projet vous aurez à réaliser une Single Page App qui doit permettre à un utilisateur de trouver le jeu vidéo qui occupera ses soirées lors du prochain couvre-feu.**

## B. Arborescence
L'application que vous développerez suivra l'arborescence suivante :
```
Accueil (Liste des jeux) (url "/")
	├─ L'équipe (url "/lequipe.fr")
    ├─ Mes favoris (url "/mes-favoris")
	└─ Détail jeu (url "/jeux/:slug")
```

> _**NB :** pour la page de détail d'un jeu, notez que l'URL est en fait un "motif" où **`":slug"`** correspond au nom du jeu vidéo qu'on veut consulter._
>
> _Par exemple, si l'utilisateur se rend sur http://localhost:8000/jeux/cyberpunk-2077 il doit pouvoir consulter la page de détail du jeu dont le ["slug"](https://fr.wikipedia.org/wiki/Slug) est `"cyberpunk-2077"`._


## C. Fonctionnalités
### C.1. Page d'Accueil / Liste des jeux
Sur la page d'accueil l'utilisateur de votre site doit trouver :
- **la liste des jeux** retournés par une API REST externe (_cf. [D. Précisions techniques](#d-précisions-techniques)_). Chaque jeu est représenté par :
	- une image
	- le titre du jeu
	- sa note metacritic
	- un bouton d'ajout aux favoris (cf. page "mes favoris")

	Par défaut (_si aucune recherche / filtre n'a été appliqué_) la page affichera les jeux qui :
	- sont sortis après le **1er janvier 2020**
	- ont une note metacritic d'**au moins 50%**

- **un formulaire de recherche**

	Ce formulaire contient un champ de saisie permettant de chercher les jeux vidéos qui contiennent le texte saisi
- **un système de filtres et de tri des résultats** (facultatif)

	il est possible de :
	+ **filtrer les jeux par genre** (action, stratégie, etc.) : une liste des genres présents en base est affichée avec la possibilité d'en choisir 1 ou aucun
	+ **trier les résultats** par "pertinence" (_tri par défaut de l'API_), ou par note metacritic descendante (_meilleure note en premier_), ou par date de sortie descendante (_les plus récents en premier_)

Au clic sur un des jeux, l'utilisateur accède à la page de détail du jeu.

### C.2. Page Détail d'un jeu

Cette page permet d'obtenir plus d'informations sur un jeu en particulier :
- une image
- le titre du jeu
- sa description
- sa note metacritic
- la liste des plateformes supportées (PC / PlayStation / XBox / iOS / Android ...)
- les genres du jeu (Action / Simulation / ...)
- les vignettes des screenshots du jeu avec un lien vers l'image
- un bouton d'ajout au favoris

### C.3. Mes favoris

Les pages "liste de jeux" et "détail d'un jeu" contiennent toutes les deux des boutons permettant d'ajouter un jeu dans les "favoris".

Lorsqu'un jeu est ajouté aux favoris, il est enregistré et l'utilisateur peut retrouver la liste de tous ses jeux favoris dans la page "Mes favoris".

Les informations qu'on retrouve sur cette page sont semblables à celles de la page d'accueil :
	- une image
	- le titre du jeu
	- sa note metacritic

L'utilisateur peut -comme sur la page liste- cliquer sur un jeu pour consulter la page détail.

La différence principale est qu'ici le bouton "ajouter aux favoris" disparaît au profit d'un bouton qui permet de **retirer un jeu des favoris**.

### C.4. Page L'équipe
Page statique dans laquelle vous présentez les membres de votre équipe. Pour chaque membre, vous devez indiquer :
- prénom
- nom
- surnom
- jeu vidéo préféré
- pourcentage de la note du groupe qui lui sera attribué en fonction de son implication dans le projet
	> _**NB :** récompensez honnêtement ceux qui s'investissent, punissez sévèrement ceux qui ne méritent pas l'honneur d'être dans votre équipe._ \
	> _En cas de désaccord -ça peut arriver- signalez le moi simplement et j'arbitrerai._


## D. Précisions techniques

### D.1. Recherche & liste jeux vidéos
L'API que je vous propose d'utiliser pour la liste des jeux est l'api de rawg.io et dont la documentation se trouve ici : https://api.rawg.io/docs/

Elle a l'avantage d'être gratuite, rapide et d'offrir de base **toutes les fonctionnalités dont vous aurez besoin dans ce projet**.

Pour pouvoir l'utiliser il vous faudra une **clé d'API** gratuite et que vous pouvez créer en suivant les instructions ici : https://rawg.io/apidocs.
1. Créez vous un compte sur rawg.io (un seul par équipe est nécessaire)
2. Une fois connecté, ouvrez le menu en haut à droite (en survolant les "...")
3. Cliquez sur le lien "Get an API key" dans le menu qui s'est affiché
4. Remplissez le formulaire de demande de clé
5. Dans la page de confirmation, vous obtenez immédiatement la clé à utiliser dans chaque appel AJAX que vous ferez vers l'API

> _**NB :** la version gratuite de l'API vous limite à 20 000 requêtes par mois et par clé d'API ce qui vous laisse en principe de la marge !_

### D.2. favoris
Il n'est pas demandé de faire en sorte que lorsque vous rechargez la page, les favoris soient restaurés. Si l'on repart de zéro à chaque rechargement de page, vous ne perdrez pas de points.

En revanche des **points "bonus"** seront accordés aux équipes qui arriveraient à mettre en place un système de "persistance" des favoris au rechargement de page. Si vous voulez vous y essayer, l'API [`localStorage` (_mdn_)](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage) peut vous aider !

> _**NB :** si vous lisez la documentation de `localStorage`, vous verrez que l'on ne peut stocker dans le `localStorage` **que des chaînes de caractères**. Hors ici il y a de fortes chances que dans votre code, la liste des favoris finisse par se retrouver dans un `Array`._
>
> _Pour **sérialiser / désérialiser** des objets JS, on a déjà vu dans les TPs que l'on pouvait utiliser les méthodes [**`JSON.stringify()`** (mdn)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) et [**`JSON.parse()`** (mdn)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)._
>
> _**Pour un exemple concret d'utilisation, je vous recommande la lecture de ce tutoriel** qui explique comment stocker des données complexes (objets, tableaux, etc.) dans le localStorage : https://js.plainenglish.io/can-we-store-javascript-objects-in-localstorage-b887181a7886 (le fait que ce tutoriel parle de `pizza` est un pur hasard !)_


### D.3. UX
Pensez que comme vous êtes dans une SPA, rien n'indique à l'utilisateur qu'un chargement est en cours. Par conséquent, essayez autant que possible de signaler à l'utilisateur lorsqu'une page charge des données en AJAX (par le biais d'un loader, ou d'un message de chargement en cours par exemple).

Pour rappel, dans une SPA, il n'y a pas de rechargement de page !

Par ailleurs, toutes les actions de navigation de l'utilisateur doivent avoir un impact sur l'url du site : \
Par exemple, si j'ai recherché la chaîne de caractères "CSGO" dans le moteur de recherche, et que j'ai choisi un tri par "note", si je rafraîchis mon navigateur, je dois retomber exactement là où j'étais.


### D.4. UI
Vous êtes libres de la mise en page de votre application. Si vous êtes en manque d'inspiration pour le design de votre site, vous pouvez tout à fait vous inspirer des sites de jeu vidéo grand public (_attention, j'ai bien dit "inspirer" : copier/coller les css d'un site existant n'est pas autorisé_).

Au niveau technique, vous avez le choix d'utiliser un framework CSS pour l'apparence de votre application, un préprocesseur CSS (Sass, less) ou de partir de zéro (hashtag #warrior).

Même si le but est d'évaluer vos compétences en développement JS, nous savons tous qu'une application, même la meilleure, si elle n'a pas une interface agréable à utiliser ne sera pas utilisée. Ici votre public, c'est moi, et je ne le suis pas, bon public, justement. Je porterai donc une attention particulière à la qualité de mise en page de votre application !



## E. Critères d'évaluation
Vous serez évalués sur :
- le respect du cahier des charges
- la qualité du code de votre application ([DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas), [YAGNI](https://fr.wikipedia.org/wiki/YAGNI), [KISS](https://fr.wikipedia.org/wiki/Principe_KISS))
- la beauté de votre log Git et la participation des différents membre de l'équipe
- la propreté du design de votre application et son ergonomie
- l'absence de similitudes avec le code des autres équipes ou du code trouvé en ligne
- la tête du client

## F. Modalités de rendu et deadline
J'attends vos projets via un dépot git **PRIVÉ** (sur gitlab.univ-lille.fr) forké de ce sujet. Seuls les membres de votre équipe doivent avoir accès à ce repo (et moi en tant que "reporter").

Dans ce repo, merci de mettre un `README.md` avec les instructions de lancement du projet, et des captures d'écran des différentes pages de votre app (_pour me permettre de m'assurer que quand je lancerai votre projet, le rendu sera bien conforme à ce que vous aviez de votre côté_).

**La date limite de rendu est fixée au 29/06/2021 à 23h59.** Tout commit arrivant après cette date ne sera pas pris en compte.

## G. Questions

En cas de questions, n'hésitez pas à m'en faire part dans le channel discord #projet !

<img src="https://j.gifs.com/L7LxJD.gif">