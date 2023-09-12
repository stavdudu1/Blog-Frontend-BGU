/// <reference types="cypress"/>

beforeEach(() => {
  cy.visit("http://localhost:3000");
});

describe("Login", () => {
  it('should navigate to the login page when the "Log in" button is clicked', () => {
    cy.contains("Log in").click();

    // Assert that the URL has changed to the login page
    cy.url().should("include", "/signin");
  });
});

describe("Successful Login", () => {
  it("should successfully log in a user", () => {
    //user that exists
    const testUserName = "rapapory";
    const testPassword = "123";

    // Visit the login page
    cy.contains("Log in").click();

    // Fill in the login form
    cy.get("#username").type(testUserName);
    cy.get("#password").type(testPassword);

    // Submit the form
    cy.get('input[type="submit"]').click();

    // Assert that the user is redirected to the home page after successful login
    cy.url().should("include", "/");
  });
});

describe("Unsuccessful Login", () => {
  it("should not log in", () => {
    // Intercept the API request and return a failure response
    cy.intercept("POST", "/api/auth/token_signin", {
      statusCode: 404,
      body: { message: "invalid user name or password" },
    }).as("loginFailure");

    // Visit the login page
    cy.contains("Log in").click();

    const invalidUserName = "invalidUser";
    const invalidPassword = "invalidPassword";

    // Fill in the login form with invalid credentials
    cy.get("#username").type(invalidUserName);
    cy.get("#password").type(invalidPassword);

    // Submit the form
    cy.get('input[type="submit"]').click();

    // Wait for the API request to be intercepted and the response to be processed
    cy.wait("@loginFailure");

    // Assert that the user is still on the login page
    cy.url().should("include", "/signin");
  });
});

describe("Successful Signup", () => {
  it("should successfully sign up a new user", () => {
    const testName = "John Doe";
    const testEmail = "john.doe@example.com";
    const testUserName = "johndoe";
    const testPassword = "password123";

    // Visit the signup page
    cy.contains("Sign up").click();

    // Fill in the signup form
    cy.get("#name").type(testName);
    cy.get("#email").type(testEmail);
    cy.get("#username").type(testUserName);
    cy.get("#password").type(testPassword);

    // Submit the form
    cy.get('input[type="submit"]').click();

    // Assert that the user is redirected to the home page after successful signup
    cy.url().should("include", "/");
  });
});

describe("Failed Signup", () => {
  it("should wait for an error msg from server and stay in signup page", () => {
    // Intercept the API request and return a failure response
    cy.intercept("POST", "/api/auth/token_signup", {
      statusCode: 403,
      body: { message: "email already in use" },
    }).as("signupFailure");

    // Visit the signup page
    cy.contains("Sign up").click();

    const emailInUse = "yuvi0201@gmail.com";
    // Fill in the signup form
    cy.get("#name").type("testName");
    cy.get("#email").type(emailInUse);
    cy.get("#username").type("testUserName");
    cy.get("#password").type("testPassword");

    // Submit the form
    cy.get('input[type="submit"]').click();

    // Wait for the API request to be intercepted and the response to be processed
    cy.wait("@signupFailure");

    // Assert that the user is still on the signup page
    cy.url().should("include", "/signup");
  });
});