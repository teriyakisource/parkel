package auth

import (
	"fmt"
	"io"
	"encoding/json"
)

type jsonRes map[string]interface{}

type userdetails struct {
	username string
	email    string
	password string
}

type user struct {
	username string, 
	password string,
}


func readFile(filename string) []byte {
	data, err := ioutil.ReadFile(filename)
	if err != nil {
		return []byte("")

	}
	return data
}

func parsejson(data []byte) interface{} {
	var res interface{}
	json.Unmarshal(data, &res)
	return res
}

func createUser(det userdetails) bool {
	fmt.Println("hello")
	return true
}

func validateEmail(e string) bool {
	if len(strings.Split(e, "@")) == 2 {
		if len(strings.Split(strings.Split(e, "@")[1], ".")) == 2 {
			return true
		}
	}

	return false
}

func generateToken() string {
	chr := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	str := ""

	for i := 0; i <= 64; i++ {
		ri := rand.Intn(len(chr))
		fmt.Printf(string(chr[ri]))
	}

	return str
}



func create_user(client user) bool {

}


func main() {

}