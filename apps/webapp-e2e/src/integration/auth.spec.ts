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

  it('should loggin when valid credentials are used', () => {
    getInputByName('username').type('carlo');
    getInputByName('password').type('password');
    getButtonByName('login').click();

    cy.location('pathname').should('eq', '/profile');
  });

  it('should display error message when credentials are invalid', () => {
    getInputByName('username').type('carlo1');
    getInputByName('password').type('password');
    getButtonByName('login').click();

    cy.get('h3.invalid-credentials')
      .should('be.visible')
      .should('contain', 'Invalid username or password');

    cy.location('pathname').should('eq', '/auth');
  });

  it('should store token and user name during successful login', () => {
    cy.server();
    cy.route('POST', '/api/auth/login', { access_token: 'whatever' });

    getInputByName('username').type('carlo');
    getInputByName('password').type('password');
    getButtonByName('login')
      .click()
      .should(() => {
        expect(localStorage.getItem('auth_token')).to.eq('whatever');
        expect(localStorage.getItem('username')).to.eq('carlo');
      });
  });
});
