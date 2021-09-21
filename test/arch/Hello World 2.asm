.386
.model flat,stdcall
option casemap:none
__UNICODE__ equ 1
include windows.inc
include user32.inc
includelib user32.lib
include kernel32.inc
includelib kernel32.lib
.data
szText db 'HelloWordlPE',0
.code
start:
invoke MessageBox,NULL,offset szText,NULL,MB_OK
invoke ExitProcess,NULL
end start