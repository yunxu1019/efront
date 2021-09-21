

function main(elem) {
    if(!elem){
        elem=div();
    }
    moveupon(elem,{
        start(event){
            console.log(event);
        },
        move(event){
            console.log(event);
        },
        end(event){
            console.log(event);
        }
    })
    return elem;
}