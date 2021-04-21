.data
errortext db "数据异常"
errortitle db "错误"
normal_huffman equ 0
normal_repeat1 equ 1
normal_repeat2 equ 2
normal_nocode1 equ 3
normal_nocode2 equ 4
normal_nocode3 equ 5
repeat_huffman equ 6

.code

fill proc start,leng,a
    mov ecx,start
    mov edx,leng
    add edx,ecx
    mov eax,a
    .while ecx<edx
        mov DWORD ptr [ecx],0
    .endw
    ret
fill endp

decodeFlat proc buff,start,rest
    local tcount,total,t,bitoffset,inc1,counts[516]
    local v,k,n,inc2
    invoke fill,addr counts,sizeof counts,0
    mov total,0
    mov ebx,buff
    mov ecx,start
    add ecx,1
    mov eax,0
    mov al,BYTE ptr[ebx+ecx]
    and eax,01fh
    mov t,eax
    add ecx,1
    mov eax,ecx
    shl eax,3
    mov bitoffset,eax
    mov inc2,0
    mov ecx,0
    .while ecx<tcount
        inc ecx
        mov inc1,ecx
        invoke readBinary,buff,bitoffset,t
        mov v,eax
        mov ebx,total
        add ebx,eax
        mov total,ebx
        mov ebx,bitoffset
        add ebx,t
        mov bitoffset,ebx
        invoke readBinary,buff,ebx,t
        mov k,eax
        mov ebx,bitoffset
        add ebx,t
        mov bitoffset,ebx
        mov eax,k
        mov ebx,inc2
        mov counts[ebx],eax
        mov eax,v
        inc ebx
        mov counts[ebx],eax
        inc ebx
        mov inc2,ebx
        mov ecx,inc1
    .endw
    mov ecx,total
    mov edx,sizeof counts
    shr edx,2
    .while ecx<edx
        mov counts[ecx],0
        inc ecx
    .endw
    mov inc2,0
    mov inc1,0
    .while total>0
        mov eax,counts[ecx]
        mov t,eax
        invoke readBinary,buff,bitoffset,t
        mov n,eax
        mov ebx,total
        dec ebx
        mov total,ebx
        mov eax,t
        shl eax,16
        mov ebx,n
        and eax,ebx
        mov ebx,total
        mov rest[ebx],eax
        mov ebx,bitoffset
        add ebx,t
        mov bitoffset,ebx

        mov eax,counts[ecx+1]
        mov ebx,inc2
        inc ebx
        mov inc2,ebx
        .if eax<=ebx
            inc ecx
            inc ecx
            mov inc1,ecx
            mov inc2,0
        .endif
    .endw
    mov eax,bitoffset
    mov ebx,total
    ret
decodeFlat endp

findhuff proc hufstart,huflen,sum
    local hufend
    mov ebx,hufstart
    mov eax,huflen
    add eax,ebx
    mov hufend,eax
    mov ebx,sum
    mov eax,0
    mov ecx,hufstart
    mov edx,0
    .while ecx<hufend
        mov ax,WORD ptr[ecx]
        add ecx,2
        .if eax==ebx
            mov eax,ecx
            mov edx,1
            .break
        .endif
    .endw
    
    ret
findhuff endp

fromhuff proc buff,bufflen,result,scanstart,type1
    local huf[516],huflen,byteoffset,map[516],codeend
    local t,s,bitoffset,inc1,endflag,hufmantotal
    local sum
    mov eax,type1
    .if type1
        mov type1,1
    .endif
    invoke decodeFlat,buff,scanstart,huf
    mov bitoffset,eax
    mov huflen,ebx
    add eax,7
    shr eax,3
    mov byteoffset,eax
    mov ebx,eax
    add eax,huflen
    dec eax
    mov codeend,eax
    mov inc1,0
    mov eax,edx
    .while ebx<edx
        mov eax,buff[ebx]
        mov s,eax
        .if eax>=128 && type1>0
            sub eax,128
            shl eax,8
            mov s,eax
            mov eax,codeend
            inc eax
            mov codeend,eax
            inc ebx
            mov eax,buff[ebx]
            mov ecx,s
            or eax,ecx
            mov ecx,inc1
            mov map[ecx],eax
            inc ecx
            mov inc1,ecx
        .else
            mov ecx,inc1
            mov map[ecx],eax
        .endif
        inc ecx
        mov inc1,ecx
        inc ebx
    .endw
    mov byteoffset,ebx
    shl ebx,3
    mov bitoffset,ebx
    mov eax,buff
    add eax,bufflen
    mov codeend,eax
    mov eax,huflen
    dec eax
    mov eax,huf[eax]
    mov endflag,eax
    shr eax,16
    mov s,eax
    mov t,1
    mov hufmantotal,0
    .while TRUE
        invoke readBinary,buff,bitoffset,t
        mov ebx,t
        shl ebx,16
        and eax,ebx
        mov sum,eax
        invoke findhuff,addr huf,sizeof huf,sum
        mov eax,map[eax]
        mov sum,eax
        .if edx
            mov eax,hufmantotal
            mov ebx,sum
            mov WORD ptr[eax],bx
            add eax,2
            mov hufmantotal,eax
            mov t,0
        .else
            mov eax,t
            add eax,1
            mov t,eax
        .endif
        mov eax,bitoffset
        .if eax<codeend
            mov eax,t
            .break .if eax <= s
        .endif
    .endw
    mov eax,endflag
    and eax,0ffffh
    .if eax!=sum
        invoke MessageBox,NULL,addr errortext,addr errortitle,MB_OK
    .endif
    mov eax,bitoffset
    add eax,s
    mov bitoffset,eax
    ret
fromhuff endp

inflate proc srcstart,srcsize,dststart
    local b,cc,s
    mov ecx,srcstart
    mov edx,srcsize
    add edx,ecx
    .while ecx<edx
        mov eax,0
        mov ax,WORD ptr[ecx]
        .if eax<256
            mov ebx,dststart
            mov BYTE ptr[ebx],al
            inc ebx
            mov dststart,ebx
        .else
            push ecx
            push edx
            and eax,07fh
            shl eax,8
            add ecx,2
            mov ebx,0
            mov bx,WORD ptr[ecx]
            or eax,ebx
            add eax,1
            mov b,eax
            mov eax,0
            add ecx,2
            mov ax,WORD ptr[ecx]
            shl eax,9
            mov ebx,0
            add ecx,2
            mov bx,WORD ptr[ecx]
            shl ebx,4
            or eax,ebx
            mov ebx,0
            add ecx,2
            mov bx,WORD ptr[ecx]
            or eax,ebx
            mov cc,eax
            mov eax,dststart
            sub eax,cc
            sub eax,b
            mov s,eax
            add eax,b
            mov edx,eax
            mov ecx,s
            mov ebx,dststart
            .while ecx<edx
                mov al,BYTE ptr[ecx]
                mov BYTE ptr[ebx],al
                inc ebx
                inc ecx
            .endw
            pop edx
            pop ecx
        .endif
    .endw
    ret
inflate endp

repeatcode proc a,count,dist
    mov ecx,count
    mov ebx,dist
    mov eax,a
    .while ecx>0
        dec ecx
        mov BYTE ptr[ebx+ecx],al
    .endw
    ret
repeatcode endp

memcpy proc start,len,dist
    mov ecx,start
    mov edx,len
    add edx,ecx
    mov ebx,dist
    .if edx>4
        sub edx,4
        .while ecx<edx
            mov eax,DWORD ptr[ecx]
            mov DWORD ptr[ebx],eax
            add ecx,4
            add ebx,4
        .endw
        add edx,4
    .endif
    .while ecx<edx
        mov al,BYTE ptr[ecx]
        mov BYTE ptr[ebx],al
        inc ecx
        inc ebx
    .endw
    ret
memcpy endp 

unpack proc start,len,dsth
    local writed,buff,bufflen,byteoffset,decoded,count
    mov eax,len
    .if eax<2
        invoke WriteFile,dsth,start,len,addr writed,NULL
        ret
    .endif

    mov ecx,start
    mov edx,len
    add edx,ecx
    .while ecx<edx
        push edx
        push ecx
        mov buff,0
        mov decoded,0
        mov eax,0
        mov al,BYTE ptr[ecx+1]
        shr eax,5
        .if eax==normal_huffman
            mov eax,len
            mov ebx,32
            shl ebx,16
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,ebx
            mov decoded,eax
            invoke fromhuff,ecx,len,addr decoded,0,normal_huffman
            add ecx,eax
            mov count,eax
        .elseif eax==repeat_huffman
            mov eax,len
            mov ebx,32
            shl ebx,16
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,ebx
            mov buff,eax
            invoke fromhuff,ecx,len,addr buff,0,repeat_huffman
            mov bufflen,eax
            mov eax,len
            mov ebx,32
            shl ebx,16
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,ebx
            mov decoded,eax
            invoke inflate,buff,bufflen,decoded
            mov count,eax
        .elseif eax==normal_repeat1
            mov eax,0
            mov al,BYTE ptr[ecx+1]
            and eax,01fh
            mov count,eax
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,count
            mov decoded,eax
            invoke repeatcode,BYTE ptr[ecx],count,decoded
            add ecx,2
        .elseif eax==normal_repeat2
            mov eax,0
            mov al,BYTE ptr[ecx+1]
            and eax,01fh
            mov ebx,0
            mov bl,BYTE ptr[ecx]
            shl ebx,5
            or eax,ebx
            mov count,eax
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,count
            mov decoded,eax
            invoke repeatcode,BYTE ptr[ecx],count,decoded
            add ecx,3
        .elseif eax==normal_nocode1
            mov eax,0
            mov al,BYTE ptr[eax+1]
            and eax,01fh
            mov ebx,0
            mov bl,BYTE ptr[ecx]
            shl ebx,5
            or eax,ebx
            mov count,eax
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,count
            mov decoded,eax
            add ecx,2
            invoke memcpy,decoded,ecx,count
            add ecx,count
        .elseif eax==normal_nocode2
            mov eax,0
            mov al,BYTE ptr[eax+1]
            and eax,01fh
            mov ebx,0
            mov bl,BYTE ptr[ecx]
            shl ebx,13
            mov bl,BYTE ptr[ecx+2]
            shl eax,8
            or eax,ebx
            mov count,eax
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,count
            mov decoded,eax
            add ecx,2
            invoke memcpy,decoded,ecx,count
            add ecx,count
        .elseif eax==normal_nocode3
            mov eax,0
            mov al,BYTE ptr[eax+1]
            and eax,01fh
            mov ebx,0
            mov bl,BYTE ptr[ecx]
            shl ebx,21
            shl eax,16
            mov bh,BYTE ptr[ecx+2]
            mov bl,BYTE ptr[ecx+3]
            or eax,ebx
            mov count,eax
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,count
            mov decoded,eax
            add ecx,3
            invoke memcpy,decoded,ecx,count
            add ecx,count
        .else
            invoke MessageBox,NULL,offset errortext,offset errortitle,MB_OK
            invoke ExitProcess,1
        .endif
        .if decoded
            invoke WriteFile,dsth,decoded,count,0,NULL
            invoke GlobalFree,decoded
        .endif
        .if buff
            invoke GlobalFree,buff
        .endif
        pop ecx
        pop edx
    .endw
    ret
unpack endp


decodePackW proc srch,start,len,dsth
    local buff,readed
    invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,len
    .if !eax
        ret
    .endif
    mov buff,eax
    invoke ReadFile,srch,buff,len,addr readed,0
    invoke unpack,buff,len,dsth
    invoke GlobalFree,buff
    ret
decodePackW endp

