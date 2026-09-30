# Référentiel des cas de test

Chaque cas porte un identifiant repris tel quel dans le nom du test automatisé correspondant : la traçabilité va de l'exigence jusqu'au résultat d'exécution.

## Matrice de couverture

| Exigence | Cas de test | Automatisés |
|---|---|:-:|
| EX-01 Authentification | CT-01 à CT-05 | 5 / 5 |
| EX-02 Catalogue | CT-06 à CT-09 | 4 / 4 |
| EX-03 Commande | CT-10, CT-11 | 2 / 2 |

## Cas de test

**Précondition commune** : application ouverte sur la page de connexion. Mot de passe des comptes de démonstration : celui indiqué sur la page d'accueil de l'application.

### EX-01 — Authentification

| ID | Titre | Données | Étapes | Résultat attendu | Priorité |
|---|---|---|---|---|:-:|
| CT-01 | Connexion valide | `standard_user` | Saisir identifiant et mot de passe, valider | Le catalogue « Products » s'affiche | Haute |
| CT-02 | Mot de passe erroné | `standard_user` + mauvais mot de passe | Saisir, valider | Message d'erreur, l'utilisateur reste sur la page de connexion | Haute |
| CT-03 | Compte verrouillé | `locked_out_user` | Saisir, valider | Message indiquant que le compte est verrouillé | Moyenne |
| CT-04 | Champs vides | aucune | Valider sans rien saisir | Message « Username is required » | Moyenne |
| CT-05 | Accès direct sans connexion | aucune | Ouvrir `/inventory.html` sans être connecté | Retour à la connexion avec un message explicite | Haute |

### EX-02 — Catalogue

**Précondition** : connecté avec `standard_user`.

| ID | Titre | Étapes | Résultat attendu | Priorité |
|---|---|---|---|:-:|
| CT-06 | Affichage du catalogue | Observer la liste | 6 produits affichés | Haute |
| CT-07 | Tri par prix croissant | Choisir « Price (low to high) » | Les prix sont affichés du plus bas au plus haut | Moyenne |
| CT-08 | Tri par nom de Z à A | Choisir « Name (Z to A) » | Les noms sont classés en ordre alphabétique inverse | Basse |
| CT-09 | Compteur du panier | Ajouter deux produits | Le compteur du panier affiche 2 | Haute |

### EX-03 — Commande

**Précondition** : connecté avec `standard_user`, « Sauce Labs Backpack » et « Sauce Labs Bike Light » ajoutés au panier.

| ID | Titre | Étapes | Résultat attendu | Priorité |
|---|---|---|---|:-:|
| CT-10 | Commande complète | Ouvrir le panier, commander, saisir prénom, nom et code postal, continuer, terminer | Sous-total = somme des articles ; total = sous-total + taxe ; message « Thank you for your order! » | Haute |
| CT-11 | Code postal manquant | Commander en laissant le code postal vide | Message « Postal Code is required », la commande ne progresse pas | Moyenne |
