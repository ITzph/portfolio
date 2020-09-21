describe('webapp basic ui', () => {
  before(() => {
    cy.exec('npm run seed-database', { timeout: 20000 });
  });

  it('should make header stick to the top when page is scrolled to bottom', () => {
    cy.visit('/resume');

    cy.get('.main-header--pinned').should('not.exist');
    cy.get('main#app-root').scrollTo('bottom');
    cy.get('.main-header--pinned').should('exist');
  });

  it('should contain social handlers', () => {
    cy.visit('/');

    cy.get('.social').should('have.length', 6);

    cy.get('header.top-bar').find('p.name').should('have.length', 3);
    cy.get('footer.footer').find('p.name').should('have.length', 3);
  });
});
