const db = require('../models')
const axios = require('axios');
const Map = db.Map
const Feedback = db.feedback
const Review = db.review
const SpotPicture = db.spotPicture
const Event = db.Event
const EventPicture = db.EventPicture
const Skater = db.Skater
const StylePicture = db.StylePicture
const Views = db.View
const Interview = db.Interview
const Rider = db.Rider

const { Sequelize, Op } = require('sequelize');
require('dotenv').config()
const config = require('../config');

const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(config.RECAPTCHA_SITE_KEY, config.RECAPTCHA_SECRET_KEY);


// 驗證 reCAPTCHA token 的函式
async function verifyRecaptchaToken(token) {
  console.log(config.RECAPTCHA_SECRET_KEY)
  console.log(token)
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
      secret: config.RECAPTCHA_SECRET_KEY,
      response: token,
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error.message);
    return { success: false };
  }
}


const mapController = {

  // SPOT==============================================================
  allSpot: async (req, res) => {
    try {
      const Spots = await Map.findAll();
      res.render('map/allSpot', {Spots});
    } catch (err) {
      console.error(err);
      res.render('error'); 
    }
  },

  citySpot: async (req, res) => {
    try {
      const City = req.query.city;
      const whereClause = City ? { city: City } : { city: '臺南' };
  
      const maps = await Map.findAll({
        where: whereClause,
        include: [{
          model: SpotPicture,
          order: [['createdAt', 'DESC']],
          limit: 1
        }]
      });

      if (maps.length === 0) {
        // 在找不到地圖時，返回相應的訊息給用戶
        res.redirect('/skateboard.map.spot/citySpot');
      }  
  
      res.render('map/citySpot', {
        Map: maps
      });
    } catch (error) {
      // 处理错误情况
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  
  spot: async (req, res) => {
    const spotId = req.params.id;
  
    try {
      let view = await Views.findOne({ where: { spotId } });
      if (view) {
        view.count += 1;
        view.monthly += 1;
        await view.save();
      } else {
        view = await Views.create({ spotId, count: 1, monthly: 1 });
      }

      Map.findOne({
        where: {
          id: req.params.id
        }
      }).then(spot => {
        Review.findAll({
          where: {
            MapId: req.params.id 
          },
          order: [['createdAt', 'DESC']],
        }).then(reviews => {
          SpotPicture.findAll({
            where: {
              MapId: req.params.id
            },
            order: [['createdAt', 'DESC']],
          }).then(spotPicture => {
            res.render('map/spot', {
              spot,
              reviews,
              spotPicture,
              viewCount: view.count,
              viewMonthly: view.monthly
            });  
          });
        });
      })
    } catch (err) {
      console.error(err);
      res.render('error');
    }
  },
  
  handleAddSpot: async (req, res) => {
    console.log(req.body)
    const { city, location, floor, boardKind, opentime, shop, googleMap, description, sharer, op1, lat, lon} = req.body;
  
    if (!city || !location) {
      return res.redirect('/skateboard.map.spot/interviews');
    }
  
    console.log(req.recaptcha)
    console.log(req.recaptcha.error)
    try {  
      if (!req.recaptcha.error) {
        Map.create({
          city,
          location,
          opentime,
          shop,
          googleMap,
          description,
          sharer,
          floor,
          boardKind,
          op1,
          lat,
          lon
        }).then(() => {
          res.redirect('/skateboard.map.spot');
        });
      } else {
        res.redirect('/skateboard.map.spot/events');
      }
    } catch (error) {
      console.error('reCAPTCHA 驗證錯誤:', error.message);
      res.redirect('/skateboard.map.spot/coming');
    }
  },

  
  updateSpot: (req, res) => {
    const {id} = req.body
    const {floor} = req.body
    const {opentime} = req.body
    const {shop} = req.body
    const {description} = req.body
    const {googleMap} = req.body
    const {location} = req.body
    const {sharer} = req.body
    const {op1} = req.body 
    const {lat} = req.body 
    const {lon} = req.body 

    Map.findOne({
      where: {
        id
      }
      }).then(spot => {
        return spot.update({
          floor,
          opentime,
          shop,
          description,
          googleMap,
          location,
          sharer,
          op1,
          lat,
          lon
        })
      }).then(() => {
        res.redirect('back')
      }).catch(() => {
        res.redirect('back')
      })
  },

  spotsmap: async (req, res) => {
    try {
      const Spots = await Map.findAll();
      res.render('map/allscreen', {Spots});
    } catch (err) {
      console.error(err);
      res.render('error'); 
    }
  },


  // Riders==============================================================
  riders: async (req, res) => {
    try {
        const Riders = await Rider.findAll();
        res.render('map/riders', {
            Riders
        });
    } catch (error) {
        // 在發生錯誤時的處理
        console.error("Error fetching Rider:", error);
        res.status(500).send("Internal Server Error");
    }
},

  rider: async (req, res) => {

    try {
      // let view = await Views.findOne({ where: { styleId } });
      // if (view) {
      //   view.count += 1;
      //   view.monthly += 1;
      //   await view.save();
      // } else {
      //   view = await Views.create({ styleId, count: 1, monthly: 1 });
      // }

      const rider = await Rider.findOne({
        where: {
          id: req.params.id
        },
      });
      res.render('map/rider', {
        rider
      });
    } catch (err) {
      console.error(err);
      res.render('error'); // 渲染错误页面
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

        res.redirect('back')
    } catch (error) {
        console.error("Error editing article:", error);
        res.status(500).send("Internal Server Error");
    }
  },


  // SHOP===============================================================
  products: async (req, res) => {
    res.render('map/shop/products');
  },
  product: async (req, res) => {
    res.render('map/shop/product');
  },
  cart: async (req, res) => {
    res.render('map/shop/cart');
  },
  checkout: async (req, res) => {
    res.render('map/shop/checkout');
  },
  confirmation: async (req, res) => {
    res.render('map/shop/confirmation');
  },
  accounts: async (req, res) => {
    res.render('map/shop/accounts');
  },



 
  // EVENT==============================================================
  events: async (req, res) => {
    try {
      const [Events, eventsDone] = await Promise.all([
        Event.findAll({
          attributes: ['id', 'title', 'picture' ],
          where: { tag: null },
        }),
        Event.findAll({
          attributes: ['id', 'title', 'picture'],
          where: { tag: 'done' },
        })
      ]);
  
      res.render('map/events', {
        Events,
        eventsDone
      });
    } catch (err) {
      console.log(err);
      res.redirect('back');
    }
  },
  
  event: async (req, res) => {
    const eventId = req.params.id;
  
    try {
      let view = await Views.findOne({ where: { eventId } });
      if (view) {
        view.count += 1;
        view.monthly += 1;
        await view.save();
      } else {
        view = await Views.create({ eventId, count: 1, monthly: 1 });
      }
  
      const event = await Event.findOne({ where: { id: eventId } });
      if (!event) {
        // 處理事件不存在的情況
        return res.status(404).send('Event not found');
      }
  
      const reviews = await Review.findAll({
        where: { eventId },
        order: [['createdAt', 'DESC']]
      });
  
      res.render('map/event', {
        Event: event,
        reviews,
        viewCount: view.count,
        viewMonthly: view.monthly
      });
    } catch (err) {
      console.error(err);
      res.render('error');
    }
  },
  
  handleAddEvent: (req, res) => {
    const {title} = req.body
    const {location} = req.body
    const {date} = req.body
    const {startAt} = req.body
    const {endAt} = req.body
    const {detail} = req.body
    if (!detail) {
      return res.redirect('/skateboard.map.spot')
    }

    Event.create({
      title,
      location,
      date,
      startAt,
      endAt,
      detail
    }).then(() => {
      res.redirect('/skateboard.map.spot/events')
    })
  },

  addEvent: (req, res) => {
    res.render('map/addEvent');
  },


  // Interview==============================================================
  interviews: async (req, res) => {
    try {
      const Interviews = await Interview.findAll({
        where: { tag2 : 'yes' },
        attributes: { exclude: ['content'] }
      });
  
      res.render('map/interviews', { Interviews });
    } catch (err) {
      console.error(err);
      res.render('error'); 
    }
  },

  interview: async (req, res) => {
    const interviewId = req.params.id;
  
    try {
      let view = await Views.findOne({ where: { interviewId } });
      if (view) {
        view.count += 1;
        view.monthly += 1;
        await view.save();
      } else {
        view = await Views.create({ interviewId, count: 1, monthly: 1 });
      }
  
      const Inter = await Interview.findOne({ where: { id: interviewId } });
  
      res.render('map/interview', {
        Inter,
        viewCount: view.count,
        viewMonthly: view.monthly
      });
    } catch (err) {
      console.error(err);
      res.render('error');
    }
  },
  
  handleAddInterview: (req, res) => {
    const {title} = req.body
    const {little} = req.body
    const {date} = req.body
    const {content} = req.body
    const {author} = req.body
    const {link} = req.body

    if (!title) {
      return res.redirect('/skateboard.map.spot/interviews')
    }

    Interview.create({
      title,
      little,
      date,
      content,
      author,
      link
    }).then(() => {
      res.redirect('/skateboard.map.spot/interviews')
    })
  },
  
  handleAddReview: (req, res) => {
    const {username} = req.body
    const {score} = req.body
    const {content} = req.body
    const {MapId} = req.body
    const {eventId} = req.body
    if (!username) {
      return res.redirect('/skateboard.map.spot')
    }

    Review.create({
      username,
      score,
      content,
      eventId,
      MapId
    }).then(() => {
      res.redirect('back')
    })
  },

  addInterview: (req, res) => {
    res.render('map/addInterview');
  },

  editInterview: async (req, res) => {
    const interviewId = req.params.id;

    try {  
      Interview.findOne({
        where: {
          id: interviewId
        },
      }).then(Interview => {
        res.render('map/editInterview', {
          Interview,
        });
      })
    } catch (err) {
      console.error(err);
      res.render('error');
    }
  },

  updateInterview: async (req, res) => {
    try {
      const { id, title, little, date, content, author, link, tag2 } = req.body;
  
      const interview = await Interview.findOne({
        where: { id }
      });
  
      if (!interview) {
        return res.redirect('back');
      }
  
      await interview.update({
        title,
        little,
        date,
        content,
        author,
        link,
        tag2
      });
  
      res.redirect('/skateboard.map.spot/manage');
    } catch (error) {
      console.error(error);
      res.redirect('back');
    }
  },



  // Style==============================================================
  styles: async (req, res) => {
    try {
      const stylePictures = await Skater.findAll({
        where: {
          public: 'on'
        },
        include: {
          model: StylePicture,
          where: {
            tag: 'cover',
            picture: { [Op.ne]: null }
          }
        },
        attributes: ['id'] 
      });
  
      res.render('map/styles', { styles: stylePictures });
    } catch (err) {
      console.error(err);
      res.render('error'); 
    }
  },

  style: async (req, res) => {
    const styleId = req.params.id;

    try {
      let view = await Views.findOne({ where: { styleId } });
      if (view) {
        view.count += 1;
        view.monthly += 1;
        await view.save();
      } else {
        view = await Views.create({ styleId, count: 1, monthly: 1 });
      }

      const skater = await Skater.findOne({
        where: {
          id: req.params.id
        },
        include: [{
          model: StylePicture,
          where: { tag: null },
          order: [['createdAt', 'DESC']],
          limit: 10
        }]
      });
      const cover = await StylePicture.findOne({
        where: {
          SkaterId: req.params.id,
          tag: 'cover'
        }
      });
      res.render('map/style', {
        skater,
        cover,
        viewCount: view.count,
        viewMonthly: view.monthly
      });
    } catch (err) {
      console.error(err);
      res.render('error'); // 渲染错误页面
    }
  },

  deletePicture: (req, res) => {
    // 獲取要刪除的項目標識符（可能是一個值或多個值）
    var deleteItems = req.body.deleteItem; 
  
    // 處理刪除操作
    if (Array.isArray(deleteItems)) {
      // 如果有多個值，迭代處理每個刪除項目
      deleteItems.forEach((item) => {
        StylePicture.destroy({
          where: {
            id: item
          }
        })
        .catch((error) => {
          console.error(error);
        });
      });
    } else {
      StylePicture.destroy({
        where: {
          id: deleteItems
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  
    res.redirect('back');
  },

  updateSkater: (req, res) => {
    const {id} = req.body
    const {name} = req.body
    const {city} = req.body
    const {ig} = req.body
    const {igURL} = req.body
    const {fb} = req.body
    const {fbURL} = req.body
    const {years} = req.body
    const {rules} = req.body
    const {deck} = req.body
    const {trucks} = req.body
    const {wheels} = req.body
    const {bushings} = req.body
    const {bearings} = req.body
    const {brands} = req.body
    const {tops} = req.body
    const {bottoms} = req.body
    const {sneakers} = req.body
    const {cap} = req.body
    const {socks} = req.body
    const {accessories} = req.body
    const {public} = req.body


    Skater.findOne({
      where: {
        id
      }
      }).then(skater => {
        return skater.update({
          name,
          city,
          ig,
          igURL,
          fb,
          fbURL,
          years,
          rules,
          deck,
          trucks,
          wheels,
          bushings,
          bearings,
          brands,
          tops,
          bottoms,
          sneakers,
          cap,
          socks,
          accessories,
          public
        })
      }).then(() => {
        res.redirect('back')
      }).catch(() => {
        res.redirect('back')
      })
  },

  admin: async (req, res) => {
    try {
      let googleUser = req.user;
      let googleID = googleUser.id;
      let email = googleUser.email;
      let googleName = googleUser.displayName;
      let photo = googleUser.picture;

      const skater = await Skater.findOne({ where: { googleID } });

      if (!skater) {
        // 如果Skater中不存在相同的googleID，將其寫入Skater
        await Skater.create({ 
          googleID,
          email,
          googleName,
          photo
        });
      }
      const createdSkater = await Skater.findOne({ 
        where: { googleID },
        include:[{
          model: StylePicture,
          where: { tag: 'cover' },
          order: [['createdAt', 'DESC']],
          limit: 1
        }]
       });
       const detail = await StylePicture.findAll({ 
        where: { 
          SkaterId: skater.id,
          tag: null,
        },
        order: [['createdAt', 'DESC']],
        limit: 10
       });

      res.render('map/styleEdit', { 
        skater: createdSkater,
        detail
      });
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong');
    }  
  },

  // Coach==============================================================
  coachs: (req, res) => {
    res.render('map/coachs');
  },


  // Others==============================================================

  coming: (req, res) => {
    res.render('map/coming');
  },

  manage: async (req, res) => {
    try {
      const Interviews = await Interview.findAll({
        attributes: { exclude: ['content'] }
      });
  
      res.render('map/manage', { Interviews });
    } catch (err) {
      console.error(err);
      res.render('error'); 
    }
  },

  feedback: (req, res) => {
    const {nickname} = req.body
    const {email} = req.body
    const {content} = req.body
    if (!content) {
      return res.redirect('/skateboard.map.spot')
    }

    Feedback.create({
      nickname,
      email,
      content,
    }).then(() => {
      res.redirect('/skateboard.map.spot')
    })
  },

  delete: (req, res) => {
    StylePicture.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.destroy()
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },

  update: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then(comment => {
      res.render('update', {
        comment
      })
    })
  },

  handleUpdate: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.update({
        content: req.body.content
      })
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },
}



module.exports = mapController