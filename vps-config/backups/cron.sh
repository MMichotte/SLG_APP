#!/bin/bash

## backup db every day at 12:00
crontab -l | { cat; echo "0 12 * * * /home/slg/slg-app/backups/backup_db.sh"; } | crontab -
## backup db every day at 00:00
crontab -l | { cat; echo "0 0 * * * /home/slg/slg-app/backups/backup_db.sh"; } | crontab -

crontab -l 
