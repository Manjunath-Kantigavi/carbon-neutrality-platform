import EmissionRecord from "../models/EmissionRecord.js";

export const getLatestEmission = async (req, res) => {
  try {
    const userId = req.userId;
    const latest = await EmissionRecord.findOne({ userId }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No emission record found." });
    }

    res.json({ emission: latest });
  } catch (err) {
    console.error("Get latest emission error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEmissionByOperation = async (req, res) => {
  try {
    const userId = req.userId;
    const { operationId } = req.params;

    const emission = await EmissionRecord.findOne({ userId, operationId });

    if (!emission) {
      return res.status(404).json({ message: "No emission record found for this operation." });
    }

    res.json({ emission });
  } catch (err) {
    console.error("Get emission by operation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};