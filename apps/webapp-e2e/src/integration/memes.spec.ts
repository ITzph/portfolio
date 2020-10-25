describe('webapp photos page', () => {
  before(() => {
    cy.exec('npm run seed-database', { timeout: 20000 });
  });

  it('should contain empty list component when image is empty', () => {
    cy.visit('/photos');

    cy.get('h3.empty-list__text')
      .should('be.visible')
      .should('contain.text', 'Empty photos. Please add one master!');
    cy.get('mat-icon.empty-list__logo').should('be.visible');
  });
});
