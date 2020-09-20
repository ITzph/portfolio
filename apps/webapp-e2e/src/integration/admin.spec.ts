import { getInputByName, getButtonByName } from '../support/app.po';
describe('webapp admin', () => {
  before(() => {
    cy.exec('npm run seed-database', { timeout: 20000 });
  });

  beforeEach(() => localStorage.clear());

  it('should go to auth page when unauthenticated and admin url is visited', () => {
    cy.visit('/admin');
    cy.location('pathname').should('eq', '/auth');
  });

  it('should be able to visit admin page when authenticated', () => {
    cy.visit('/auth');
    getInputByName('username').type('carlo');
    getInputByName('password').type('password');
    getButtonByName('login').click();

    cy.visit('/admin');
    cy.location('pathname').should('eq', '/admin');
  });
});
