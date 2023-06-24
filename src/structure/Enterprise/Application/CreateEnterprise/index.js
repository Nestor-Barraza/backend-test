import Enterprise from "../../Domain/index";
import { v4 as uuidv4 } from "uuid";
import { ACCESS_DENIED } from "utils/errors";

//New Enterprise
module.exports = async (
  { body: { name, address, phone }, user: { _id, role } },
  res
) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(ACCESS_DENIED);
  try {
    const newEnterprise = await new Enterprise({
      name,
      NIT: uuidv4(),
      address,
      phone,
      userId: _id,
    });
    await newEnterprise.save();
    res.json(newEnterprise);
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
