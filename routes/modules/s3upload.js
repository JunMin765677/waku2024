const express = require('express');
const s3 = express.Router();


const db = require('../../models')
const SpotPicture = db.spotPicture
const EventPicture = db.EventPicture
const StylePicture = db.StylePicture
const Interview = db.Interview
const Piece = db.Piece
const Rider = db.Rider
const Article = db.article


require("dotenv").config();
const uuid = require("uuid").v4;
const multer = require("multer");
const { s3Uploadv3 } = require("../../controllers/s3Service");
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15000000, files: 5 },
});


s3.post("/skateboard.map.spot/upload", upload.array("file"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect('back');
  }
  const file = req.files[0];
  const extension = file.originalname.split('.').pop();
  const filename = `${uuid()}.${extension}`;

  const picture = `https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/${filename}`;
  const {MapId} = req.body
  
  try {
    await s3Uploadv3([{
      originalname: filename,
      buffer: file.buffer
    }]);
    await SpotPicture.create({
      MapId,
      picture
    });
    res.redirect('back')
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
});

s3.post("/skateboard.map.spot/uploadEvent", upload.array("file"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect('back');
  }
  const file = req.files[0];
  const extension = file.originalname.split('.').pop();
  const filename = `${uuid()}.${extension}`;

  const picture = `https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/${filename}`;
  const {EventId} = req.body
  const {tag} =req.body
  try {
    await s3Uploadv3([{
      originalname: filename,
      buffer: file.buffer
    }]);
    const eventPicture = await EventPicture.create({
      EventId,
      tag,
      picture
    });
    res.redirect('back')
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
});

s3.post("/skateboard.map.spot/uploadStyle", upload.array("file"), async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect("back");
  }

  try {
    const uploadedPictures = [];

    for (const file of req.files) {
      const extension = file.originalname.split(".").pop();
      const filename = `${uuid()}.${extension}`;
      const picture = `https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/${filename}`;
      const { SkaterId, tag, existed } = req.body;
      const content = file.originalname;

      await s3Uploadv3([
        {
          originalname: filename,
          buffer: file.buffer,
        },
      ]);

      if (tag === "cover" && existed > 0) {
        await StylePicture.update(
          { picture, content },
          {
            where: {
              SkaterId,
              tag: "cover",
            },
          }
        );
      } else {
        await StylePicture.create({ SkaterId, tag, picture, content });
      }

      uploadedPictures.push(picture);
    }

    res.redirect('back');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload pictures" });
  }
});

s3.post("/skateboard.map.spot/uploadInterview", upload.array("file"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect('back');
  }
  const file = req.files[0];
  const extension = file.originalname.split('.').pop();
  const filename = `${uuid()}.${extension}`;

  const picture = `https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/${filename}`;
  const {interviewId} = req.body

  try {
    await s3Uploadv3([{
      originalname: filename,
      buffer: file.buffer
    }]);

    const interview = await Interview.findOne({ where: { id: interviewId } });
    
    await interview.update({ cover: picture });    

    res.redirect('/skateboard.map.spot/manage')
    
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
});

s3.post("/goverment.subsidy/uploadArticle", upload.array("file"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect('back');
  }
  const file = req.files[0];
  const extension = file.originalname.split('.').pop();
  const filename = `${uuid()}.${extension}`;

  const picture = `https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/${filename}`;
  const {pieceId} = req.body

  try {
    await s3Uploadv3([{
      originalname: filename,
      buffer: file.buffer
    }]);

    const piece = await Piece.findOne({ where: { id: pieceId } });

    await piece.update({ cover: picture });    

    res.redirect('/goverment.subsidy/manage')
    
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
});

s3.post("/admin/uploadBlogCover", upload.array("file"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect('back');
  }
  const file = req.files[0];
  const extension = file.originalname.split('.').pop();
  const filename = `${uuid()}.${extension}`;

  const picture = `https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/${filename}`;
  const {articleId} = req.body

  try {
    await s3Uploadv3([{
      originalname: filename,
      buffer: file.buffer
    }]);

    const article = await Article.findOne({ where: { id: articleId } });

    await article.update({ cover: picture });    

    res.redirect('/admin/blogList')
    
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
});

s3.post("/skateboard.map.spot/rider.headshot", upload.array("file"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.redirect('back');
  }
  const file = req.files[0];
  const extension = file.originalname.split('.').pop();
  const filename = `${uuid()}.${extension}`;

  const picture = `https://skateboardmap.s3.ap-northeast-1.amazonaws.com/uploads/${filename}`;
  const {id} = req.body

  try {
    await s3Uploadv3([{
      originalname: filename,
      buffer: file.buffer
    }]);

    const rider = await Rider.findOne({ where: { id } });

    await rider.update({ headshot: picture });    

    res.redirect('/admin/riderList')
    
  } catch (err) {
    console.log(err);
    res.redirect('back');
  }
});

s3.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      // return res.status(400).json({
      //   message: "file is too large",
      // });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      // return res.status(400).json({
      //   message: "File limit reached",
      // });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      // return res.status(400).json({
      //   message: "File must be an image",
      // });
    }
  }
  res.redirect('back');
});

module.exports = s3;