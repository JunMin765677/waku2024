<p align="center">
  <img src="/public/images/bannerForGithub.png" alt="spotsmap-logo"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/development-stable-yellowgreen.svg" alt="development">
  <img src="https://img.shields.io/github/last-commit/JunMin765677/waku.svg" alt="GitHub last commit">
  <a href="https://standardjs.com/"><img src="https://img.shields.io/badge/code_style-standard-yellowgreen.svg" alt="Standard - JavaScript Style Guide"></a>
  <a href="你的Instagram頁面URL"><img src="https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white" alt="Instagram"></a>
</p>

# SposMap

SpotsMap 是一個使用 Node.js + Express + MySQL + EJS 建立的電子商務全端專案，部署於 AWS Elastic Beanstalk，以 RESTFul API 滿足網站不同資料的互動需求，搭配 Docker、AWS CLI(EB CLI) 自動化部署，打造一個多功能的電商網站。

---

## 目錄

- [Features - 專案功能](#Features---專案功能)
- [How It Works - 專案架構](#How-It-Works---專案架構)
- [DB Structure - 資料庫架構規劃](#DB-Structure---資料庫架構規劃)
- [Environment SetUp - 環境建置](#Environment-SetUp---環境建置)

---

## Features - 專案功能

![GITHUB](/public/images/features.png)

---

## How It Works - 專案架構

![GITHUB](/public/images/HowItWorks.png)

---

## DB Structure - 資料庫架構規劃

![GITHUB](/public/images/ERD.png)

---

## Environment SetUp - 環境建置

要在本地機器上設置和運行 "express-demo" 項目，請遵循以下步驟：

1. 安裝 Node.js：
   確保你的開發環境已安裝 Node.js。你可以從 [Node.js 官網](https://nodejs.org/) 下載並安裝最新版本。

2. 打開你的 terminal，Clone 此專案至本機電腦：
   ```
   git clone https://github.com/JunMin765677/waku2024.git
   cd waku2024
   ```

3. 安裝依賴套件：
   ```
   npm install
   ```

4. 設定環境變量：
   將 .env.example 檔案名稱修改為 .env，並填入相對應的值

5. 啟動服務：
   使用 npm 啟動項目：
   ```bash
   npm start  # 使用 Node.js 直接運行
   npm run dev  # 使用 Nodemon 運行，適用於開發環境
   ```

確保在開始開發之前測試環境是否正常運作。如果遇到任何問題，請檢查 Node.js 和 npm 是否正確安裝，並確保所有依賴都按照 `package.json` 文件成功安裝。

---


