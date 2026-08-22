const request = require("supertest");
const { app, registerAndLogin } = require("./helpers");

describe("Project & Task API", () => {
  test("POST /api/projects — creates a project for the authenticated user (happy path)", async () => {
    const { token } = await registerAndLogin();
    const res = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Capstone Project" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Capstone Project");
  });

  test("GET /api/projects — returns only the logged-in user's projects (data isolation)", async () => {
    const userA = await registerAndLogin();
    const userB = await registerAndLogin();

    await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userA.token}`)
      .send({ title: "User A Project" });

    await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userB.token}`)
      .send({ title: "User B Project" });

    const res = await request(app)
      .get("/api/projects")
      .set("Authorization", `Bearer ${userA.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe("User A Project");
  });

  test("PUT /api/projects/:id — a user cannot update another user's project (authorization)", async () => {
    const userA = await registerAndLogin();
    const userB = await registerAndLogin();

    const created = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${userA.token}`)
      .send({ title: "Private to A" });

    const res = await request(app)
      .put(`/api/projects/${created.body.id}`)
      .set("Authorization", `Bearer ${userB.token}`)
      .send({ title: "Hacked" });

    expect(res.status).toBe(404);
  });

  test("POST /api/tasks — rejects task with no project reference (validation)", async () => {
    const { token } = await registerAndLogin();
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Orphan Task" });
    expect(res.status).toBe(400);
  });

  test("POST /api/tasks — creates a task under an owned project (happy path)", async () => {
    const { token } = await registerAndLogin();
    const project = await request(app)
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Task Test Project" });

    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Write README", project: project.body.id, priority: "high" });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Write README");
    expect(res.body.priority).toBe("high");
  });
});