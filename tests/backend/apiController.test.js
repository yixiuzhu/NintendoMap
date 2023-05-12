const request = require("supertest");
const app = require("../../backend/server");

describe("API Controller", () => {
  test("Should return route data", async () => {
    const response = await request(app)
      .post("/api/get-route")
      .send({
        origin:
          "Providence Christian College, East Walnut Street, Pasadena, CA, USA",
        destination: "Kaiser Permanente Southern California Regional Offices, East Walnut Street, Pasadena, CA, USA",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("bounds");
  });

  test("Should throw an error when origin is not provided", async () => {
    const response = await request(app)
      .post("/api/get-route")
      .send({ destination: "Kaiser Permanente Southern California Regional Offices, East Walnut Street, Pasadena, CA, USA" });
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
  
  test("Should throw an error when destination is not provided", async () => {
    const response = await request(app)
      .post("/api/get-route")
      .send({ origin: "Providence Christian College, East Walnut Street, Pasadena, CA, USA" });
    
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("message");
  });  
});

describe("View Controller", () => {
  test("should render the home page", async () => {
    const response = await request(app).get("/");
    if (response.statusCode !== 200) {
      console.error("Error:", response.text);
    }
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('id="start-location"');
    expect(response.text).toContain('id="end-location"');
  });

  test("should return 404 for non-existent page", async () => {
    const response = await request(app).get("/non-existent-page");
    expect(response.statusCode).toBe(404);
  });
});
