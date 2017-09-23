<?php
    header('Content-Type:application/json;charset=utf-8');

    /*读取文件，返回字符串*/
    $data = file_get_contents('waterFall.json');
    /*将字符串转换为数组*/
    $arr = json_decode($data);
    /*获取页码：*/
    $page = $_GET['page'];
    /*设置每页显示的记录数*/
    $count = 10;
    /*计算起始位置*/
    $start = ($page - 1) * $count;
    /*截取数据  array_slice:截取数组中指定位置开始指定数量的数据，生成一个新的数组*/
    $result = array_slice($arr,$start,$count);
    /*返回数据*/
    echo json_encode($result);
    
    // echo json_encode(array('result'=>$result,'page'=>++$page);

    sleep(2);
?>