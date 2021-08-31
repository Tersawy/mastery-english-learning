const mongoose = require("mongoose")

const Schema = mongoose.Schema

const languageSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Language name is required"],
      minLength: [2, "Language must be greater than or equal 2 characters"],
      maxLength: [54, "Language must be less than or equal 54 characters"]
    },
    deleted_at: { type: Date, default: null }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Language", languageSchema)
