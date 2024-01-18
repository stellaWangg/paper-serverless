require("dotenv").config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appQp4gctUn5UfYPv")
  .table("retail");

exports.handler = async (event, context, cb) => {
  try {
    const { records } = await airtable.list();
    console.log(records);

    const products = records.map((product) => {
      const { id } = product;
      const { name, images, price, desc, category } = product.fields;
      // const url = images[0].url;
      return { id, name, images, price, desc, category };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
