.386
.Model Flat, StdCall
Option Casemap :None
__UNICODE__ equ 1
;部分代码来自http://www.voidcn.com/article/p-rzrbrmkt-bxe.html
Include windows.inc
Include user32.inc
Include kernel32.inc
Include gdi32.inc

includelib gdi32.lib
IncludeLib user32.lib
IncludeLib kernel32.lib

    WinMain PROTO :DWORD,:DWORD,:DWORD,:DWORD
    WndProc PROTO :DWORD,:DWORD,:DWORD,:DWORD
    
.DATA
    classname    db "RULER"
    shcorName    db "shcore.dll",0
    dpiName db a"SetProcessDpiAwareness",0
    menuName db "屏幕尺子",0
    qxName db "切换方向",0
    bzName db "帮助",0
    tcLabel db "退出",0
    bfhd db "%d",0
    vertical        dw 0
    toggle        dd 0
    buffer        db 100 dup(0)
    opacity        dd 180
    dpi            dd 96
    helptxt        db 适配高分屏的尺子：用鼠标滚轮可以改
                   db 变透明度
    
.DATA?
    hmenu            dd ?
    hpen            dd ?
    hpen1            dd ?
    hpen2            dd ?
    
.CODE
START:
    @@:
    invoke LoadLibraryW,offset shcorName
    invoke GetProcAddress,eax,offset dpiName
    .if eax != 0
        push DWORD ptr 2
        call eax
        invoke GetDC,0
        .if vertical==0
            invoke GetDeviceCaps,eax,LOGPIXELSX
        .else 
            invoke GetDeviceCaps,eax,LOGPIXELSY
        .endif
        mov dpi,eax
    .endif
    invoke GetModuleHandle,NULL
    invoke WinMain,eax,NULL,NULL,SW_SHOWDEFAULT
    .if toggle==1
        mov toggle,0
        jmp @B
    .endif
    invoke ExitProcess,0

WinMain proc hInst:DWORD,hPrevInst:DWORD,CmdLine:DWORD,CmdShow:DWORD
    LOCAL wc        :WNDCLASSEX
    LOCAL msg    :MSG
    LOCAL hwnd    :HWND
    LOCAL rect    :RECT
    
    mov wc.cbSize,sizeof WNDCLASSEX
    mov wc.style,CS_HREDRAW or CS_VREDRAW or CS_BYTEALIGNWINDOW
    mov wc.lpfnWndProc,offset WndProc
    mov wc.cbClsExtra,NULL
    mov wc.cbWndExtra,NULL
    push hInst
    pop wc.hInstance
    mov wc.hbrBackground,COLOR_WINDOW+1
    mov wc.lpszMenuName,NULL
    mov wc.lpszClassName,offset classname
    invoke LoadIcon,hInst,100
    mov wc.hIcon,eax
    invoke LoadCursor,NULL,IDC_ARROW
    mov wc.hCursor,eax
    mov wc.hIconSm,0
    invoke RegisterClassEx, ADDR wc
    invoke GetDesktopWindow
    mov ecx,eax
    invoke GetClientRect,ecx,addr rect
    mov ecx,rect.right
    mov edx,rect.bottom
    mov eax,dpi
    shl eax,2
    sub ecx,eax
    shr eax,2
    sub edx,eax
    shr ecx,1
    shr edx,1
    shl eax,2
    .if vertical!=0
        invoke CreateWindowEx,0,addr classname,addr classname,WS_POPUP or WS_SIZEBOX,ecx,edx,dpi,eax,NULL,NULL,hInst,NULL
    .else
        invoke CreateWindowEx,0,addr classname,addr classname,WS_POPUP or WS_SIZEBOX,ecx,edx,eax,dpi,NULL,NULL,hInst,NULL
    .endif
    mov hwnd,eax
    invoke ShowWindow,hwnd,SW_SHOWNORMAL
    invoke UpdateWindow,hwnd
    
    StartLoop:
        invoke GetMessage,ADDR msg,NULL,0,0
            cmp eax, 0
            je ExitLoop
                invoke TranslateMessage, ADDR msg
                invoke DispatchMessage, ADDR msg
            jmp StartLoop
    ExitLoop:
    
mov eax,msg.wParam
ret
WinMain endp

WndProc proc hwnd:DWORD,umsg:DWORD,wparam :DWORD,lparam :DWORD
    LOCAL hdc    :HDC
    LOCAL ps        :PAINTSTRUCT
    LOCAL rect    :RECT
    LOCAL pos    :POINT
    LOCAL coord:DWORD
    LOCAL xcm    :DWORD
    
    .if umsg==WM_CREATE
        invoke GetWindowLong,hwnd,GWL_EXSTYLE
        or eax,80000h
        invoke SetWindowLong,hwnd,GWL_EXSTYLE,eax
        invoke SetLayeredWindowAttributes,hwnd,0,opacity,2
        invoke SetWindowPos,hwnd,HWND_TOPMOST,0,0,0,0,SWP_SHOWWINDOW or SWP_NOMOVE or SWP_NOSIZE
        invoke CreatePopupMenu
        mov hmenu,eax
        invoke AppendMenu,hmenu,MF_GRAYED,0,offset menuName
        invoke AppendMenu,hmenu,MF_SEPARATOR,0,0
        invoke AppendMenu,hmenu,0,1,offset qxName
        invoke AppendMenu,hmenu,0,2,offset bzName
        invoke AppendMenu,hmenu,0,3,offset tcLabel
        invoke CreatePen,PS_SOLID,0,0AAAAAAH
        mov hpen1,eax
        invoke CreatePen,PS_DASH,0,0
        mov hpen2,eax
    .elseif umsg==WM_DESTROY
        invoke DestroyMenu,hmenu
        invoke DeleteObject,hpen1
        invoke DeleteObject,hpen2
        invoke PostQuitMessage,0
    .elseif umsg==WM_CONTEXTMENU
        invoke GetCursorPos,addr pos
        invoke TrackPopupMenu,hmenu,0,pos.x,pos.y,0,hwnd,0
    .elseif umsg==WM_KEYDOWN
        ;.if wparam==VK_F1 || wparam==VK_ESCAPE
            invoke SendMessage,hwnd,WM_CONTEXTMENU,0,0
        ;.endif
    .elseif umsg==WM_LBUTTONDOWN
        invoke SendMessage,hwnd,WM_SYSCOMMAND,0F012H,0
    .elseif umsg==WM_MOUSEWHEEL
        mov eax,wparam
        and eax,80000000H
        .if eax==0
            add opacity,20
            .if opacity>255
                mov opacity,255
            .endif
        .else
            sub opacity,20
            .if opacity<60
                mov opacity,60
            .endif
        .endif
        invoke SetLayeredWindowAttributes,hwnd,0,opacity,2
    .elseif umsg==WM_COMMAND
        mov eax,wparam
        .if ax==1
            mov toggle,1
            not vertical
            invoke DestroyWindow,hwnd
        .elseif ax==2
            invoke MessageBox,0,addr helptxt,offset bzName,0
        .elseif ax==3
            invoke DestroyWindow,hwnd
        .endif
    .elseif umsg==WM_PAINT
        invoke BeginPaint,hwnd,addr ps
        mov hdc,eax
        invoke SetMapMode,hdc,MM_LOMETRIC
        invoke GetClientRect,hwnd,addr rect
        mov ecx,10
        mov xcm,0
        .if vertical==0
            .while ecx<=10000
                mov coord,ecx
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                invoke SelectObject,hdc,hpen1
                mov hpen,eax
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke SelectObject,hdc,hpen2
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                invoke SelectObject,hdc,hpen1
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                add coord,10
                invoke MoveToEx,hdc,coord,0,0
                invoke LineTo,hdc,coord,-10000
                invoke SelectObject,hdc,hpen
                invoke wsprintf,addr buffer,offset bfhd,xcm
                invoke lstrlen,addr buffer
                sub coord,100
                invoke TextOut,hdc,coord,-20,addr buffer,eax
                inc xcm
                add coord,100
                mov ecx,coord
            .endw
        .else
            .while ecx<=10000
                mov coord,ecx
                neg coord
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                invoke SelectObject,hdc,hpen1
                mov hpen,eax
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke SelectObject,hdc,hpen2
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                invoke SelectObject,hdc,hpen1
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                sub coord,10
                invoke MoveToEx,hdc,0,coord,0
                invoke LineTo,hdc,10000,coord
                invoke SelectObject,hdc,hpen
                invoke wsprintf,addr buffer,offset bfhd,xcm
                invoke lstrlen,addr buffer
                add coord,110
                invoke TextOut,hdc,30,coord,addr buffer,eax
                inc xcm
                sub coord,110
                neg coord
                mov ecx,coord
            .endw
        .endif
        invoke EndPaint,hwnd,addr ps
    .else
        invoke DefWindowProc,hwnd,umsg,wparam,lparam
    .endif
    ret
WndProc endp

END START