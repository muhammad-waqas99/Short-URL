const mongoose = require("mongoose");
const validator =require('validator');
const { validate } = require("./user");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: [true, 'URL is required'],
      validate:[validator.isURL, "Enter the valid URL"]
    },
    visitHistory: [{ timestamp: { type: Number } }],
    
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const URL =new mongoose.model('URL', urlSchema);

module.exports =URL;