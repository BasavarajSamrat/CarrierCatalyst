

const Service = require("../models/serviceModel");

const service = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response || response.length === 0) { // Check if response is empty
            return res.status(404).json({ msg: "No service found" });
        }
        return res.status(200).json({ msg: "Service found", data: response });
    } catch (error) {
        console.error(`Error from the server: ${error.message}`);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = service;
