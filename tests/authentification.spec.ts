import { test, expect } from '../src/fixtures';
import { USERS } from '../src/data/users';

/**
 * Exigence couverte : EX-01 — Authentification.
 * Les identifiants CT-xx renvoient au référentiel docs/02-cas-de-test.md.
 */
test.describe('Authentification', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('CT-01 · un utilisateur valide accède au catalogue', { tag: ['@smoke'] }, async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(USERS.standard);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('CT-02 · un mot de passe erroné est refusé', async ({ page, loginPage }) => {
    await loginPage.login(USERS.standard, 'mauvais-mot-de-passe');

    await expect(loginPage.error).toContainText('Username and password do not match');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('CT-03 · un compte verrouillé ne peut pas se connecter', async ({ loginPage }) => {
    await loginPage.login(USERS.lockedOut);

    await expect(loginPage.error).toContainText('this user has been locked out');
  });

  test('CT-04 · les champs vides sont signalés', async ({ loginPage }) => {
    await loginPage.submit.click();

    await expect(loginPage.error).toContainText('Username is required');
  });

  test('CT-05 · le catalogue est inaccessible sans connexion', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');

    await expect(loginPage.error).toContainText('when you are logged in');
  });
});
