#!/bin/bash

rm -rf ./src
cp -R ../../web/markdown-plus ./src

cd src
rm -rf ./node_modules
npm install

cd ../
bower install
sed -i -e 's|<link rel="stylesheet" href="dist/markdown-plus.min.css"/>|<link rel="stylesheet" href="dist/markdown-plus.min.css"/>\
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>|g' ./src/index.html