/// <reference path="../support/index.d.ts" />

import { getInputByName, getButtonByName, getLinkByName } from '../support/app.po';
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
    cy.login('carlo', 'password');

    cy.visit('/admin');
    cy.location('pathname').should('eq', '/admin');
  });

  it('should not display admin link when unauthenticated', () => {
    cy.visit('/');

    getLinkByName('admin').should('not.be.visible');
  });

  it('should display admin link when authenticated', () => {
    cy.visit('/auth');
    cy.login('carlo', 'password');

    cy.visit('/');
    getLinkByName('admin').should('be.visible');
    getButtonByName('logout').should('be.visible');
  });
});