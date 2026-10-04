require("dotenv").config();

const db = require("./config/firebase");

async function testFirebase() {
  try {
    const snapshot = await db.collection("test").get();

    console.log("✅ Firebase connected successfully!");
    console.log("Documents:", snapshot.size);
  } catch (error) {
    console.error("❌ Firebase connection failed:");
    console.error(error);
  }
}

testFirebase();