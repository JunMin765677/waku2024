const db = require('../models')
const Portfolio = db.Portfolio

const config = require('../config');


// imgur
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = config.IMGUR_CLIENT_ID
const uploadImg = path => {
  return new Promise((resolve, reject) => {
    imgur.upload(path, (err, img) => {
      if (err) {
        return reject(err)
      }
      return resolve(img)
    })
  })
} 

const portfolioController = {
    frontend : async (req, res) => {
        try {
            const frontendProjects = await Portfolio.findAll({
                where: { tag: 'frontend' } 
            });
            res.render('admin/portfolio/frontend', {
                frontendProjects
            });
        } catch (error) {
            // 在發生錯誤時的處理
            console.error("Error fetching articles:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    media : async (req, res) => {
        try {
            const instagramProjects = await Portfolio.findAll({
                where: { tag: 'instagram' } 
            });
            res.render('admin/portfolio/media', {
                instagramProjects
            });
        } catch (error) {
            // 在發生錯誤時的處理
            console.error("Error fetching articles:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    GraphicDesign : async (req, res) => {
        try {
            const canvaProjects = await Portfolio.findAll({
                where: { tag: 'canva' } 
            });
            const dallProjects = await Portfolio.findAll({
                where: { tag: 'dall' } 
            });
            res.render('admin/portfolio/graphicDesign', {
                canvaProjects, dallProjects
            });
        } catch (error) {
            // 在發生錯誤時的處理
            console.error("Error fetching articles:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    // upload : async (req, res, next) => { 
    //     try {
    //         const { tag, existedID } = req.body; // Extracting existedID from the request body
    
    //         if (existedID) {
    //             // If an existedID is present, we update the existing entry
    //             let updateData = { tag }; // Basic update data includes the tag
    //             if (req.file) {
    //                 imgur.setClientID(IMGUR_CLIENT_ID);
    //                 const img = await uploadImg(req.file.path);
    //                 updateData.image = img.data.link; // Update image link if a file is present
    //             }
    //             // Use Sequelize's update method for updating the entry
    //             await Portfolio.update(updateData, { where: { id: existedID } });
    //             req.flash('success_msg', 'Portfolio Update Success!');
    //         } else {
    //             // If no existedID is present, we create a new entry
    //             if (req.file) {
    //                 imgur.setClientID(IMGUR_CLIENT_ID);
    //                 const img = await uploadImg(req.file.path);
    //                 await Portfolio.create({ tag, image: img.data.link });
    //             } else {
    //                 await Portfolio.create({ tag });
    //             }
    //             req.flash('success_msg', 'Portfolio Create Success!');
    //         }
    //         return res.status(204).redirect(req.get('referer'));
    //     } catch (e) {
    //         console.log(e);
    //         return next(e);
    //     }
    // },     
    delete: async (req, res, next) => {
        try {
            const project = await Portfolio.findByPk(req.params.id)
            if (!project) {
                req.flash('warning_msg', '這個商品不存在!')
                return res.redirect('back');
            }
            await project.destroy();
            req.flash('success_msg', `project Id:${req.params.id} Delete Success!`)
            return res.status(200).redirect('back')
        } catch (e) {
            console.log(e)
            return next(e)
        }
    },
    upload: async (req, res, next) => {
        try {
            const { tag } = req.body; // 取得共用的tag
    
            // 檢查是否有檔案被上傳
            if (req.files && req.files.length > 0) {
                imgur.setClientID(IMGUR_CLIENT_ID);
    
                // 為每個檔案上傳到Imgur並創建Portfolio記錄
                for (const file of req.files) {
                    const img = await uploadImg(file.path);
                    await Portfolio.create({ tag, image: img.data.link });
                }
    
                req.flash('success_msg', 'All images uploaded successfully!');
            } else {
                // 沒有檔案，只創建一個不含圖片的記錄
                await Portfolio.create({ tag });
                req.flash('success_msg', 'Portfolio created without image!');
            }
    
            return res.redirect(req.get('referer'));
        } catch (e) {
            console.log(e);
            return next(e);
        }
    },
    
    
     
}

module.exports = portfolioController