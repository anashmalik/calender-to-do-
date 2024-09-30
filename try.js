for(var i=1;i<=10;i++){
        // help(i);
}
function help(i){
    setTimeout(()=>{
        console.log(i);
    },i*1000);
 }
String.prototype.anash=
function (tex){
    return this+" "+tex;
};
let a="anash";
let c=a.anash("malik");
console.log(c);
var v=1;
function abc(){
    console.log(v);
    v++;
    if(v>10)clearInterval(inv);
}
var inv=setInterval(abc,1000);