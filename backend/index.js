const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const postgreSQLClient = new PrismaClient();

app.use(cors());

app.get("/backpacks", async (_request, response, next) => {
  try {
    const backpacks = await postgreSQLClient.backpack.findMany();
    if (backpacks && !backpacks?.length) {
      response.sendStatus(404);
      return next();
    }
    response.json(backpacks);
  } catch {
    response.sendStatus(500);
  }
});

app.get("/backpack/:id", async ({ params: { id } }, response, next) => {
  try {
    const parsedId = parseInt(id);
    const backpack = await postgreSQLClient.backpack.findUnique({
      where: {
        id: parsedId,
      },
    });
    if (!backpack) {
      response.sendStatus(404);
      return next();
    }
    response.json(backpack);
  } catch {
    response.sendStatus(500);
  }
});

app.get("/brands", async (_request, response, next) => {
  try {
    const brands = await postgreSQLClient.brand.findMany();
    if (brands && !brands?.length) {
      response.sendStatus(404);
      return next();
    }
    response.json(brands);
  } catch {
    response.sendStatus(500);
  }
});

app.get("/brand/:id", async ({ params: { id } }, response, next) => {
  try {
    const parsedId = parseInt(id);
    const brand = await postgreSQLClient.brand.findUnique({
      where: {
        id: parsedId,
      },
    });
    if (!brand) {
      response.sendStatus(404);
      return next();
    }
    response.json(brand);
  } catch {
    response.sendStatus(500);
  }
});

app.listen(5000);
