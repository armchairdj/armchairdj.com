#!/usr/bin/env bash

echo "bash: command prompt"

sudo cp /vagrant/scripts/setup/conf/fancy_pwd.bash /home/vagrant/.fancy_pwd

echo "bash: profile & env variables"

sudo cp /vagrant/scripts/setup/conf/profile.bash /home/vagrant/.profile

echo "bash: chown vagrant user home directory"

sudo chown -R vagrant:vagrant /home/vagrant