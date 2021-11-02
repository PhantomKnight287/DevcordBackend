const axios = require("axios");
const fs = require("fs");
const multer = require("multer");
const Router = require("express").Router();
require("dotenv").config();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("file");
Router.post("/", async (req, res) => {
  console.log(req.file);

  await upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
  });
  fs.renameSync(
    `./${req.file.path}`,
    `./${req.file.path}_${req.file.originalname}`,
    (err) => {
      err && console.log(err.message);
    }
  );
  const fileContent = fs.readFileSync(
    `./${req.file.path}_${req.file.originalname}`,
    {
      encoding: "base64",
    }
  );
  await axios
    .put(
      `https://api.github.com/repos/PhantomKnight287/devcordAssets/contents/servericons/${req.file.filename}_${req.file.originalname}`,
      {
        message: "Add a new image",
        content: fileContent,
      },
      {
        headers: {
          Authorization: `token ${process.env.token}`,
        },
      }
    )
    .then((pres) => {
      res.status(200).send({ photoUrl: pres.data.content.download_url });
    })
    .catch((error) => {
      console.log(error);
    });
  const resp = fs.unlinkSync(`./${req.file.path}_${req.file.originalname}`);
  console.log(resp);
});
module.exports = Router;
