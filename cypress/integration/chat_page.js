context('Chats', () => {
	it('Visit a chat page', () => {
		cy.visit('http://localhost:8080#/login')
		cy.get('.users-list li:nth-child(2) a').click()

		cy.location().should((location) => {
			expect(location.hash).to.equal('#/chat/48')
		})

		cy.get('input').type('sup{enter}')
		cy.get('li.message').should('contain', 'sup')
	})
})
