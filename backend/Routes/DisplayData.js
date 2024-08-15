const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    const response = {
      foodItems: global.food_items,
      foodCategory: global.foodCategory,
    };
    res.status(200).send(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
