const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://gofood-mdb:Newton123$@cluster0.davsgoc.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();

    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const catData = await foodCategory.find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;

    console.log("Data fetched and stored globally");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data", err);
  }
};

module.exports = mongoDB;
