/**
 * Created by Administrator on 2017/8/14.
 */
/*实现元素的瀑布流布局*/
/*function waterFall(items){

}*/
/*缺点：
* 1.全局污染
* 2.方法增加不方便管理
* 3.传参*/


/*
var obj ={
    waterFall:function(items){

    }
}*/

/*更好的建议：希望将来所有jq对象都能调用到这个函数*/
/*将函数动态的添加到jq的函数库中--jq插件
* $.fn：所有的jq对象都能访问fn中声明的成员*/

/*option:
* padding:元素与元素之间的间距
* col:显示的列数*/
$.fn.waterFall = function(option){
    var defaultV = {
        padding:10,
        col:5
    }
    defaultV = $.extend(defaultV,option);
    var pad = defaultV.padding;
    var col = defaultV.col;
    /*$.extend():如果传入了第二个参数，那么就会将第二个参数的属性值覆盖第一个参数的属性值，如果没有传递，则默认使用第一个参数的属性值,如果传递的参数名称第一个中不存在则默认添加一个新的参数*/

    /*瀑布流就是来计算每一个元素的 布局信息--宽高(width/height)  坐标(left/top)*/

    /*对于图片，计算了图片的宽或者高，它的高或者宽会自动计算*/

    /*1.获取当前items的总宽度*/
    var itemsWidth = $(this).width();
    /*2.计算单个元素的宽度*/
    var itemWidth = (itemsWidth - (col + 1) * pad) / col;
    /*3.获取items中的每一个需要进行瀑布流布局的元素*/
    var items = $(this).children();
    /*4.为每个元素设置宽度--本质是是为item中的img标签设置宽度*/
    items.width(itemWidth);

    /*创建数组存储每一列的坐标值---坐标--top+当前元素的高度*/
    var itemY = [];

    setTimeout(function(){
        /*计算定位布局信息*/
        items.each(function(index,value){
            /*item的高度是由图片撑开的*/
            var itemH = $(value).height();
            /*设置第一行瀑布流布局*/
            if(index < col){
                $(value).css({
                    'left':pad + (pad+itemWidth) * index,
                    'top':pad
                });
                /*将当前元素的坐标存储到数组中*/
                itemY[index] = pad + itemH;
            }
            else{
                /*其它行*/
                /*默认第0列就是高度最小的列*/
                var minCol = 0;
                var minH = itemY[minCol];
                for(var i = 1;i<itemY.length;i++){
                    if(minH > itemY[i]){
                        minCol = i;
                        minH = itemY[i];
                    }
                }
                /*设置样式*/
                $(value).css({
                    'left':pad + (pad + itemWidth) * minCol,
                    'top':itemY[minCol] + pad
                });
                /*设置完这个元素的TOP属性之后，要将数组中存储的参照值重置*/
                itemY[minCol] = itemY[minCol] + pad + itemH;
            }
        });

        /*计算整个items的高度*/
        var maxCol = 0;
        var maxH = itemY[maxCol];
        for(var i =1;i<itemY.length;i++){
            if(maxH < itemY[i]){
                maxCol = i;
                maxH = itemY[i];
            }
        }
        $(".items").height(maxH + pad);
    },100);

}
