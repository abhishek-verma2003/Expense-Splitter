import Group from "../models/groupModel.js";
import User from "../models/userModel.js";
export const createGroup = async (req, res) => {
  try {
    const [name, members , creatorId] = [req.body.name, req.body.members , req.body.creatorId];
    const group = await Group.create({
      name,
      members
    });
    console.log(req.body)
    console.log(req.id);
    await User.findByIdAndUpdate(
      creatorId,
      { $push: { groups: group._id } },
      { new: true }
    );
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getGroups = async (req, res) => {
  try {
    const userId = req.query.creatorId;
    if (!userId) {
      return res.status(400).json({ error: "creatorId is required" });
    }
    const user = await User.findById(userId).select("groups");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find groups whose _id is in user's groups array
    const groups = await Group.find({ _id: { $in: user.groups } }).populate("members", "name email");
    res.json(groups);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
