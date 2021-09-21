#include <string.h>
#include <windows.h>
#include <shlobj.h>
#include <stdio.h>
//复制文件到剪贴板
//没有加入错误判断，请自行修改
int CopyFileToClipboard(char szFileName[]);
int getFilenameOfClipboard();
int main(int count, char** argv)
{
    if(count>1){
        CopyFileToClipboard(argv[1]);
    }
    return getFilenameOfClipboard();
}
int getFilenameOfClipboard(){
    UINT uDropEffect = RegisterClipboardFormat("Preferred DropEffect"); 
    UINT cFiles = 0; 
    DWORD dwEffect, *dw; 
    if ( OpenClipboard(NULL)) 
    { 
        HDROP hDrop = HDROP(GetClipboardData(CF_HDROP)); 
        if (hDrop) 
        { 
            dw = (DWORD*)(GetClipboardData(uDropEffect)); 
            if (NULL == dw ) 
            { 
                dwEffect = DROPEFFECT_COPY; 
            } 
            else 
            { 
                dwEffect = *dw; 
            } 
            cFiles = DragQueryFile(hDrop,(UINT)-1,NULL,0); 
            TCHAR szFile[MAX_PATH]; 
            for (UINT count = 0; count < cFiles; count++) 
            { 
                DragQueryFile(hDrop,count,szFile,sizeof(szFile)); 
            } 
            CloseClipboard(); 
            if (dwEffect & DROPEFFECT_MOVE) 
            { 
                printf("m");
            } 
            else if (dwEffect & DROPEFFECT_COPY) 
            { 
                printf("c");
            } 
            printf(szFile);
        } 
    }
    return 0;
}
int CopyFileToClipboard(char szFileName[])
{
    UINT uDropEffect;
    HGLOBAL hGblEffect;
    LPDWORD lpdDropEffect;
    DROPFILES stDrop;
    HGLOBAL hGblFiles;
    LPSTR lpData;
    uDropEffect = RegisterClipboardFormat("Preferred DropEffect");
    hGblEffect = GlobalAlloc(GMEM_ZEROINIT | GMEM_MOVEABLE | GMEM_DDESHARE,sizeof(DWORD));
    lpdDropEffect = (LPDWORD)GlobalLock(hGblEffect);
    *lpdDropEffect = DROPEFFECT_COPY;//复制; 剪贴则用DROPEFFECT_MOVE
    GlobalUnlock(hGblEffect);
    stDrop.pFiles = sizeof(DROPFILES);
    stDrop.pt.x = 0;
    stDrop.pt.y = 0;
    stDrop.fNC = FALSE;
    stDrop.fWide = FALSE;
    hGblFiles = GlobalAlloc(GMEM_ZEROINIT | GMEM_MOVEABLE | GMEM_DDESHARE,\
        sizeof(DROPFILES)+strlen(szFileName)+2);
    lpData = (LPSTR)GlobalLock(hGblFiles);
    memcpy(lpData,&stDrop,sizeof(DROPFILES));
    strcpy(lpData+sizeof(DROPFILES),szFileName);
    GlobalUnlock(hGblFiles);
    OpenClipboard(NULL);
    EmptyClipboard();
    SetClipboardData(CF_HDROP,hGblFiles);
    SetClipboardData(uDropEffect,hGblEffect);
    CloseClipboard();
    return 1;
}
