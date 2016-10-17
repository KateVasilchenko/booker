# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty32"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network "forwarded_port", guest: 4200, host: 4200
  config.vm.network "forwarded_port", guest: 49152, host: 49152
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "512"
  end
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    echo vagrant | sudo -S apt-get update
    echo vagrant | sudo -S apt-get install -y build-essential
    echo vagrant | sudo -S apt-get install -y libssl-dev
    echo vagrant | sudo -S apt-get install -y git
    git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
    . ~/.nvm/nvm.sh
    sed -i '$ export NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' .bash_rc
    source .bash_rc
    nvm install 4.0
    nvm alias default 4.0
    nvm use default
    npm install -g bower
    mkdir /home/vagrant/ember-booker
    cd /home/vagrant/ember-booker
    npm install
    bower install
  SHELL
end
