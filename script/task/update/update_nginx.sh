#!/usr/bin/env bash

SCRIPT_NAME="update_nginx"

echo "$SCRIPT_NAME: copy sites-available/node"
sudo cp "$CONF_FILE_DIR/nginx.site" /etc/nginx/sites-available/node

echo "$SCRIPT_NAME: restart"
sudo service nginx restart