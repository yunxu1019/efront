function text(node,text){
    isFunction(text)&&(text=text());
    isFunction(node.text)?node.text(text):node.innerText=text;
}