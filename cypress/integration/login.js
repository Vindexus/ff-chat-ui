context('Login', () => {
	it('Login correctly', () => {
		cy.visit('http://localhost:8080')

		cy.get('input[data-cy=username]').type('Wolverine')
		cy.get('input[data-cy=password]').type('password{enter}')

		cy.get('[data-cy=loggedIn]').should('contain', 'You are logged in')
	})
})
