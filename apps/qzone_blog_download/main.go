package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"net/http/cookiejar"
	"regexp"
	"strconv"
	"strings"
	"time"
)

var chooki, _ = cookiejar.New(nil)
var loginSigAddress = "http://ui.ptlogin2.qq.com/cgi-bin/login?daid=5&pt_qzone_sig=1&hide_title_bar=1&low_login=0&qlogin_auto_login=1&no_verifyimg=1&link_target=blank&appid=549000912&style=12&target=self&s_url=http%3A//qzs.qq.com/qzone/v5/loginsucc.html?para=izone&pt_qr_app=%CA%D6%BB%FAQQ%BF%D5%BC%E4&pt_qr_link=http%3A//z.qzone.com/download.html&self_regurl=http%3A//qzs.qq.com/qzone/v6/reg/index.html&pt_qr_help_link=http%3A//z.qzone.com/download.html"

func getLoginSig() string {
	var data = get(loginSigAddress)
	match, _ := regexp.Compile("pt.ptui\\=\\{([^}]+)}")
	source := match.FindString(data)
	datas := strings.Split(source[9:len(source)-1], ",")
	for _, v := range datas {
		vs := strings.Split(v, ":")
		var key = vs[0]
		if key == "login_sig" {
			return strings.Trim(vs[1], "\"")
		}
	}
	return ""
}
func getVerifyCode(qqID string) string {
	var random = rand.New(rand.NewSource(time.Now().UnixNano()))
	randoms := strconv.FormatFloat(random.Float64(), 'f', 16, 32)[2:]
	var url = "http://check.ptlogin2.qq.com/check?regmaster=&uin=" +
		qqID + "&appid=549000912&js_ver=10052&js_type=1&login_sig=" +
		getLoginSig() + "&u1=http%3A%2F%2Fqzs.qq.com%2Fqzone%2Fv5%2Floginsucc.html%3Fpara%3Dizone&r=" + randoms
	var ptuiCheckVC = get(url)
	return ptuiCheckVC
}

func main() {
	// 生成随机数
	var qqID = "1019023330"
	var qqPd = "h4(00lmyd"
	var ptuiCheckVC = getVerifyCode(qqID)
	var params = strings.Split(ptuiCheckVC[13:len(ptuiCheckVC)-2], ",")
	var skey = params[2]
	var code = params[1]
	var uin = uin2bin(skey)
	var localstr = hexchar2bin(qqPd)
	var localstr2 = hexchar2bin(md5_sum(localstr + uin))
	var pwdhex = md5_sum(localstr2 + strings.ToUpper(code))
	login(qqID, pwdhex, code[1:len(code)-1])
}
func md5_sum(str string) string {
	var md = md5.New()
	md.Write([]byte(str))
	return strings.ToUpper(hex.EncodeToString(md.Sum(nil)))
}

func get_blog_list(qq_id string) string {
	var url = "http://b1.cnc.qzone.qq.com/cgi-bin/blognew/get_abs?ref=qzone&iNotice=2&inCharset=gbk&outCharset=gbk&format=json&hostUin=" + qq_id + "&uin=" + qq_id + "&blogType=0&cateName=&cateHex=&statYear=&reqInfo=1&pos=%d&num=%d&sortType=0&absType=0&startTime=null&endTime=null&source=0&rand=%f&g_tk=$g_tk&verbose=0&ref=qzone"
	data := get(url)
	return data
}
func login(qq_id string, qq_pwd_hex string, verifycode string) {
	var url = "http://ptlogin2.qq.com/login?ptlang=2052&u=" + qq_id + "&p=" + qq_pwd_hex
	fmt.Println(url)
	fmt.Println(get(url))
}

func uin2bin(s string) string {
	var strs = strings.Split(s[3:len(s)-1], "\\x")
	str := strings.Join(strs, "")
	var res, err = hex.DecodeString(str)
	if err != nil {
		panic(err)
	}
	return string(res)
}

func hexchar2bin(s string) string {
	s = md5_sum(s)
	return pack(s)
}
func getGtk(skey string) int {
	hash := 5381
	for _, v := range skey {
		hash += hash<<5 + int(v)
	}
	return hash & 0x7fffffff
}
func parseInt(num byte) int {
	if '0' <= num && num <= '9' {
		return int(num) - int('0')
	}
	if 'a' <= num && num <= 'f' {
		return int(num) - int('a') + 10
	}
	if 'A' <= num && num <= 'F' {
		return int(num) - int('A') + 10
	}
	return int(num)
}
func pack(s string) string {
	fmt.Println(s)
	arr := make([]byte, len(s)>>1)
	for i := 0; i < len(arr); i++ {
		arr[i] = byte(parseInt(s[i<<1])<<4 + parseInt(s[i<<1+1]))
	}
	//	var res, err = hex.DecodeString(s)
	//	if err != nil {
	//		panic(err)
	//	}
	//	fmt.Println(string(res))
	s = string(arr)
	fmt.Println(s)
	return s
}

func get(href string) string {
	xhr := &http.Client{
		Jar: chooki,
	}
	var res, err = xhr.Get(href)
	if err != nil {
		panic(err)
	}
	data, _ := ioutil.ReadAll(res.Body)
	return string(data)
	//	return read(res.Body.Read)
}
