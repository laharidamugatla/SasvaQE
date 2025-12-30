describe('API Test Suite - Batch 1', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  it('Test 1: Verify successful retrieval of user with ID 2', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body.data).to.have.property('id', 2);
      expect(response.body.data).to.have.property('first_name');
      expect(response.body.data.first_name).to.be.a('string');
      expect(response.body.data).to.have.property('last_name');
      expect(response.body.data.last_name).to.be.a('string');
    });
  });

  it('Test 2: Verify GET user with valid API key', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.be.an('object');
    });
  });

  it('Test 3: Verify GET user with invalid API key', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'invalid-key'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 4: Verify GET user without authentication header', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 5: Verify correct 200 status code for valid GET request', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('Test 6: Verify GET request with missing Content-Type header', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 400]).to.include(response.status);
    });
  });

  it('Test 7: Verify GET request with malformed authorization header', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'malformed'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 8: Verify response schema matches User model', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body.data.id).to.be.a('number');
      expect(response.body.data.first_name).to.be.a('string');
      expect(response.body.data.last_name).to.be.a('string');
    });
  });

  it('Test 9: Verify error response for non-existent user', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/999',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('Test 10: Verify response field types match schema', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body.data.id).to.be.a('number');
      expect(response.body.data.first_name).to.be.a('string');
      expect(response.body.data.last_name).to.be.a('string');
    });
  });
});
