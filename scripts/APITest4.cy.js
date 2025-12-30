describe('API Test Suite - Batch 4', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  it('Test 31: Verify name field accepts valid string formats', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'John Doe',
        job: 'Manager'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('name', 'John Doe');
    });
  });

  it('Test 32: Verify creation with very long name string', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
        job: 'Tester'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([201, 400]).to.include(response.status);
    });
  });

  it('Test 33: Verify creation with empty string for name', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: '',
        job: 'Project Leader'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 34: Verify creation with empty string for job', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Sam',
        job: ''
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 35: Verify POST user with valid API key', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Alice',
        job: 'Developer'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('Test 36: Verify POST user with invalid API key', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'invalid-token'
      },
      body: {
        name: 'Alice',
        job: 'Developer'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 37: Verify POST user without authentication header', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        name: 'Bob',
        job: 'Engineer'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 38: Verify correct 201 status code for successful creation', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Charlie',
        job: 'Designer'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('Test 39: Verify POST method is allowed on users endpoint', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Dave',
        job: 'Analyst'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
    });
  });

  it('Test 40: Verify POST request with missing Content-Type header', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Eve',
        job: 'Manager'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([400, 415]).to.include(response.status);
      expect(response.headers['content-type']).to.include('application/json');
    });
  });
});
