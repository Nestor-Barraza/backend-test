import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../Domain/index";
import { REGEX_EMAIL, JWT_SIGNATURE } from "utils/constants";

import { NOT_MATCH_CREDENTIALS, NOT_VALID_EMAIL } from "utils/errors";

module.exports = async ({ body: { email, password } }, res) => {
  //Validations

  if (!REGEX_EMAIL.test(email)) {
    console.log(NOT_VALID_EMAIL);
    res.status(400).json(NOT_VALID_EMAIL);
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      //Match password
      const matchPassword = await bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        //User props
        const { _id, full_name, NIT, role, phone } = user;

        //Access token
        const access_token = jwt.sign(
          { _id, full_name, NIT, role, email, phone },
          JWT_SIGNATURE,
          { expiresIn: "30m" }
        );
        //Refresh token
        const refresh_token = jwt.sign(
          { _id, full_name, NIT, role, email, phone },
          JWT_SIGNATURE,
          { expiresIn: "1d" }
        );

        res.status(200).send({ access_token, refresh_token });
      } else {
        res.status(401).send(NOT_MATCH_CREDENTIALS);
      }
    } else {
      res.status(401).send(NOT_MATCH_CREDENTIALS);
    }
  } catch ({ name, message }) {
    console.log({
      message,
      code: name,
    });
    res.json({
      message,
      code: name,
    });
  }
};
