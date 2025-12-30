describe('API Test Suite - Batch 5', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
  });

  it('Test 41: Verify POST with incorrect Content-Type header', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'text/plain',
        'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify({
        name: 'Frank',
        job: 'Supervisor'
      }),
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(415);
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('Test 42: Verify POST with malformed authorization header', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'malformed-auth'
      },
      body: {
        name: 'Grace',
        job: 'Lead'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 43: Verify request body matches UserCreate schema', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Henry',
        job: 'Coordinator'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.be.an('object');
    });
  });

  it('Test 44: Verify error response for malformed JSON in request body', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: '{name: Sam job: Leader}',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
    });
  });

  it('Test 45: Verify custom error messages for validation failures', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: null,
        job: null
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.headers['content-type']).to.include('application/json');
      expect(response.body).to.have.property('error');
    });
  });

  it('Test 46: Verify POST response time is acceptable', () => {
    const startTime = Date.now();
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: {
        name: 'Ivy',
        job: 'Specialist'
      },
      failOnStatusCode: false
    }).then((response) => {
      const responseTime = Date.now() - startTime;
      expect(responseTime).to.be.lessThan(2000);
      expect(response.status).to.eq(201);
    });
  });
});
