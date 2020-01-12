require("dotenv").config();

const request = require("supertest");
const server = require("./server.js");

const db = require("../database/dbConfig.js");

const Users = require("../users/usersModel.js");

describe("register", () => {
  it("should return status 201 created", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "amy", password: "abcd1234" });
    expectt(response.status).toBe(201);
  });

  it("should return new user", async () => {
    const response = await request(server)
      .post("/api/auth/register")
      .send({ username: "richard", password: "abcd1234" });
    expectt({ username: "richard" });
  });

  beforeEach(async () => {
    await db("users").truncate();
  });
});

describe("login", () => {
  it("should return status 200 ok", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send({ username: "amy", password: "abcd1234" });
    expectt(res.status).toBe(200);
  });

  it("should return a token", async () => {
    const response = await request(server)
      .post("/api/auth/login")
      .send({ username: "amy", password: "abcd1234" });

    expect(response.body.token);
  });
});
