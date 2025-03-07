import Kid from "../models/kidModel.js";

// @desc   Get all kids
// @route  GET /api/kids
// @access Public
export const getAllKids = async (req, res) => {
    try {
        const kids = await Kid.find();
        res.json(kids);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Get a single kid by ID
// @route  GET /api/kids/:id
// @access Public
export const getKidById = async (req, res) => {
    try {
        const kid = await Kid.findById(req.params.id);
        if (!kid) return res.status(404).json({ message: "Kid not found" });
        res.json(kid);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// @desc   Add a new kid
// @route  POST /api/kids
// @access Public
export const addKid = async (req, res) => {
    try {
        const { name, parentName, sessionsRemaining, paymentType } = req.body;

        const newKid = new Kid({
            name,
            parentName,
            sessionsRemaining,
            paymentType,
        });

        const savedKid = await newKid.save();
        res.status(201).json(savedKid);
    } catch (error) {
        res.status(500).json({ message: "Failed to add kid" });
    }
};

// @desc   Update a kid's session count
// @route  PUT /api/kids/:id
// @access Public
export const updateKidSessions = async (req, res) => {
    try {
        const kid = await Kid.findById(req.params.id);
        if (!kid) return res.status(404).json({ message: "Kid not found" });

        kid.sessionsRemaining = req.body.sessionsRemaining || kid.sessionsRemaining;
        const updatedKid = await kid.save();
        res.json(updatedKid);
    } catch (error) {
        res.status(500).json({ message: "Failed to update sessions" });
    }
};

// @desc   Delete a kid
// @route  DELETE /api/kids/:id
// @access Public
export const deleteKid = async (req, res) => {
    try {
        const kid = await Kid.findById(req.params.id);
        if (!kid) return res.status(404).json({ message: "Kid not found" });

        await kid.deleteOne();
        res.json({ message: "Kid removed" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete" });
    }
};
