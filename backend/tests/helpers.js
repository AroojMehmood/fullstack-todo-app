const request = require("supertest");
const app = require("../app");

// Ek user create + login karke uska token wapas deta hai — baaki sab tests isko reuse karenge
const registerAndLogin = async (overrides = {}) => {
  const user = {
    name: "Test User",
    email: `user${Date.now()}${Math.random()}@example.com`,
    password: "password123",
    confirmPassword: "password123",
    ...overrides,
  };
  const res = await request(app).post("/api/auth/signup").send(user);
  return { token: res.body.token, user: res.body.user };
};

module.exports = { registerAndLogin, app };