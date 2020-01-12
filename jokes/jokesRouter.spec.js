const request = require("supertest");
const server = require("../api/server.js");

describe("jokes router", () => {
  it("should return status 401 unauthorized", async () => {
    const response = await request(server).get("/api/jokes");
    console.log(response.status);
    expect(response.status).toBe(401);
  });
  it("should be a json response", async () => {
    const response = await request(server).get("/api/jokes");

    expect(response.type).toBe("application/json");
  });
});
