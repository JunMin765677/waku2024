const db =require('../models')
const Article = db.article
const Portfolio = db.Portfolio
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');


const wakuController = {
  home: async (req, res) => {
    try {
        const articles = await Article.findAll({
          where: {
              public: 'yes'
          },
          order: [['createdAt', 'DESC']], 
          attributes: { exclude: ['content'] },       
          limit: 3                        
        });
    

        res.render('waku/index', {
            Articles: articles
        });
    } catch (error) {
        // 在這裡處理錯誤
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
  },
  ads: (req, res) => {
    const filePath = path.join(__dirname, '../public/ads.txt');
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`读取 ads.txt 文件时出错：${err}`);
        res.status(500).send('读取 ads.txt 文件时出错');
        return;
      }
  
      res.set('Content-Type', 'text/plain');
      res.send(data);
    });
  },
  sitemap: (req, res) => {
    fs.readFile('public/sitemap.xml', 'utf8', (err, data) => {
      if (err) {
        console.error('something wrong：', err);
        res.status(500).send('Internal Server Error');
        return;
      }  
      res.set('Content-Type', 'application/xml');
      res.send(data);
    });
  },
  

  // Blog
  article: async (req, res) => {
    try {
      const article = await Article.findOne({
        where: {
          id: req.params.id
        }
      });
  
      const relatedArticles = await Article.findAll({
        where: {
          id: { [Sequelize.Op.ne]: req.params.id }
        },
        order: [['createdAt', 'DESC']],
        limit: 5
      });
  
      res.render('waku/article', {
        article,
        relatedArticles
      });
    } catch (error) {
      // 在這裡處理錯誤
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  blog: async (req, res) => {
    try {
      const articles = await Article.findAll({
        where: {
            public: 'yes'
        }
      });      
      res.render('waku/blog', {
        Article: articles
      });
    } catch (error) {
      // 在這裡處理錯誤
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },
  

  // Portfolio
  frontend: async (req, res) => {
    try { 
      const [frontend] = await Promise.all([
        Portfolio.findAll({
          where: { tag: 'frontend' },
        }),
      ]);
      
      res.render('waku/frontend', {
        frontend
      });
    } catch (err) {
      console.log(err);
      res.redirect('back');
    }
  },
  media: async (req, res) => {
    try { 
      const [instagram] = await Promise.all([
        Portfolio.findAll({
          where: { tag: 'instagram' },
        }),
      ]);
      
      res.render('waku/media', {
        instagram
      });
    } catch (err) {
      console.log(err);
      res.redirect('back');
    }
  },

  graphicDesign: async (req, res) => {
    try {
      const [canva, dall] = await Promise.all([
        Portfolio.findAll({
          where: { tag: 'canva' },
        }),
        Portfolio.findAll({
          where: { tag: 'dall' },
        })
      ]);
      
      res.render('waku/graphicDesign', {
        canva,
        dall
      });
    } catch (err) {
      console.log(err);
      res.redirect('back');
    }
  },
  project: async (req, res) => {
    await res.render('waku/project');
  },

}

module.exports = wakuController 