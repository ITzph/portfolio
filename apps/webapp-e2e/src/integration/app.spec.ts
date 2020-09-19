import { getPageNavLink } from '../support/app.po';

describe('webapp page', () => {
  before(() => {
    cy.exec('npm run seed-database', { timeout: 20000 });
  });

  beforeEach(() => cy.visit('/'));

  it('should contain page name', () => {
    cy.get('h1').contains('Code Gino');
  });

  it('should navigate to profile page when link is clicked', () => {
    cy.visit('/memes');
    getPageNavLink().click();
    cy.location('pathname').should('eq', '/profile');
  });

  it('should display 404 information when accessing invalid URL', () => {
    cy.visit('/notexisting');
    cy.get('span.message__code').should('contain', '404');
    cy.get('h1.message').should('contain', 'Page not found!');
  });

  it('should navigate to memes page when link is clicked', () => {
    cy.get('a[name=memes]').click();
    cy.location('pathname').should('eq', '/memes');
  });

  it('should navigate to resume page when link is clicked', () => {
    cy.get('a[name=resume]').click();
    cy.location('pathname').should('eq', '/resume');
  });

  it('should navigate to login page when link is clicked', () => {
    cy.get('a[name=login]').click();
    cy.location('pathname').should('eq', '/auth');
  });
});
