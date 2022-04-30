import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({});

const Account =
  mongoose.models.accounts || mongoose.model("accounts", accountSchema);

export { Account };
