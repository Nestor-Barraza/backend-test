import User from "../../Domain/index";
import { REGEX_EMAIL, PASSWORD_REGEX, PHONE_REGEX } from "utils/constants";
import {
  NOT_VALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_PHONE,
  EMAIL_ALREADY_IS_REGISTERED,
} from "utils/errors";

//Controller
module.exports = async (
  { body: { full_name, NIT, role, phone, email, password } },
  res
) => {
  switch (true) {
    case !PASSWORD_REGEX.test(password): {
      console.log(INVALID_PASSWORD);
      return res.status(400).json(INVALID_PASSWORD);
    }

    case !REGEX_EMAIL.test(email): {
      console.log(NOT_VALID_EMAIL);
      return res.status(400).json(NOT_VALID_EMAIL);
    }
    case !PHONE_REGEX.test(phone): {
      console.log(INVALID_PHONE);
      return res.status(400).json(INVALID_PHONE);
    }

    default:
      {
        const findUserInDatabase = await User.find({ email });
        if (findUserInDatabase) {
          res.json(EMAIL_ALREADY_IS_REGISTERED);
        } else {
          try {
            const newUser = new User({
              full_name,
              NIT,
              role,
              email,
              phone,
              password,
            });
            const createUser = await newUser.save();
            if (createUser) {
              res.status(200).json({
                message: "Successfully registered user",
                code: "ACCOUNT_REGISTERED",
              });
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
        }
      }
      break;
  }
};
