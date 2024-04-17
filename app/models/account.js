const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
    trim: true,
  },

  customName: {
    type: String,
    required: [true, "Custom name is required"],
    trim: true,
    maxlength: [50, "Custom name must be at most 50 characters long"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  lastUpdated: {
    type: Date,
    required: [true, "Last updated is required"],
  },
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
