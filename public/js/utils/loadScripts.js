export default function loadScripts(urls, success, failure){
  var count = urls.length;
  var errored = false;
  
  if(urls.length == 0) return success();
  
  urls.forEach(function(url){
    var script = document.createElement('script');
    script.onload = function(){
      if(errored) return;
      if(!--count) success();
    };
    script.onerror = function(){
      if(errored) return;
      failure();
      errored = true;
    };
    script.src = url;
    document.head.insertBefore(script, document.head.firstChild);
  });
};