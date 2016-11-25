#!/bin/bash

rm -rf ./src
cp -R ../../web/markdown-plus ./src

cd src
rm -rf ./node_modules
npm install

cd ../
bower install