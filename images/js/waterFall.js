/**
 * Created by Administrator on 2017/7/18.
 */
/*1.创建函数
* 缺点：
* 1.用户需要传递参数，限制传递的参数的类型
* 2.全局污染
* 3.不安全--任何人都能使用*/
/*
function waterFall(items){

}*/


/*var $ = {

}*/
/*我希望以所有jq对象都能访问这个函数*/
/*option:
* col:列数
* pad:间距*/
/*$.fn = $.prototype :将成员添加到构造函数的原型中*/
$.fn.waterFall= function(option){
    /*设置默认的列数和间距值*/
    var defaultValue={
        col:5,
        pad:10
    }
    /*$.extend的其中一个功能就是：替换数据。如果传入了参数就使用传入的参数，如果没有传入参数就使用默认值  defaultValue是默认值   option是参数.如果名称不一致就会在第一个参数中添加这个参数*/
    $.extend(defaultValue,option);

    var _this = this;

    var col = defaultValue.col;
    var pad = defaultValue.pad;

    /*计算元素的总宽度*/
    var totalWidth= $(this).width();
    /*计算每个元素的宽度*/
    var itemWidth = (totalWidth - (col + 1) * pad) / col;
    /*为每一个元素设置宽度*/
    /*获取所有子元素item项*/
    var allItem = this.children();
    allItem.width(itemWidth);

    /*创建数组，存储每一列元素的Y坐标值*/
    var itemY=[];

    setTimeout(function(){
        /*为每一个元素设置定位坐标值*/
        allItem.each(function(index,value){
            var itemHeight = $(value).height();
            /*第一行：从左排列到右，同时Y坐标值相同*/
            if(index < col){
                $(value).css({
                    top:pad,
                    left:pad+(itemWidth+pad)*index
                });
                /*比较的不是传统意义上的左上角，而是添加了元素高度之后的值*/
                itemY[index] = pad + itemHeight;
            }
            else{
                /*获取当前所有列中Y坐标值最小的列  --左下角的位置*/
                var minCol = 0;
                var minHeight = itemY[minCol];
                for(var i = 1 ;i<itemY.length;i++){
                    if(minHeight > itemY[i]){
                        minCol = i;
                        minHeight= itemY[i];
                    }
                }
                $(value).css({
                    top:itemY[minCol] +pad,
                    left:pad+(itemWidth+pad)*minCol
                });
                /*重置当前列的y坐标值*/
                itemY[minCol] += (pad+ itemHeight);
            }
        });

        /*计算整个items的高度*/
        var maxCol = 0;
        var maxHeight = itemY[maxCol];
        for(var i = 1 ;i<itemY.length;i++){
            if(maxHeight < itemY[i]){
                maxCol = i;
                maxHeight= itemY[i];
            }
        }
        _this.height(maxHeight + pad);
    },100);

}
