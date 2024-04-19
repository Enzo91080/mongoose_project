const mongoose = require("mongoose");

const accountLineSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, "Label is required"],
    trim: true,
    minlength: [2, "Label must be at least 2 characters long"],
    maxlength: [50, "Label must be at most 50 characters long"],
  },

  type: {
    type: String,
    enum: {
      values: ["credit", "debit"],
      message: "Value must be credit or debit",
    },
    required: [true, "Type is required"],
    trim: true,
  },

  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount must be positive"],
  },

  date: {
    type: Date,
    required: [true, "Date is required"],
  },

  method: {
    type: String,
    enum: {
      values: ["cash", "check", "credit card", "debit card"],
      message: "Value must be cash, check, credit card or debit card",
    },
    required: [true, "La méthode est obligatoire"],
  },

  isPassed: {
    type: Boolean,
    default: false,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },

  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: [true, "Account is required"],
  },

  lastUpdated: {
    type: Date,
  },
});

accountLineSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

accountLineSchema.pre("findOneAndUpdate", function (next) {
  this.set({ lastUpdated: Date.now() });
  next();
});


const AccountLine = mongoose.model("AccountLine", accountLineSchema);

module.exports = AccountLine;
