.386
.model flat,stdcall
option casemap:none
__UNICODE__ equ 1
include windows.inc
include user32.inc
includelib user32.lib
include kernel32.inc
includelib kernel32.lib
ICO_MAIN equ 1000
DLG_MAIN equ 1000
IDC_COUNTER equ 1001
IDC_PAUSE equ 1002
.data?
hInstance dd ?
hWinMain dd ?
hWinCount dd ?
hWinPause dd ?
dwOption dd ?
F_PAUSE equ 0001h
F_STOP equ 0002h
F_COUNTING equ 0004h
.const
szStop db "停止计数"
szStart db "计数"
.code
_Counter proc uses ebx esi edi,lParam
    or dwOption,F_COUNTING
    and dwOption,not (F_STOP or F_PAUSE)
    invoke SetWindowText,hWinCount,addr szStop
    invoke EnableWindow,hWinPause,TRUE
    xor ebx,ebx
    .while !(dwOption&F_STOP)
        .if !(dwOption&F_PAUSE)
            inc ebx
            invoke SetDlgItemInt,hWinMain,\
                IDC_COUNTER,ebx,FALSE
        .endif
    .endw
    invoke SetWindowText,hWinCount,addr szStart
    invoke EnableWindow,hWinPause,FALSE
    and dwOption,not (F_COUNTING or F_STOP or F_PAUSE)
    ret
_Counter endp
_ProcDlgMain proc uses ebx edi esi hWnd,wMsg,wParam,lParam
    local @dwThreadID
    mov eax,wMsg
    .if eax==WM_COMMAND
        mov eax,wParam
        .if ax==IDOK
            .if dwOption &F_COUNTING
                or dwOption,F_STOP
            .else 
                invoke CreateThread,NULL,0,\
                offset _Counter,NULL,\
                NULL,addr @dwThreadID
                invoke CloseHandle,eax
            .endif
        .elseif ax==IDC_PAUSE
            xor dwOption,F_PAUSE
        .endif
    .elseif eax==WM_CLOSE
        invoke EndDialog,hWnd,NULL
    .elseif eax==WM_INITDIALOG
        push hWnd
        pop hWinMain
        invoke GetDlgItem,hWnd,IDOK
        mov hWinCount,eax
        invoke GetDlgItem,hWnd,IDC_PAUSE
        mov hWinPause,eax
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
    invoke DialogBoxParam,eax,DLG_MAIN,\
    NULL,offset _ProcDlgMain,NULL
    invoke ExitProcess,NULL
    end start
