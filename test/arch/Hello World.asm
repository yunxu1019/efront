.386
.model flat,stdcall
option casemap:none
include windows.inc
include user32.inc
includelib user32.lib
include kernel32.inc
includelib kernel32.lib
.data
    szText db '你好 masm$',0
.code
start:
invoke MessageBoxW,NULL,offset szText,NULL,MB_OK
invoke ExitProcess,NULL
end start
