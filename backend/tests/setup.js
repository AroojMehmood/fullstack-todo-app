// Jest global setup — asli MongoDB Atlas se kabhi connect nahi karta,
// har test run ke liye ek temporary in-memory database banata hai.
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;

beforeAll(async () => {
  process.env.JWT_SECRET = "test-jwt-secret-not-for-production";
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

// Har test ke baad saara data clear kar do — taake tests ek doosre ko affect na karein
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});