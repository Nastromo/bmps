#!/bin/bash

cp -R middleware prod
cp -R routes prod
cp -R models prod
cp -R utils prod
cp app.js prod
cp db.js prod
cp package.json prod
cp bemypass-firebase-adminsdk-4h57c-eda9f4db82.json prod

cd prod
tar czf app.tar.gz middleware/ models/ routes/ utils/ bemypass-firebase-adminsdk-4h57c-eda9f4db82.json app.js db.js package.json .env

scp app.tar.gz root@104.248.84.247:~
rm app.tar.gz

ssh root@104.248.84.247 << 'ENDSSH'
pm2 stop bmps
rm -rf bmps/* bmps/.*
tar xf app.tar.gz -C bmps
rm app.tar.gz
cd bmps
npm install
pm2 start bmps
ENDSSH