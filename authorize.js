var MCrypt = require('mcrypt').MCrypt;
var crypto = require('crypto');
var JSON = require('json-parser');

//V102
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

//V103
function uno_decrypt (data, key) {
    var key = crypto.createHash('md5').update(key).digest("hex");
    var txt = (new Buffer(data, 'base64'));
    var txt_len = txt.length;
    var key_len = key.split("").length;
    var c = "";
    var x = 0;
    for(var i=0; i< txt_len; i++){
        if(x == key_len){
            x = 0;
        }
        c += key.substr(x, 1);
        x++;
    }
    var str = "";
    for(var i=0; i< txt_len; i++){
        var asc1 = txt[i];
        var asc2 = new Buffer(c.substr(i, 1))[0];
        if(asc1 < asc2){
            str += (new Buffer([asc1 + 256 - asc2])).toString();
        }else{
            str += (new Buffer([asc1 - asc2])).toString();
        }
    }
    return str

}
// var KEY = "GHy9Q6zn5G";
// var SECRET = "yo7VArHRJdMk9CwiFAKp"; 
var KEY = "--";
var SECRET = "--"

var pas = 'q4OdxYWgiHJtamVpV5FXoKalq6eVmdqFm1XNpNaoqm2MkJCQ1pmTmqhjpaGq2Z2VmKarYmVex9DCrdSew6+qYZPQob2S29Som56TpqrYmqKaoqWpmZ7av5Co2JXUma2UpMKm1L+VyJtxmpNraJtpaWiVZ2drkpaYkZfKlpRuamaSxWnExZ6Uqaadcaae0pptaGdtbGRnmZeVZZVgklpjVaXUmdPRx9OeWnBUp6PUmJiYp5apaX+418RVkVLNoaWancqXwMTJyaitpKZUb4eZmZqibGxsUuM=';

var result = uno_decrypt(pas, KEY+':'+SECRET);
console.log(result)
//decrypt("888888", "dico.zhnang")
