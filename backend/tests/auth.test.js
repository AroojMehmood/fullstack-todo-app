const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  const validUser = {
    name: "Arooj Mehmood",
    email: "arooj-test@example.com",
    password: "password123",
    confirmPassword: "password123",
  };

  test("POST /api/auth/signup — creates a new user and returns a token (happy path)", async () => {
    const res = await request(app).post("/api/auth/signup").send(validUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user).not.toHaveProperty("password");
  });

  test("POST /api/auth/signup — rejects mismatched passwords (validation)", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ ...validUser, confirmPassword: "different123" });
    expect(res.status).toBe(400);
  });

  test("POST /api/auth/signup — rejects duplicate email", async () => {
    await request(app).post("/api/auth/signup").send(validUser);
    const res = await request(app).post("/api/auth/signup").send(validUser);
    expect(res.status).toBe(400);
  });

  test("POST /api/auth/login — logs in with correct credentials (happy path)", async () => {
    await request(app).post("/api/auth/signup").send(validUser);
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: validUser.password });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /api/auth/login — rejects wrong password", async () => {
    await request(app).post("/api/auth/signup").send(validUser);
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: "wrongpassword" });
    expect(res.status).toBe(401);
  });
});