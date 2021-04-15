decodeUTF8 proc srcstart,srcsize,dststart
    local srcend,i,t
    mov eax,srcstart
    mov ebx,srcsize
    add eax,ebx
    mov srcend,eax
    mov ebx,srcstart
    mov edx,dststart
    .while ebx<srcend
        mov eax,i
        inc eax
        mov i,eax
        mov ecx,0
        mov eax,0
        mov al,BYTE ptr[ebx]
        inc ebx
        .if eax<192
        .elseif eax<224
            and eax,00011111b
            shl eax,6
            mov ecx,0
            mov cl,BYTE ptr[ebx]
            inc ebx
            and ecx,00111111b
            or eax,ecx
        .elseif eax<240
            and eax,00001111b
            shl eax,12
            mov ecx,0
            mov cl,BYTE ptr[ebx]
            inc ebx
            and ecx,00111111b
            or eax,ecx
            mov ecx,0
            mov cl,BYTE ptr[ebx]
            inc ebx
            and ecx,00111111b
            or eax,ecx
        .elseif eax<248
            and eax,00000111b
            shl eax,18
            mov ecx,0
            mov cl,BYTE ptr[ebx]
            inc ebx
            and ecx,00111111b
            or eax,ecx
            mov ecx,0
            mov cl,BYTE ptr[ebx]
            inc ebx
            and ecx,00111111b
            or eax,ecx
            mov ecx,0
            mov cl,BYTE ptr[ebx]
            inc ebx
            and ecx,00111111b
            or eax,ecx
        .endif
        mov eax,t
        mov DWORD ptr[edx],eax
        add edx,4
    .endw
    mov eax,edx
    ret
decodeUTF8 endp