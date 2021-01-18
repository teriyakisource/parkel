package auth

import (
	"fmt"
	"io"
	"encoding/json"
)

type userdetails struct {
	username string
	email    string
	password string
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

func checkDupEmail(e string) bool {
	var emails interface{} = parsejson(readFile("../../db/emails_in_use.json"))
	print(emails)
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

func main() {

}