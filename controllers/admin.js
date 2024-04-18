const db = require('../models')
const Article = db.article
const Rider = db.Rider
const Event = db.Event

const config = require('../config');


// Blog line 12
// Rider line 132
// Event line 317

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

const adminController = {
    home: async (req, res) => {
        await res.render('admin/home');
    },

    blogList: async (req, res) => {
        try {
            const articles = await Article.findAll();
            res.render('admin/blogList', {
                Article: articles
            });
        } catch (error) {
            // 在發生錯誤時的處理
            console.error("Error fetching articles:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    
    blogNew: async (req, res) => {
        await res.render('admin/blogNew');
    },

    handleBlogNew: async (req, res) => {
        try {
            const { content, cover, title, description, categories, subtitle, public, author } = req.body;
    
            if (!title) {
                return res.redirect('/');
            }
    
            await Article.create({
                content,
                cover,
                title,
                description,
                categories,
                subtitle,
                public,
                author
            });
    
            res.redirect('/admin/blogList');
        } catch (error) {
            console.error("Error creating new article:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    BlogEdit: async (req, res) => {
        try {
          const article = await Article.findOne({
            where: {
              id: req.params.id
            }
          });
          
          res.render('admin/blogEdit', {
            article
          });
        } catch (error) {
          // 在這裡處理錯誤
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    },

    handleBlogEdit: async (req, res) => {
        try {
            const { id, content, cover, title, description, categories, subtitle, public, author } = req.body;
    
            if (!title) {
                return res.redirect('/');
            }
    
            // 找到指定 id 的文章
            const article = await Article.findOne({
                where: {
                    id: id,
                }
            });
    
            if (!article) {
                return res.status(404).send('Article not found');
            }
    
            // 更新文章内容
            await article.update({
                content,
                cover,
                title,
                description,
                categories,
                subtitle,
                public,
                author
            });
    
            res.redirect('/admin/blogList');
        } catch (error) {
            console.error("Error editing article:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    BlogDelete: async (req, res, next) => {
        try {
            const article = await Article.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (article) {
                await article.destroy();
            }
    
            res.redirect('/admin/blogList');
        } catch (error) {
            return next();
        }
    },



    // Rider -----------------------------------
    riderList: async (req, res) => { 
        try {
            const Riders = await Rider.findAll();
            res.render('admin/riderList', {
                Riders
            });
        } catch (error) {
            // 在發生錯誤時的處理
            console.error("Error fetching articles:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    simpleRiderList: async (req, res) => { 
        try {
            const Riders = await Rider.findAll();
            res.render('admin/simpleRiderList', {
                Riders
            });
        } catch (error) {
            // 在發生錯誤時的處理
            console.error("Error fetching articles:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    updateOnce: async (req, res) => { 
        // 從請求體中獲取Riders數據
        const Riders = req.body.Riders;

        try {
            // 遍歷Riders數組，並對每一項進行異步更新操作
            await Promise.all(Riders.map(rider => {
                // 更新每個Rider的資訊，這裡假設我們更新GlobalRank, OlympicRank, twStreetRank, twParkRank
                // 確保你的數據庫模型中包含這些字段
                return Rider.update({
                    GlobalRank: rider.GlobalRank,
                    OlympicRank: rider.OlympicRank,
                    twStreetRank: rider.twStreetRank,
                    twParkRank: rider.twParkRank,
                }, {
                    // 指定更新條件為Rider的ID
                    where: { id: rider.id }
                });
            }));

            // 所有Rider更新完成後，重定向到Riders列表頁面
            res.redirect('/admin/simpleRiderList');
        } catch (error) {
            // 處理可能的錯誤
            console.error("Error updating riders: ", error);
            res.status(500).send("Error updating riders");
        }    
    },


    riderNew: async (req, res) => {
        await res.render('admin/riderNew');
    },

    handleRiderNew: async (req, res) => {
        try {
            const { 
                athlete,
                nation,
                age,
                Insta,
                InstaLink,
                stance,
                hometown,
                GlobalRank,
                OlympicRank,
                TWRank,
                twoYearsStreet,
                twoYearsPark,
                twoYearsVert,
                alltimeOverall,
                alltimeStreet,
                alltimePark,
                alltimeVert,
                sponsors,
                gender,
                coach,
                history,
                 } = req.body;    
        
            await Rider.create({
                athlete,
                nation,
                age,
                Insta,
                InstaLink,
                stance,
                hometown,
                GlobalRank,
                OlympicRank,
                TWRank,
                twoYearsStreet,
                twoYearsPark,
                twoYearsVert,
                alltimeOverall,
                alltimeStreet,
                alltimePark,
                alltimeVert,
                sponsors,
                gender,
                coach,
                history,
            });
    
            res.redirect('/admin/riderList');
        } catch (error) {
            console.error("Error creating new article:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    riderEdit: async (req, res) => {
        try {
          const rider = await Rider.findOne({
            where: {
              id: req.params.id
            }
          });
          
          res.render('admin/riderEdit', {
            rider
          });
        } catch (error) {
          // 在這裡處理錯誤
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    },

    handleRiderEdit: async (req, res) => {
        try {
            const {
                id,                 
                athlete,
                nation,
                age,
                Insta,
                InstaLink,
                stance,
                hometown,
                GlobalRank,
                OlympicRank,
                twStreetRank,
                twParkRank,
                twoYearsStreet,
                twoYearsPark,
                twoYearsVert,
                alltimeOverall,
                alltimeStreet,
                alltimePark,
                alltimeVert,
                sponsors,
                gender,
                coach,
                history,
            } = req.body;
        
            // 找到指定 id 的文章
            const rider = await Rider.findOne({
                where: {
                    id: id,
                }
            });
    
            if (!rider) {
                return res.status(404).send('Rider not found');
            }
    
            // 更新文章内容
            await rider.update({
                athlete,
                nation,
                age,
                Insta,
                InstaLink,
                stance,
                hometown,
                GlobalRank,
                OlympicRank,
                twStreetRank,
                twParkRank,
                twoYearsStreet,
                twoYearsPark,
                twoYearsVert,
                alltimeOverall,
                alltimeStreet,
                alltimePark,
                alltimeVert,
                sponsors,
                gender,
                coach,
                history,
            });
    
            res.redirect('/admin/riderList');
        } catch (error) {
            console.error("Error editing article:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    riderDelete: async (req, res, next) => {
        try {
            const rider = await Rider.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (rider) {
                await rider.destroy();
            }
    
            res.redirect('/admin/riderList');
        } catch (error) {
            return next();
        }
    },




    // Event =============================================
    eventList: async (req, res) => {
        try {
            const events = await Event.findAll();
            res.render('admin/event/eventList', {
                Event: events
            });
        } catch (error) {
            // 在發生錯誤時的處理
            console.error("Error fetching events:", error);
            res.status(500).send("Internal Server Error");
        }
    },
    
    eventNew: async (req, res) => {
        await res.render('admin/event/eventNew');
    },

    handleEventNew: async (req, res) => {
        try {
            const { title, location, date, startAt, endAt, detail } = req.body;
            console.log(detail)

            if (req.file) {
                imgur.setClientID(IMGUR_CLIENT_ID)
                const img = await uploadImg(req.file.path)
                // 測試img的內容
                await Event.create({ title, location, date, startAt, endAt, detail, picture: img.data.link })
              } else {
                await Event.create({ title, location, date, startAt, endAt, detail })
              }
                
            res.redirect('/admin/eventList');
        } catch (error) {
            console.error("Error creating new event:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    eventEdit: async (req, res) => {
        try {
          const event = await Event.findOne({
            where: {
              id: req.params.id
            }
          });  
          
          res.render('admin/event/eventEdit', {
            event
          });
        } catch (error) {
          // 在這裡處理錯誤
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
    },

    handleEventEdit: async (req, res) => {
        try {
            const { detail, title, location, date } = req.body;
            const event = await Event.findByPk(req.params.id)
            if (req.file) {
              imgur.setClientID(IMGUR_CLIENT_ID)
              const img = await uploadImg(req.file.path)
              await event.update({ detail, title, location, date, image: img.data.link })
            } else {
              await event.update({ detail, title, location, date, image: event.picture })
            }
            req.flash('success_msg', `Event Id:${req.params.id} Edit Success!`)
            return res.status(204).redirect('/admin/eventList')
        } catch (error) {
            console.error("Error editing article:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    eventDone: async (req, res, next) => {
        try {
            const event = await Event.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (event) {
                await event.update({ tag: 'done' }); // 將 'done' 作為字符串
            }
    
            res.redirect('/admin/eventList');
        } catch (error) {
            return next(error); // 傳遞錯誤詳細信息
        }
    },
    
    eventDelete: async (req, res, next) => {
        try {
            const event = await Event.findOne({
                where: {
                    id: req.params.id
                }
            });
    
            if (event) {
                await event.destroy();
            }
    
            res.redirect('/admin/eventList');
        } catch (error) {
            return next();
        }
    },

    

    // Shop -----------------------------------
    products: async (req, res) => {
        await res.render('admin/shop/products');
    },
    orders: async (req, res) => {
        await res.render('admin/shop/orders');
    },
    users: async (req, res) => {
        await res.render('admin/shop/users');
    },

}

module.exports = adminController