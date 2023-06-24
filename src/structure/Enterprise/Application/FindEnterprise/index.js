import Enterprise from "structure/Enterprise/Domain";
// Enterprise
module.exports = async ({ params: { NIT }, user: { _id, role } }, res) => {
  try {
    const enterprise = await Enterprise.aggregate([
      {
        $match: {
          NIT,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "NIT",
          foreignField: "enterpriseNIT",
          as: "products",
        },
      },
    ]);
    res.status(200).json(enterprise);
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
