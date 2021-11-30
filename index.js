 let http=require("http"),fs=require("fs"),unirest=require("unirest"),random_useragent=require("random-useragent"),isUrl=require("is-valid-http-url"),beautify=require("json-beautify"),jsdom=require("jsdom");const{JSDOM:JSDOM}=jsdom,virtualConsole=new jsdom.VirtualConsole;let parseUrl=require("url-parse"),removeHtmlComments=require("remove-html-comments");var mime=require("mime-types");const{gzip:gzip,ungzip:ungzip}=require("node-gzip");let headerDafult={"User-Agent":'Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90',referer:"https://www.google.com"};console.log("STARTING...");let dataSetting={};fs.readFile("setting.json","utf-8",function(e,t){dataSetting=JSON.parse(t),checkSitemap()});let targetSitemap=[];function checkSitemap(){fs.readdir(dataSetting["name-folder-sitemap"],(e,t)=>{e?console.log("folder '"+dataSetting["name-folder-sitemap"]+"' tidak ditemukan, silahkan buat terlebih dahulu folder tersebut"):(t.forEach(function(e){targetSitemap.push(dataSetting["name-folder-sitemap"]+"/"+e)}),runServer())})}function runServer(){http.createServer(function(e,t){try{let r=e.headers["x-forwarded-proto"]+"://"+e.headers.host,n=r+e.url;if("/ping"==e.url)t.end("ok");else if(e.url.indexOf(dataSetting["name-folder-sitemap"])>0&&e.url.indexOf(".xml")>0&&-1==e.url.indexOf("/host-")&&"GET"===e.method){let n=!1,a="";targetSitemap.forEach(function(t){1==e.url.indexOf(t)&&(n=!0,a=t)}),n?fs.readFile(a,"utf-8",function(e,n){if(e)t.end("404");else{let e=n.split("\n");0==e.length?t.end("404"):(t.write('<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="'+r+'/assets/main-sitemap.xsl"?>\n  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'),e.forEach(function(e){t.write(" <url>\n"),t.write("   <loc>"+e+"</loc>\n"),t.write("   <lastmod>"+(new Date).toISOString()+"</lastmod>\n"),t.write(" </url>\n")}),t.write("</urlset>\n  \x3c!-- XML Sitemap generated by NodeJs --\x3e"),t.end())}}):(t.writeHead(200,{"content-type":"text/xml; charset=UTF-8"}),t.write('<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="'+r+'/assets/main-sitemap.xsl"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'),targetSitemap.forEach(function(e){t.write(" <sitemap>\n"),t.write("   <loc>"+r+"/"+e+"</loc>\n"),t.write("   <lastmod>"+(new Date).toISOString()+"</lastmod>\n"),t.write(" </sitemap>\n")}),t.write("</sitemapindex>\n\x3c!-- XML Sitemap generated by NodeJs --\x3e"),t.end())}else if("/robots.txt"==e.url&&"GET"===e.method)fs.readFile("robots.txt","utf-8",function(e,r){t.writeHead(200,{"content-type":"text/plain; charset=UTF-8"}),t.end(r)});else if(null==e.url.split("/?run=")[1]==0&&1==isUrl(e.url.split("/?run=")[1])&&"GET"===e.method){let n=e.url.split("/?run=")[1];n=n.replace(dataSetting.target,""),t.writeHead(302,{Location:r+n}),t.end(n)}else if(null==e.url.split("/assets/")[1]==0&&"GET"===e.method&&-1==e.url.indexOf("/host-")){let r=e.url.split("/assets/")[1];r.length>0?fs.readdir("assets",(e,n)=>{let a="";if(n.forEach(e=>{e==r&&(a="assets/"+e)}),a.length>0){let e=mime.lookup(a);e?fs.readFile(a,"utf-8",function(r,n){t.writeHead(200,{"content-type":e}),t.end(n)}):t.end("404")}else t.end("404")}):t.end("404")}else if(e.url.length>1&&"GET"===e.method||"/"==e.url)try{let a=parseUrl(e.url).pathname+parseUrl(e.url).query,i=(mime.lookup(a),dataSetting.target+"/"+a),l=!0,s="";if(0==a.indexOf("/host-")){let e=a.split("/host-")[1];i=e.replace("https-","https://").replace("http-","http://"),l=!1,s="/host-"+parseUrl(i).origin.replace("https://","https-").replace("http://","http-")}if(isUrl(i)){let e=unirest.request({uri:i,headers:headerDafult,gzip:!0}).on("error",e=>{t.end("404")});e.on("response",function(a){try{e.destroy();let o=a.headers["content-type"],c=a.statusCode,d={};if(a.headers["cache-control"]&&(d["cache-control"]=a.headers["cache-control"]),a.headers.etag&&(d.etag=a.headers.etag),a.headers["content-type"]&&(d["content-type"]=a.headers["content-type"]),a.headers["last-modified"]&&(d["last-modified"]=a.headers["last-modified"]),0==o.indexOf("text/html")&&404!=c){let e="",a=parseUrl(i).hostname,c=parseUrl(i).origin,d=unirest.request({uri:i,headers:headerDafult,gzip:!0}).on("error",e=>{t.end("404")});d.on("response",function(e){}),d.on("data",function(t){e+=t}),d.on("end",function(){try{t.writeHead(200,{"content-type":o,"content-encoding":"gzip"});let d=new JSDOM(e,{virtualConsole:virtualConsole}).window.document;dataSetting["element-remove"].forEach(function(e){d.querySelectorAll(e).forEach(function(e){e.remove()})}),d.querySelectorAll("link").forEach(function(e){let t=e.getAttribute("href"),n=e.getAttribute("rel");if(null==t==0)if(e&&"stylesheet"==n==0)if(isUrl(t)){let n=parseUrl(t).origin;if(0==l){let a=t.replace(n,r+s);e.setAttribute("href",a)}else{let a=t.replace(n,r);e.setAttribute("href",a)}}else 0==l||e.setAttribute("href",r+t);else if(isUrl(t)){let n=parseUrl(t).origin;-1==n.indexOf(parseUrl(dataSetting.target).hostname)&&(t=t.replace(n,""),n=n.replace("https://","host-https-").replace("http://","host-http-"),e.setAttribute("href",r+"/"+n+t))}else{let n=c.replace("https://","host-https-").replace("http://","host-http-");e.setAttribute("href",r+"/"+n+t)}}),d.querySelectorAll("a").forEach(function(e){let t=e.getAttribute("href");if(null==t);else if(t.indexOf(a)>0){t=parseUrl(t).pathname+parseUrl(t).query,0==l?e.setAttribute("href",r+s+t):e.setAttribute("href",r+t)}else if(isUrl(t))if(-1==t.indexOf(dataSetting.target)){let n=parseUrl(t).protocol.replace(":","-");t=t.replace("https://","host-"+n).replace("http://","host-"+n),e.setAttribute("href",r+"/"+t)}else t=t.replace(dataSetting.target,""),e.setAttribute("href",r+t);else 0==l&&e.setAttribute("href",r+s+t)}),d.querySelectorAll("img").forEach(function(e){let t=e.getAttribute("src"),n=e.getAttribute("data-src");if(null==n==0&&(t=n),null==t==0&&isUrl(t)){let n=parseUrl(t).origin;t=t.replace(n,""),n=n.replace("https://","host-https-").replace("http://","host-http-"),t=r+"/"+n+t,e.setAttribute("src",t)}}),dataSetting["inject-element-head"].reverse().forEach(function(e){let t=d.createElement(e["name-element"]);e["data-attribute"].forEach(function(e){t.setAttribute(e["name-attribute"],e["value-attribute"])}),t.innerHTML=e["data-innerHTML"],"start"==e.position?d.head.insertBefore(t,d.head.firstChild):d.head.appendChild(t)}),dataSetting["inject-element-body"].reverse().forEach(function(e){let t=d.createElement(e["name-element"]);e["data-attribute"].forEach(function(e){t.setAttribute(e["name-attribute"],e["value-attribute"])}),t.innerHTML=e["data-innerHTML"],"start"==e.position?d.body.insertBefore(t,d.body.firstChild):d.body.appendChild(t)});let p="";d.querySelectorAll("title").forEach(function(e){p=e.innerHTML,e.remove()});let h=d.createElement("title");h.innerHTML=p,d.head.insertBefore(h,d.head.firstChild);let u=d.body.outerHTML,m=[];dataSetting["costom-element-remove"].forEach(function(e){e.target==a&&(e["element-remove-selector"].forEach(function(e){d.querySelectorAll(e).forEach(function(e){e.remove()})}),m=e["replace-string"])});let f=d.documentElement.querySelector("body").textContent,g=[];for(var i=0;i<10;i++)f=f.replace(/\n/g,"").replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/<>?\s]/g," ").replace(/  /g," ");(f=f.split(" ")).forEach(function(e,t){e.length>=3&&t>10&&t<50&&g.push(e)}),g=g.length>0?g.join(" "):"",d=d.documentElement.outerHTML,dataSetting["remove-comment-html"]&&removeHtmlComments(u).comments.forEach(function(e){d=d.replace(e,"")}),m.forEach(function(e){d=d.replace(e.target,e.replace)}),d=(d=(d=(d=(d=(d=d.replace(/\$\{titlePost\}/g,p)).replace(/\$\{urlPost\}/g,n)).replace(/\$\{nameWeb\}/g,dataSetting["name-web"])).replace(/\$\{timePublish\}/g,(new Date).toISOString())).replace(/\$\{authorPost\}/g,dataSetting.author)).replace(/\$\{descriptionPost\}/g,g+"..."),gzip(d="<!DOCTYPE html>"+d).then(e=>{t.write(e),t.end()}).catch(function(e){t.end("404")})}catch(e){t.end("404")}})}else if(404==c)t.end("404");else if(0==o.indexOf("image/")||0==o.indexOf("font/")){unirest.request({uri:i,headers:headerDafult,gzip:!0}).on("error",e=>{t.end("404")}).pipe(t)}else if(0==o.indexOf("application/atom+xml")||0==o.indexOf("application/xml")||0==o.indexOf("text/xml")||0==o.indexOf("application/xslt+xml")){let e="",n=unirest.request({uri:i,headers:headerDafult,gzip:!0}).on("error",e=>{t.end("404")});n.on("data",function(t){e+=t}),n.on("end",function(){try{let n="//"+parseUrl(i).hostname,a=new RegExp(dataSetting.target,"g"),c=new RegExp(n,"g");0==l&&(a=new RegExp(parseUrl(i).origin,"g")),e=(e=e.replace(a,r+s)).replace(c,r+s),t.writeHead(200,{"content-type":o}),t.end(e)}catch(e){t.end("404")}})}else if(0==o.indexOf("text/css")){let e="",r=unirest.request({uri:i,headers:headerDafult,gzip:!0}).on("error",e=>{t.end("404")});r.on("data",function(t){e+=t}),r.on("end",function(){t.writeHead(200,d),t.end(e)})}else t.end("404")}catch(e){t.end("404")}})}else t.end("404")}catch(e){t.end("404")}else t.end("404")}catch(e){t.end("404")}}).listen(process.env.PORT||8080)}