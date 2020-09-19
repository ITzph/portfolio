import { getInputByName } from '../support/app.po';
describe('webapp authentication', () => {
  before(() => {
    cy.exec('npm run seed-database', { timeout: 20000 });
  });

  beforeEach(() => cy.visit('/'));

  it('should contain credentials field in loging page', () => {
    cy.visit('/auth');
    getInputByName('username').should('be.visible');
    getInputByName('password').should('be.visible');
  });
});
