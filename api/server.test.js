const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

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

    const res = await request(server).post("/api/auth/register").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("username", newUser.username);
    expect(res.body).toHaveProperty("password");
    expect(res.body).toHaveProperty("id");
  });
  it('should return 400 status and "username and password required" message when missing username or password', async () => {
    const noUsername = { password: "foobar" };
    const noPassword = { username: "Captain Marvel" };

    const res1 = await request(server)
      .post("/api/auth/register")
      .send(noUsername);

    const res2 = await request(server)
      .post("/api/auth/register")
      .send(noPassword);

    expect(res1.status).toBe(400);
    expect(res1.body).toHaveProperty(
      "message",
      "username and password are required"
    );

    expect(res2.status).toBe(400);
    expect(res2.body).toHaveProperty(
      "message",
      "username and password are required"
    );
  });
  it('should return 400 status and "username taken" message when trying to register with an already taken username', async () => {
    // step 1: define a user object with a username and password
    // Step 2: Use supertest to send a POST request to register the user
    // Step 3: Use supertest to send another POST request with the same user object
    // Step 4: Assert that the status code is 400 and the error message is "username taken"
  });
});
