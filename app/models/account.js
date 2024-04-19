const mongoose = require("mongoose");
const AccountLine = require("./accountline");
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

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  lastUpdated: {
    type: Date,
  },
});

accountSchema.pre("save", function (next) {
  this.lastUpdated = Date.now();
  next();
});

accountSchema.pre("findOneAndUpdate", function (next) {
  this.set({ lastUpdated: Date.now() });
  next();
});

// middleware qui supprime les lignes de compte quand je supprime le compte
accountSchema.pre("findOneAndDelete", async function (next) {
  try {
    const accountId = this.getQuery()["_id"];
    await AccountLine.deleteMany({ account: accountId });
    next();
  } catch (error) {
    next(error);
  }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
