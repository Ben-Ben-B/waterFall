$.fn.waterFall = function(option) {
    var defaultValue = {
        col: 5,
        pad: 10
    }
    $.extend(defaultValue, option);
    var col = defaultValue.col;
    var pad = defaultValue.pad;
    var itemsW = $(this).width();
    var itemWidth = (itemsW - (col + 1) * pad) / col;
    var allItem = $(this).children();
    allItem.width(itemWidth);
    var itemY = [];

    setTimeout(function() {
        allItem.each(function(index, value) {
            var itemHeight = $(value).height();
            if (index < col) {
                $(value).css({
                    top: pad,
                    left: pad + (itemWidth + pad) * index
                })
                itemY[index] = pad + itemHeight;
            } else {
                var minCol = 0;
                var minHeight = itemY[minCol];
                for (var i = 1; i < itemY.length; i++) {
                    if (minHeight > itemY[i]) {
                        minCol = i;
                        minHeight = itemY[i];
                    }
                }
                $(value).css({
                    top: itemY[minCol] + pad,
                    left: pad + (itemWidth + pad) * minCol
                })
                itemY[minCol] += (itemHeight + pad)
            }
        })
        var maxCol = 0;
        var maxHeight = itemY[maxCol];
        for (var i = 1; i < itemY.length; i++) {
            if (maxHeight < itemY[i]) {
                maxCol = i;
                maxHeight = itemY[i];
            }
        }
        $(".items").height(itemY[maxCol] + pad)
    }, 300)

}