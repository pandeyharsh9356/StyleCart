import Product from "../model/productModel.js"
import xss from "xss"


export const addProduct = async (req, res) => {
    try {
        let {
            name, description, exchange_rate, category, subCategory, sizes: reqSizes, bestseller,
            stock, tags, variations, market_baseline
        } = req.body

        if (!req.files || !req.files.image1) {
            return res.status(400).json({ message: "Primary image (image1) is required" })
        }

        if (Number(exchange_rate) <= 0) {
            return res.status(400).json({ error: "InvalidPricing", message: "Selling price must be greater than 0" })
        }

        if (market_baseline && Number(market_baseline) < Number(exchange_rate)) {
            return res.status(400).json({ error: "InvalidPricing", message: "Market baseline cannot be lower than exchange rate" })
        }

        // Sanitize string inputs to prevent XSS
        const safeName = name ? xss(name) : name;
        const safeDescription = description ? xss(description) : description;
        const safeCategory = category ? xss(category) : category;
        const safeSubCategory = subCategory ? xss(subCategory) : subCategory;

        let image1 = req.files && req.files.image1 ? '/uploads/products/' + req.files.image1[0].filename : "";
        let image2 = req.files && req.files.image2 ? '/uploads/products/' + req.files.image2[0].filename : "";
        let image3 = req.files && req.files.image3 ? '/uploads/products/' + req.files.image3[0].filename : "";
        let image4 = req.files && req.files.image4 ? '/uploads/products/' + req.files.image4[0].filename : "";

        let parsedSizes = [];
        try {
            parsedSizes = reqSizes ? JSON.parse(reqSizes) : [];
        } catch (err) {
            return res.status(400).json({ message: "Invalid sizes format" });
        }

        if (!parsedSizes.length) {
            return res.status(400).json({ message: "At least one size is required" });
        }

        for (const item of parsedSizes) {
            if (!item.size || item.quantity < 0) {
                return res.status(400).json({ message: "Invalid size data" });
            }
        }

        let productData = {
            name: safeName,
            description: safeDescription,
            exchange_rate: Number(exchange_rate),
            market_baseline: market_baseline ? Number(market_baseline) : undefined,

            stock: stock ? Number(stock) : 0,
            category: safeCategory,
            subCategory: safeSubCategory,
            sizes: parsedSizes,
            tags: tags ? JSON.parse(tags) : [],
            variations: variations ? JSON.parse(variations) : [],
            bestseller: bestseller === "true" || bestseller === true ? true : false,
            date: Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData)

        return res.status(201).json(product)

    } catch (error) {
        console.error("AddProduct error:", error);
        return res.status(500).json({ message: "Internal Server Error during product creation" })
    }

}


export const listProduct = async (req, res) => {

    try {
        const product = await Product.find({});
        console.log("ListProduct: retrieved", product.length, "products");
        return res.status(200).json(product)

    } catch (error) {
        console.error("ListProduct error:", error);
        return res.status(500).json({ message: "Internal Server Error while fetching products" })
    }
}

export const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        return res.status(200).json(product)
    } catch (error) {
        console.error("SingleProduct error:", error);
        return res.status(500).json({ message: "Internal Server Error while fetching product" })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        let {
            name, description, exchange_rate, category, subCategory, sizes: reqSizes, bestseller,
            stock, tags, variations, market_baseline
        } = req.body

        // Fetch existing product to preserve images if not updated
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (Number(exchange_rate) <= 0) {
            return res.status(400).json({ error: "InvalidPricing", message: "Selling price must be greater than 0" })
        }

        if (market_baseline && Number(market_baseline) < Number(exchange_rate)) {
            return res.status(400).json({ error: "InvalidPricing", message: "Market baseline cannot be lower than exchange rate" })
        }

        // Sanitize string inputs to prevent XSS
        const safeName = name ? xss(name) : name;
        const safeDescription = description ? xss(description) : description;
        const safeCategory = category ? xss(category) : category;
        const safeSubCategory = subCategory ? xss(subCategory) : subCategory;

        let image1 = req.files && req.files.image1 ? '/uploads/products/' + req.files.image1[0].filename : existingProduct.image1
        let image2 = req.files && req.files.image2 ? '/uploads/products/' + req.files.image2[0].filename : existingProduct.image2
        let image3 = req.files && req.files.image3 ? '/uploads/products/' + req.files.image3[0].filename : existingProduct.image3
        let image4 = req.files && req.files.image4 ? '/uploads/products/' + req.files.image4[0].filename : existingProduct.image4

        let parsedSizes = [];
        try {
            parsedSizes = reqSizes ? JSON.parse(reqSizes) : [];
        } catch (err) {
            return res.status(400).json({ message: "Invalid sizes format" });
        }

        if (!parsedSizes.length) {
            return res.status(400).json({ message: "At least one size is required" });
        }

        for (const item of parsedSizes) {
            if (!item.size || item.quantity < 0) {
                return res.status(400).json({ message: "Invalid size data" });
            }
        }

        let updatedData = {
            name: safeName,
            description: safeDescription,
            exchange_rate: Number(exchange_rate),
            market_baseline: market_baseline ? Number(market_baseline) : undefined,

            stock: stock ? Number(stock) : 0,
            category: safeCategory,
            subCategory: safeSubCategory,
            sizes: parsedSizes,
            tags: tags ? JSON.parse(tags) : [],
            variations: variations ? JSON.parse(variations) : [],
            bestseller: bestseller === "true" || bestseller === true ? true : false,
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        return res.status(200).json(product)

    } catch (error) {
        console.error("UpdateProduct error:", error);
        return res.status(500).json({ message: "Internal Server Error during product update" })
    }
}

export const removeProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        return res.status(200).json(product)
    } catch (error) {
        console.error("RemoveProduct error:", error);
        return res.status(500).json({ message: "Internal Server Error during product removal" })
    }

}
