<?php
    header('Content-type:application/json;charset=utf-8');

    /*1.读取文件，获取json格式的字符串*/
    $dataStr = file_get_contents('waterFall.json');
    /*2.将json格式字符串转换为php数组*/
    $dataArr = json_decode($dataStr);
    /*3.定义长度*/
    $count = 10;
    /*4.接收用户传递的页码*/
    $page = $_GET['page'];
    /*5.计算起始位置*/
    $start = ($page - 1) * $count;
    /*6.截取数组的元素*/
    //array_slice(源数组，起始索引，长度),这个方法会返回一个新的数组，包含截取到的数据;
    $result = array_slice($dataArr,$start,$count);

    /*7.返回*/
    echo json_encode($result);
    sleep(2);
?>