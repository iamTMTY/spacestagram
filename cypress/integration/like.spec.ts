/// <reference types="cypress" />


describe("like and unlike functionality", () => {

  beforeEach(() => {
    cy.visit("/")
  })

  it("should like an image card", () => {
    const likeBtn = cy.get("[data-cy='like-element']").first().parent()
    likeBtn.click()
    const unlikeElement = likeBtn.children()
    unlikeElement.should('have.class', 'unlike')
    unlikeElement.should('not.have.class', 'like')
  })

  it("should unlike an image card", () => {
    const likeBtn = cy.get("[data-cy='like-element']").first().parent()
    likeBtn.click()
    likeBtn.click()
    const likeElement = likeBtn.children()
    likeElement.should('have.class', 'like')
    likeElement.should('not.have.class', 'unlike')
  })
})