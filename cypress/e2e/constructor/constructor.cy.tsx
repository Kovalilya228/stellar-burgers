describe('Burger Constructor Page', () => {

    const ingredientCardSelector = '[data-cy="ingredientCard"]';
    const modalSelector = '[data-cy="modal"]';
    const constructorBunSelector = '[data-cy="constructorBun"]';
    const constructorIngredientSelector = '[data-cy="constructorIngredient"]';

    beforeEach(() => {
        cy.fixture('ingredients.json');
        cy.fixture('user.json');
        cy.fixture('order.json');
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
        window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'));
        cy.setCookie('accessToken', 'testAccessToken');
        cy.visit('/');
        cy.wait('@getIngredients');
    });
  
    it('should add an ingredient to the constructor', () => {
        cy.get(ingredientCardSelector).find("button").first().click();
        cy.get(constructorIngredientSelector).should('have.length', 1);
    });
  
    it('should add a bun to the constructor', () => {
        cy.get('[data-cy="bunCard"]').find("button").first().click();
        cy.get(constructorBunSelector).first().should('contain', "Краторная булка N-200i");
    });
  
    it('should open and close ingredient modal', () => {
        cy.get(ingredientCardSelector).first().click();
        cy.get(modalSelector).should('exist');
        cy.get('[data-cy="modalCloseButton"]').click();
        cy.get(modalSelector).should('not.exist');
    });
  
    it('should close ingredient modal on overlay click', () => {
        cy.get(ingredientCardSelector).first().click();
        cy.get(modalSelector).should('exist');
        cy.get('[data-cy="modalOverlay"]').click({force: true});
        cy.get(modalSelector).should('not.exist');
    });
  
    it('should create an order', () => {    
        cy.wait('@getUser');
        cy.get(ingredientCardSelector).find("button").first().click();
        cy.get('[data-cy="bunCard"]').find("button").first().click();
        cy.contains('Оформить заказ').click();
        cy.wait('@createOrder');
        cy.get(modalSelector).contains('12345').should('exist');
        cy.get('[data-cy="modalCloseButton"]').click();
        cy.get(modalSelector).should('not.exist');
    
        cy.get(constructorIngredientSelector).should('have.length', 0);
        cy.get(constructorBunSelector).should('have.length', 0);
    });
  });