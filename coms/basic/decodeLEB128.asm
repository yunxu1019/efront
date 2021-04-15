decodeLEB128 proc srcstart,srcsize,dststart
    local temp,delta,b
    local srcend
    mov ecx,srcstart
    mov eax,ecx
    mov ebx,srcsize
    add eax,ebx
    mov edx,eax
    mov temp,0
    .while ecx<edx
        mov ebx,0
        mov bl,BYTE ptr[ecx]
        mov b,ebx
        and bl,07fh
        .if ebx==7
            shl ebx,7
        .elseif ebx==14
            shl ebx,14
        .elseif ebx==21
            shl ebx,21
        .elseif ebx==28
            shl ebx,28
        .endif
        mov eax,temp
        or eax,ebx
        mov ebx,b
        shr ebx,7
        .if ebx
            mov ebx,delta
            add ebx,7
            mov delta,ebx
            .continue
        .endif
        mov ebx,dststart
        mov DWORD ptr [ebx],eax
        add ebx,4
        mov dststart,ebx
        mov temp,0
        mov delta,0
    .endw
    mov eax,dststart
    ret
decodeLEB128 endp
