#!/bin/bash

cp -R middleware prod
cp -R routes prod
cp -R models prod
cp -R utils prod
cp app.js prod
cp package.json prod

cd prod
tar czf app.tar.gz middleware/ models/ routes/ utils/ app.js package.json .env

scp app.tar.gz nastromo@104.248.84.247:~
rm app.tar.gz

ssh nastromo@104.248.84.247 << 'ENDSSH'
pm2 stop main
rm -rf bmps/* bmps/.*
tar xf app.tar.gz -C bmps
rm app.tar.gz
cd bmps
npm install
pm2 start bmps
ENDSSH