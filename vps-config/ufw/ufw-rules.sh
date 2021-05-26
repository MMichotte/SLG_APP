#!/bin/bash

sudo ufw disable

sudo ufw allow 62222
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow from 109.134.242.34/32 to any port 5434

sudo ufw default deny incoming

sudo ufw enable