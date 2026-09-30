import { test, expect } from '../src/fixtures';
import { InventoryPage } from '../src/pages/InventoryPage';
import { USERS } from '../src/data/users';

/**
 * Anomalies connues, documentées dans docs/03-anomalies.md.
 *
 * Chaque test décrit le comportement ATTENDU. Il échoue donc tant que
 * l'anomalie existe : `test.fail()` le signale comme « échec attendu ».
 * Le jour où l'anomalie est corrigée, le test passe au vert… et Playwright
 * le signale, pour qu'on retire le marquage et qu'on clôture le ticket.
 */
test.describe('Anomalies connues (compte problem_user)', () => {
  let inventory: InventoryPage;

  test.beforeEach(async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.problem);
    inventory = new InventoryPage(page);
    await expect(inventory.title).toHaveText('Products');
  });

  test('BUG-01 · chaque produit affiche sa propre image', async () => {
    test.info().annotations.push({ type: 'anomalie', description: 'BUG-01 — même image pour tous les produits' });
    test.fail();

    const sources = await inventory.itemImages.evaluateAll((imgs) => imgs.map((img) => img.getAttribute('src')));
    expect(new Set(sources).size).toBe(sources.length);
  });

  test('BUG-02 · le tri par prix croissant ordonne les produits', async () => {
    test.info().annotations.push({ type: 'anomalie', description: 'BUG-02 — le tri est sans effet' });
    test.fail();

    await inventory.sortBy('lohi');
    const prices = await inventory.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });
});
