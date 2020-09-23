export const getLinkByName = (name: string) => cy.get(`a[name=${name}]`);

export const getInputByName = (name: string) => cy.get(`input[name=${name}]`);

export const getButtonByName = (name: string) => cy.get(`button[name=${name}]`);
