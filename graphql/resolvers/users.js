const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");
const { UserInputError } = require("apollo-server");
const { validateRegisterInput } = require("../../utils/validators");
module.exports = {
  Mutation: {
    register: async (
      parent,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) => {
      // TODO: Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        password,
        confirmPassword,
        email
      );
      if (!valid) {
        console.log(errors);
        throw new UserInputError("Errors", errors);
      }

      // TODO: make sure user doesnt already exist
      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      // TODO: hashing and auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        username,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = jwt.sign(
        {
          email: res.email,
          id: res.id,
          username: res.username,
        },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return { ...res._doc, id: res.id, token };
    },
  },
};
