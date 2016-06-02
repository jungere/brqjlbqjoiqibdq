var request = require('request');
var Config = require('../global/config.js')
var Util = require('../global/util.js');
var APPKEY = Config.KEY;
var SECRET = Config.SECRET;

var UNOPayURL = 'http://demo.unochat.io:8080/Server';


module.exports = {
    
    /*
     * Receive and Send Tokens as a Unochat Merchant Account 
     * unochat_uid   User ID of unochat
     * orderNo   Your preferred Order No.
     * amout Amount to be transacted 
     * orderTime   Transaction Time 
     * remark    Remarks
     * return mixed     Status Description
     * 101 Authorization Failed
     * 102 Failed to retrieve Order No
     * 103 Invalid Amount
     * 104 Failed to initiate Transaction
     * 105 Invalid Unochat ID, Payment suspended for 10 minutes
     * 106 Insufficient Fund in Merchant's account 
     * 109 Invalid Authentication Code
     * 110 Unable to Deduct Amount
     */
     
     
     /* Collect Tokens from Unochat users to my Unochat Merchant Account */
     
    unoRecharge : function(unochatId, orderNo, amount, orderTime, remark, callback){
        var params = {
            unochat_uid : unochatId,
            order_no : orderNo,
            amount : amount,
            order_time : orderTime,
            remark : remark       
        };
        var url = UNOPayURL+ "/Pay/recharge";
        var auth = Util.createRequestHeader(APPKEY, SECRET);
        
        request({
            headers: {
                'content-type' : 'application/json',
                'Authorization' : 'Basic '+auth,
            },
            uri: url,
            body: Util.json2string(params) ,
            method: 'POST' 
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                callback && callback(body);
            }
        })
    },
    
    /* Send tokens from My unochat Merchant account to a designated Unochat Users */
    
    unoWithdraw : function(){
        
    }
}
