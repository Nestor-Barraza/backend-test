import Enterprise from "../../Domain/index";
import { ACCESS_DENIED } from "utils/errors";

//Update Enterprise
module.exports = async (
  { body: { name, address, phone, NIT }, user: { role } },
  res
) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(ACCESS_DENIED);

  if (!name || !name || !phone || !address) {
    return res.status(400).json({
      message: "You can not update leaving fields empty",
      code: "EMPTY_FIELDS",
    });
  } else {
    try {
      //Update
      const getEnterprise = await Enterprise.find({ NIT });
      if (getEnterprise) {
        const updateEnterprise = await Enterprise.updateOne(
          { NIT },
          {
            name,
            address,
            phone,
          }
        );
        if (updateEnterprise) {
          return res.json({
            message: "company successfully updated",
            code: "UPDATE_SUCCESSFULL",
          });
        }
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
};
