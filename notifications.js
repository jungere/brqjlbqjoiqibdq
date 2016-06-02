var BaseController = require("./Base");
var _ = require("underscore")

module.exports = BaseController.extend({
    URL : {
        api : null,
        single : null,
        group : null,
        system :  null
    },
    
    init : function(params){
        _.extend(this.URL, params);
    },
    
    msgSingle : function(senderId, receiverId, content)
    {
        if(null == this.PUSHURL){
            console.log("push url null.")
            return false;
        }
        var self = this;
        var params = {
            sender : senderId,
            receiver : receiverId,
            content : content
        }
        
        var url = self.PUSHURL+ "/messages/peers";
        console.log(url, params);
        request.post({url:url, form: params}, function (error, response, body) {
            //console.log(error);
            //console.log(response);
            console.log(body);
            if (!error && response.statusCode == 200) {
                console.log(body);
                callback && callback(body);
            }
        })
    },
    
    msgGroup : function(senderId, receiverIds, content)
    {
        if(null == this.PUSHURL){
            console.log("push url null.")
            return false;
        }
        var self = this;
        var params = {
            sender : senderId,
            receiver : receiverIds,
            content : content
        }
        
        var url = self.PUSHURL+ "/messages/peers";
        console.log(url, params);
        request.post({url:url, form: params}, function (error, response, body) {
            //console.log(error);
            //console.log(response);
            console.log(body);
            if (!error && response.statusCode == 200) {
                console.log(body);
                callback && callback(body);
            }
        })
    }
})