describe('webapp authentication', () => {
  before(() => {
    cy.exec('npm run seed-database', { timeout: 20000 });
  });

  beforeEach(() => cy.visit('/'));

  it('should contain credentials field in loging page', () => {
    cy.visit('/auth');
    cy.get('input[name=username]').should('be.visible');
    cy.get('input[name=password]').should('be.visible');
  });
});
