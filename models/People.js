const { default: mongoose } = require("mongoose");

const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user", // will be saved as user role
    },
  },
  {
    timestamps: true, // it will track the time of operations with data  in database
  }
);

const People = mongoose.model("People", peopleSchema);
// created the "People" named collection(to store data) , which will follow people schema

module.exports = People;
