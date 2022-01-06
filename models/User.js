const { Schema, model } = require("mongoose");
var validateEmail = function (email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

const userSchema = new Schema(
  {
    // TODO: create username field
    username: [
      {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
    ],
    // TODO: create email field
    email: [
      {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, "Please enter a valid email address."],
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
