package main

import (
	"io/ioutil"
	"time"
)

func main() {
	data, e := ioutil.ReadFile("data/gbk-unicode-utf8-cn.txt")
	if e != nil {
		panic(e)
	}
	_ = string(data)
	a := time.Now()
	for i := 0; i < 2000; i++ {
		_ = string(data)
	}

	print((time.Now().UnixNano() - a.UnixNano()) / 1000000)

}
