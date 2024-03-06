require("dotenv").config();
const Airtable = require("airtable");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;

  if (id) {
    try {
      const product = await base("retail").find(id);
      console.log(product);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        };
      }
      const {
        name,
        price,
        images,
        desc,
        category,
        company,
        featured,
        stars,
        reviews,
        stock,
      } = product.fields;
      const url = images[0].url;

      const singleProduct = {
        id,
        url,
        name,
        images,
        price,
        desc,
        category,
        company,
        featured,
        stars,
        reviews,
        stock,
      };

      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(singleProduct),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`,
      };
    }
  }
  try {
    const records = await base("retail").select().all();
    const products = records.map((product) => {
      const { id } = product;
      const { name, price, images, desc, category, company, featured } =
        product.fields;
      const url = images[0].url;
      return {
        id,
        url,
        name,
        images,
        price,
        desc,
        category,
        company,
        featured,
      };
    });
    return (
      null,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(products),
      }
    );
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
