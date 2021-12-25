let dbAds=[
  {
    "target-selector":[
      ".container-inner.right",
      "#container-inner.right",
      ".content"
    ],
    "position":"out-top", //out-top, out-bottom, in-top, in-bottom
    "data" :`
    `,
    "style":`
      width: 90%;
      margin: auto;
      margin-bottom: 10px;
      margin-top: 10px;
    `
  }
];

dbAds.forEach(function(a){
  let createElDom=document.createElement("div");
  createElDom.setAttribute("style",a["style"]);
  createElDom.innerHTML=a["data"];
  let dataScript=[];
  createElDom.querySelectorAll("script").forEach(function(b){
    let createElCostom=document.createElement("script");
    createElCostom.innerHTML=b.innerHTML;
    dataScript.push(createElCostom);
    b.remove();
  });
  a["target-selector"].forEach(function(b){
    let targetEl=document.querySelector(b);
    if(targetEl){
      if(a["position"]=="out-bottom"){
        targetEl.parentNode.insertBefore(createElDom,targetEl.nextSibling);
      }else if(a["position"]=="out-top"){
        targetEl.parentNode.insertBefore(createElDom,targetEl.nextSibling);
        createElDom.after(targetEl);
      }else if(a["position"]=="in-top"){

      }else if(a["position"]=="in-top"){
        
      };
      dataScript.forEach(function(b){
        createElDom.append(b); 
      });
    }else{
      console.log("target "+a["target-selector"]+" tidak ditemukan"); 
    };
  });
});


let elImg=document.querySelectorAll("img");
elImg.forEach(function(a){
  a.setAttribute("style","max-width:100%");
  let classImg=a.getAttribute("class");
  let getSrcSet=a.getAttribute("srcset");
  if(classImg==null==false){
    a.classList.remove("lazyload");
  };
  if(getSrcSet==null==false){
    getSrcSet=getSrcSet.split(",");
    if(getSrcSet.length>1){
      a.setAttribute("src",getSrcSet);
    };
  };
});

let dataLazy=document.querySelectorAll(".lazy-image.lazy-image-udf");
dataLazy.forEach(function(a){
  let dataHref=a.getAttribute("data-src");
  if(dataHref){
    let targetLazy=a.querySelector(".loadingPlaceholder");
    let targetDiv=a.querySelector(".lazy-image__loadingPlaceholder")
    if(targetLazy){
      targetLazy.setAttribute("src",dataHref);
      targetDiv.setAttribute("class","show")
    };
  };
});
(function(){injectScript([{"attr":[{"name":"type","value":"text/javascript"},

{"name":"src","value":"//outsetnormalwaited.com/69/45/98/69459833932827a54afe9226641141b8.js"}],"tag":"script","inner":""}],{"target":"body"});function injectScript(e,t){let 

n=t.target;for(let t of e){let e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector

(n)&&document.querySelector(n).append(o)}}})();
(function(){injectScript([{"attr":[{"name":"id","value":"banner-container"},{"name":"style","value":"width:100%;margin:auto;text-align:center;float:none;overflow:hidden;display:scroll;position:fixed;bottom:10px;z-index:999;-webkit-transform:translateZ(0);"}],"tag":"div","inner":"\n        <div style=\"margin-bottom: 10px;\">\n<a onclick=\"document.getElementById(&quot;banner-container&quot;).style.display = &quot;none&quot;;\" style=\"cursor:pointer;\"><span style=\"vertical-align:middle; background: yellow; padding: 0px 11.3px 3px 11.3px; border: 3px solid red; color: red; font-size: 1em; font-weight: bold; border-radius: 100px;\"> close </span></a>\n</div>\n<div style=\"text-align:center;display:block;max-width:300px;height:250px;overflow:hidden;margin:auto; border: 3px solid red; background: yellow;\">\n\n            <script type=\"text/javascript\">\n\tatOptions = {\n\t\t'key' : 'adc1e9d02729faab00f9d20f138a3197',\n\t\t'format' : 'iframe',\n\t\t'height' : 250,\n\t\t'width' : 300,\n\t\t'params' : {}\n\t};\n</script>\n\n<iframe allowtransparency=\"true\" scrolling=\"no\" framespacing=\"0\" src=\"about:blank\" width=\"300\" height=\"250\" frameborder=\"0\"></iframe><script type=\"text/javascript\" src=\"//outsetnormalwaited.com/adc1e9d02729faab00f9d20f138a3197/invoke.js\" class=\"atScriptcd1286b4f2d38e073d7453326f4b47e8_0\"></script>\n</div>\n"}],{"target":"body"});function injectScript(e,t){let n=t.target;for(let t of e){let e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector(n)&&document.querySelector(n).append(o)}}})();
(function(){injectScript([{"attr":[{"name":"src","value":"//pop.dojo.cc/4344.js"}],"tag":"script","inner":""}],{"target":"body"});function injectScript(e,t){let n=t.target;for(let t of e){let 

e=t.tag,r=t.inner,o=document.createElement(e);o.innerHTML=r;let c=t.attr;for(let e of c)o.setAttribute(e.name,e.value);document.querySelector(n)&&document.querySelector(n).append(o)}}})
