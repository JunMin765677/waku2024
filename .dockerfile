# 使用官方的 Node.js 映像作為基礎映像
FROM node:14

# 設置工作目錄
WORKDIR /usr/src/app

# 將當前目錄的文件復制到工作目錄中 
# 排除不需要的文件(例如 node_modules)
COPY package*.json ./

# 安裝應用依賴
RUN npm install

# 將應用代碼復制到工作目錄
COPY . .

# 設置環境變量
ENV NODE_ENV=production

# 暴露應用要監聽的端口
EXPOSE 8080

# 啟動命令
CMD [ "node", "index.js" ]