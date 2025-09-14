const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://devtinder:907j8pHScr5K75z1@devtinder.4nsa5qg.mongodb.net/";
const client = new MongoClient(url);

const dbName = "helloworld";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("users");

  const data = {
    firstName: "Elwin",
    lastName: "Binu Vargheese",
    city: "UAE",
  };

  await collection.insertOne(data);

  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
