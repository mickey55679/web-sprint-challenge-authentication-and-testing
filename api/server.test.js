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
    const userObject = { username: "Caleb", password: "abcde" };
    // Step 2: Use supertest to send a POST request to register the user
    const resOne = await request(server)
      .post("/api/auth/register")
      .send(userObject);
    // Step 3: Use supertest to send another POST request with the same user object
    const resTwo = await request(server)
      .post("/api/auth/register")
      .send(userObject);
    // Step 4: Assert that the status code is 400 and the error message is "username taken"
    expect(resTwo.status).toBe(400);
    expect(resTwo.body).toHaveProperty("message", "username taken");
  });
});
describe("[POST] /api/auth/login", () => {
  
  beforeEach(async () => {
    const user = { username: "Captain Marvel", password: "foobar" };
    await request(server).post("/api/auth/register").send(user);
  });

  it("should require a username and password", async () => {
    // define two objects
    const noUsername = { password: "foobar" };
    const noPassword = { username: "Captain Marvel" };
    // send requests
    const res1 = await request(server).post("/api/auth/login").send(noUsername);
    const res2 = await request(server).post("/api/auth/login").send(noPassword);
    //Assert
    expect(res1.status).toBe(400);
    expect(res1.body).toHaveProperty(
      "message",
      "username and password required"
    );

    expect(res2.status).toBe(400);
    expect(res2.body).toHaveProperty(
      "message",
      "username and password required"
    );
  });
  it('on successful login the response body should have "message" and "token"', async () => {
    //setup
    const login = { username: "Captain Marvel", password: "foobar" };
    // send request
    const res = await request(server).post('/api/auth/login').send(login)
    //Assert
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('token')
  });
});
