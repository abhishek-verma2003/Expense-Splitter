import Group from "../models/groupModel.js";

export const createGroup = async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getGroups = async (req, res) => {
  const groups = await Group.find().populate("members", "name email");
  res.json(groups);
};
