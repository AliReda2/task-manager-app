import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { server } from "../src/server"; 
import request from "supertest";

let mongoServer: MongoMemoryServer | null = null; // Initialize with null

beforeAll(async () => {
  // Check if mongoose is already connected, if so, don't reconnect
  if (mongoose.connection.readyState === 0) {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  }
});

afterAll(async () => {
  await mongoose.disconnect(); // Close mongoose connection
  server.close(); // Close the server to stop the TCP connection
});

describe("Task API", () => {
  let taskId: string;

  // Test GET /tasks
  it("should fetch all tasks", async () => {
    const response = await request(server).get("/tasks"); 
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test POST /tasks
  it("should create a new task", async () => {
    const newTask = {
      title: "Test task",
      description: "Test task description",
      status: false,
    };

    const response = await request(server)
      .post("/tasks")
      .send(newTask)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe(newTask.title);
    taskId = response.body._id;
  });

  // Test PUT /tasks/:id
  it("should update a task", async () => {
    const updatedTask = {
      title: "Updated test task",
      description: "Updated description",
      status: true,
    };

    const response = await request(server)
      .put(`/tasks/${taskId}`)
      .send(updatedTask)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTask.title);
    expect(response.body.status).toBe(updatedTask.status);
  });

  // Test DELETE /tasks/:id
  it("should delete a task", async () => {
    const response = await request(server).delete(`/tasks/${taskId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Task deleted successfully"
    );
  });
});
