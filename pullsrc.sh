#!/bin/bash

rm -rf ./src
cp -R ../../web/markdown-plus ./src

cd src
rm -rf ./node_modules
npm install

cd ../
bower install

# 初期ファイル読み込みを無効化
sed -i "" -e '/<script src="index.js"><\/script>/d' "./src/index.html"