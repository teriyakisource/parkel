lxc launch ubuntu:20.04 $1
lxc exec $1 bash
    adduser runner    
exit