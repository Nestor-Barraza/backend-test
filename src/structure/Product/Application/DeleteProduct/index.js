import Product from "../../Domain/index";
import { ACCESS_DENIED } from "utils/errors";

//Delete product
module.exports = async ({ params: { id }, user: { role } }, res) => {
  //Roles permission
  if (role !== "admin") return res.status(401).send(ACCESS_DENIED);

  try {
    const deleteProduct = await Product.deleteOne({ _id: id });
    if (deleteProduct) {
      res.json({
        message: "product successfully removed",
        code: "DELETE_PRODUCT",
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
};
