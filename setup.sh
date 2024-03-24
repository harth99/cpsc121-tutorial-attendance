#!/bin/bash

# Update package lists
sudo apt update

# Install Node.js and npm
sudo apt install -y nodejs npm

# Install Express.js globally
sudo npm install -g express

# Install Git
sudo apt install -y git

echo "Setup completed."
