<?php
    /*header('Content-type:text/html;charset=utf-8');*/
    header('Content-type:application/javascript;charset=utf-8');

    $callback = $_GET['callback'];

//    echo 'alert(123)';
    $age = 20;
    $name = 'jack';



    $data = file_get_contents('nav.json');

    echo $callback.'('.$data.')';
?>