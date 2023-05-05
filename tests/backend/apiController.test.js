const request = require('supertest');
const app = require('../../backend/server');

describe('API Controller', () => {
  test('Should return route data', async () => {
    const response = await request(app)
      .post('/api/get-route')
      .send({ startLocation: 'New York, NY', endLocation: 'Los Angeles, CA' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('routes');
  });
});


describe('View Controller', () => {
    test('should render the home page', async () => {
      const response = await request(app).get('/');
      if (response.statusCode !== 200) {
        console.error('Error:', response.text);
      }
      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('id="start-location"');
      expect(response.text).toContain('id="end-location"');
    });
  })
