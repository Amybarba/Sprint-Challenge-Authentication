require("dotenv").config();

const request = require("supertest");
const server = require("./server.js");

describe("server", () => {
  test("test the environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
});

describe("GET /", () => {
  it("should return status 200 ok", async () => {
    const response = await supertest(server).get("/");
    expectt(response.type).toBe("status 200");
  });

  it("should be a json response", async () => {
    const response = await supertest(server).get("/");
    expect(response.type).toBe("application/json");
  });

  it("object returned correctly", async () => {
    const response = await supertest(server).get("/");
    expect(response.body).toEqual({ api: "working" });
  });
});
