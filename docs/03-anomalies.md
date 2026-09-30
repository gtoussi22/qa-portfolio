# Rapports d'anomalies

Anomalies relevées lors des sessions exploratoires avec le compte `problem_user`. Chacune est couverte par un test automatisé qui décrit le comportement attendu (`tests/anomalies-connues.spec.ts`).

**Échelle de sévérité** : Bloquante · Majeure · Mineure · Cosmétique

---

## BUG-01 — Tous les produits affichent la même image

| Champ | Valeur |
|---|---|
| Sévérité | **Majeure** |
| Priorité | Haute |
| Exigence | EX-02 Catalogue |
| Environnement | Chromium, Firefox, mobile · compte `problem_user` |
| Statut | Ouverte |

**Étapes pour reproduire**
1. Se connecter avec `problem_user`.
2. Observer les images du catalogue.

**Résultat attendu** : chaque produit affiche sa propre photo.

**Résultat obtenu** : les six produits affichent la même image, sans rapport avec les articles.

**Impact** : le client ne peut pas identifier visuellement ce qu'il achète. Risque d'erreur de commande, de retour et de perte de confiance.

**Test automatisé** : `BUG-01 · chaque produit affiche sa propre image`

---

## BUG-02 — Le tri du catalogue est sans effet

| Champ | Valeur |
|---|---|
| Sévérité | **Majeure** |
| Priorité | Moyenne |
| Exigence | EX-02 Catalogue |
| Environnement | Chromium, Firefox, mobile · compte `problem_user` |
| Statut | Ouverte |

**Étapes pour reproduire**
1. Se connecter avec `problem_user`.
2. Dans la liste de tri, choisir « Price (low to high) ».

**Résultat attendu** : les produits sont réordonnés du moins cher au plus cher.

**Résultat obtenu** : l'ordre des produits ne change pas.

**Impact** : fonctionnalité de navigation inopérante ; le client ne peut pas comparer les prix facilement.

**Test automatisé** : `BUG-02 · le tri par prix croissant ordonne les produits`

---

## Recommandation go / no-go

Pour un compte client standard, les parcours critiques (connexion, catalogue, commande) sont conformes. Les deux anomalies majeures ci-dessus ne concernent que le compte `problem_user` : elles ne bloquent pas une mise en production, mais doivent être corrigées dans le prochain cycle, et leurs tests conservés pour vérifier la correction.
