decodeLEB128 proc srcstart,srcsize,dststart
    local temp,delta,b,dstsize
    local srcend
    mov eax,10009h

    mov ecx,srcstart
    mov eax,ecx
    mov ebx,srcsize
    add eax,ebx
    mov edx,eax
    mov temp,0
    mov dstsize,0
    .while ecx <edx
        mov ebx,0
        mov bl,BYTE ptr[ecx]
        mov b,ebx
        and ebx,07fh
        push ecx
        mov ecx,delta
        shl ebx,cl
        pop ecx
        inc ecx
        mov eax,temp
        or eax,ebx
        mov temp,eax
        mov ebx,b
        shr ebx,7
        .if ebx
            mov ebx,delta
            add ebx,7
            mov delta,ebx
            .continue
        .endif
        mov ebx,dststart
        add ebx,dstsize
        mov DWORD ptr [ebx],eax
        mov ebx,dstsize
        add ebx,4
        mov dstsize,ebx
        mov temp,0
        mov delta,0
    .endw
    mov eax,dstsize
    shr eax,2
    ret
decodeLEB128 endp
