var BaseController = require("./Base");
var request = require('request');
var _ = require("underscore")

module.exports = BaseController.extend({
    URL : {
        API :  "",
        Recharge :  "",
        PaySubmit : "",
        PaySubmitWithoutCode : ""
    },
    
    init : function(params){
        this.URL = _.extend(this.URL, params);
        return this;
    },
    
    /**
     * return mixed Status Description
     * 101 Authorization Failed
     * 102 Failed to retrieve Order No
     * 103 Invalid Amount
     * 104 Failed to initiate Transaction
     * 105 Invalid Unochat ID, Payment suspended for 10 minutes
     * 106 Insufficient Fund in Merchant's account 
     * 107-动态口令格式不正确
     * 108-动态口令错误次数过多 10分钟冻结时间
     * 109 Invalid Authentication Code
     * 110 Unable to Deduct Amount
     */
    
    
    /**
     * 麦信支付
     * @param $unochatUid User ID of unochat
     * @param $unochatAccount Your preferred Order No.
     * @param $dynamicCode dynamicc ode
     * @param $orderNo Your preferred Order No.
     * @param $amount Amount to be transacted
     * @param $orderTime Transaction Time
     * @param $remark Remarks
     */
    
    unoPaySubmit : function(unochatUid, unochatAccount, dynamicCode, orderNo, amount, orderTime, remark){
        var params = {
            unochat_uid : unochatUid,
            unochat_account : unochatAccount,
            dynamic_code : dynamicCode,
            order_no : orderNo,
            amount : amount,
            order_time : orderTime,
            remark : remark       
        }; 
        var url = this.URL.PaySubmit;
        var req = this.createPayRequest(url, params);
        // console.log(req);
        request(req, function(err, response, body){
            console.log(body);
            
        })
    },
    
    /**
     * 麦信支付，无需动态口令
     * @param $unochatUid User ID of unochat
     * @param $unochatAccount Your preferred Order No.
     * @param $dynamicCode dynamicc ode
     * @param $orderNo Your preferred Order No.
     * @param $amount Amount to be transacted
     * @param $orderTime Transaction Time
     * @param $remark Remarks
     */
    unoPaySubmitWithoutCode : function(unochatUid,  orderNo, amount, orderTime, remark){
        var params = {
            unochat_uid : unochatUid,
            order_no : orderNo,
            amount : amount,
            order_time : orderTime,
            remark : remark       
        }; 
        var url = this.URL.PaySubmitWithoutCode;
        var req = this.createPayRequest(url, params);
        console.log(req);
        request(req, function(err, response, body){
            
            console.log(err, body);
            
        })
    },
    
    /*
     * 麦信积分充值
     * unochat_uid User ID of unochat
     * orderNo Your preferred Order No.
     * amout Amount to be transacted 
     * orderTime Transaction Time
     * remark Remarks
     */
    unoRecharge : function(unochatUid, orderNo, amount, orderTime, remark, callback){
        var params = {
            unochat_uid : unochatUid,
            order_no : orderNo,
            amount : amount,
            order_time : orderTime,
            remark : remark       
        };
        var url = this.URL.Recharge;
        var req = this.createPayRequest(url, params);
        // console.log(req);
        request(req, function(err, response, body){
            console.log(body);
        })
        
    },
    unoWithdraw : function(){
        
    }
})
