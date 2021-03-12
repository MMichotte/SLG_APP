#!/bin/bash
# Initial VPS config 
# This script is made to easily configure a vps server. 
# ! This script needs human interaction at some steps (set pwd of new user, ...)
#---------
# CONFIG 

NEW_USER=slg
TZ=Europe/Brussels

#---------

## Updating packges:
sudo apt-get update -y && sudo apt-get upgrade -y

##Setting time-zone:
sudo timedatectl set-timezone $TZ

## Creating new user:
sudo useradd -m $NEW_USER
sudo passwd $NEW_USER 
  #! Enter new pwd ...
sudo usermod -a -G sudo,netdev,docker $NEW_USER

# Switching user
sudo su $NEW_USER
  #! Enter pwd ...

## Changing default ssh port and removing root access:
sudo echo "Port 62222" >> /etc/ssh/sshd_config
sudo echo "PermitRootLogin no" >> /etc/ssh/sshd_config
sudo echo "StrictModes yes" >> /etc/ssh/sshd_config
sudo systemctl restart sshd

## Adding fail2ban 
sudo apt-get install fail2ban -y
sudo cp ./fail2ban/jail.local /etc/fail2ban/jail.local
sudo /etc/init.d/fail2ban restart

## Installing docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo -e "\033[42mDone!\033[0m"
echo "You can now delete the default user if you want to (sudo userdel -r xxxxx).\n Be aware, that this action is not reversible!"

exit 0
