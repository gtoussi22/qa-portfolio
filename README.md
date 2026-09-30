# QA Portfolio — une démarche qualité de bout en bout

[![Tests end-to-end](https://github.com/gtoussi22/qa-portfolio/actions/workflows/tests.yml/badge.svg)](https://github.com/gtoussi22/qa-portfolio/actions/workflows/tests.yml)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![ISTQB](https://img.shields.io/badge/Méthode-ISTQB-D4A017?style=flat)

Ce dépôt montre comment je mène la qualité d'une application, de la stratégie de test jusqu'à l'automatisation en intégration continue, sur **[SauceDemo](https://www.saucedemo.com)**, une boutique en ligne de démonstration publique.

**📊 [Voir le dernier rapport de tests](https://gtoussi22.github.io/qa-portfolio/)**

---

## Trois rôles, un même produit

| Rôle | Ce qui le montre |
|---|---|
| **Test Lead** | [Stratégie de test](docs/01-strategie-de-test.md) : périmètre, analyse des risques, critères de sortie, indicateurs |
| **Testeur fonctionnel** | [Cas de test](docs/02-cas-de-test.md) tracés jusqu'aux exigences, [rapports d'anomalies](docs/03-anomalies.md) avec recommandation go / no-go |
| **Testeur automaticien** | Suite Playwright en Page Object, exécutée sur 3 navigateurs à chaque changement ([`tests/`](tests), [`src/`](src)) |

## Ce qui est couvert

| Exigence | Cas de test | Automatisés |
|---|---|:-:|
| EX-01 Authentification | 5 | ✅ 5 |
| EX-02 Catalogue | 4 | ✅ 4 |
| EX-03 Commande | 2 | ✅ 2 |
| Anomalies connues | 2 | ✅ 2 (échec attendu) |

Chaque test est exécuté sur **Chromium**, **Firefox** et un **profil mobile**.

## Choix techniques

- **Page Object** : les tests décrivent le métier (`shop.addToCart('Sauce Labs Backpack')`), les pages portent les sélecteurs. Une évolution de l'interface ne se corrige qu'à un endroit.
- **Fixtures Playwright** : la connexion est une brique réutilisable ; chaque test démarre dans un état propre et indépendant.
- **Sélecteurs `data-test`** : les plus stables face aux changements de style ou de texte.
- **Contrôle des montants** : le test de commande recalcule le sous-total et le total, au lieu de se contenter de vérifier que la page s'affiche.
- **Anomalies suivies par le code** : chaque anomalie ouverte a un test marqué « échec attendu ». Le jour où elle est corrigée, le pipeline le signale.
- **Aucun secret dans le code** : le mot de passe est lu depuis l'environnement (`.env.example`).
- **Pipeline** : typage, tests multi-navigateurs, relances limitées pour isoler les tests instables, rapport publié automatiquement, exécution hebdomadaire.

## Structure

```
docs/
  01-strategie-de-test.md   Stratégie, risques, critères de sortie
  02-cas-de-test.md         Référentiel des cas de test et matrice de couverture
  03-anomalies.md           Rapports d'anomalies et recommandation go / no-go
src/
  pages/                    Page Objects (connexion, catalogue, panier, commande)
  data/                     Comptes et jeux de données
  fixtures.ts               Briques réutilisables des tests
tests/                      Scénarios automatisés (CT-xx, BUG-xx)
.github/workflows/          Pipeline d'intégration continue
```

## Lancer les tests

Prérequis : Node.js 20 ou plus.

```bash
npm ci
npx playwright install chromium firefox
npm test                 # toute la suite, 3 profils
npm run test:chromium    # Chromium uniquement
npm run report           # ouvrir le rapport HTML
```

---

**Ghislain Toussi Kamga** · QA Engineer · Test Lead · Fondateur de Titimbē Forge
[LinkedIn](https://www.linkedin.com/in/ghislain-toussi-658889112/) · [contact@titimbeforge.com](mailto:contact@titimbeforge.com)
