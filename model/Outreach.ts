import mongoose from "mongoose";
import regex from "@/utils/regex";

const outreachSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "A server error has occured"],
    },
    type: {
      type: String,
      enum: ["call", "email", "creative"],
      required: [true, "A server error has occured"],
    },
    description: {
      type: String,
      required: true,
      minLength: [1, "Description must be longer"],
    },
    emailSubject: {
      type: String,
      required: false,
    },
    emailBody: {
      type: String,
      required: false,
      minLength: [1, "Email body must be longer"],
    },
    imageUrl: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return regex.url.test(v);
        },
        message: (props) => `File upload does not have valid URL`,
      },
    },
    audioFileUrl: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return regex.url.test(v);
        },
        message: (props) => `File upload does not have valid URL`,
      },
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
  },
  {
    versionKey: false,
  }
);

const Outreach =
  mongoose.models.Outreach || mongoose.model("Outreach", outreachSchema);

export default Outreach;
