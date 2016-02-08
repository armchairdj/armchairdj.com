#!/usr/bin/env bash

echo "nginx: chowning logs"

chown -R vagrant:vagrant /var/log/nginx/

echo "nginx: sudoers"

cp /vagrant/scripts/setup/conf/sudoers.nginx /etc/sudoers.d/nginx && chmod 0440 /etc/sudoers.d/nginx

echo "nginx: copy sites-available/node"

cp /vagrant/scripts/setup/conf/nginx.site /etc/nginx/sites-available/node

echo "nginx: enable site"

ln -s -f /etc/nginx/sites-available/node /etc/nginx/sites-enabled/node
rm -f /etc/nginx/sites-enabled/default

echo "nginx: restart"

/etc/init.d/nginx restart
