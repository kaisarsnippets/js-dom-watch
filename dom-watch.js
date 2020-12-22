// DOM mutation observer
function DOMWatch(ctx, opt) {
    ctx = ctx || document.documentElement;
    opt = opt || {
        childList: true,
        subtree: true
    };
    var afnc = [];
    var dfnc = [];
    this.added = function(sl, cb){
        cb = cb || function(){};
        afnc.push({ sl: sl, cb: cb });
    };
    this.removed = function(sl, cb){
        cb = cb || function(){};
        dfnc.push({ sl: sl, cb: cb });
    };
    this.destroy = function(){
        ob.disconnect();
    };
    var ob = new MutationObserver(function(m){
        m.forEach(function(r){
            var added = r.addedNodes;
            var remov = r.removedNodes;
            Array.from(added).forEach(function(el){
                afnc.forEach(function(f){
                    var sl = f.sl;
                    var cb = f.cb;
                    if (el.matches && el.matches(sl)) {
                        cb(el);
                    };
                });
            });
            Array.from(remov).forEach(function(el){
                dfnc.forEach(function(f){
                    var sl = f.sl;
                    var cb = f.cb;
                    if (el.matches && el.matches(sl)) {
                        cb(el);
                    };
                });
            });
        });
    });
    ob.observe(ctx, opt);
    return this;
}
