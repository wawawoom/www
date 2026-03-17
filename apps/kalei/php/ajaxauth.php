<?php
function parse_signed_request($signed_request, $secret) {
    list($encoded_sig, $payload) = explode('.', $signed_request, 2);

    // decode the data
    $sig = base64_url_decode($encoded_sig);
    $data = json_decode(base64_url_decode($payload), true);

    if (strtoupper($data['algorithm']) !== 'HMAC-SHA256') {
            error_log('Unknown algorithm. Expected HMAC-SHA256');
            return null;
    }

    // check sig
    $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
    if ($sig !== $expected_sig) {
        error_log('Bad Signed JSON signature!');
        return null;
    }

    return $data;
}

function base64_url_decode($input) {
    return base64_decode(strtr($input, '-_', '+/'));
}

function checkAuth() {
    
    include_once('config.php');

    // Check if Facebooks cookie is set
    if(isset($_COOKIE['fbsr_' . $FACEBOOK_APP_ID]) && isset($_COOKIE['kaleiUserID'])) {

        $response = parse_signed_request($_COOKIE['fbsr_' . $FACEBOOK_APP_ID], $FACEBOOK_SECRET);

        // Check if userID sent by visitor is the same like decrypted userID given from cookie
        if($response['user_id'] === $_COOKIE['kaleiUserID']) {
            // auth OK
            return true;
        } else {
            // userID sent by visitor is modified
            return false;
        }

    } else {
        return false;
    }
}
?>