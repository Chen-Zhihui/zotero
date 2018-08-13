_satellite.pushAsyncScript(function(event, target, $variables){
  addJs('https://webapps-cdn.esri.com/CDN/components/Cookie/cookie-banner.js');

function addJs(filename) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    head.appendChild(script);
}
});
