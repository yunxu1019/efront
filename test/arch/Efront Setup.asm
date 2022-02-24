.386
.model flat,stdcall
option casemap:none
__UNICODE__ equ 1

include windows.inc
include user32.inc
include kernel32.inc
include gdi32.inc
includelib gdi32.lib
include shell32.inc
includelib shell32.lib
includelib user32.lib
includelib kernel32.lib
include gdiplus.inc
includelib gdiplus.lib
WM_DPICHANGED equ 002E0h
WM_DPICHANGED_BEFOREPARENT equ 002E2h
WM_DPICHANGED_AFTERPARENT equ 002E3h
WM_GETDPISCALEDSIZE equ 002E4h
MDT_EFFECTIVE_DPI equ 0
MDT_ANGULAR_DPI  equ 1
MDT_RAW_DPI  equ 2
MDT_DEFAULT  equ MDT_EFFECTIVE_DPI
GdiplusStartupInput struct
    GdiplusVersion DWORD ?; // Must be 1
    DebugEventCallback DWORD ?; // Ignored on free builds
    SuppressBackgroundThread DWORD ?; // FALSE unless you're prepared to call
    SuppressExternalCodecs DWORD ?; // FALSE unless you want GDI+ only to use
GdiplusStartupInput ends
DotsChangeParam struct
x real4 ?
y real4 ?
r real4 ?
DotsChangeParam ends
SRECT struct
x dd ?
y dd ?
w dd ?
h dd ?
SRECT ends
EFRONT_BUTTON struct
back dd ?
clip dd ?
text dd ?
leng dd ?
rect dd ?
EFRONT_BUTTON ends
DEVICE_PRIMARY equ 0
DEVICE_IMMERSIVE equ 1
.data
gpstart GdiplusStartupInput <1,0,0,0>;
shellOperator db "open"
assocname db "assoc.bat"
unassoc db "unassoc.bat"
unassocParam db "/c "
uninstall db "cmd.exe"
uninstallParam db "/c cd ..& rd /s /q ."
uninstallName db "卸载.scr",0,0
uninstallSize dd 0
uninstallRest dd 0
shcoreName db "shcore.dll",0
dpiProcName db a"SetProcessDpiAwareness",0
factorName db a"GetScaleFactorForMonitor",0
dpiforName db a"GetDpiForMonitor",0
; shellName db "shell32.dll",0
; browseName db a"SHBrowseForFolderW",0
fontFamily db "仿宋",0
fontFamili db "宋体",0
factor dd 4
szClassName db 'efront.cc/baiplay',0
szCaptionMain db '白前安装程序',0
onekey1 db '一键安装',0
onekey2 db '正在安装',0,0,0
onekey3 db '　完成　',0
onekey4 db '一键卸载',0
onekey5 db '正在卸载',0
onekey_rect real4 336,208,100,100
szText db '白前'
titlerect real4 18,20,150,50
logodots real4 464.054, 574.786, 93.042, 57.856, 416.684, 192.928, 393.0, 2.0, 656.528, 27.884, 786.0, 177.952, 786.0, 395.0, 786.0, 612.048, 610.048, 788.0, 393.0, 788.0, 175.952, 788.0, 0.0, 612.048, 0.0, 395.0, 67.346, 325.95, 47.566, 97.362, 47.566, 97.362, 222.956, 95.026, 325.226, 415.644, 464.054, 574.786 
closeline real4 480, 30, 480, 0, 420, 0, 420.15, 2.995, 420.598, 5.96, 421.34, 8.866, 422.368, 11.683, 423.673, 14.383, 425.24, 16.939, 427.055, 19.327,429.099, 21.521, 431.352, 23.5, 433.791, 25.244, 436.392, 26.736, 439.129, 27.961, 441.975, 28.907, 444.901, 29.563, 447.878, 29.925
crossline real4 1024, 80.441, 943.559, 0, 512, 431.559, 80.441, 0, 0, 80.441, 431.559, 512, 0, 943.559, 80.441, 1024, 512, 592.441, 943.559, 1024, 1024, 943.559, 592.441, 512, 1024, 80.441
setupline real4 322, 200, 422, 200, 422, 232, 322, 232
r1 real4 1.0
r3 real4 3.0
width_10 real4 6.0
logo_c DotsChangeParam<7.0,5.0,0.78>
close_c DotsChangeParam<10.0,-1.0,1.0>
cross_c DotsChangeParam<454.0,8.0,0.012>
factor_ratio real4 4.0
w_rect SRECT <0,0,480,360>
g_rect real4 -1,-1,481,-1,481,361,-1,361,-1,-1
m_actived dd 0
m_percent real4 -0.0058
m_delta real4 0.003
m_processed real4 -1
m_moved dd 0
m_current dd 0
m_origin dd -1
m_active dd 0
m_left real4 0.0
m_top real4 0.0
m_arrow dd IDC_ARROW
m_hand dd IDC_HAND
m_cursor dd ?
m_folder real4 0,0,0,0
isuninstall dd 0
m_pos POINT <0,0>
close EFRONT_BUTTON<0,0,0,0,0>
setup EFRONT_BUTTON<0,0,0,0,0>
ground EFRONT_BUTTON<0,0,0,0,0>
folder  word MAX_PATH dup(?)
buffer  word MAX_PATH dup(?)
buffer2  word MAX_PATH dup(?)
program db "ProgramFiles",0
folderTitle db "选择安装目录",0
szErrOpenFile db '无法打开源文件！'
szErrCreateFile db '创建文件失败！',0
hiddensetup dd 0
hiddenmark db "/s"
hiddenmark1 db "/h"
findmark db "*.*"

folder_rect real4 20,320,440,21
hWinMain dd 0
bitmap dd 0
.data?
logoline real4 14400 dup(?)
shcore dd ?
hInstance dd ?
gptoken dd ?
factorProc dd ?
monitorProc dd ?
filelist dd 24000 dup(?)
filecount dd 0
datatotal dd 0
dataindex dd 0
datapassed dd 0
nametotal dd ?
dataoffset dd ?
nameoffset dd ?
namecache dd MAX_PATH dup(?)
datacache dd 36000 dup(?)
datawrite dd 36000 dup(?)
;
;
;
.code
issetting proc
    local delta
    fld1
    fsub m_percent
    fdiv m_delta
    fistp delta
    mov eax,delta
    shr eax,31
    .if eax
        mov eax,0
    .else
        fld m_processed
        fdiv m_delta
        fistp delta
        mov eax,delta
        shr eax,31
        .if eax
            mov eax,0
        .else
            mov eax,1
        .endif
    .endif
    ret
issetting endp
setupstart proc
    local threadId
    invoke issetting
    .if eax
        ret
    .endif
    fld m_delta
    fstp m_processed;
    invoke CreateThread,NULL,0,\
        offset _Extract,NULL,\
        NULL,addr threadId
    invoke CloseHandle,eax
    ret
setupstart endp

opensetup proc
    local @hFile
    local filename[MAX_PATH]:WORD
    invoke GetModuleFileName ,0,addr filename, sizeof filename
    invoke CreateFile,addr filename,GENERIC_READ,FILE_SHARE_READ,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL,0
    .if eax==INVALID_HANDLE_VALUE
        invoke MessageBox,hWinMain,addr szErrOpenFile,NULL,MB_OK or MB_ICONEXCLAMATION
        ret
    .endif
    mov @hFile,eax
    ret
opensetup endp

readcount proc h
    local buff[8]:byte,readed,b
    mov readed,0
    invoke SetFilePointer,h,-8,NULL,FILE_END
    lea esi,buff
    invoke ReadFile,h,esi,sizeof buff,addr readed,0
    mov ecx,readed
    .if isuninstall
        dec ecx
    .endif
    mov eax,0
    mov ebx,0
    mov edx,0
    .while ecx>0
        dec ecx
        mov al,BYTE ptr buff[ecx]
        push ecx
        mov b,eax
        and eax,01111111b
        mov cl,dl
        shl eax,cl
        pop ecx
        add ebx,eax
        mov eax,b
        shr eax,7
        .break .if !eax
        add edx,7
    .endw
    mov eax,ebx
    ret
readcount endp
atow proc srcstart,srcleng,dststart
    mov ecx,srcstart
    mov edx,ecx
    add edx,srcleng
    mov ebx,dststart
    mov eax,0
    .while ecx<edx
        mov al,BYTE ptr[ecx]
        .if al=='/'
            mov WORD ptr[ebx],92
        .else
            mov WORD ptr[ebx],ax
        .endif
        add ebx,2
        inc ecx
    .endw
    .if eax
        mov WORD ptr[ebx],0
    .endif
    ret
atow endp
copy proc srcstart,srcleng,dststart
    mov ecx,srcstart
    mov edx,ecx
    add edx,srcleng
    mov ebx,dststart
    mov eax,0
    .while ecx<edx
        mov ah,BYTE ptr [ecx]
        inc ecx
        mov al,BYTE ptr [ecx]
        inc ecx
        mov WORD ptr[ebx],ax
        add ebx,2
    .endw
    .if eax
        mov WORD ptr[ebx],0
    .endif
    ret
copy endp
initnano proc
    invoke lstrcpy,addr namecache,addr folder
    invoke foldersize,addr folder
    add eax,offset namecache
    mov WORD ptr[eax],92
    add eax,2
    ret
initnano endp
writenano proc h,nametype,nameleng,isfolder,dataleng
    local namebuff,namereaded,hdst,fsize
    local namecode,databuff,datareaded
    mov eax,95555h
    invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,nameleng
    mov namebuff,eax
    mov eax,nameleng
    invoke SetFilePointer,h,nameoffset,NULL,FILE_END
    invoke ReadFile,h,namebuff,nameleng,addr namereaded,0
    invoke initnano
    mov fsize,eax
    .if nametype==0
        invoke atow,namebuff,nameleng,fsize
    .else
        invoke copy,namebuff,nameleng,fsize
    .endif
    .if isfolder
        .if isuninstall
            invoke RemoveDirectory,addr namecache
        .else
            invoke CreateDirectory,addr namecache,NULL
        .endif
    .else
        .if isuninstall
            invoke DeleteFile,addr namecache
        .else
            mov databuff,eax
            invoke CreateFile,addr namecache,GENERIC_WRITE,FILE_SHARE_READ,0,CREATE_ALWAYS,FILE_ATTRIBUTE_NORMAL,0
            .if eax==INVALID_HANDLE_VALUE
                ret
            .endif
            mov hdst,eax
            invoke decodePackW,h,dataoffset,dataleng,hdst,addr datapassed
            invoke CloseHandle,hdst
        .endif
    .endif
    invoke GlobalFree,namebuff
    invoke GlobalFree,namecode
    ret
writenano endp


processed proc count
    local current,total
    finit
    fild datatotal
    .if !isuninstall
        fiadd uninstallSize
    .endif
    fistp total
    fild dataindex
    fiadd datapassed
    fist current
    fidiv total
    fstp m_processed
    ret
processed endp

readindex proc h
    local count,buffname[MAX_PATH]:WORD,
    local buffstart,buff,list
    local buffleng,listleng,nameleng,dataleng,nametype,isfolder
    local readed
    local temp
    invoke readcount,h
    mov count,eax
    mov eax,-8
    add eax,ecx
    sub eax,count
    mov buffstart,eax
    invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,count
    .if !eax
        invoke MessageBox,NULL,addr szErrOpenFile,addr szCaptionMain,MB_OK
        ret
    .endif
    mov buff,eax
    mov eax,count
    shl eax,3
    invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,eax
    .if !eax
        invoke MessageBox,NULL,addr szErrOpenFile,addr szCaptionMain,MB_OK
        ret
    .endif
    mov list,eax
    invoke SetFilePointer,h,buffstart,NULL,FILE_END
    invoke ReadFile,h,buff,count,addr readed,0
    mov eax,readed
    invoke decodeLEB128,buff,readed,list
    mov listleng,eax
    mov nametotal,0
    mov datatotal,0
    mov eax,10008h
    mov ecx,0
    mov edx,listleng
    .while ecx<edx
        mov eax,list
        mov ebx,ecx
        shl ebx,2
        add ebx,eax
        mov eax,DWORD ptr[ebx]
        mov nameleng,eax
        and eax,1
        mov nametype,eax
        mov eax,nameleng
        shr eax,1
        mov nameleng,eax
        add ebx,4
        mov eax,DWORD ptr[ebx]
        .if eax==0
            mov isfolder,1
            mov dataleng,0
        .else
            mov isfolder,0
            dec eax
            mov dataleng,eax
        .endif
        mov eax,datatotal
        add eax,dataleng
        mov datatotal,eax
        mov eax,nametotal
        add eax,nameleng
        mov nametotal,eax
        mov ebx,ecx
        shl ebx,3
        add ebx,offset filelist
        mov eax,nametype
        mov DWORD ptr[ebx],eax
        mov eax,nameleng
        mov DWORD ptr[ebx+4],eax
        mov eax,isfolder
        mov DWORD ptr[ebx+8],eax
        mov eax,dataleng
        mov DWORD ptr[ebx+12],eax
        add ecx,2

    .endw
    shr edx,1
    mov filecount,edx
    mov eax,buffstart
    sub eax,nametotal

    mov nameoffset,eax
    mov uninstallRest,eax
    sub eax,datatotal
    mov dataoffset,eax
    invoke SetFilePointer,h,dataoffset,NULL,FILE_END
    add eax,1
    sub eax,uninstallRest
    mov uninstallSize,eax

    invoke GlobalFree,buff
    invoke GlobalFree,list

    ret
readindex endp

parseCommandLine proc
    invoke GetCommandLine
    local paramstart
    local param2start
    local inquote
    mov ecx,eax
    mov eax,0
    mov inquote,0
    mov paramstart,0
    mov param2start,0
    mov edx,ecx
    add edx,MAX_PATH
    add edx,10
    .while ecx<edx
        mov ax,WORD ptr[ecx]
        .if eax==0
            .break 
        .endif
        .if eax==39 || eax==34
            .if eax==inquote
                mov inquote,0
                add ecx,2
            .else
                mov inquote,eax
            .endif
        .endif
        .if !inquote
            mov ebx,ecx
            .if !paramstart
                .while eax==32 || eax==9
                    add ebx,2
                    mov ax,WORD ptr[ebx]
                    mov paramstart,ebx
                .endw
            .elseif !param2start
                .while eax==32 || eax==9
                    add ebx,2
                    mov ax,WORD ptr[ebx]
                    mov param2start,ebx
                .endw
            .endif
            .if ebx>ecx
                sub ebx,2
                mov ecx,ebx
            .endif
        .endif
        add ecx,2
    .endw
    .if paramstart && ecx>paramstart
        mov eax,paramstart
        mov ax,WORD ptr[eax]
        .if ax==47
            mov hiddensetup,1
            .if param2start
                invoke lstrcpy,offset buffer2,param2start
            .endif
        .elseif param2start
            invoke lstrcpy,offset buffer2,paramstart
            mov eax,paramstart
            mov ebx,param2start
            sub ebx,eax
            mov eax,offset buffer2
            add eax,ebx
            sub eax,2
            mov ebx,eax
            mov ax,WORD ptr[ebx]
            .while ax==32||ax==9
                mov WORD ptr[ebx],0
                sub ebx,2
                mov ax,WORD ptr[ebx]
            .endw
            mov eax,param2start
            mov ax,WORD ptr[eax]
            .if ax==47
                mov hiddensetup,1
            .endif
        .else
            invoke lstrcpy,offset buffer2,paramstart
        .endif
    .endif
    ret
parseCommandLine endp

folderpath proc p,s,d
    local a
    mov eax,p
    mov ecx,0
    mov edx,s
    mov a,0
    .while ecx<edx
        mov ebx,eax
        add ebx,ecx
        mov bx,WORD ptr[ebx]
        and bx,0ffh
        .if ebx=='\'||ebx=='/'
            mov a,ecx

        .endif
        add ecx,2
    .endw
    invoke lstrcpy,d,p
    lea eax,d
    add eax,a
    mov WORD ptr[eax],0
    ret
folderpath endp

programinit proc
    local h
    local filename[MAX_PATH]:WORD
    invoke opensetup
    mov h,eax
    invoke readcount,h
    .if !eax
        invoke GetModuleFileName,0,addr filename,sizeof filename
        invoke foldersize,addr filename
        lea ebx,filename
        add eax,ebx
        .while WORD ptr[eax]!='\' && eax>ebx
            sub eax,2
        .endw
        mov WORD ptr[eax],0
        invoke lstrcpy,addr buffer2,addr filename;
        invoke lstrcpy,addr onekey1,addr onekey4
        invoke lstrcpy,addr onekey2,addr onekey5
        mov isuninstall,1
    .else 
        mov isuninstall,0
    .endif
    invoke CloseHandle,h
    ret
programinit endp

_Extract proc lParam
    local h,e,nametype,nameleng,isfolder,dataleng
    local flash:FLASHWINFO
    local delta
    local writed
    local hdata,readed,hdst
    .if isuninstall
        invoke unregister
    .endif
    mov writed,0
    invoke opensetup
    mov h,eax
    invoke readindex,h
    .if isuninstall
        mov ecx,filecount
        shl ecx,4
        mov edx,0
        mov delta,3
        fld m_delta
        fimul delta
        fstp m_delta
        mov eax,nameoffset
        add eax,nametotal
        mov nameoffset,eax
    .else
        mov ecx,0
        mov delta,16
        mov edx,filecount
        shl edx,4
    .endif
    .while ecx!=edx
        mov eax,10000h
        .if isuninstall
            sub ecx,16
        .endif
        mov ebx,DWORD ptr[ecx+offset filelist]
        mov nametype,ebx
        mov ebx,DWORD ptr[ecx+offset filelist+4]
        mov nameleng,ebx
        mov ebx,DWORD ptr[ecx+offset filelist+8]
        mov isfolder,ebx

        mov ebx,DWORD ptr[ecx+offset filelist+12]
        mov dataleng,ebx
        .if !isuninstall
            add ecx,16
        .endif
        push ecx
        push edx
        shr ecx,4
        invoke processed,ecx
        .if isuninstall
            mov eax,nameoffset
            sub eax,nameleng
            mov nameoffset,eax
        .endif
        invoke writenano,h,nametype,nameleng,isfolder,dataleng
        .if !isuninstall
            mov eax,nameoffset
            add eax,nameleng
            mov nameoffset,eax
            mov eax,dataoffset
            add eax,dataleng
            mov dataoffset,eax
            mov eax,dataindex
            add eax,dataleng
            mov dataindex,eax
        .endif
        pop edx
        pop ecx
    .endw

    .if !isuninstall && uninstallSize
        invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,uninstallSize
        mov hdata,eax
        invoke SetFilePointer,h,0,NULL,FILE_BEGIN
        mov ecx,uninstallSize
        sub ecx,1
        add ecx,uninstallRest
        invoke ReadFile,h,hdata,ecx,addr readed,0
        invoke SetFilePointer,h,uninstallRest,NULL,FILE_END
        mov ecx,0
        sub ecx,uninstallRest
        mov ebx,hdata
        add ebx,uninstallSize
        add ebx,uninstallRest
        dec ebx
        invoke ReadFile,h,ebx,ecx,addr readed,0
        mov ecx,uninstallSize
        dec ecx
        add ecx,hdata
        mov BYTE ptr[ecx],0
        invoke initnano
        invoke lstrcpy,eax,addr uninstallName
        invoke CreateFile,addr namecache,GENERIC_WRITE,FILE_SHARE_READ,0,CREATE_ALWAYS,FILE_ATTRIBUTE_NORMAL,0
        mov hdst,eax
        invoke WriteFile,hdst,hdata,uninstallSize,addr writed,NULL
        mov uninstallSize,0
        invoke processed,0
        invoke GlobalFree,hdata
        invoke CloseHandle,hdst
    .endif
    invoke CloseHandle,h
    .if !isuninstall
        invoke ShellExecute,NULL,addr shellOperator,addr assocname,NULL,addr folder,SW_HIDE
    .endif
    .if hWinMain
        mov flash.cbSize,sizeof flash
        mov eax,hWinMain
        mov flash.hwnd,eax
        mov flash.dwFlags,FLASHW_TIMERNOFG 
        mov flash.uCount,1
        mov flash.dwTimeout,0
        invoke FlashWindowEx,addr flash
    .endif
        fld1
        fstp m_processed
    ret
_Extract endp
foldersize proc f
    mov ebx, f
    mov ecx,0
    .while TRUE
        mov ax,WORD ptr[ebx]
        .break .if ecx>MAX_PATH
        .if ax==0
            mov eax,ecx
            shl eax,1
            .break
        .endif
        add ebx,2
        inc ecx
    .endw
    ret
foldersize endp
folderfind proc mark
    local finded:WIN32_FIND_DATA,temppath[MAX_PATH]:WORD
    local h,s
    invoke lstrcpy,addr temppath,offset buffer
    invoke lstrcat,addr temppath,mark
    invoke FindFirstFile,addr temppath,addr finded
    .if eax!=INVALID_HANDLE_VALUE
        .if finded.dwFileAttributes&FILE_ATTRIBUTE_DIRECTORY
            mov h,eax
            mov s,0
            .repeat
                mov eax,s
                add eax,1
                mov s,eax
                invoke FindNextFile,h,addr finded
            .until (eax==FALSE||s>2)
            invoke FindClose,eax
            .if s>2
                mov eax,1
            .else 
                mov eax,0
            .endif
        .else
            mov eax,1
        .endif
    .else
        mov eax,0
    .endif
    ret
folderfind endp
folderinit proc
    local bufferat
    invoke lstrcpy,offset buffer,offset buffer2
    invoke foldersize,offset buffer
    add eax,offset buffer
    mov ebx,eax
    .if WORD ptr [ebx-2]!="\"
        mov WORD ptr [ebx],"\"
        add ebx,2
        mov WORD ptr [ebx],0
    .endif
    mov bufferat,ebx
    invoke folderfind,addr findmark
    .if eax
        invoke folderfind,addr assocname
        mov ebx,bufferat
        .if !eax
            mov ecx,offset szText
            mov ax,WORD ptr [ecx]
            mov WORD ptr [ebx],ax
            mov ax,WORD ptr [ecx+2]
            mov WORD ptr [ebx+2],ax
            mov WORD ptr [ebx+4],0
            add ebx,4
        .endif
        mov bufferat,ebx
    .endif
    .if WORD ptr[ebx-2]=="\"
        mov ebx,bufferat
        mov WORD ptr[ebx-2],0
    .endif

    invoke lstrcpy,offset folder,offset buffer
    ret
folderinit endp
choosingfn proc hWnd,uMsg,lParam,lpData
    local  pszPath[MAX_PATH] :WORD
    mov eax,uMsg
    .if eax==BFFM_INITIALIZED
        invoke SendMessage,hWnd,BFFM_SETSELECTION,TRUE,addr folder
    .elseif eax==BFFM_SELCHANGED
        ; ret
        invoke SHGetPathFromIDList,lParam,addr buffer2
        invoke SendMessage,hWnd,BFFM_SETSTATUSTEXT,0,addr pszPath
    .endif
    mov eax,0
    ret
choosingfn endp
choosedist proc,hWnd
    local info:BROWSEINFO,image,locat
    ; invoke foldersize
    ; invoke SHGetFolderLocation,hWinMain,offset folder,eax ,addr locat,MAX_PATH
    ; mov locat,eax
    mov eax,hWnd
    mov info.hwndOwner,eax
    mov info.pidlRoot,NULL
    mov info.pszDisplayName,offset buffer
    mov info.lpszTitle,offset folderTitle
    mov info.lpfn,choosingfn
    mov info.ulFlags,BIF_EDITBOX or BIF_NEWDIALOGSTYLE or BIF_RETURNONLYFSDIRS or BIF_STATUSTEXT
    mov info.iImage,0
    mov info.lParam,0

    mov info.ulFlags,0
    invoke SHBrowseForFolder,addr info
    ret
choosedist endp

brizer_t proc _a,_b,_c,_d,_t
    local sum
    local t1,t2,t3,s1,s2,s3
    fld _t
    fst t1
    fmul _t
    fst t2
    fmul _t
    fstp t3
    fld1
    fsub _t
    fst s1
    fmul s1
    fst s2
    fmul s1
    fstp s3

    fld _a
    fmul s3

    fld _b
    fmul r3
    fmul t1
    fmul s2
    fadd

    fld _c
    fmul r3
    fmul t2
    fmul s1
    fadd

    fld _d
    fmul t3
    fadd

    fstp sum
    mov eax,sum
    ret
brizer_t endp

brizer proc x1,y1,x2,y2,x3,y3,x4,y4,b
    local count,total,linesize,d
    local t:REAL4
    mov eax,b
    xor edx,edx
    mov ebx,24
    div ebx
    mov count,eax
    mov eax,sizeof logodots
    div ebx
    xor edx,edx
    mov total,eax
    mov eax,sizeof logoline
    mov ebx,total
    div ebx
    xor edx,edx
    mov linesize,eax
    mov ebx,count
    mul ebx
    mov ebx,eax
    add ebx,offset logoline
    mov ecx,0
    mov eax,0
    .while ecx<linesize
        mov d,ecx
        finit
        fild d
        fidiv linesize
        fstp t
        .if eax==0
            invoke brizer_t,x1,x2,x3,x4,t
            mov REAL4 ptr[ebx],eax
            mov eax,1
        .elseif
            invoke brizer_t,y1,y2,y3,y4,t
            mov REAL4 ptr[ebx],eax
            mov eax,0
        .endif
        add ebx,4
        add ecx,4
    .endw
    ret
brizer endp
_DrawText proc @gp,color,textoffset,fSize,rect,fFamily,rectref
    local font,format,brush,family,sz,x,y,r,textlength
    fild fSize
    fstp sz
    invoke GdipCreateFontFamilyFromName,fFamily,NULL,addr family
    invoke GdipCreateFont, family,sz,0,0,addr font
    invoke GdipCreateStringFormat, 00007400h,0,addr format
    invoke GdipSetStringFormatTrimming,format,5
    invoke GdipCreateSolidFill,color,addr brush
    invoke foldersize,textoffset
    shr eax,1
    mov textlength,eax
    .if rectref
        invoke GdipMeasureString,@gp,textoffset,textlength,font,rect,format,rectref,addr x,addr y
    .endif
    invoke GdipDrawString,@gp,textoffset,textlength,font,rect,format,brush
    invoke GdipDeleteFontFamily,family
    invoke GdipDeleteFont,font
    invoke GdipDeleteBrush,brush
    invoke GdipDeleteStringFormat,format
    ret
_DrawText endp

_DrawButton proc gp,b:EFRONT_BUTTON,fillcolor,bordercolor,outline,outcolor
    local pen,brush
    .if b.back!=0
        invoke GdipCreateSolidFill,fillcolor,addr brush
        invoke GdipFillPath,gp,brush,b.back
        invoke GdipDeleteBrush,brush
    .endif
    .if b.text!=0
        invoke _DrawText,gp,bordercolor,b.text,b.clip,b.rect,offset fontFamili,0
    .elseif b.clip!=0
        invoke GdipCreateSolidFill,bordercolor,addr brush
        invoke GdipFillPath,gp,brush,b.clip
        invoke GdipDeleteBrush,brush
    .endif
    .if outline!=0
        invoke GdipCreatePen1,outcolor,outline,0,addr pen
        invoke GdipDrawPath,gp,pen,b.back
        invoke GdipDeletePen,pen
    .endif
    ret
_DrawButton endp

_CreatePath proc doffset,dlen
    local path,dend
    mov eax,dlen
    add eax,7
    shr eax,3
    mov dend,eax
    invoke GdipCreatePath,0,addr path
    invoke GdipAddPathPolygon,path,doffset,dend
    invoke GdipSetPathFillMode,path,1
    mov eax,path
    ret
_CreatePath endp

_ChangeLine proc @index:DWORD,@leng:DWORD,@c:DotsChangeParam
    local x,y,r
    local endl,@factor:REAL4
    fld1
    fstp @factor
    mov eax,@index
    add eax,@leng
    mov endl,eax
    fld @c.x
    fmul @factor
    fstp x
    fld @c.y
    fmul @factor
    fstp y
    fld @c.r
    fmul @factor
    fstp r
    mov ebx,@index
    mov eax,0
    .while ebx <endl
        finit
        fld REAL4 ptr[ebx]

        fmul r
        .if eax==0
            mov eax,1
            fadd x
        .elseif
            fadd y
            mov eax,0
        .endif
        fstp REAL4 ptr[ebx]

        add ebx,4
    .endw
    ret
_ChangeLine endp

_Brizerline proc
    local enddots
    mov ebx,offset logodots
    mov ecx,0
    .while ecx<sizeof logodots
        push ebx
        push ecx
        invoke brizer,REAL4 ptr[ebx],REAL4 ptr[ebx+4],\
            REAL4 ptr[ebx+8],REAL4 ptr[ebx+12],\
            REAL4 ptr[ebx+16],REAL4 ptr[ebx+20],\
            REAL4 ptr[ebx+24],REAL4 ptr[ebx+28],ecx
        pop ecx
        pop ebx
        add ebx,24
        add ecx,24
    .endw
    ret
_Brizerline endp
drawtitle proc @gp
    invoke _DrawText,@gp,0ff629436h,offset szText,42,offset titlerect,offset fontFamily,0
    ret
drawtitle endp


drawlogo proc @gp
    local count,percented,pen
    mov count,sizeof logoline
    fild count
    fmul m_percent
    fistp percented
    .if isuninstall
        invoke GdipCreatePen1,0ff336600h,width_10,0,addr pen
    .else
        invoke GdipCreatePen1,0ffd4d6d6h,width_10,0,addr pen
    .endif
    mov eax,percented
    shr eax,31
    .if eax
        invoke GdipResetPath,ground.clip
        mov ecx,sizeof logoline
        shr ecx,3
        add eax,offset logoline
        invoke GdipAddPathLine2,ground.clip,eax,ecx
        invoke GdipDrawPath,@gp,pen,ground.clip
        ret
    .endif
    .if percented>sizeof logoline
        mov percented,sizeof logoline
    .endif
    .if isuninstall
        mov eax,sizeof logoline
        sub eax,percented
    .else
        mov eax,percented
    .endif
    shr eax,3
    mov percented,eax
    invoke GdipSetPenColor,pen,0ffd4d6d6h
    invoke GdipResetPath,ground.clip
    mov eax,percented
    shl eax,3
    add eax,offset logoline
    mov ebx,sizeof logoline
    shr ebx,3
    sub ebx,percented
    invoke GdipAddPathLine2,ground.clip,eax,ebx
    invoke GdipDrawPath,@gp,pen,ground.clip
    invoke GdipSetPenColor,pen,0ff336600h
    invoke GdipResetPath,ground.clip
    invoke GdipAddPathLine2,ground.clip,offset logoline,percented
    invoke GdipDrawPath,@gp,pen,ground.clip
    invoke GdipDeletePen,pen
    ret
drawlogo endp
drawclose proc @gp
    .if m_current==offset close
        .if m_actived
            invoke _DrawButton,@gp,close,0ff882200h,0ffffffffh,0,0
        .else
            invoke _DrawButton,@gp,close,0ffcc4400h,0ffffffffh,0,0
        .endif
    .else
            invoke _DrawButton,@gp,close,0ff323634h,0ff336622h,1,0ff666666h
    .endif
    ret
drawclose endp
drawsetup proc @gp
    .if m_current==offset setup
        .if m_actived||(setup.text==offset onekey2)
            invoke _DrawButton,@gp,setup,0ff325614h,0ff629436h,2,0ff629436h
        .else
            invoke _DrawButton,@gp,setup,0ff327624h,0ffd2f4c6h,2,0ff629436h
        .endif
    .else
        invoke _DrawButton,@gp,setup,0ff426426h,0ffc2e496h,2,0ff629436h
    .endif
    ret
drawsetup endp
drawsleep proc @gp
    local color
    .if m_current==offset folder
        .if m_actived
            mov color,0ff922416h
        .else
            mov color,0ffc24436h
        .endif
    .else 
        mov color,0ff629436h
    .endif
    invoke _DrawText,@gp,color,offset folder,16,offset folder_rect,offset fontFamili,offset m_folder
    ret
drawsleep endp
drawfolder proc @gp
    local tback:EFRONT_BUTTON,path,left,top,right,bottom
    mov eax,offset m_folder
    fld REAL4 ptr[eax+12]
    fistp bottom
    .if bottom!=0
        fld REAL4 ptr[eax]
        fstp left
        fld REAL4 ptr[eax+4]
        fstp top
        fld REAL4 ptr[eax+8]
        fadd left
        fstp right
        fld REAL4 ptr[eax+12]
        fadd top
        fstp bottom
        invoke GdipCreatePath,0,addr path
        invoke GdipAddPathLine,path,left,top,right,top
        invoke GdipAddPathLine,path,right,top,right,bottom
        invoke GdipAddPathLine,path,right,bottom,left,bottom
        invoke GdipAddPathLine,path,left,bottom,left,top
        mov eax,path
        mov tback.back,eax
        mov tback.clip,0
        mov tback.text,0
        invoke _DrawButton,@gp,tback,0fff2f6f4h,0,0,0
        invoke GdipDeletePath,path
        invoke drawlogo,@gp
    .endif
    invoke drawsleep,@gp
ret
drawfolder endp
isinfolder proc
    local temp
    mov ebx,offset m_folder
    fld REAL4 ptr[ebx]
    fsub m_left
    fstp temp
    mov eax,temp
    shr eax,31
    .if eax==0
        ret
    .endif
    fld REAL4 ptr [ebx+4]
    fsub m_top
    fstp temp
    mov eax,temp
    shr eax,31
    .if eax==0
        ret
    .endif
    fld REAL4 ptr[ebx]
    fadd REAL4 ptr[ebx+8]
    fsub m_left
    fstp temp
    mov eax,temp
    shr eax,31
    .if eax==1
        mov eax,0
        ret
    .endif
    fld REAL4 ptr[ebx+4]
    fadd REAL4 ptr[ebx+12]
    fsub m_top
    fstp temp
    mov eax,temp
    shr eax,31
    .if eax==1
        mov eax,0
        ret
    .endif
    mov eax,1
    ret
isinfolder endp

_CreateShapes proc @gp
    invoke _CreatePath,addr crossline,sizeof crossline
    mov close.clip,eax
    invoke _CreatePath,addr closeline,sizeof closeline
    mov close.back,eax
    invoke _CreatePath,addr setupline,sizeof setupline
    mov setup.back,eax
    mov setup.text,offset onekey1
    mov setup.clip,16
    mov setup.rect,offset onekey_rect

    invoke _CreatePath,addr logoline,sizeof logoline
    mov ground.clip,eax
    invoke _CreatePath,addr g_rect,sizeof g_rect
    mov ground.back,eax
    invoke _DrawButton,@gp,ground,0ff323634h,0fff2f6f4h,0,0

    invoke drawlogo,@gp
    invoke drawclose,@gp
    invoke drawsetup,@gp
    invoke drawtitle,@gp
    invoke drawsleep,@gp
    ret
_CreateShapes endp
_DeleteShapes proc
    invoke GdipDeletePath,close.clip
    invoke GdipDeletePath,close.back
    invoke GdipDeletePath,setup.back
    invoke GdipDeletePath,ground.clip
    invoke GdipDeletePath,ground.back
    ret
_DeleteShapes endp    
_SetCursor proc
    local temp
    fld m_processed
    fchs
    fdiv m_delta
    fistp temp
    mov eax,temp
    shr eax,31
    .if eax
        ret
    .endif
    mov eax,m_cursor
    .if m_current==offset folder
        .if eax!=m_hand
            mov eax,m_hand
            mov m_cursor,eax
            invoke SetCursor,eax
        .endif
    .else
        .if (eax!=m_arrow)
            mov eax,m_arrow
            mov m_cursor,eax
            invoke SetCursor,eax
        .endif
    .endif
    ret
_SetCursor endp

_UpdateCursor proc hWnd
    local r:RECT;
    local x,y
    local p:POINT
    invoke GetCursorPos,addr p
    invoke GetWindowRect,hWnd,addr r
    mov eax,p.x
    sub eax,r.left
    mov x,eax
    mov eax,p.y
    sub eax,r.top
    mov y,eax
    fild x
    fmul factor_ratio
    fidiv factor
    fstp m_left
    fild y
    fmul factor_ratio
    fidiv factor
    fstp m_top
    ret
_UpdateCursor endp

_Frame proc hWnd
    local @gp,@hDc,dc
    local @hGdi
    local ratio :REAL4
    local delta 
    local matrix
    local isIn
    invoke GetDC,hWnd;
    mov dc,eax
    invoke CreateCompatibleDC,dc
    mov @hDc,eax
    .if bitmap==0
        invoke CreateCompatibleBitmap,dc,w_rect.w,w_rect.h
        mov bitmap,eax
        invoke BitBlt,@hDc,0,0,w_rect.w,w_rect.h,dc,0,0,SRCCOPY
    .endif
    invoke SelectObject,@hDc,bitmap
    ; mov eax,dc
    finit
    fild factor
    fdiv factor_ratio
    fstp ratio
    invoke GdipCreateFromHDC,@hDc,addr @gp
    invoke GdipSetTextRenderingHint,@gp,3
    invoke GdipSetSmoothingMode,@gp,4
    invoke GdipCreateMatrix,addr matrix
    invoke GdipScaleMatrix,matrix,ratio,ratio,1
    invoke GdipSetWorldTransform,@gp,matrix
    invoke GdipDeleteMatrix,matrix
    .if close.clip==0
        invoke _CreateShapes,@gp
        jmp @F
    .endif
    finit
    fld m_processed
    fsub m_percent
    fdiv m_delta
    fistp delta
    mov eax,delta
    shr eax,31
    .if eax==0
        fld m_percent
        fadd m_delta
        fstp m_percent
        invoke drawlogo,@gp
        fld m_percent
        mov delta,100
        fimul delta
        fistp delta
        mov eax,delta
        .if eax>23
            .if eax>=100
                mov setup.text,offset onekey3
            .else
                xor edx,edx
                mov bx,10
                div bx
                mov ebx,offset onekey2
                add ax,'0'
                add dx,'0'
                mov WORD ptr[ebx], 12288
                mov WORD ptr[ebx+2], 32
                mov WORD ptr[ebx+4],ax
                mov WORD ptr[ebx+6],dx
                mov WORD ptr[ebx+8],"%"
                invoke drawsetup,@gp
            .endif
        .endif
        
    .endif
    call issetting
    .if eax
        jmp @F
    .endif
    invoke _UpdateCursor,hWnd

    invoke GdipIsVisiblePathPoint,close.back,m_left,m_top,@gp,addr isIn
    .if isIn
        mov m_current,offset close
    .else
        invoke GdipIsVisiblePathPoint,setup.back,m_left,m_top,@gp,addr isIn
        .if isIn
            mov m_current,offset setup
        .else
            mov m_current,0
            invoke isinfolder
            .if eax
                mov m_current,offset folder
            .endif
        .endif
    .endif
    invoke _SetCursor
    mov eax,m_current
    mov ebx,m_actived
    .if eax!=m_origin
    .elseif ebx!=m_active
    .else
        jmp @F
    .endif
    .if (m_origin==offset close)||(m_current==offset close)
        invoke drawclose,@gp
    .endif
    .if (m_origin==offset setup)||(m_current==offset setup)
        invoke drawsetup,@gp
    .endif
    .if (m_origin==offset folder)||(m_current==offset folder)
        invoke drawsleep,@gp
    .endif
    mov eax,m_current
    mov ebx,m_actived
    mov m_origin,eax
    mov m_active,ebx
    @@:
    invoke lstrcmp,offset buffer,offset folder
    .if eax
        invoke folderinit
        invoke drawfolder,@gp
    .endif
    invoke GdipReleaseDC,@gp,@hDc
    invoke GdipDeleteGraphics,@gp
    invoke BitBlt,dc,0,0,w_rect.w,w_rect.h,@hDc,0,0,SRCCOPY
    invoke ReleaseDC,hWnd,dc
    invoke DeleteDC,@hDc
    ret
_Frame endp
;
;
;
_LeftMove proc hWnd
    local p:POINT,tmp
    invoke GetCursorPos,addr p
    .if m_moved!=1
        finit
        fild p.x
        fisub m_pos.x
        fst tmp
        fmul tmp
        fild p.y
        fsub m_pos.y
        fst tmp
        fmul tmp
        fadd
        fistp tmp
        mov eax,factor
        .if tmp>=eax
            mov m_moved,1
        .else
            ret
        .endif
    .endif
    mov eax,p.x
    sub eax,m_pos.x
    add eax,w_rect.x
    mov w_rect.x,eax
    mov eax,p.y
    sub eax,m_pos.y
    add eax,w_rect.y
    mov w_rect.y,eax
    invoke MoveWindow,hWnd,w_rect.x,w_rect.y,w_rect.w,w_rect.h,FALSE
    mov eax,p.x
    mov m_pos.x,eax
    mov eax,p.y
    mov m_pos.y,eax
    ret
_LeftMove endp
_LeftDown proc hWnd
    local r:RECT
    invoke GetCursorPos,addr m_pos
    invoke GetWindowRect,hWnd,addr r
    mov eax,r.left
    mov w_rect.x,eax
    mov eax,r.top
    mov w_rect.y,eax
    mov m_actived,TRUE
    mov m_moved,FALSE
    
    ret
_LeftDown endp

_MouseMove proc hWnd
    .if m_actived
        invoke _LeftMove,hWnd
        ret
    .endif
    invoke _UpdateCursor,hWnd
    ret
_MouseMove endp

_LeftUp proc hWnd
    .if m_moved
        mov m_actived,0
        ret
    .endif
    mov m_moved,0
    mov m_active,0
    invoke issetting
    .if eax
    .elseif m_current==offset close
        invoke SendMessage,hWnd,WM_CLOSE,NULL,NULL
    .elseif m_current==offset setup
        .if setup.text==offset onekey1
            mov setup.text,offset onekey2
            invoke _Frame,hWnd
            invoke setupstart
        .else
            invoke SendMessage,hWnd,WM_CLOSE,NULL,NULL
        .endif
    .elseif m_current==offset folder
        invoke choosedist,hWnd
    .endif
    mov m_actived,0
    ret
_LeftUp endp



_InitFactor proc 
    local info :MONITORINFO
    local p:POINT,tmp,m
    invoke GetCursorPos,addr p
    invoke MonitorFromPoint,p.x,p.y,MONITOR_DEFAULTTOPRIMARY
    mov m,eax
    .if m==0
        ret
    .endif
    mov info.cbSize,sizeof info
    invoke GetMonitorInfo,m,addr info
    mov eax, info.rcMonitor.left
    mov ebx, info.rcMonitor.top

    mov eax,w_rect.w
    mov ebx,w_rect.h
    mov ecx,info.rcWork.right
    add ecx,info.rcWork.left
    sub ecx,eax
    mov edx,info.rcWork.bottom
    add edx,info.rcWork.top
    sub edx,ebx
    shr ecx,1
    shr edx,1
    mov w_rect.x,ecx
    mov w_rect.y,edx
    ret
_InitFactor endp

_SetFactor proc
    local desktop,w,h,w1,h1
    invoke GetSystemMetrics,SM_CXSCREEN
    mov w,eax
    invoke GetSystemMetrics,SM_CYSCREEN
    mov h,eax
    invoke LoadLibrary,offset shcoreName
    mov shcore,eax
    invoke GetProcAddress,eax,offset dpiProcName
    .if eax != 0
        push DWORD ptr 1 ;切换分辨率自动缩放
        ; push DWORD ptr 2 ;切换分辨率手动缩放
        call eax
    .endif
    invoke GetSystemMetrics,SM_CXSCREEN
    mov w1,eax
    invoke GetSystemMetrics,SM_CYSCREEN
    mov h1,eax
    mov eax,w_rect.w
    mov ebx,w1
    mul ebx
    mov ebx,w
    div ebx
    mov w_rect.w,eax
    mov eax,w_rect.h
    mov ebx,h1
    mul ebx
    mov ebx,h
    div ebx
    mov w_rect.h,eax
    mov eax,w1
    shl eax,2
    mov ebx,w
    xor edx,edx
    div ebx
    mov factor,eax
    call _InitFactor
    ret
_SetFactor endp


_ProcWinMain proc uses ebx edi esi,hWnd,uMsg,wParam,lParam
    local @stPs:PAINTSTRUCT
    mov eax,uMsg
    .if eax==WM_CREATE
        invoke SetTimer,hWnd,1,17,NULL
        invoke GetWindowLong,hWnd,GWL_EXSTYLE
        invoke SetWindowLong,hWnd,GWL_EXSTYLE,eax
        invoke SetLayeredWindowAttributes,hWnd,0,255,2
    .elseif eax==WM_LBUTTONDOWN
        invoke _LeftDown,hWnd
        invoke SetCapture,hWnd
    .elseif eax==WM_LBUTTONUP
        invoke _LeftUp,hWnd
    .elseif eax==WM_MOUSELEAVE
        invoke _MouseMove,hWnd
    .elseif eax==WM_MOUSEMOVE
        invoke _MouseMove,hWnd
    ; .elseif eax==WM_DPICHANGED_BEFOREPARENT
    ;     invoke _SetFactor
    ;     invoke SetWindowPos,hWnd,NULL,w_rect.x,w_rect.y,w_rect.w,w_rect.h,SWP_NOMOVE
    ; .elseif eax==WM_DPICHANGED
    ;     invoke _SetFactor
    ;     invoke SetWindowPos,hWnd,NULL,w_rect.x,w_rect.y,w_rect.w,w_rect.h,SWP_NOMOVE
    ; .elseif eax==WM_GETDPISCALEDSIZE
    ;     invoke _SetFactor
    ;     invoke SetWindowPos,hWnd,NULL,w_rect.x,w_rect.y,w_rect.w,w_rect.h,SWP_NOMOVE
    .elseif eax==WM_TIMER
        .if dataindex
            invoke processed,0
        .endif
        invoke _Frame,hWnd
    .elseif eax==WM_SHOWWINDOW
    .elseif eax==WM_SETCURSOR
        invoke _SetCursor
    .elseif eax== WM_PAINT
        ; mov eax,hWnd
        ; .if eax==hWinMain
        ;     mov eax,0
        ;     ret
        ; .endif
        invoke BeginPaint,hWnd,addr @stPs
        invoke EndPaint,hWnd,addr @stPs
    .elseif eax==WM_CLOSE
        call issetting
        .if eax
            ret
        .endif
        invoke DestroyWindow,hWnd
        invoke PostQuitMessage,NULL
        invoke KillTimer,hWnd,1
    .else
        invoke DefWindowProc,hWnd,uMsg,wParam,lParam
        ret
    .endif
    ret
_ProcWinMain endp

_WinMain proc
    local @stWndClass:WNDCLASSEX
    local @stMsg:MSG,hWnd
    invoke GetModuleHandle,NULL
    mov hInstance,eax

    ;
    ;
    mov @stWndClass.cbSize,sizeof WNDCLASSEX
    mov @stWndClass.style, CS_BYTEALIGNWINDOW
    mov @stWndClass.lpfnWndProc,offset _ProcWinMain
    mov @stWndClass.cbClsExtra,NULL
    mov @stWndClass.cbWndExtra,NULL
    push hInstance
    pop @stWndClass.hInstance
    mov @stWndClass.hbrBackground,COLOR_BACKGROUND
    mov @stWndClass.lpszMenuName,NULL
    mov @stWndClass.lpszClassName,offset szClassName
    invoke LoadIcon,hInstance,1000h
    mov @stWndClass.hIcon,eax
    invoke LoadCursor,NULL,IDC_HAND
    mov m_hand,eax
    invoke LoadCursor,NULL,IDC_ARROW
    mov m_arrow,eax
    mov @stWndClass.hCursor,eax
    mov @stWndClass.hIconSm,0
    invoke RegisterClassEx,addr @stWndClass
    invoke CreateWindowEx,0,\
        offset szClassName,offset szCaptionMain,\
        WS_POPUP,\
        w_rect.x,w_rect.y,w_rect.w,w_rect.h,\
        NULL,NULL,hInstance,NULL
    mov hWnd,eax
    mov hWinMain,eax

    invoke ShowWindow,eax,SW_SHOWNORMAL
    invoke _Frame,hWnd
    invoke UpdateWindow,hWnd
    .while TRUE
        invoke GetMessage,addr @stMsg,NULL,0,0
        .break .if eax ==0
        invoke TranslateMessage,addr @stMsg
        invoke DispatchMessage,addr @stMsg
    .endw
    mov eax,@stMsg.wParam
    ret
_WinMain endp
callbat proc addr1, addr2, type1
    local info:SHELLEXECUTEINFO
    local param[MAX_PATH]:WORD
    local direc[MAX_PATH]:WORD
    invoke lstrcpy,addr param,addr1
    invoke foldersize,addr param
    mov ebx,eax
    lea eax,param
    add eax,ebx
    sub eax,2
    mov WORD ptr[eax],'"'
    invoke lstrcat,addr param,addr2
    invoke foldersize,addr param
    mov ebx,eax
    lea eax,param
    add eax,ebx
    mov WORD ptr[eax],'"'
    mov WORD ptr[eax+2],0
    invoke folderpath, addr folder, sizeof folder, addr direc
    mov info.cbSize, sizeof info;
    mov eax,type1
    mov info.fMask, eax;
    mov info.hwnd, NULL;
    mov info.lpVerb, NULL;
    mov info.lpFile, offset uninstall ;
    lea eax, param
    mov info.lpParameters,  eax;
    lea eax, direc
    mov info.lpDirectory, eax;
    mov info.nShow, SW_HIDE;
    mov info.hInstApp, NULL;
    invoke ShellExecuteEx, addr info
    mov eax, info.hProcess
    ret
callbat endp
unregister proc
    invoke callbat, addr unassocParam,addr unassoc,SEE_MASK_NOCLOSEPROCESS
    invoke WaitForSingleObject, eax, INFINITE
    ret
unregister endp


removeall proc
    invoke callbat,addr uninstallParam,addr folder, SEE_MASK_NOASYNC
    ret
removeall endp

start:
    invoke _ChangeLine,addr logodots,sizeof logodots,logo_c
    invoke _ChangeLine,addr closeline,sizeof closeline,close_c
    invoke _ChangeLine,addr crossline,sizeof crossline,cross_c
    invoke _Brizerline
    invoke _SetFactor
    ;invoke GetEnvironmentVariable,offset program,offset buffer2,MAX_PATH
    invoke SHGetSpecialFolderPath,NULL,offset buffer2,CSIDL_PROGRAM_FILES,FALSE
    invoke parseCommandLine
    invoke programinit
    invoke folderinit
    .if hiddensetup
        invoke _Extract,NULL
    .else
        invoke GdiplusStartup,offset gptoken,offset gpstart,NULL
        call _WinMain
        invoke _DeleteShapes
        invoke GdiplusShutdown,gptoken
    .endif
    .if filecount
        .if isuninstall
            invoke removeall
        .endif
    .endif
    invoke ExitProcess,NULL
end start