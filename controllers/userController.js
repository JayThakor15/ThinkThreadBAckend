import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
// PUT update user profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);

    if (user) {
      user.name = req.body.name || user.name;
      user.bio = req.body.bio || user.bio;
      user.location = req.body.location || user.location;
      user.title = req.body.title || user.title;

      if (req.files?.profileImg) {
        user.profileImg = req.files.profileImg[0].path; // CORRECTED
      }

      if (req.files?.coverImg) {
        user.coverImg = req.files.coverImg[0].path; // CORRECTED
      }

      const updatedUser = await user.save();
      console.log("updated user", updatedUser);

      res.status(201).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        title: updatedUser.title,
        bio: updatedUser.bio,
        location: updatedUser.location,
        profileImage: updatedUser.profileImg,
        coverImage: updatedUser.coverImg,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", err });
  }
};
