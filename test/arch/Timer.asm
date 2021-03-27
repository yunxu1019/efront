.386
.model flat,stdcall
option casemap:none
__UNICODE__ equ 1
include windows.inc
include user32.inc
includelib user32.lib
include kernel32.inc
includelib kernel32.lib
ID_TIMER1 equ 1
ID_TIMER2 equ 2
ICO_1 equ 1
ICO_2 equ 2
DLG_MAIN equ 1
IDC_SECTION equ 100
IDC_COUNT equ 101
.data?
hInstance dd ?
hWinMain dd ?
dwCount dd ?
idTimer dd ?

.code
_ProcTimer proc _hWnd,uMsg,_idEvent,_dwTime
pushad
invoke GetDlgItemInt,hWinMain,IDC_COUNT,NULL,FALSE
inc eax
invoke SetDlgItemInt,hWinMain,IDC_COUNT,eax,FALSE
popad
ret
_ProcTimer endp

_ProcDlgMain proc uses ebx edi esi,hWnd,uMsg,wParam,lParam
mov eax,uMsg
.if eax== WM_TIMER
    mov eax,wParam
    .if eax==ID_TIMER1
        inc dwCount
        mov eax,dwCount
        and eax,1
        inc eax
        invoke LoadIcon,hInstance,eax
        invoke SendDlgItemMessage,hWnd,\
        IDC_SECTION,STM_SETIMAGE,\
        IMAGE_ICON,eax
    .elseif eax == ID_TIMER2
        invoke MessageBeep,-1
    .endif
.elseif eax== WM_INITDIALOG
    push hWnd
    pop hWinMain
    invoke SetTimer,hWnd,ID_TIMER1,250,NULL
    invoke SetTimer,hWnd,ID_TIMER2,2000,NULL
    invoke SetTimer,NULL,NULL,1000,addr _ProcTimer
    mov idTimer,eax
.elseif eax==WM_CLOSE
    invoke KillTimer,hWnd,ID_TIMER1
    invoke KillTimer,hWnd,ID_TIMER2
    invoke KillTimer,NULL,idTimer
    invoke EndDialog,hWnd,NULL
.else
    mov eax,FALSE
    ret
.endif
mov eax,TRUE
ret
_ProcDlgMain endp
start:
invoke GetModuleHandle,NULL
mov hInstance,eax
invoke DialogBoxParam,hInstance,DLG_MAIN,\
NULL,offset _ProcDlgMain,NULL
invoke ExitProcess,NULL
end start


