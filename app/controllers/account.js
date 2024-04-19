const Account = require("../models/account");

exports.getAllAccount = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.auth.userId });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAccount = async (req, res) => {
  try {
    const account = await Account.findOne({
      _id: req.params.id,
      userId: req.auth.userId,
    });
    if (!account) {
      return res.status(404).json({
        status: "error",
        message: "No account found with that ID for the current user",
      });
    }
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

exports.addAccount = async (req, res) => {
  try {
    const { bankName, customName } = req.body;
    const account = new Account({
      bankName,
      customName,
      userId: req.auth.userId,
    });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({
      message:
        err.message ||
        "Something wrong happened with your request to create a new account.",
    });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const { bankName, customName } = req.body;
    const account = await Account.findOneAndUpdate(
      { _id: req.params.id, userId: req.auth.userId },
      {
        bankName,
        customName,
      },
      { new: true, runValidators: true }
    );

    if (!account) {
      return res.status(404).json({
        status: "error",
        message: "No account found with that ID for the current user",
      });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      _id: req.params.id,
      userId: req.auth.userId,
    });

    if (!account) {
      return res.status(404).json({
        status: "error",
        message: "No account found with that ID for the current user",
      });
    }

    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
