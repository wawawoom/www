<?php
function guidv4() {
  if (function_exists('com_create_guid') === true)
    return trim(com_create_guid(), '{}');

  $data = openssl_random_pseudo_bytes(16);
  $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
  $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10
  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

class Step {
  public $flag;
  public $url;
  public $wellDoneMessage;
  public $wikipedia;
  
  public function  __construct($flag, $url, $wellDoneMessage, $wikipedia) {
    $this->flag = $flag;
    $this->url = $url;
    $this->wellDoneMessage = $wellDoneMessage;
    $this->wikipedia = $wikipedia;
  }

  public function getFlag() {
    return $this->flag;
  }

  public function getWellDoneMessage() {
    return $this->wellDoneMessage;
  }

  public function getURL() {
    return $this->url;
  }

  public function getWiki() {
    return $this->wikipedia;
  }
}
//0 Listing
$steps[] = new Step(
  'My_First-FLaG', 
  'https://www.geocaching.com/geocache/GC8GG1R_capture-the-flag',
  'Well done ! Welcome in the Capture the Flag mystery cache challenge.',
  ''
);

// 1 Javascript
$steps[] = new Step(
  'StEp1ComPletEd_!', 
  'http://wawawoom.fr/geocaching/GC8GG1R/step1-e1531b13-e877-4c69-a71d-ac8eed4171ef/',
  'Well... Now we will really test your Javascript hacking skills...',
  'https://en.wikipedia.org/wiki/Brendan_Eich'
);

// 2 XSS
$steps[] = new Step(
  '*XsSisVerYdangeRous*', 
  'http://wawawoom.fr/geocaching/GC8GG1R/step2-dc3504d9-7d66-4a9d-982b-e161b02932d5/',
  'Hey, congratulations ! I\'m impressed by your skills, little hacker.',
  'https://en.wikipedia.org/wiki/Cross-site_scripting'
);

// 3 ZIP CRACK
$steps[] = new Step(
  'W3LL/CRACK3D!', 
  'http://wawawoom.fr/geocaching/GC8GG1R/step3-fc9ce305-7e29-4e22-a18f-ff8d442c618c/',
  'Well cracked. Was it hard ?',
  'https://en.wikipedia.org/wiki/Brute-force_attack'
);

// 4 QR CODE
$steps[] = new Step(
  '!-Qu1cK-ReSSp0nse-C0d3-!', 
  'http://wawawoom.fr/geocaching/GC8GG1R/step4-4d0e43ca-56de-465b-8fac-6ce35429502f/',
  'Hey, this is very impressive. Now, do you talk HTTP ?',
  'https://en.wikipedia.org/wiki/QR_code'
);

// 5 HTTP PROTOCOL
$steps[] = new Step(
  'W0r1dW1d3WEb_Pr0J3ct_In_1989', 
  'http://wawawoom.fr/geocaching/GC8GG1R/step5-730f55a8-d55e-49ff-82ed-4c9c112e86c2/',
  'Come on, one more step and you\'re at the end !',
  'https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol'
);

// 6 SQL INJECTION
$steps[] = new Step(
  'Pr073C7Fr0M5Q11NJ3C710N5', 
  'http://wawawoom.fr/geocaching/GC8GG1R/step6-c1e1f937-c908-4bfb-ac88-f926c3f724a1/',
  'Congrats. Here are the coords:<br/>N43 48.886 E007 15.598',
  'https://en.wikipedia.org/wiki/SQL_injection'
);
?>