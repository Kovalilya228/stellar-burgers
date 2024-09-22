describe('Burger Constructor Page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', 'api/orders', (req) => {
            req.reply((res) => {
                setTimeout(() => {
                    res.send({ fixture: 'order.json' });
                }, 500);
            });
        }).as('createOrder');
        window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'));
        cy.setCookie('accessToken', 'testAccessToken');
        cy.visit('/');
        cy.wait('@getIngredients');
    });
  
    it('should add an ingredient to the constructor', () => {
        const ingredientButtons = cy.get('[data-cy="ingredientCard"]').find("button");

        ingredientButtons.first().click();
        cy.get('[data-cy="constructorIngredient"]').should('have.length', 1);
    });
  
    it('should add a bun to the constructor', () => {
        const bunButtons = cy.get('[data-cy="bunCard"]').find("button");
        bunButtons.first().click();
        cy.get('[data-cy="constructorBun"]').first().should('contain', "Краторная булка N-200i");
    });
  
    it('should open and close ingredient modal', () => {
        cy.get('[data-cy="ingredientCard"]').first().click();
        cy.get('[data-cy="modal"]').should('exist');
        cy.get('[data-cy="modalCloseButton"]').click();
        cy.get('[data-cy="modal"]').should('not.exist');
    });
  
    it('should close ingredient modal on overlay click', () => {
        cy.get('[data-cy="ingredientCard"]').first().click();
        cy.get('[data-cy="modal"]').should('exist');
        cy.get('[data-cy="modalOverlay"]').click({force: true});
        cy.get('[data-cy="modal"]').should('not.exist');
    });
  
    it('should create an order', () => {
        cy.get('[data-cy="ingredientCard"]').find("button").first().click();
        cy.get('[data-cy="bunCard"]').find("button").first().click();
    
        cy.contains('Оформить заказ').click();
    
        cy.get('[data-cy="modal"]').should('exist');
    
        cy.wait('@createOrder');
    
        cy.get('[data-cy="modal"]').should('not.exist');
    
        cy.get('[data-cy="constructorIngredient"]').should('have.length', 0);
        cy.get('[data-cy="constructorBun"]').should('have.length', 0);
    });
  });