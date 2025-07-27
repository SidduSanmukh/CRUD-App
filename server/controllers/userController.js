import Users from "../models/userModule.js";

export const create = async (req, res) => {
  try {
    const newUser = new Users(req.body);
    const { email } = newUser;

    const userExist = await Users.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User Already Exist.!" });
    }

    const saveData = await newUser.save();
    // res.status(200).json({ saveData });
    res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ errMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await Users.find();
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No Users exists." });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ errMessage: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await Users.findById(id);
    if (!userExist) {
      return res.json(404).json({ message: "User not found." });
    }

    return res.status(200).json(userExist);
  } catch (error) {
    return res.status(500).json({ errMessage: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await Users.findById(id);

    if (!existUser) {
      return res.status(404).json({ message: "User Not found" });
    }
    const update = await Users.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    return res.status(500).json({ errMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const existUser = await Users.findById(id);

    if (!existUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    await Users.findByIdAndDelete(existUser);
    return res
      .status(200)
      .json({ message: `${existUser.name} has been deleted` });
  } catch (error) {
    return res.status(500).json({ errMessage: error.message });
  }
};
