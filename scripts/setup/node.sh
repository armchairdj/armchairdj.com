#!/usr/bin/env bash

echo "node: sudoers"

cp /vagrant/scripts/setup/conf/sudoers.node /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node

echo "node: conf"

cp /vagrant/scripts/setup/conf/node.conf /etc/init/node.conf
