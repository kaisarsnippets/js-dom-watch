# DOM Watch
[browser] DOM mutation observer

### Install
```
npm install kc-dom-watch
```

### Use
```js
var Watcher = new DOMWatch();
Watcher.added('#my-elem', function(el){
    console.log(el);
});
```
