const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { 
    type: string,
    trim: true,
    required: [true, "Name is required"],
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
