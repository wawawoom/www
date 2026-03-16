<?php
$files = array(
	'__reset.less',
	'_mixins.less',
	'_variables.less',
	'tictac.popup.less',
	'tictac.tooltip.less',
    'core.less'
);

$time = mktime(0,0,0,21,5,1980);  
$cache = 'core.css';  
foreach($files as $file) {  
    $fileTime = filemtime($file);  
    if($fileTime > $time) {  
        $time = $fileTime;  
    }  
}  
if(file_exists($cache)) {  
    $cacheTime = filemtime($cache);  
    if($cacheTime < $time) {  
        $time = $cacheTime;  
        $recache = true;  
    } else {  
        $recache = false;  
    }  
} else {  
    $recache = true;  
}


if(!$recache && isset($_SERVER['If-Modified-Since']) && strtotime($_SERVER['If-Modified-Since']) >= $time){  
    header("HTTP/1.0 304 Not Modified");  
} else {  
    header('Content-type: text/css');  
    header('Last-Modified: ' . gmdate("D, d M Y H:i:s",$time) . " GMT");  
    if($recache) {  
        require '../inc/lessc.inc.php';  
        $lc = new lessc();  
        $css = '';  
        foreach($files as $file){  
            $css .= file_get_contents($file);  
        }  
        $css = $lc->parse($css);  
        file_put_contents($cache, $css);  
        echo $css;  
    } else {  
        readfile($cache);  
    }  
}  
?>  