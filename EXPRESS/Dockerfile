# Build stage
# 기본 운영체제
FROM node:18 as build
# package.json이 바뀌지 않으면 전에 했던걸 그대로 가져옴(cash에서 가져옴)->빌드가 빨라짐
COPY package*.json .

RUN npm install 

# host machine에서 dockerfile 경로에 있는 모든 것들을 다 copy해 옴
COPY . .

RUN npm run build

# Production stage
FROM node:18 as production
# build stage의 컨테이너 안에 있는 빌드 폴더를 복사해와서 
# 새로 프로덕션 컨테이너 안에 있는 빌드 폴더를 만들고 복사해서 넣어라.
COPY --from=build ./build ./build
COPY --from=build ./package.json ./package.json
COPY --from=build ./package-lock.json ./package-lock.json

RUN npm install --only=production

CMD ["npm", "start"]
