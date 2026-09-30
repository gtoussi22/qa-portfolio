# Stratégie de test

> Démarche alignée sur le référentiel ISTQB (Foundation Level v4.0).

## 1. Contexte

L'objet de test est **SauceDemo**, une boutique en ligne de démonstration publique, conçue pour l'entraînement au test. Elle reproduit le parcours type d'un site e-commerce : connexion, catalogue, panier, commande.

Ce contexte permet de montrer une démarche QA complète, de la stratégie jusqu'à l'automatisation en intégration continue, sur une application que chacun peut consulter et tester.

## 2. Objectifs

- Vérifier que les parcours critiques fonctionnent de bout en bout.
- Détecter et documenter les anomalies avec un niveau de détail exploitable par une équipe de développement.
- Automatiser les scénarios à forte valeur pour les rejouer à chaque changement et chaque semaine.
- Fournir des indicateurs lisibles pour décider d'une mise en production.

## 3. Périmètre

| Dans le périmètre | Hors périmètre |
|---|---|
| EX-01 Authentification | Paiement réel (l'application n'en a pas) |
| EX-02 Consultation et tri du catalogue | Tests de charge et de sécurité |
| EX-03 Panier et tunnel de commande | Back-office et API internes |
| Compatibilité Chromium, Firefox, mobile | Navigateurs obsolètes |

## 4. Analyse des risques

La priorité de test découle du produit **probabilité × impact** (échelle de 1 à 3).

| Risque | Probabilité | Impact | Niveau | Réponse |
|---|:-:|:-:|:-:|---|
| La commande n'aboutit pas ou affiche un montant faux | 2 | 3 | **6** | Scénario de bout en bout automatisé, contrôle des montants |
| Un utilisateur ne peut pas se connecter | 2 | 3 | **6** | Cas nominaux et d'erreur automatisés |
| Le catalogue est incohérent (images, tri) | 3 | 2 | **6** | Tests de tri automatisés, contrôle des images |
| Un écran est inutilisable sur mobile | 2 | 2 | 4 | Exécution de toute la suite sur un profil mobile |
| Un message d'erreur est absent ou trompeur | 2 | 1 | 2 | Vérification des messages sur les cas d'erreur |

## 5. Approche

| Type de test | Technique | Application |
|---|---|---|
| Fonctionnel | Partitions d'équivalence | Identifiants valides, erronés, vides, compte verrouillé |
| Fonctionnel | Test de transitions | Accès direct à une page protégée sans être connecté |
| Fonctionnel | Test basé sur les données | Contrôle du sous-total et du total de commande |
| Régression | Automatisation | Suite complète rejouée à chaque changement et chaque lundi |
| Compatibilité | Multi-navigateurs | Chromium, Firefox, émulation mobile |
| Exploratoire | Sessions chronométrées | Recherche d'anomalies sur les comptes à comportement dégradé |

## 6. Automatisation

- **Outil** : Playwright avec TypeScript.
- **Architecture** : pattern Page Object ; les tests décrivent le métier, les pages portent les sélecteurs.
- **Sélecteurs** : attributs `data-test` exposés par l'application, les plus stables face aux évolutions de l'interface.
- **Données** : centralisées dans `src/data`, mot de passe lu depuis l'environnement, jamais écrit dans un test.
- **Anomalies connues** : chaque anomalie ouverte a son test qui décrit le comportement attendu, marqué « échec attendu ». Quand l'anomalie est corrigée, le test le signale.

## 7. Intégration continue

Le pipeline GitHub Actions :
1. vérifie le typage du code ;
2. exécute la suite sur Chromium, Firefox et un profil mobile ;
3. relance jusqu'à deux fois un test instable, pour distinguer une vraie régression d'un aléa réseau ;
4. publie le rapport HTML, avec traces, captures et vidéos des échecs.

Il se déclenche à chaque push, à chaque pull request et chaque lundi matin.

## 8. Critères d'entrée et de sortie

**Entrée** : application accessible, comptes de test disponibles, exigences identifiées.

**Sortie** (condition de mise en production) :
- 100 % des tests de priorité haute passent ;
- aucune anomalie bloquante ou majeure ouverte sur un parcours critique ;
- toute anomalie ouverte est documentée et a fait l'objet d'une décision explicite.

## 9. Indicateurs suivis

- Taux de réussite de la suite, par navigateur.
- Couverture des exigences : nombre de cas de test par exigence.
- Anomalies ouvertes par sévérité.
- Durée d'exécution du pipeline.
