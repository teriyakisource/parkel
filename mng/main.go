package main

import (
    "os/exec"
    "fmt"
)


type container struct {
    epoch string,
    uid string,
}

func main() {
    args := os.args

    if len(args) == 1 {
        switch args[0] {
            case "create":
                on_create_container()
        }
    }

    
        //check args
        // new contanier:
            //allocate less rescources to all containers
        // deleted container:
            //allocate more rescources to all containers

        //calculate based off machine specification
}

func on_create_container(tag string) bool {
    stdout, err := exec.command("lxc list")
    rescources_in_use := 
}