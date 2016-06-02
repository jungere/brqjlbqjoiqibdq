var MCrypt = require('mcrypt').MCrypt;
var crypto = require('crypto');
var JSON = require('json-parser');

function getAuthUserId(appId, appSecret, auth) {
    if(auth){
        var key = decrypt(auth, appSecret);
        if(5 == key.indexOf(appId)){
            var arr = key.split("|");
            return JSON.parse(arr[2]);
        }
    }
    return false;
}

function decrypt(input, key) {
    var txt = (new Buffer(input.trim(), 'base64'));
    var key = crypto.createHash('md5').update(key).digest("hex").substring(0,24);
    var desEcb = new MCrypt('tripledes', 'ecb');
    desEcb.open(key);       
    
    var plaintext = desEcb.decrypt(txt);
    
    return plaintext.toString();
}

var KEY = "--";
var SECRET = "--"; 
var pas = "TceRNpK6zyNA6hror+PZpTfwcMVtw32nRdi+ebU1OpZF9hQzE3qy8Oth8z03FYXIZcY/0eKjdCnO+7njU8I0pLFQHyz/EW7AFjxbreLs9+l1KBw30hbByoPIWgktXst3dL/okdcRiNzuLRYY2b2JLbFBZGMV8nARSV77uJ7+Lg1mhFEZfllGcUSmesd1FvhnY3K4iH7mDRJVwo/gDxrfcWu7wSvfvc+B8KmUCvErCJnppEl42txdgg=="

var result = getAuthUserId(KEY, SECRET, pas);
console.log(result)
//decrypt("888888", "dico.zhnang")
