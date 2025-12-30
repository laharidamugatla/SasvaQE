describe('API Test Suite - Batch 2', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  it('Test 11: Verify required field id is present in response', () => {
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
      expect(response.body.data).to.have.property('id');
      expect(response.body.data.id).to.not.be.null;
      expect(response.body.data.id).to.not.be.undefined;
    });
  });

  it('Test 12: Verify response time is within acceptable limits', () => {
    const startTime = Date.now();
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      const responseTime = Date.now() - startTime;
      expect(responseTime).to.be.lessThan(2000);
      expect(response.status).to.eq(200);
    });
  });

  it('Test 13: Verify successful deletion of user with ID 2', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(204);
      expect(response.body).to.be.empty;
    });
  });

  it('Test 14: Verify deletion fails for non-existent user', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/999',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 15: Verify DELETE user with valid API key', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Test 16: Verify DELETE user with invalid API key', () => {
    cy.request({
      method: 'DELETE',
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

  it('Test 17: Verify DELETE user without authentication', () => {
    cy.request({
      method: 'DELETE',
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

  it('Test 18: Verify correct 204 status code for successful DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Test 19: Verify DELETE method is allowed on users endpoint', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  it('Test 20: Verify DELETE request with missing Content-Type', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect([204, 400]).to.include(response.status);
    });
  });
});
