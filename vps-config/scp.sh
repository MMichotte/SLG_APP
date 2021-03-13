#!/bin/bash

VPS_HOST=app.slgcars.be
VPS_USER=debian

scp -r ../vps-config $VPS_USER@$VPS_HOST:/home/$VPS_USER/setup
