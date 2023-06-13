import * as supertest from "supertest";
import app from "../server";
import { OrderTable } from "../models/orders";
const request = supertest(app);
let order = new OrderTable();
describe("Test order values", () => {
  it("get get-orders  retarn value", async () => {
    const response = await order.index();
    expect(response[0]).toEqual({ id: 1, stutas: false, user_id: 1 });
  });
  it("get show-order  retarn value", async () => {
    const response = await order.show(5);
    expect(response).toEqual({ id: 5, stutas: true, user_id: 8 });
  });
  it("post create-order  retarn value", async () => {
    const response = await order.add({
      user_id: 5,
      stutas: false
    });
    expect(response).toEqual({ id: 16, user_id: 5, stutas: false });
  });

  it("patch update-order  value", async () => {
    const response = await order.update({
        user_id: 3
      },1)
    expect(response).toEqual({ user_id: 3 });
  });
});

describe("Test order responses", () => {
  it("get get-orders endpoint to be 200", async () => {
    const response = await request.get("/get-orders");
    expect(response.status).toBe(200);
  });
  it("get show-order with invalid query endpoint to be 404", async () => {
    const response = await request.get("/show-order/555");
    expect(response.status).toBe(404);
  });
  it("get show-order with valid query endpoint to be 200", async () => {
    const response = await request.get("/show-order/5");
    expect(response.status).toBe(200);
  });
  it("post create-order with Unauthorized and valid body endpoint to be 401", async () => {
    const response = await request.post("/create-order").send({
      products_id: [8, 15],
      user_id: 5,
      stutas: false,
      orderDate: "23/06/2013"
    });
    expect(response.status).toBe(401);
  });
  it("post create-order with authorized and  valid body  endpoint to be 200", async () => {
    const response = await request
      .post("/create-order")
      .send({
        user_id: 5,
        stutas: false
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(200);
  });
  it("post create-order with authorized and unvalid body  endpoint to be 400", async () => {
    const response = await request
      .post("/create-order")
      .send({
        products_id: [8, 15],
        user_id: 5
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(400);
  });
  it("patch update-order with Unauthorized  and  valid body endpoint to be 401", async () => {
    const response = await request.patch("/update-order/4").send({
      user_id: 3
    });
    expect(response.status).toBe(401);
  });
  it("patch update-order with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .patch("/update-order/4")
      .send({
        user_id: 3
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(200);
  });
  it("delete delete-order with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .delete("/delete-order/4")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(200);
  });
});
