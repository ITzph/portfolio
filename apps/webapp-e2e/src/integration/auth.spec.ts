import { getInputByName, getButtonByName } from '../support/app.po';
describe('webapp authentication', () => {
  before(() => {
    cy.exec('npm run seed-database', { timeout: 20000 });
  });

  beforeEach(() => cy.visit('/auth'));

  it('should contain credentials field in loging page', () => {
    getInputByName('username').should('be.visible');
    getInputByName('password').should('be.visible');
  });

  it('should loging when valid credentials is used', () => {
    getInputByName('username').type('carlo');
    getInputByName('password').type('password');
    getButtonByName('login').click();

    cy.location('pathname').should('eq', '/profile');
  });
});
