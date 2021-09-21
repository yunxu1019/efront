readBinary proc buff,bitoffset,bitlength
    local num,index,bitdelta,delta
    mov eax,90007h
    mov num,0
    mov eax,bitoffset
    shr eax,3
    mov index,eax
    mov ebx,bitoffset
    shl eax,3
    sub ebx,eax
    mov bitdelta,ebx
    .if bitdelta
        mov eax,8
        sub eax,ebx
        mov bitdelta,eax
        mov ebx,buff
        add ebx,index
        mov eax,0
        mov al,BYTE ptr[ebx]
        mov delta,eax
        mov eax,index
        inc eax
        mov index,eax
        mov eax,bitlength
        sub eax,bitdelta
        mov bitlength,eax
        mov eax,1
        mov ecx,bitdelta
        shl eax,cl
        sub eax,1
        and eax,delta
        mov num,eax
        mov eax,bitlength
        and eax,07fffffffh
        .if bitlength !=eax
            mov eax,0
            sub eax,bitlength
            mov ecx,eax
            mov eax,num
            shr eax,cl
            mov num,eax
            mov bitlength,0
        .endif
    .endif
    .while bitlength>=8
        mov eax,bitlength
        sub eax,8
        mov bitlength,eax
        mov eax,num
        shl eax,8
        mov ebx,buff
        add ebx,index
        mov al,BYTE ptr[ebx]
        mov num,eax
        mov eax,index
        inc eax
        mov index,eax
    .endw
    .if bitlength
        mov ebx,buff
        add ebx,index
        mov al,BYTE ptr[ebx]
        and eax,0ffh
        mov delta,eax
        mov eax,num
        mov ecx,bitlength
        shl eax,cl
        mov ecx,8
        sub ecx,bitlength
        mov ebx,delta
        shr ebx,cl
        or eax,ebx
        mov num,eax
    .endif
    mov eax,num
    ret
readBinary endp