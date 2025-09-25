"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Sale = require("../models/sale");
const Product = require("../models/product");
const CustomError = require("../helpers/customError");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "List Sales"
            #swagger.description = `
                You can use <u> filter[] & search[] & sort[] & page & limit </u> queries with endpoint.
                <ul>
                    <li> URL/?<b>filter[field1]=value1&filter[field2]=value2</b> </li>
                    <li> URL/?<b>search[field1]=value1&search[field2]=value2</b> </li>
                    <li> URL/?<b>sort[field1]=value1&sort[field2]=value2</b> </li>
                    <li> URL/?<b>page=1&limit=10</b> </li>
                </ul>
            `
        */

    const result = await res.getModelList(Sale, {}, [
      "userId",
      "brandId",
      "productId",
    ]);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Sale),
      result,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Create Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{ $ref: "#/definitions/Sale" }
            }
        */

    const { productId } = req.body;

    const { brandId, quantity: Pquantity } = await Product.findById(productId)
      .select("brandId quantity -_id")
      .lean(); // {brandId}

    if (!brandId)
      throw new CustomError("The product you are looking is not found.", 404);

    if (Pquantity < req.body.quantity)
      throw new CustomError(
        `There is no enough product-quantity for this sale. Current Quantity: ${Pquantity}`,
        400
      );

    req.body.userId = req.user._id;
    req.body.brandId = brandId;
    const result = await Sale.create(req.body);

    if (result) {
      // Update product quantity
      await Product.findByIdAndUpdate(result.productId, {
        $inc: { quantity: -result.quantity },
      });
    }

    res.status(201).send({
      error: false,
      result,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Get Single Sale"
        */

    const result = await Sale.findById(req.params.id).populate([
      "userId",
      "brandId",
      "productId",
    ]);

    res.status(200).send({
      error: false,
      result,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Update Sale"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema:{ $ref: "#/definitions/Sale" }
            }
        */

    if (req.body.quantity) {
      const currentSale = await Sale.findById(req.params.id);
      // calculate differnce
      const difference = req.body.quantity - currentSale.quantity;

      // update product with difference
      const { modifiedCount } = await Product.updateOne(
        { _id: currentSale.productId, quantity: { $gte: difference } },
        {
          $inc: { quantity: -difference },
        }
      );

      if (!modifiedCount)
        throw new CustomError(
          `There is no enough product-quantity for this sale.`,
          400
        );
    }

    const result = await Sale.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!result)
      throw new CustomError(
        "Update failed, data is not found or already updated",
        404
      );

    res.status(202).send({
      error: false,
      result,
    });
  },

  dlt: async (req, res) => {
    /*
            #swagger.tags = ["Sales"]
            #swagger.summary = "Delete Single Sale"
        */

    const result = await Sale.findByIdAndDelete(req.params.id);

    if (!result)
      throw new CustomError(
        "Delete failed, data is not found or already deleted",
        404
      );

    res.status(200).send({
      error: false,
      result,
    });
  },
};