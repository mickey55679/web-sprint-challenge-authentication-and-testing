const request = require("supertest");
const server = require("./server");
const db = require('../data/dbConfig')

test("sanity", () => {
  expect(true).toBe(true);
});
beforeEach(async () => {
  await db("users").truncate(); 
});
jest.setTimeout(10000);

describe("[POST] /api/auth/register", () => {
  it("should return 201 status on successful registration", async () => {
    const newUser = { username: "Captain", password: "foobar" };

    const res = await request(server)
    .post('/api/auth/register')
    .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("username", newUser.username);
    expect(res.body).toHaveProperty("password");
    expect(res.body).toHaveProperty("id");
  });
});
