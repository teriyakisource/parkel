lxc launch ubuntu:20.04 $1
lxc exec $1 bash
    adduser runner    
    sudo apt update
    sudo apt install nodejs python3 neofetch 
exit