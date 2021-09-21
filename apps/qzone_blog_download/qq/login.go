package qq

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"net/http/cookiejar"
	"os"
	"regexp"
	"strconv"
	"strings"
	"syscall"
	"time"
	"unsafe"

	"github.com/lxn/win"
)

var chooki, _ = cookiejar.New(nil)

func Login(gAccount string, gPassword string, gState string) {
	//gState可以取的值有 online callme hidden busy away silent
	sig := getsig(gAccount)
	verifyCode, uin := getverifyCode(gAccount)
	encodedPassword := encodePassord(gPassword, uin, verifyCode)
	fmt.Println(sig, verifyCode, uin, encodedPassword)
	login(gAccount, encodedPassword, "online", verifyCode, sig)

	fmt.Println("login", sig, verifyCode)
}
func random() string {
	var random = rand.New(rand.NewSource(time.Now().UnixNano()))
	randoms := strconv.FormatFloat(random.Float64(), 'f', 16, 32)
	return randoms
}
func get(href string) string {
	xhr := &http.Client{
		Jar: chooki,
	}

	req, _ := http.NewRequest("GET", href, nil)
	// req.Header.Add("Content-type", "application/x-www-form-urlencoded")
	var res, err = xhr.Do(req)
	if err != nil {
		panic(err)
	}
	data, _ := ioutil.ReadAll(res.Body)
	return string(data)
}

func getsig(gAccount string) string {
	var url = "https://ui.ptlogin2.qq.com/cgi-bin/login?daid=164&target=self&style=16&mibao_css=m_webqq&appid=501004106&enable_qlogin=0&no_verifyimg=1&s_url=http%3A%2F%2Fw.qq.com%2Fproxy.html&f_url=loginerroralert&strong_login=1&login_state=10&t=20131024001&r=" + random()
	var data = get(url)
	match, _ := regexp.Compile("g_login_sig=encodeURIComponent\\(\"[^\\)]*\"\\)")
	source := match.FindString(data)
	sig := source[32 : len(source)-2]
	fmt.Println("sig", sig, source)
	return sig
}
func getverifyCode(qq string) (string, string) {
	var code = get("https://ssl.ptlogin2.qq.com/check?uin=" + qq + "&appid=501004106&r=" + random())
	query := strings.Split(code[13:len(code)-2], "','")
	return checkVerifyCode(query[0], query[1], query[2])
}

func checkVerifyCode(stateCode string, verifyCode string, uin string) (string, string) {
	var temp = strings.Split(uin, "")
	for i := 0; i < len(temp); i += 4 {
		temp[i] = ""
		temp[i+1] = ""
	}
	uin = hexChar2Bin(strings.Join(temp, ""))
	if stateCode == "0" {
		fmt.Println(uin)
	}
	return verifyCode, uin
}
func hexChar2Bin(str string) string {
	bin, _ := hex.DecodeString(str)
	return string(bin)
}
func login(qq string, encodedPassword string, status string, verifyCode string, sig string) {
	code := get("https://ssl.ptlogin2.qq.com/login?u=" +
		qq + "&p=" + encodedPassword +
		"&verifycode=" + strings.ToUpper(verifyCode) +
		"&webqq_type=10&remember_uin=1&login2qq=1&aid=501004106&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&h=1&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=0-42-19466&mibao_css=m_webqq&t=1&g=1&js_type=0&js_ver=10063&login_sig=" + sig)
	if strings.Index(code, "登录成功") >= 0 {
		var jmp = strings.Split(code, ",")[2]
		jmp = strings.TrimSpace(jmp)
		jmp = jmp[1 : len(jmp)-1]
		result := get(jmp)
		fmt.Println(result)
	} else {
		fmt.Println(strings.Split(code, ","))
	}
}
func md5s(str string) string {
	var md = md5.New()
	md.Write([]byte(str))
	return strings.ToUpper(hex.EncodeToString(md.Sum(nil)))
}
func encodePassord(password string, uin string, verifyCode string) string {
	if len(password) > 16 {
		password = password[0:16]
	}
	password = md5s(password)
	encodedPassword := md5s(md5s(hexChar2Bin(password)+uin) + strings.ToUpper(verifyCode))
	return encodedPassword
}
func _text(text string) *uint16 {
	return syscall.StringToUTF16Ptr(text)
}
func message() {
	var winWidth int32 = 600
	var winHeight int32 = 400
	hwnd := win.CreateWindowEx(
		win.WS_EX_CLIENTEDGE,
		_text("EDIT"),
		_text("HELLO GUI"),
		win.WS_OVERLAPPEDWINDOW,
		(win.GetSystemMetrics(win.SM_CXSCREEN)-winWidth)>>1,
		(win.GetSystemMetrics(win.SM_CYSCREEN)-winHeight)>>1,
		winWidth,
		winHeight,
		0,
		0,
		win.GetModuleHandle(nil),
		unsafe.Pointer(nil))
	var wproc uintptr
	var message win.MSG
	originWndProc := win.HWND(win.SetWindowLong(hwnd, win.GWL_WNDPROC, int32(wproc)))
	win.ShowWindow(hwnd, win.SW_SHOW)
	for {
		if win.GetMessage(&message, 0, 0, 0) == 0 {
			os.Exit(int(message.WParam))
			break
		}
		win.TranslateMessage(&message)
		win.DispatchMessage(&message)
	}
	fmt.Println(originWndProc)
}
