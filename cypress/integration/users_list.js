context('UsersList', () => {
	it('List of users', () => {
		cy.visit('http://localhost:8080/#/users')
		cy.get('.users-list li').should('have.length', 2)
		cy.get('.users-list li:nth-child(1)').should('contain', 'Wolverine')
	})
})
