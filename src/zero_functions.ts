/**
 * Created by m.ourir on 03/04/2015.
 */
declare var guid ;
declare var ApplyBind ;

(function(){

    this.guid = function (){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return uuid;
    }

    this.ApplyBind = function (obj : {Binds : string[]}){
        for (var i = 0; i < obj.Binds.length; i++) {
            if (obj[obj.Binds[i]] === undefined) {
                require('../logger').warn( obj.Binds[i] , ' does not appear to be a methode of the class' )
            }
            else {
                obj[obj.Binds[i]] = obj[obj.Binds[i]].bind(obj) ;
            }
        }
    }
})() ;
