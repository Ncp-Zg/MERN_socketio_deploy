const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    fav: [],

    incomingOrders: [
      {
        orderId:{
            type: mongoose.Schema.ObjectId,
            ref:"Orders"
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        toWho: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
        },
        amount:{
            type:Number,
            required:true,
        },
        prepared:{
            type:Boolean,
            required:true
        },
        cargotracknumber:{
            type:String,
        },
        orderedAt:{
            type:String
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", userSchema);

module.exports = User;
