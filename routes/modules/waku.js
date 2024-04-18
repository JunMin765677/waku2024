const express = require('express');
const waku = express.Router();
const wakuController = require('../../controllers/waku')

waku.get('/', wakuController.home)
waku.get('/sitemap', wakuController.sitemap)
waku.get('/ads.txt', wakuController.ads)
waku.get('/blog', wakuController.blog)
waku.get('/article/:id', wakuController.article)
waku.get('/project', wakuController.project)

// portfolio
waku.get('/frontend', wakuController.frontend) 
waku.get('/media', wakuController.media)
waku.get('/graphicDesign', wakuController.graphicDesign)

 
module.exports = waku; 