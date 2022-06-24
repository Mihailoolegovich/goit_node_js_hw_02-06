const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;
const jimp = require("jimp");
const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const image = await jimp.read(tempUpload);
    await image
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);

    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", imageName);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.status(201).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
