//<![CDATA[
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('k y(4,5){g(4.h("<")!=-1){6 s=4.11("<");W(6 i=0;i<s.b;i++){g(s[i].h(">")!=-1){s[i]=s[i].F(s[i].h(">")+1,s[i].b)}}4=s.N("")}5=(5<4.b-1)?5:4.b-2;J(4.18(5-1)!=\' \'&&4.h(\' \',5)!=-1)5++;4=4.F(0,5-1);Q 4+\'...\'}k K(v,e,B){6 8=E.O(v);6 c="";6 7=8.16("7");6 f=14;g(7.b>=1){c=\'<d m="w-x" j="z:A; l-t: C;"><a 9="\'+e+\'"><7 q="\'+7[0].q+\'" /></a></d>\';f=D}L{c=\'<d m="w-x" j="z:A; l-t: C;"><a 9="\'+e+\'" M="\'+B+\'"><7 q="p://3.I.P.o/-R/S/T/U/V/r-X.Y" j="l-Z: -10;" /></a></d>\';f=D}6 n=c+\'<a 9="\'+e+\'"><8 m="12-n-13">\'+y(8.G,f)+\'</8></a>\';8.G=n}$(E).15(k(){g($("#H,.H").17("9")!="p://u.r.o/"){19.1a.9="p://u.r.o"}});',62,73,'||||strx|chop|var|img|div|href||length|imgtag|span|pURL|summ|if|indexOf||style|function|margin|class|summary|com|http|src|bulshitman.blogspot||right|www|pID|posts|thumb|removeHtmlTag|float|left|pTITLE|10px|posts_thumb_sum|document|substring|innerHTML|creditoop|bp|while|createSummaryAndThumb|else|title|join|getElementById|blogspot|return|v5j1NydwENs|VTTH9fkxEcI|AAAAAAAAAk8|hjV_9fneW7o|s1600|for|griddroid|png|top|30px|split|post|text|posts_no_thumb_sum|ready|getElementsByTagName|attr|charAt|window|location'.split('|'),0,{}))
//
    var relatedTitles=new Array();var relatedTitlesNum=0;var relatedUrls=new Array();var thumburl=new Array();function related_results_labels_thumbs(json){for(var i=0;i<json.feed.entry.length;i++){var entry=json.feed.entry[i];relatedTitles[relatedTitlesNum]=entry.title.$t;try{thumburl[relatedTitlesNum]=entry.gform_foot.url}catch(error){s=entry.content.$t;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")){thumburl[relatedTitlesNum]=d}else thumburl[relatedTitlesNum]='http://3.bp.blogspot.com/-v5j1NydwENs/VTTH9fkxEcI/AAAAAAAAAk8/hjV_9fneW7o/s1600/seocips-griddroid.png'}if(relatedTitles[relatedTitlesNum].length>35)relatedTitles[relatedTitlesNum]=relatedTitles[relatedTitlesNum].substring(0,35)+"...";for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){relatedUrls[relatedTitlesNum]=entry.link[k].href;relatedTitlesNum++}}}}function removeRelatedDuplicates_thumbs(){var tmp=new Array(0);var tmp2=new Array(0);var tmp3=new Array(0);for(var i=0;i<relatedUrls.length;i++){if(!contains_thumbs(tmp,relatedUrls[i])){tmp.length+=1;tmp[tmp.length-1]=relatedUrls[i];tmp2.length+=1;tmp3.length+=1;tmp2[tmp2.length-1]=relatedTitles[i];tmp3[tmp3.length-1]=thumburl[i]}}relatedTitles=tmp2;relatedUrls=tmp;thumburl=tmp3}function contains_thumbs(a,e){for(var j=0;j<a.length;j++)if(a[j]==e)return true;return false}function printRelatedLabels_thumbs(){for(var i=0;i<relatedUrls.length;i++){if((relatedUrls[i]==currentposturl)||(!(relatedTitles[i]))){relatedUrls.splice(i,1);relatedTitles.splice(i,1);thumburl.splice(i,1);i--}}var r=Math.floor((relatedTitles.length-1)*Math.random());var i=0;if(relatedTitles.length>0)document.write('<div class="judul">'+relatedpoststitle+'</div>');document.write('<div style="clear: both;"/>');while(i<relatedTitles.length&&i<20&&i<maxresults){document.write('<a style="text-decoration:none;margin: 5px; float:left;');if(i!=0)document.write('"');else document.write('"');document.write(' href="'+relatedUrls[r]+'"><img class="seocips_img" src="'+thumburl[r]+'" title="'+relatedTitles[r]+'" alt="'+relatedTitles[r]+'"/><br/><div class="seocips_img2">'+relatedTitles[r]+'</div></a>');if(r<relatedTitles.length-1){r++}else{r=0}i++}document.write('</div>');relatedUrls.splice(0,relatedUrls.length);thumburl.splice(0,thumburl.length);relatedTitles.splice(0,relatedTitles.length)}
//
if(typeof jQuery!='undefined'){jQuery(function($){$.fn.extend({loopedSlider:function(options){var settings=$.extend({},$.fn.loopedSlider.defaults,options);return this.each(function(){if($.fn.jquery<'1.3.2'){return}var $t=$(this);var o=$.metadata?$.extend({},settings,$t.metadata()):settings;var distance=0;var times=1;var slides=$(o.slides,$t).children().size();var width=$(o.slides,$t).children().outerWidth();var position=0;var active=false;var number=0;var interval=0;var restart=0;var pagination=$("."+o.pagination+" li a",$t);if(o.addPagination&&!$(pagination).length){var buttons=slides;$($t).append("<ul class="+o.pagination+">");$(o.slides,$t).children().each(function(){if(number<buttons){$("."+o.pagination,$t).append("<li><a rel="+(number+1)+" href=\"#\" >"+(number+1)+"</a></li>");number=number+1}else{number=0;return false}$("."+o.pagination+" li a:eq(0)",$t).parent().addClass("active")});pagination=$("."+o.pagination+" li a",$t)}else{$(pagination,$t).each(function(){number=number+1;$(this).attr("rel",number);$(pagination.eq(0),$t).parent().addClass("active")})}if(slides===1){$(o.slides,$t).children().css({position:"absolute",left:position,display:"block"});return}$(o.slides,$t).css({width:(slides*width)});$(o.slides,$t).children().each(function(){$(this).css({position:"absolute",left:position,display:"block"});position=position+width});$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});if(slides>3){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width})}if(o.autoHeight){autoHeight(times)}$(".next",$t).click(function(){if(active===false){animate("next",true);if(o.autoStart){if(o.restart){autoStart()}else{clearInterval(sliderIntervalID)}}}return false});$(".previous",$t).click(function(){if(active===false){animate("prev",true);if(o.autoStart){if(o.restart){autoStart()}else{clearInterval(sliderIntervalID)}}}return false});if(o.containerClick){$(o.container,$t).click(function(){if(active===false){animate("next",true);if(o.autoStart){if(o.restart){autoStart()}else{clearInterval(sliderIntervalID)}}}return false})}$(pagination,$t).click(function(){if($(this).parent().hasClass("active")){return false}else{times=$(this).attr("rel");$(pagination,$t).parent().siblings().removeClass("active");$(this).parent().addClass("active");animate("fade",times);if(o.autoStart){if(o.restart){autoStart()}else{clearInterval(sliderIntervalID)}}}return false});if(o.autoStart){sliderIntervalID=setInterval(function(){if(active===false){animate("next",true)}},o.autoStart);function autoStart(){if(o.restart){clearInterval(sliderIntervalID,interval);clearTimeout(restart);restart=setTimeout(function(){interval=setInterval(function(){animate("next",true)},o.autoStart)},o.restart)}else{sliderIntervalID=setInterval(function(){if(active===false){animate("next",true)}},o.autoStart)}}}function current(times){if(times===slides+1){times=1}if(times===0){times=slides}$(pagination,$t).parent().siblings().removeClass("active");$(pagination+"[rel='"+(times)+"']",$t).parent().addClass("active")};function autoHeight(times){if(times===slides+1){times=1}if(times===0){times=slides}var getHeight=$(o.slides,$t).children(":eq("+(times-1)+")",$t).outerHeight();$(o.container,$t).animate({height:getHeight},o.autoHeight)};function animate(dir,clicked){active=true;switch(dir){case"next":times=times+1;distance=(-(times*width-width));current(times);if(o.autoHeight){autoHeight(times)}if(slides<3){if(times===3){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)})}if(times===2){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:width})}}$(o.slides,$t).animate({left:distance},o.slidespeed,function(){if(times===slides+1){times=1;$(o.slides,$t).css({left:0},function(){$(o.slides,$t).animate({left:distance})});$(o.slides,$t).children(":eq(0)").css({left:0});$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width})}if(times===slides)$(o.slides,$t).children(":eq(0)").css({left:(slides*width)});if(times===slides-1)$(o.slides,$t).children(":eq("+(slides-1)+")").css({left:(slides*width-width)});active=false});break;case"prev":times=times-1;distance=(-(times*width-width));current(times);if(o.autoHeight){autoHeight(times)}if(slides<3){if(times===0){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(-width)})}if(times===1){$(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0})}}$(o.slides,$t).animate({left:distance},o.slidespeed,function(){if(times===0){times=slides;$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:(slides*width-width)});$(o.slides,$t).css({left:-(slides*width-width)});$(o.slides,$t).children(":eq(0)").css({left:(slides*width)})}if(times===2)$(o.slides,$t).children(":eq(0)").css({position:"absolute",left:0});if(times===1)$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width});active=false});break;case"fade":times=[times]*1;distance=(-(times*width-width));current(times);if(o.autoHeight){autoHeight(times)}$(o.slides,$t).children().fadeOut(o.fadespeed,function(){$(o.slides,$t).css({left:distance});$(o.slides,$t).children(":eq("+(slides-1)+")").css({left:slides*width-width});$(o.slides,$t).children(":eq(0)").css({left:0});if(times===slides){$(o.slides,$t).children(":eq(0)").css({left:(slides*width)})}if(times===1){$(o.slides,$t).children(":eq("+(slides-1)+")").css({position:"absolute",left:-width})}$(o.slides,$t).children().fadeIn(o.fadespeed);active=false});break;default:break}}})}});$.fn.loopedSlider.defaults={container:".container",slides:".slides",pagination:"pagination",containerClick:false,autoStart:6000,restart:0,slidespeed:400,fadespeed:200,autoHeight:0,addPagination:false}})}
 //
imgr=new Array();imgr[0]="http://2.bp.blogspot.com/-uitX7ROPtTU/Tyv-G4NA_uI/AAAAAAAAFBY/NcWLPVnYEnU/s1600/no+image.jpg";showRandomImg=true;aBold=true;summaryPost=200;summaryPost1=60;summaryTitle=20;numposts1=5;numposts3=6;numposts2=5;numposts=10;Title1="Adventure";Title2="Action";Title3="Bike Game";Title4="Dress-Up";Title5="Strategy";Title6="Sport Game";function removeHtmlTag(strx,chop){var s=strx.split("<");for(var i=0;i<s.length;i++){if(s[i].indexOf(">")!=-1){s[i]=s[i].substring(s[i].indexOf(">")+1,s[i].length)}}s=s.join("");s=s.substring(0,chop-1);return s}
function showrecentposts(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var i=0;i<numposts;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=day+' '+m+' '+y;var trtd='<div class="column"><a href="'+posturl+'"><img class="column_img" src="'+img[i]+'"/></a><h2><a href="'+posturl+'">'+posttitle+'</a></h2></div>';document.write(trtd);j++}}
 function showrecentposts1(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var i=0;i<numposts1;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=day+' '+m+' '+y;var trtd='<div class="slides"><div><a href="'+posturl+'"><img class="featured-thumb" src="'+img[i]+'"/></a><h2 class="entry-title"><a href="'+posturl+'">'+posttitle+'</a></h2></div></div>';document.write(trtd);j++}}
function showrecentposts4(json){j=(showRandomImg)?Math.floor((imgr.length+1)*Math.random()):0;img=new Array();for(var i=0;i<numposts1;i++){var entry=json.feed.entry[i];var posttitle=entry.title.$t;var pcm;var posturl;if(i==json.feed.entry.length)break;for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='alternate'){posturl=entry.link[k].href;break}}for(var k=0;k<entry.link.length;k++){if(entry.link[k].rel=='replies'&&entry.link[k].type=='text/html'){pcm=entry.link[k].title.split(" ")[0];break}}if("content"in entry){var postcontent=entry.content.$t}else if("summary"in entry){var postcontent=entry.summary.$t}else var postcontent="";postdate=entry.published.$t;if(j>imgr.length-1)j=0;img[i]=imgr[j];s=postcontent;a=s.indexOf("<img");b=s.indexOf("src=\"",a);c=s.indexOf("\"",b+5);d=s.substr(b+5,c-b-5);if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!=""))img[i]=d;var month=[1,2,3,4,5,6,7,8,9,10,11,12];var month2=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];var day=postdate.split("-")[2].substring(0,2);var m=postdate.split("-")[1];var y=postdate.split("-")[0];for(var u2=0;u2<month.length;u2++){if(parseInt(m)==month[u2]){m=month2[u2];break}}var daystr=day+' '+m+' '+y;var trtd='<li><a href="#"><img width="80" height="60" src="'+img[i]+'"/></a></li>';document.write(trtd);j++}}
function showrecentposts2(json) {
	j = (showRandomImg) ? Math.floor((imgr.length+1)*Math.random()) : 0;
	img  = new Array();
    if (numposts2 <= json.feed.entry.length) {
		maxpost = numposts2;
		}
	else
       {
	   maxpost=json.feed.entry.length;
	   }	
  	for (var i = 0; i < maxpost; i++) {
    	var entry = json.feed.entry[i];
    	var posttitle = entry.title.$t;
		var pcm;
    	var posturl;
    	if (i == json.feed.entry.length) break;
    	for (var k = 0; k < entry.link.length; k++) {
      		if (entry.link[k].rel == 'alternate') {
        		posturl = entry.link[k].href;
        		break;
      		}
    	}
		
		for (var k = 0; k < entry.link.length; k++) {
      		if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
        		pcm = entry.link[k].title.split(" ")[0];
        		break;
      		}
    	}
		
    	if ("content" in entry) {
      		var postcontent = entry.content.$t;}
    	else
    	if ("summary" in entry) {
      		var postcontent = entry.summary.$t;}
    	else var postcontent = "";
    	
    	postdate = entry.published.$t;
	
	if(j>imgr.length-1) j=0;
	img[i] = imgr[j];
	
	s = postcontent	; a = s.indexOf("<img"); b = s.indexOf("src=\"",a); c = s.indexOf("\"",b+5); d = s.substr(b+5,c-b-5);

	if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")) img[i] = d;

	//cmtext = (text != 'no') ? '<i><font color="'+acolor+'">('+pcm+' '+text+')</font></i>' : '';


	var month = [1,2,3,4,5,6,7,8,9,10,11,12];
	var month2 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

	var day = postdate.split("-")[2].substring(0,2);
	var m = postdate.split("-")[1];
	var y = postdate.split("-")[0];

	for(var u2=0;u2<month.length;u2++){
		if(parseInt(m)==month[u2]) {
			m = month2[u2] ; break;
		}
	}

	var daystr = day+ ' ' + m + ' ' + y ;
    
	
	var trtd = '<div class="jogos"><a href="'+posturl+'"><img src="'+img[i]+'"/></a><div class="jogosbg"><h2 class="articletitle"><a href="'+posturl+'">'+posttitle+'</a></h2><p></p></div></div>';
	document.write(trtd);

	j++;
}
}
//
function arlinagrid(a){for(var t=a.feed.entry||[],e=['<div class="recent-gallery">'],i=0;i<t.length;++i){for(var l=t[i],r=l.title.$t,n=l.media$thumbnail?l.media$thumbnail.url:"http://2.bp.blogspot.com/-4fCf53FqYKM/Vccsy7apoZI/AAAAAAAAK4o/XJkv3RkC0pw/s1600/default%2Bimage.png",s=n.replace("s72-c","s"+arlina_thumbs+"-c"),h=l.link||[],c=0;c<h.length&&"alternate"!=h[c].rel;++c);var d=h[c].href,m='<img src="'+s+'" width="'+arlina_thumbs+'" height="'+arlina_thumbs+'"/>',p=arlina_title?'<span class="ptitle">'+r+"</span>":"",g='<a href="'+d+'" target="_blank" title="'+r+'">'+m+p+"</a>";e.push('<div class="gallerytem">',g,"</div>")}e.push("</div>"),document.write(e.join(""))}
//
function loadCSS(e, t, n) { "use strict"; var i = window.document.createElement("link"); var o = t || window.document.getElementsByTagName("script")[0]; i.rel = "stylesheet"; i.href = e; i.media = "only x"; o.parentNode.insertBefore(i, o); setTimeout(function () { i.media = n || "all" }) }
//]]>
