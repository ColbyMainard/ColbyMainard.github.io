#!/bin/bash
echo "Install corepack..."
sudo npm install -g corepack
echo "Install yarn..."
sudo npm install --global yarn
yarn --version
echo "Setting yarn version"
yarn init -2
yarn set version stable
yarn install
echo "Install tensorflow.js..."
sudo npm install @tensorflow/tfjs
echo "Done!"
