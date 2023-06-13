import * as supertest from "supertest";
import app from "../server";
import { UserTable } from "../models/users";
const request = supertest(app);
let user = new UserTable();
describe("Test user values", () => {
  it("check get-users endpoint retarn value", async () => {
    const response = await user.index()
    expect(Object.keys(response[0])).toEqual([
      "id",
      "firstname",
      "lastname",
      "password",
      "email",
      "gender",
      "username"
    ]);
  });
  it("check show-user endpoint retarn value", async () => {
    const response = await user.show(5)
    let match = 0;
    let values = [
      5,
      "Mavis",
      "Schultz",
      ,
      "kmeus4@upenn.edu",
      "male",
      "kmeus4"
    ];
    let res = Object.values(response);
    for (let i = 0; i < res.length; i++) {
      if (values[i] === res[i]) {
        match += 1;
      }
    }
    expect(match).toBe(6);
  });
  it("check create-user endpoint retarn value", async () => {
    const response = await user.create({
      firstname: "Mavis",
      lastname: "Schultz",
      gender: "male",
      email: "kmeus4@upenn.edu",
      username: "kmedsasseus4",
      password: "fghfdhdfgh"
    });
    expect(Object.keys(response)).toEqual(["accessToken", "refreshToken"]);
  });
  it("check update-user endpoint retarn value", async () => {
    const response = await user.update({
        lastname: "Schulssstz",
        email: "kddddd4@upenn.edu"
      },8)
    expect(response).toEqual({
      lastname: "Schulssstz",
      email: "kddddd4@upenn.edu"
    });
  });
});

describe("Test user responses", () => {
  it("get get-users with Unauthorized endpoint to be 401", async () => {
    const response = await request.get("/get-users");
    expect(response.status).toBe(401);
  });
  it("get get-users with authorized endpoint to be 200", async () => {
    const response = await request
      .get("/get-users")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(200);
  });
  it("get show-user with Unauthorized and  invalid query endpoint to be 401", async () => {
    const response = await request.get("/show-user/555");
    expect(response.status).toBe(401);
  });
  it("get show-user with authorized valid query endpoint to be 200", async () => {
    const response = await request
      .get("/show-user/5")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(200);
  });
  it("post create-user with  valid body endpoint to be 200", async () => {
    const response = await request.post("/create-user").send({
      firstName: "Alison",
      lastName: "Reichert",
      gender: "female",
      email: "jtreleven5@nhs.uk",
      username: "jtregggffffleven5",
      password: "fghghfdh"
    });
    expect(response.status).toBe(200);
  });

  it("post create-user with authorized and unvalid body  endpoint to be 400", async () => {
    const response = await request.post("/create-user").send({
      lastName: "Reichert",
      gender: "female",
      username: "jtrdddeffffleven5",
      password: "fghghfdh"
    });
    expect(response.status).toBe(400);
  });
  it("patch update-user with Unauthorized  and  valid body endpoint to be 401", async () => {
    const response = await request.patch("/update-user/4").send({
      firstName: "Alison",
      lastName: "Reichert",
      gender: "female"
    });
    expect(response.status).toBe(401);
  });
  it("patch update-user with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .patch("/update-user/4")
      .send({
        firstName: "Alison",
        lastName: "Reichert",
        gender: "female"
      })
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(200);
  });
  it("delete delete-user with authorized and  valid body endpoint to be 200", async () => {
    const response = await request
      .delete("/delete-user/4")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJzaGF3ZTIiLCJpYXQiOjE2NzY4MTczNDYsImV4cCI6MTY3Njk5MDE0Nn0.S-o0HDruYndaBzgYENIr_vULBjC1SARzAm91neA7P3M"
      );
    expect(response.status).toBe(200);
  });
});
