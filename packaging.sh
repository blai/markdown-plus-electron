#!/bin/bash

version=$(electron -v | sed -e "s/v//g")
electron-packager . MarkdownPlusElectron --platform=darwin,win32 --arch=x64 --version=${version}