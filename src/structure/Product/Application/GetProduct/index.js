import Product from "structure/Product/Domain";

//Get product
module.exports = async ({ params: { id } }, res) => {
  try {
    const product = await Product.findById(id);
    res.json(product);
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
