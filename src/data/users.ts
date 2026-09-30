/**
 * Comptes de test de l'application de démonstration SauceDemo.
 * Chaque compte simule un comportement différent : c'est ce qui permet
 * de dérouler des scénarios nominaux et des scénarios d'anomalie.
 */
export const USERS = {
  standard: 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
} as const;

/** Mot de passe lu depuis l'environnement (voir .env.example). */
export const PASSWORD = process.env.DEMO_PASSWORD ?? 'secret_sauce';
