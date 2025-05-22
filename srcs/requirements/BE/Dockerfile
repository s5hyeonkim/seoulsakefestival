FROM node:22.14.0-alpine3.21

WORKDIR /app

COPY ./srcs ./

# 의존성 설치
RUN npm install express axios cheerio puppeteer jsdom node-html-parser cors

# 3000 포트 오픈
EXPOSE 3000

# 서버 실행 (예: server.ts 또는 dist/server.js 등)
CMD ["node", "server.js"]