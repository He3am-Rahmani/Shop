const products = require("../models/products");
const Products = require("../models/ProductsModel");
const db = require("mongodb");

const getAllProducts = async (req, res, next) => {
  let data;
  data = await Products.find({});

  await res.json(data);
};
const deleteProduct = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    const existed = await Products.findOne({ name: req.body.name });
    if (existed) {
      await Products.deleteOne({ name: req.body.name });
      res.json({
        message: {
          message: `${req.body.name} Product Deleted From Your DB`,
          type: "success",
        },
      });
    } else {
      res.json({
        message: { message: "Product NOT EXist", type: "failed" },
        data: {},
      });
    }
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
  next();
};

const createProduct = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    if (await Products.findOne({ name: req.body.name })) {
      res.json({
        message: {
          message: "Operation Failure We Have an Product With This Name",
          type: "failed",
        },
      });
    } else {
      const NewProduct = new Products({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        price: req.body.price,
      });

      await NewProduct.save();

      res.json({ message: { message: `Product Created`, type: "success" } });
    }
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
  next();
};

const updateProduct = async (req, res, next) => {
  if (req.body.key === "WHO_THE_HELL_IS_NO1") {
    // const foundedProduct = await Products.findById(req.body.prodId);

    // if (foundedProduct) {
    // } else {
    //   res.json({ message: "not founded" });
    // }
    await Products.findByIdAndUpdate(req.body.prodId, {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    });
    res.json({
      message: { message: "Product Updated Successfully", type: "success" },
      // data: foundedProduct,
    });
  } else {
    res.json({
      message: {
        message: "key is not correct your access denied, operation failur",
        type: "failed",
      },
    });
  }
  next();
};

const getProduct = async (req, res, next) => {
  const product = await Products.findById(req.params.id);

  res.send(product);
  next();
};

exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.deleteProduct = deleteProduct;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
