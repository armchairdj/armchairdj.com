# -*- mode: ruby -*-
# vi: set ft = ruby :

# Vagrant performance tuning:
# https://stefanwrobel.com/how-to-make-vagrant-performance-not-suck

Vagrant.configure('2') do |config|

  ### BASE BOX & VM

  config.vm.box      = 'puppetlabs/ubuntu-14.04-64-puppet'
  config.vm.hostname = 'armchair-dj'

  # Node inspector.
  config.vm.network :forwarded_port, host: 9060, guest: 9060, auto_correct: true

  # Nginx.
  config.vm.network :forwarded_port, host: 9070, guest: 80, auto_correct: true

  # Node. Should not need to access directly - access via Nginx instead.
  config.vm.network :forwarded_port, host: 9080, guest: 8000

  # Mongo.
  config.vm.network :forwarded_port, host: 9090, guest: 27017, auto_correct: true

  # Private network (required for shared folder).
  config.vm.network 'private_network', ip: '192.168.10.83'
  
  # Automatic hosts via vagrant-hostsupdater plugin.
  config.hostsupdater.aliases = [
    'www.armchair-dj.dev',
        'armchair-dj.dev',
     'www.armchairdj.dev',
         'armchairdj.dev'
  ]

  ### VIRTUALBOX

  config.vm.provider 'virtualbox' do |v|
    v.name   = 'armchairdj'

    v.memory = 4096

    # Additional cores actually degrade performance.
    v.cpus   = 1

    # Fix DNS issue in Ubuntu VMs.
    v.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
  end

  ### SYNCED FOLDER.

  # Mount synced folder using NFS.
  config.vm.synced_folder '.', '/vagrant', nfs: { mount_options: ['actimeo=2'] }

  # Fix file ownership issues that will kill npm install on NFS-mounted folder.
  config.bindfs.bind_folder '/vagrant', '/vagrant'

  ### SHELL PROVISIONER.

  config.vm.provision :shell, path: './script/provision/vagrant/bootstrap.sh'

  config.trigger.after [:up] do
    run 'bash ./script/provision/vagrant/up.sh'
  end

  config.trigger.after [:halt] do
    run 'bash ./script/provision/vagrant/halt.sh'
  end

end
