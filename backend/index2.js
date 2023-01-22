const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const { parse } = require("csv-parse");
const postgreSQLClient = new PrismaClient();

const addBrands = async () => {
  fs.createReadStream("brands.csv")
    .pipe(parse({ delimiters: ",", from_line: 1 }))
    .on("data", async (row) => {
      console.log(row);
      await postgreSQLClient.brand.create({
        data: {
          id: parseInt(row[0]),
          name: row[1],
          headquarter: row[2],
          yearOfCreation: parseInt(row[3]),
        },
      });
    });
};
const addBackpack = async () => {
  fs.createReadStream("plecaki.csv")
    .pipe(parse({ delimiters: ",", from_line: 1 }))
    .on("data", async (row) => {
      console.log(row);
      await postgreSQLClient.backpack.create({
        data: {
          name: row[0],
          price: parseInt(row[1]),
          imageUrl: row[2],
          material: row[3],
          capacity: parseInt(row[4]),
          type: row[5],
          quantity: parseInt(row[6]),
          suspendedInStore: row[7] === "1",
          description: row[8],
          brandId: parseInt(row[9]),
        },
        include: { brand: true },
      });
    });
};

(async () => {
  await addBrands();
  await addBackpack();
})();
