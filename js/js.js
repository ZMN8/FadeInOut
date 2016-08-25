/**
 * Created by Administrator on 2016/8/24.
 */
var flashBox=document.getElementById("flash");
var flash_left=document.getElementById("flash_left");
var flash_right=document.getElementById("flash_right");
var spanNodes=document.getElementsByTagName("span");
var ulNode=document.getElementsByTagName("ul")[0];
var liNodes=ulNode.getElementsByTagName("li");
var flash;



flashBox.onmouseenter=function(){
    flash_left.style.display="";
    flash_right.style.display="";


};
flashBox.onmouseleave=function(){
    flash_left.style.display="none";
    flash_right.style.display="none";

};

for(i=0;i<spanNodes.length;i++){
    spanNodes[i].index=i;
    spanNodes[i].onmouseenter= function () {
        var oldPos,newPos;
        if(this.className.indexOf("flash_btnCur")!=-1){//如果移入当前已有样式则返回函数
            return false;
        }
        for(j=0;j<spanNodes.length;j++){//查找旧的样式位置
            if(spanNodes[j].className.indexOf("flash_btnCur")!=-1){
                oldPos=j;
                break;
            }
        }
        spanNodes[oldPos].className="";//去除旧位置的样式
        this.className="flash_btnCur";//当前加上样式
        newPos=this.index;
        liNodes[newPos].style.display="";
//        moveFun(newPos,oldPos);
        moveFun2(newPos,oldPos,0);

    }
}
/*
function moveFun(newP,oldP) {
    console.log("位置： "+newP,oldP);
//    console.log(num2);
    var num1=parseInt(liNodes[newP].style.opacity*100);//获取新位置的opacity
    var num2=parseInt(liNodes[oldP].style.opacity*100);//获取旧位置的opacity

    if(num1<100){    //淡入
        num1+=4;
        liNodes[newP].style.opacity=num1/100;
        liNodes[newP].style.filter="alpha(opacity="+num1+")";
        setTimeout(function () {
            moveFun(newP,oldP)
        },70)
    }
    if(num2>0){   //淡出
        num2-=4;
        liNodes[oldP].style.opacity=num2/100;
        liNodes[oldP].style.filter="alpha(opacity="+num2+")";
        setTimeout(function () {
            moveFun(newP,oldP);
        },70)
    }
    console.log("alpha(opacity="+num1+")");
    console.log("透明度整数倍： "+num1,num2);
}*/
var bug;
function moveFun2(newP,oldP,num) {

    if(num==0){//每次点击时要重新递归
        clearTimeout(bug);//每次点击时要重新递归，清除之前的所有递归
        for(i=0;i<liNodes.length;i++){
            if(i!=newP && i!=oldP){//将不是新位置和旧位置的li进行强制性透明，防止快速点击导致的上次递归没有完成而出现半透明的情况
                liNodes[i].style.opacity=0;
                liNodes[oldP].style.filter="alpha(opacity=0)";
                liNodes[oldP].style.display="none";
            }
        }

    }

    if(num<100){
        num+=5;
        liNodes[oldP].style.opacity=(100-num)/100;//旧的位置透明度逐渐为0
        liNodes[oldP].style.filter="alpha(opacity="+(100-num)+")";

        liNodes[newP].style.opacity=(num)/100;//新的位置透明度逐渐为1
        liNodes[newP].style.filter="alpha(opacity="+num+")";
        bug=setTimeout(function(){moveFun2(newP,oldP,num)},30)
    }else{
        liNodes[oldP].style.display="none";//递归完成就将旧的位置不可见
    }
    console.log(newP,oldP,num);
}

flash_left.onclick= function () {
    var oldPos,newPos;
    for(j=0;j<spanNodes.length;j++){//找到旧的位置
        if(spanNodes[j].className.indexOf("flash_btnCur")!=-1){
            oldPos=j;
            break;
        }
    }
    newPos= oldPos==spanNodes.length-1 ? 0 :oldPos+1;//找到新的位置
    spanNodes[oldPos].className="";
    spanNodes[newPos].className="flash_btnCur";
    liNodes[newPos].style.display="";//新位置的display要为block
    moveFun2(newPos,oldPos,0);//进行透明度递归
};
flash_right.onclick= function () {
    var oldPos,newPos;
    for(j=0;j<spanNodes.length;j++){
        if(spanNodes[j].className.indexOf("flash_btnCur")!=-1){
            oldPos=j;
            break;
        }
    }
    newPos= oldPos==0 ? spanNodes.length-1:oldPos-1;
    spanNodes[oldPos].className="";
    spanNodes[newPos].className="flash_btnCur";
    liNodes[newPos].style.display="";
    moveFun2(newPos,oldPos,0);
};
