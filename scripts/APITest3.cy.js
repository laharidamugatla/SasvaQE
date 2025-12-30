describe('API Test Suite - Batch 3', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  it('Test 21: Verify DELETE with malformed authorization header', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'invalid-format'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 22: Verify appropriate error for DELETE on invalid endpoint', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/invalid/2',
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

  it('Test 23: Verify user is actually deleted after DELETE operation', () => {
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
      cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/users/2',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1'
        },
        failOnStatusCode: false
      }).then((getResponse) => {
        expect(getResponse.status).to.eq(404);
      });
    });
  });

  it('Test 24: Verify DELETE response time is acceptable', () => {
    const startTime = Date.now();
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/2',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      failOnStatusCode: false
    }).then((response) => {
      const responseTime = Date.now() - startTime;
      expect(responseTime).to.be.lessThan(2000);
      expect(response.status).to.eq(204);
    });
  });

  it('Test 25: Verify successful creation of new user with valid data', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Sam',
        job: 'Project Leader'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('name', 'Sam');
      expect(response.body).to.have.property('job', 'Project Leader');
    });
  });

  it('Test 26: Verify creation fails with missing required field name', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        job: 'Project Leader'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 27: Verify creation fails with missing required field job', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Sam'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 28: Verify creation fails when name is not string type', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 12345,
        job: 'Project Leader'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 29: Verify creation fails when job is not string type', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Sam',
        job: true
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 30: Verify both required fields name and job are validated', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });
});
