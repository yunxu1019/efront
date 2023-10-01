.386
.model flat,stdcall
option casemap:none
__UNICODE__ equ 1
include windows.inc
;
;
;
include user32.inc
includelib user32.lib
include kernel32.inc
includelib kernel32.lib
include gdi32.inc
includelib gdi32.lib
;
;
;
.data
shcoreName dw "shcore.dll",0
dpiProcName byte "SetProcessDpiAwareness",0
factorProc byte "GetScaleFactorForDevice",0
fontFamily db "宋体",0
factor dd 1
wWidth dd 480
wHeight dd 360
.data?
shcore dd ?
hInstance dd ?
hWinMain dd ?

.const
szClassName dw '东郭先生和狼',0,0
szCaptionMain dw '首个窗口!',0,0
szText dw 'Win32 汇编，简单又强大！',0,0
;
;
;
.code
;
;
;
_ProcWinMain proc uses ebx edi esi,hWnd,uMsg,wParam,lParam
local @stPs:PAINTSTRUCT
local @stRect:RECT
local @fontStyle:LOGFONT
local @hDc
local @hFont

mov eax,uMsg
.if eax==WM_CREATE
    ; invoke GetWindowLong,hWnd,GWL_EXSTYLE
    ; or eax,80000h
    ; invoke SetWindowLong,hWnd,GWL_EXSTYLE,eax
    ; invoke SetLayeredWindowAttributes,hWnd,0,1,2
    ; invoke SetWindowPos,hWnd,HWND_TOPMOST,0,0,0,0,SWP_SHOWWINDOW or SWP_NOMOVE or SWP_NOSIZE

.elseif eax== WM_PAINT
    invoke BeginPaint,hWnd,addr @stPs
    mov @hDc,eax
    invoke GetStockObject,SYSTEM_FONT
    mov @hFont,eax
    invoke GetObject,@hFont,sizeof @fontStyle,addr @fontStyle
    xor edx,edx
    mov ebx,factor
    mov eax,32
    mul ebx
    shr eax,2
    mov @fontStyle.lfHeight,eax
    mov eax,16
    mul ebx
    shr eax,2
    mov @fontStyle.lfWidth,eax
    mov @fontStyle.lfCharSet,GB2312_CHARSET
    invoke lstrcpy,addr @fontStyle.lfFaceName,addr fontFamily

    invoke CreateFontIndirectEx,addr @fontStyle
    invoke SelectObject,@hDc,eax
    invoke GetClientRect,hWnd,addr @stRect
    invoke DrawText,@hDc,addr szText,-1,\
    addr @stRect,\
    DT_SINGLELINE or DT_CENTER or DT_VCENTER
    invoke EndPaint,hWnd,addr @stPs
;
.elseif eax==WM_CLOSE
    invoke DestroyWindow,hWinMain
    invoke PostQuitMessage,NULL
.else
    invoke DefWindowProc,hWnd,uMsg,wParam,lParam
    ret
.endif
xor eax,eax
ret
_ProcWinMain endp
_WinMain proc
local @stWndClass:WNDCLASSEX
local @stMsg:MSG
local rect :RECT
invoke GetModuleHandle,NULL
mov hInstance,eax
invoke RtlZeroMemory,addr @stWndClass,sizeof @stWndClass
;
;
mov @stWndClass.cbSize,sizeof WNDCLASSEX
mov @stWndClass.style,CS_HREDRAW or CS_VREDRAW or CS_BYTEALIGNWINDOW
mov @stWndClass.lpfnWndProc,offset _ProcWinMain
mov @stWndClass.cbClsExtra,NULL
mov @stWndClass.cbWndExtra,NULL
push hInstance
pop @stWndClass.hInstance
mov @stWndClass.hbrBackground,COLOR_WINDOW+1
mov @stWndClass.lpszClassName,offset szClassName
invoke LoadIcon,hInstance,100
mov @stWndClass.hIcon,eax
invoke LoadCursor,NULL,IDC_ARROW
mov @stWndClass.hCursor,eax
mov @stWndClass.hIconSm,0
invoke RegisterClassEx,addr @stWndClass
invoke GetDesktopWindow
mov ecx,eax
invoke GetClientRect,ecx,addr rect
mov eax,wWidth
mov ebx,wHeight
mov ecx,rect.right
mov edx,rect.bottom
sub ecx,eax
shr ecx,1
sub edx,ebx
shr edx,1
invoke CreateWindowEx,WS_EX_CLIENTEDGE,\
    offset szClassName,offset szCaptionMain,\
    WS_OVERLAPPEDWINDOW or WS_POPUP or WS_SIZEBOX,\
    ecx,edx,eax,ebx,\
    NULL,NULL,hInstance,NULL
mov hWinMain,eax
invoke ShowWindow,hWinMain,SW_SHOWNORMAL
invoke UpdateWindow,hWinMain
.while TRUE
    invoke GetMessage,addr @stMsg,NULL,0,0
    .break .if eax ==0
    invoke TranslateMessage,addr @stMsg
    invoke DispatchMessage,addr @stMsg
.endw
mov eax,@stMsg.wParam
ret
_WinMain endp
start:
    invoke LoadLibraryW,offset shcoreName
    mov shcore,eax
    invoke GetProcAddress,eax,offset dpiProcName
    .if eax != 0
        push DWORD ptr 2
        call eax
    .endif
    mov eax,shcore
    invoke GetProcAddress,eax, offset factorProc
    .if eax!=0
        push DWORD ptr 0
        call eax
        xor edx,edx
        xor ecx,ecx
        mov ebx,15
        div ebx
        mov ebx,eax
        mov factor,eax
        mov eax,wWidth
        mul ebx
        shr eax,2
        mov wWidth,eax
        mov eax,wHeight
        mul ebx
        shr eax,2
        mov wHeight,eax
    .endif

call _WinMain
invoke ExitProcess,NULL
end start