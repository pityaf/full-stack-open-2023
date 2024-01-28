describe('Blog app', function() {
  beforeEach(function() {
    //cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('Log in to application')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:5173/')
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('pityafinwe')
    cy.get('#password').type('test')
    cy.contains('login').click()

    cy.contains('Blogs!')
  }) 
  
  it('logged user can create blog', function () {
    cy.contains('login').click()
    cy.get('#username').type('pityafinwe')
    cy.get('#password').type('test')
    cy.contains('login').click()

    cy.contains('add blog').click()
    cy.get('#title').type('test title')
    cy.get('#author').type('test author')
    cy.get('#url').type('testurl.com')
    cy.contains('Add blog').click()
  }) 

  it('logged user can like blog', function () {
    cy.contains('login').click()
    cy.get('#username').type('pityafinwe')
    cy.get('#password').type('test')
    cy.contains('login').click()

    cy.contains('view more').click()
    cy.contains('add like').click()
  }) 

  it('logged user can delete blog', function () {
    cy.contains('login').click()
    cy.get('#username').type('pityafinwe')
    cy.get('#password').type('test')
    cy.contains('login').click()

    cy.contains('view more').click()
    cy.contains('delete blog').click()
  }) 

  it.only('blogs are ordered by likes', function () {
    cy.contains('login').click()
    cy.get('#username').type('pityafinwe')
    cy.get('#password').type('test')
    cy.contains('login').click()

    cy.contains('add blog').click()
    cy.get('#title').type('test title')
    cy.get('#author').type('test author')
    cy.get('#url').type('testurl.com')
    cy.contains('Add blog').click()

    cy.contains('add blog').click()
    cy.get('#title').type('test title second')
    cy.get('#author').type('test author second')
    cy.get('#url').type('testurl.com')
    cy.contains('Add blog').click()

    cy.contains('The title with most likes').contains('view').click()
    cy.get('button').contains('like').click()

    cy.get('.blog').eq(0).should('contain', 'The title with most likes')
    cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
  })
})