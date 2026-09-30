import { test, expect } from '../src/fixtures';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { CUSTOMER } from '../src/data/checkout';

/** Exigence couverte : EX-03 — Tunnel de commande. */
test.describe('Commande', () => {
  const PRODUCTS = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

  test.beforeEach(async ({ shop }) => {
    for (const product of PRODUCTS) await shop.addToCart(product);
    await shop.openCart();
  });

  test('CT-10 · une commande complète aboutit avec des montants justes', { tag: ['@smoke'] }, async ({ cartPage, checkoutPage }) => {
    await expect(cartPage.itemNames).toHaveText(PRODUCTS);
    await cartPage.checkout();
    await checkoutPage.fillInformation(CUSTOMER);

    // Le sous-total doit être la somme exacte des articles commandés.
    const prices = (await checkoutPage.itemPrices.allInnerTexts()).map((p) => Number(p.replace('$', '')));
    const expectedSubtotal = prices.reduce((sum, price) => sum + price, 0);
    const subtotal = CheckoutPage.amount(await checkoutPage.subtotal.innerText());
    expect(subtotal).toBeCloseTo(expectedSubtotal, 2);

    // Le total doit être le sous-total plus la taxe.
    const tax = CheckoutPage.amount(await checkoutPage.tax.innerText());
    const total = CheckoutPage.amount(await checkoutPage.total.innerText());
    expect(total).toBeCloseTo(subtotal + tax, 2);

    await checkoutPage.finishButton.click();
    await expect(checkoutPage.confirmation).toHaveText('Thank you for your order!');
  });

  test('CT-11 · le code postal est obligatoire', async ({ cartPage, checkoutPage }) => {
    await cartPage.checkout();
    await checkoutPage.fillInformation({ ...CUSTOMER, postalCode: '' });

    await expect(checkoutPage.error).toContainText('Postal Code is required');
  });
});
