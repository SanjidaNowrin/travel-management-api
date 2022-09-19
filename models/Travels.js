const mongoose = require("mongoose");

const travelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this travel package..."],
      trim: true, //space remove
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: {
        //enum predefined value r jonno
        values: [
          "Adventure",
          "Photography",
          "Solo Travelers",
          "Family Travel",
          "Other",
        ],
        message:
          "unit value can't be {VALUE},must be Adventure/Photography/Solo Travelers/Family Travel/Other",
      },
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["approved", "reject"],
        message: "status can't be {VALUE}",
      },
    },
  },
  {
    timestamps: true, //mongoose option
  }
);

// mongoose middlewares for saving data:pre/post

// before saving data
// travelSchema.pre("save", function (next) {
//   console.log("Before saving data");
//   if (this.quantity == 0) {
//     this.status = "reject";
//   }
//   next();
// });

// after saving data

// travelSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

travelSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

//schema ->Model ->Query
const Travel = mongoose.model("Travel", travelSchema);
module.exports = Travel;
