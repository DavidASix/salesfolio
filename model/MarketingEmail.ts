import mongoose from "mongoose";
import regex from '@/utils/regex'

const marketingEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
      unique: true,
      validate: {
        validator: function (v: string) {
          return regex.email.test(v);
        },
        message: () => `Email format is invalid`,
      },
    },
    emailConsent: {
      type: Boolean,
      default: true,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

const MarketingEmail =
  mongoose.models.MarketingEmail || mongoose.model("MarketingEmail", marketingEmailSchema);

export default MarketingEmail;
