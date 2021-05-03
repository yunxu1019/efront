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
    mov eax,90003h
    mov ecx,start
    mov edx,leng
    shr edx,2
    add edx,ecx
    mov eax,a
    .while ecx<edx
        mov DWORD ptr [ecx],eax
        add ecx,4
    .endw
    ret
fill endp

decodeFlat proc buff,start,rest
    local tcount,total,t,bitoffset,inc1,counts[516]
    local v,k,n,inc2
    mov eax,90002h
    invoke fill,addr counts,sizeof counts,0
    mov total,0
    mov ebx,buff
    mov ecx,start
    mov eax,0
    mov al,BYTE ptr[ebx+ecx]
    mov tcount,eax
    inc ecx
    mov al,BYTE ptr[ebx+ecx]
    and eax,01fh
    mov t,eax
    add ecx,1
    mov eax,ecx
    shl eax,3
    mov bitoffset,eax
    mov inc1,0
    mov ecx,tcount
    .while ecx>0
        dec ecx
        mov eax,bitoffset
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
        mov ebx,inc1
        shl ebx,3
        mov counts[ebx],eax
        mov eax,v
        mov counts[ebx+4],eax
        mov ecx,inc1
    .endw
    mov eax,total
    mov inc2,eax
    mov ecx,tcount
    shl ecx,1
    mov edx,sizeof counts
    shr edx,2
    .while ecx<edx
        mov counts[ecx*4],0
        inc ecx
    .endw
    .while tcount>0
        mov ecx,tcount
        shl ecx,1
        sub ecx,2
        mov eax,counts[ecx*4]
        mov t,eax
        mov eax,buff
        mov eax,bitoffset
        mov eax,t
        invoke readBinary,buff,bitoffset,t
        mov n,eax
        mov ebx,total
        dec ebx
        mov total,ebx
        mov eax,t
        shl eax,24
        mov ebx,n
        or eax,ebx
        mov ebx,total
        shl ebx,2
        add ebx,rest
        mov DWORD ptr[ebx],eax
        mov ebx,bitoffset
        add ebx,t
        mov bitoffset,ebx
        mov ecx,tcount
        shl ecx,1
        dec ecx
        mov eax,counts[ecx*4]
        dec eax
        mov counts[ecx*4],eax
        .if eax==0
            mov ecx,tcount
            dec ecx
            mov tcount,ecx
        .endif
    .endw
    mov eax,bitoffset
    mov ebx,inc2
    ret
decodeFlat endp

findhuff proc hufstart,mapsize,sum
    ; local hufend
    ; mov ebx,hufstart
    ; mov eax,mapsize
    ; shl eax,2
    ; add eax,ebx
    ; mov hufend,eax
    ; mov ebx,sum
    ; mov eax,0
    ; mov ecx,hufstart
    ; mov edx,0
    
    ; .while ecx<hufend
    ;     mov eax,DWORD ptr[ecx]
    ;     .if eax==ebx
    ;         mov eax,ecx
    ;         sub eax,hufstart
    ;         shr eax,2
    ;         mov edx,1
    ;         .break
    ;     .endif
    ;     add ecx,4
    ; .endw
    ; ret
    mov eax,90005h
    mov ecx,0
    mov eax,sum
    mov edx,mapsize
    mov ebx,hufstart
    .while ecx<edx
        mov eax,ecx
        add eax,edx
        shr eax,1
        push eax
        mov eax,DWORD ptr[eax*4+ebx]
        .if eax<sum
            pop ecx
            inc ecx
        .else
            pop edx
        .endif
    .endw
    mov eax,DWORD ptr[ecx*4+ebx]
    .if eax==sum
        mov eax,ecx
        mov edx,1
    .else
        mov eax,DWORD ptr[edx*4+ebx]
        .if eax==sum
            mov eax,edx
            mov edx,1
        .else
            mov edx,0
        .endif
    .endif
    ret
findhuff endp

sorthuff proc hufstart,mapstart,huflen
    local min,mi,n
    mov eax,90004h
    mov ecx,0
    mov edx,huflen
    dec edx
    shl edx,2
    .while ecx<edx
        mov ebx,hufstart
        mov mi,ecx
        mov eax,DWORD ptr[ecx+ebx]
        mov min,eax
        mov n,ecx
        add ecx,4
        .while ecx<edx
            mov eax,DWORD ptr[ecx+ebx]
            .if eax<min
                mov mi,ecx
                mov min,eax
            .endif
            add ecx,4
        .endw
        mov ecx,n
        .if ecx!=mi
            mov eax,DWORD ptr[ebx+ecx]
            mov ecx,mi
            mov DWORD ptr[ebx+ecx],eax
            mov eax,min
            mov ecx,n
            mov DWORD ptr[ebx+ecx],eax
            mov ebx,mapstart
            mov ecx,mi
            mov eax,DWORD ptr[ebx+ecx]
            mov min,eax
            mov ecx,n
            mov eax,DWORD ptr[ebx+ecx]
            mov ecx,mi
            mov DWORD ptr[ebx+ecx],eax
            mov eax,min
            mov ecx,n
            mov DWORD ptr[ebx+ecx],eax
        .endif
        add ecx,4
    .endw
    ret
sorthuff endp

fromhuff proc buff,bufflen,result,scanstart,type1,passed,passed0
    local huf[516],huflen,byteoffset,map[516],codeend
    local t,s,bitoffset,inc1,endflag,hufmantotal
    local sum,a
    mov eax,90001h
    mov eax,scanstart
    .if type1
        mov type1,1
    .endif
    invoke decodeFlat,buff,scanstart,addr huf
    mov bitoffset,eax
    mov huflen,ebx
    add eax,7
    shr eax,3
    mov byteoffset,eax
    mov eax,huf[ebx*4 - 8]
    mov eax,huf[ebx*4 - 4]
    mov eax,byteoffset
    add eax,huflen
    dec eax
    mov codeend,eax
    mov ebx,byteoffset
    mov ecx,0
    .while ebx<codeend
        mov edx,ebx
        add edx,buff
        mov al,BYTE ptr[edx]
        and eax,0ffh
        mov s,eax
        .if eax>=128 && type1>0
            sub eax,128
            shl eax,8
            mov s,eax
            mov eax,codeend
            inc eax
            mov codeend,eax
            inc ebx
            mov eax,s
            mov edx,ebx
            add edx,buff
            mov al,BYTE ptr[edx]
            mov map[ecx*4],eax
        .else
            mov map[ecx*4],eax
        .endif
        inc ecx
        inc ebx
    .endw
    mov byteoffset,ebx
    shl ebx,3
    mov bitoffset,ebx
    invoke sorthuff,addr huf,addr map,huflen
    mov eax,bufflen
    shl eax,3
    mov codeend,eax
    .if passed
        mov ebx,passed
        mov eax,byteoffset
        add eax,passed0
        mov DWORD ptr[ebx],eax
    .endif
    mov eax,huflen
    dec eax
    mov eax,huf[eax*4]
    mov endflag,eax
    shr eax,24
    mov s,eax
    mov t,1
    mov hufmantotal,0
    .while TRUE
        invoke readBinary,buff,bitoffset,t
        mov ebx,t
        shl ebx,24
        or eax,ebx
        mov sum,eax
        mov eax,huflen
        dec eax
        invoke findhuff,addr huf,eax,sum
        .if edx
            
            mov ebx,sum
            mov ebx,t
            mov eax,map[eax*4]
            mov a,eax
        .else 
            mov ebx,t
            inc ebx
            mov t,ebx
            mov eax,s
            .if t>eax
                mov eax,sum
                .break;
            .endif

            .continue
        .endif
        .if edx
            mov eax,hufmantotal
            mov ebx,a
            .if type1
                shl eax,1
                add eax,result
                mov WORD ptr[eax],bx
            .else
                add eax,result
                mov BYTE ptr[eax],bl
            .endif
            mov eax,hufmantotal
            inc eax
            mov hufmantotal,eax
            mov eax,bitoffset
            add eax,t
            mov bitoffset,eax
            .if passed
                shr eax,3
                add eax,passed0
                mov ebx,passed
                mov DWORD ptr[ebx],eax
            .endif
            mov t,1
        .else
            mov eax,t
            add eax,1
            mov t,eax
        .endif
        mov eax,bitoffset
        .break .if eax>codeend
    .endw
    mov eax,sum
    mov eax,t
    mov eax,bitoffset
    mov eax,endflag
    .if eax!=sum
        invoke MessageBox,NULL,addr errortext,addr errortitle,MB_OK
        invoke ExitProcess,1
    .endif
    mov eax,sum
    shr eax,24
    add eax,bitoffset
    mov bitoffset,eax
    mov ebx,hufmantotal
    ret
fromhuff endp

inflate proc srcstart,srclen,dststart
    local b,cc,s,dstlen
    mov ecx,srcstart
    mov edx,srclen
    shl edx,1
    mov dstlen,0
    add edx,ecx
    .while ecx<edx
        mov eax,0
        mov ax,WORD ptr[ecx]
        .if eax<256
            add ecx,2
            mov ebx,dstlen
            add ebx,dststart
            mov BYTE ptr[ebx],al
            mov ebx,dstlen
            inc ebx
            mov dstlen,ebx
        .else
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
            add ecx,2
            push ecx
            push edx
            mov eax,dstlen
            sub eax,cc
            sub eax,b
            mov s,eax
            add eax,b
            mov edx,eax
            mov ecx,s
            .while ecx<edx
                mov ebx,ecx
                add ebx,dststart
                mov al,BYTE ptr[ebx]
                mov ebx,dstlen
                add ebx,dststart
                mov BYTE ptr[ebx],al
                mov ebx,dstlen
                inc ebx
                mov dstlen,ebx
                inc ecx
            .endw
            mov dstlen,ebx
            pop edx
            pop ecx
        .endif
    .endw
    mov eax,dstlen
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

memcopy proc start,len,dist
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
memcopy endp 

unpack proc start,len,dsth,passed
    local writed,buff,bufflen,byteoffset,decoded,count,to
    local passed0
    mov eax,len
    .if eax<2
        invoke WriteFile,dsth,start,len,addr writed,NULL
        ret
    .endif

    mov ecx,start
    mov edx,len
    mov passed0,0
    add edx,ecx
    .while ecx<edx
        push edx
        mov to,ecx
        mov buff,0
        mov decoded,0
    mov eax,90000h
        mov eax,0
        mov al,BYTE ptr[ecx+1]
        shr eax,5
        .if eax==normal_huffman
            mov eax,len
            mov ebx,32
            shl ebx,20
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,ebx
            mov decoded,eax
            mov ecx,to
            invoke fromhuff,ecx,len,decoded,0,normal_huffman,passed,passed0
            add eax,7
            shr eax,3
            add eax,to
            mov to,eax
            mov count,ebx
        .elseif eax==repeat_huffman
            mov eax,len
            mov ebx,64
            shl ebx,20
            invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,ebx
            mov buff,eax
            mov ecx,to
            invoke fromhuff,ecx,len,buff,0,repeat_huffman,passed,passed0
            mov bufflen,ebx
            add eax,7
            shr eax,3
            add eax,to
            mov to,eax
            mov eax,len
            mov ebx,64
            shl ebx,20
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
            mov ecx,to
            invoke repeatcode,BYTE ptr[ecx],count,decoded
            mov ecx,to
            add ecx,2
            mov to,ecx
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
            mov ecx,to
            invoke repeatcode,BYTE ptr[ecx],count,decoded
            mov ecx,to
            add ecx,3
            mov to,ecx
        .elseif eax==normal_nocode1
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
            mov ecx,to
            add ecx,2
            invoke memcopy,ecx,count,decoded
            mov ecx,to
            add ecx,count
            add ecx,2
            mov to,ecx
        .elseif eax==normal_nocode2
            mov eax,0
            mov al,BYTE ptr[ecx+1]
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
            mov ecx,to
            add ecx,3
            invoke memcopy,ecx,count,decoded
            mov ecx,to
            add ecx,count
            add ecx,3
            mov to,ecx
        .elseif eax==normal_nocode3
            mov eax,0
            mov al,BYTE ptr[ecx+1]
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
            mov ecx,to
            add ecx,4
            invoke memcopy,ecx,count,decoded
            mov ecx,to
            add ecx,4
            add ecx,count
            mov to,ecx
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
        .if passed
            mov eax,to
            sub eax,start
            mov passed0,eax
            mov ebx,passed
            mov DWORD ptr [ebx],eax
        .endif
        mov ecx,to
        pop edx
    .endw
    ret
unpack endp


decodePackW proc srch,start,len,dsth,passed
    local buff,readed
    invoke GlobalAlloc,GMEM_FIXED or GMEM_ZEROINIT,len

    .if !eax
        ret
    .endif
    mov buff,eax
    mov eax,start
    and eax,07fffffffh
    .if start!=eax
        invoke SetFilePointer,srch,start,NULL,FILE_END
    .else
        invoke SetFilePointer,srch,start,NULL,FILE_BEGIN
    .endif
    invoke ReadFile,srch,buff,len,addr readed,0
    mov ecx,buff
    mov eax,95577h
    mov eax,DWORD ptr[ecx]
    shr eax,5
    invoke unpack,buff,len,dsth,passed
    invoke GlobalFree,buff
    ret
decodePackW endp

