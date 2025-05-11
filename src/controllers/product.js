const axios = require('axios');
const Price = require('../models/price');

// get product by id
const getProductById = async (req, res) => {

    const id = Number(req.params.id);

    try {
        console.log(`Request received for product ID: ${id}`);

        const response = await axios.get(`${process.env.FAKE_STORE_API_URL}products/${id}`);

        console.log("Fetched external product:", response.data);

        const price = await Price.findOne({ productId: id });

        console.log("Fetched price from DB:", price);

        return res.json({
            id: response.data.id,
            title: response.data.title,
            current_price: price
                ? { value: price?.value, currency_code: price?.currency_code }
                : null
        });

    } catch (error) {

        console.error("ERROR in getProductById:", error.message, error);

        res.status(500).json({ message: "Error in fetching product" });
    }
};


// update product price
const updateProductPrice = async (req, res) => {
    const id = Number(req.params.id);
    const { current_price } = req.body;

    try {
        const updated = await Price.findOneAndUpdate(
            { productId: id },
            { ...current_price, productId: id },
            { upsert: true, new: true }
        );

        return res.json({ message: 'Price updated', data: updated });
    } catch (error) {
        res.status(500).json({ message: 'Error in updating price' });
    }
};

module.exports = { getProductById, updateProductPrice };