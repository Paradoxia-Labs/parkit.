import request from "supertest";
import { app } from "../app";
import { describe, it, expect } from "@jest/globals";

describe("Parkit API Integration Tests", () => {
  describe("Health Check", () => {
    it("should return 200 OK for health endpoint", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
    });
  });

  describe("Companies Endpoints", () => {
    describe("POST /companies", () => {
      it("should reject invalid email", async () => {
        const res = await request(app).post("/companies").send({
          name: "Test Parking Co",
          email: "invalid-email",
        });
        expect([400, 401, 422]).toContain(res.status);
      });

      it("should reject missing name", async () => {
        const res = await request(app).post("/companies").send({
          email: "test@parking.com",
        });
        expect([400, 401, 422]).toContain(res.status);
      });
    });

    describe("GET /companies", () => {
      it("should list companies or return 401 if no auth", async () => {
        const res = await request(app).get("/companies");
        expect([200, 401]).toContain(res.status);
      });
    });
  });

  describe("Error Handling", () => {
    it("should return 404 for non-existent endpoint", async () => {
      const res = await request(app).get("/nonexistent");
      expect(res.status).toBe(404);
    });

    it("should return 401 for missing auth token on protected routes", async () => {
      const res = await request(app).get("/users");
      expect(res.status).toBe(401);
    });
  });
});


