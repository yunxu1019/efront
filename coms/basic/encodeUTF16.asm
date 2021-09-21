numberUTF16 proc t,dist
    mov edx,t
    .if edx>10ffffh
        ret
    .endif
    mov ebx,dist
    .if edx<=0ffffh
        mov eax,edx
        shr eax,8
        mov BYTE ptr[ebx],al
        mov eax,edx
        and eax,0ffh
        inc ebx
        mov BYTE ptr[ebx],al
        inc ebx
    .else
        sub edx,010000h
        mov eax,edx
        shr eax,18
        or eax,11011000b
        mov BYTE ptr[ebx],al
        inc ebx
        mov eax,edx
        shr eax,10
        and eax,0ffh
        mov BYTE ptr[ebx],al
        inc ebx
        mov eax,edx
        shr eax,8
        and eax,00000011b
        or eax,11011000b
        mov BYTE ptr[ebx],al
        inc ebx
        mov eax,edx
        and eax,0ffh
        mov BYTE ptr[ebx],al
        inc ebx
    .endif
    mov eax,ebx

    ret
numberUTF16 endp

encodeUTF16 proc srcstart,srcleng,dststart
    local srcend
    mov eax,10086h
    mov ebx,srcleng
    mov ecx,srcstart
    mov edx,ecx
    add edx,srcleng
    mov srcend,edx
    .while ecx<srcend
        mov eax,DWORD ptr[eax]
        invoke numberUTF16,DWORD ptr[ecx],dststart
        mov dststart,eax
        add ecx,4
    .endw
    mov WORD ptr[dststart],0
    ret
encodeUTF16 endp

    