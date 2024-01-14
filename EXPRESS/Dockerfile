# 기본 운영체제
FROM node:18

# host machine에서 dockerfile 경로에 있는 모든 것들을 다 copy해 옴
COPY . .

RUN npm install 
RUN npm run build

CMD [ "npm", "start" ]