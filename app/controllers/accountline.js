const AccountLine = require("../models/accountline");

exports.getAllAccountLine = async (req, res) => {
  try {
    const accountLines = await AccountLine.find({
      account: req.params.accountId,
    });
    res.status(200).json(accountLines);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getOneAccountLine = async (req, res) => {
  try {
    const accountLine = await AccountLine.findOne({
      _id: req.params.lineId,
      account: req.params.accountId,
    });

    if (!accountLine) {
      return res.status(404).json({
        status: "fail",
        message: "No accountLine found with that ID for the current account",
      });
    }

    res.status(200).json(accountLine);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.addAccountLine = async (req, res) => {
  try {
    const accountId = req.params.accountId;
    const { label, type, amount, date, method, category } = req.body;
    const accountLine = new AccountLine({
      label,
      type,
      amount,
      date,
      method,
      category,
      account: accountId,
    });
    await accountLine.save();
    res.status(201).json(accountLine);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

exports.updateAccountLine = async (req, res) => {
  try {
    const accountLine = await AccountLine.findOneAndUpdate(
      { _id: req.params.lineId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!accountLine) {
      return res.status(404).json({
        status: "error",
        message: "No account line found with that ID for the current account",
      });
    }

    res.status(200).json(accountLine);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

exports.deleteAccountLine = async (req, res) => {
  try {
    const accountLine = await AccountLine.findOneAndDelete({
      _id: req.params.lineId,
    });

    if (!accountLine) {
      return res.status(404).json({
        status: "fail",
        message: "No accountLine found with that ID for the current user",
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

exports.deleteAllAccountLine = async (req, res) => {
  try {
    await AccountLine.deleteMany({ account: req.params.accountId });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
