import Enterprise from "structure/Enterprise/Domain";
// Enterprise
module.exports = async (req, res) => {
  try {
    const allEnterprise = await Enterprise.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "NIT",
          foreignField: "enterpriseNIT",
          as: "products",
        },
      },
    ]);

    res.status(200).json(allEnterprise);
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
