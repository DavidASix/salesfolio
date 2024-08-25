import mongoose from "mongoose";
import regex from '@/utils/regex'

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "A server error has occured"],
    },
    name: {
      type: String,
      required: false,
    },
    firstLogin: {
      type: Boolean,
      required: true,
      default: true,
    },
    emailConsent: {
      type: Boolean,
      default: true,
      required: true,
    },
    accountEmail: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return regex.url.test(v);
        },
        message: () => `Image URL Invalid`,
      },
    },
    username: {
      type: String,
      required: false,
      unique: true,
      minLength: [3, "Username must be 3 characters or longer"],
      maxLength: [128, "Username cannot be over 128 characters."],
      validate: {
        validator: function (v: string) {
          return regex.username.test(v);
        },
        message: () => `Username is invalid`,
      },
    },
    location: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    workHistory: {
      type: [{
        company: String,
        start: Date,
        end: Date,
      }],
      required: false
    },
    firstSalesYear: {
      type: Number,
      required: false,
      min: 1950,
      max: new Date().getFullYear(),
    },
    publicPhone: {
      type: String,
      required: false,
    },
    publicEmail: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return regex.email.test(v);
        },
        message: () => `Email format is invalid`,
      },
    },
    linkedinUrl: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return regex.url.test(v);
        },
        message: () => `Linkedin URL is invalid`,
      },
    },
    website: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return regex.url.test(v);
        },
        message: () => `Website URL is invalid`,
      },
    },
    twitter: {
      type: String,
      required: false,
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

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
