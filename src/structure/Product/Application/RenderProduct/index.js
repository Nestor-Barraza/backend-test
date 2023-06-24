import Product from "structure/Product/Domain";

//Get product
module.exports = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
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
