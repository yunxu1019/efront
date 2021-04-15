readBinary proc buff,bitoffset,bitlength
    local num,index,bitdelta,delta
    mov num,0
    mov eax,bitoffset
    shr eax,3
    mov index,eax
    mov ebx,bitoffset
    shl eax,3
    sub ebx,eax
    mov bitdelta,ebx
    .if ebx
        mov eax,8
        sub eax,ebx
        mov bitdelta,eax
        mov ebx,buff
        mov ecx,index
        mov eax,[ebx + ecx]
        inc ecx
        mov index,ecx
        mov delta,eax
        mov eax,bitlength
        mov ebx,bitdelta
        sub eax,ebx
        mov bitlength,eax
        mov eax,1
        mov ebx,bitdelta
        shl eax,ebx
        sub eax,1
        mov ebx,delta
        and eax,ebx
        mov num,eax
        .if bitlength lt 0
            mov eax,0
            mov ebx,bitlength
            sub eax,ebx
            mov ebx,num
            shr ebx,eax
            mov num,ebx
            mov bitlength,0
        .endif
    .endif
        mov eax,bitlength
    .while (eax>=8)
        sub eax,8
        mov ebx,num
        shl ebx,8
        mov ecx,index
        mov edx,buff
        mov edx,[edx + ecx]
        inc ecx
        mov index,ecx
        or edx,ebx
        mov edx,num
    .endw
    .if eax
        mov ecx,index
        mov ebx,buff
        mov eax,[ebx+ecx]
        mov delta,eax
        mov eax,num
        mov ebx,delta
        shl eax,8
        mov ecx,8
        mov ecx,bitlength
        sub ecx,edx
        shr ebx,ecx
        or eax,ebx
        mov num,eax
    .endif
    mov eax,num
    ret
readBinary endp