//<![CDATA[
function getCurrentYear(){var e=new Date;return e.getFullYear()}el=document.getElementById(&quot;current-year&quot;),el.innerHTML=getCurrentYear();
// Back to top
jQuery(document).ready(function(e){var t=e(&quot;#backtotop&quot;);e(window).scroll(function(){e(this).scrollTop()&gt;=800?t.show(10).animate({opacity:&quot;1&quot;},10):t.animate({opacity:&quot;0&quot;},10)});t.click(function(t){t.preventDefault();e(&quot;html,body&quot;).animate({scrollTop:0},400)})})
// Menu Top
$(document).ready(function(){var str=location.href.toLowerCase();$('.top-menulite ul li a').each(function(){if(str.indexOf(this.href.toLowerCase())>-1){$("li.highlight").removeClass("highlight");$(this).parent().addClass("highlight")}})})
$(function(){var pull=$('#pull');menu=$('.top-menulite ul');menuHeight=menu.height();$(pull).on('click',function(e){e.preventDefault();menu.slideToggle()});$(window).resize(function(){var w=$(window).width();if(w>320&&menu.is(':hidden')){menu.removeAttr('style')}})});
// Main Menu
var ww=document.body.clientWidth;$(document).ready(function(){$(".nav li a").each(function(){if($(this).next().length>0){$(this).addClass("parent")}});$(".slide-menu").click(function(e){e.preventDefault();$(this).toggleClass("active");$(".nav").toggle()});adjustMenu()});$(window).bind("resize orientationchange",function(){ww=document.body.clientWidth;adjustMenu()});var adjustMenu=function(){if(ww<768){$(".slide-menu").css("display","inline-block");if(!$(".slide-menu").hasClass("active")){$(".nav").hide()}else{$(".nav").show()}$(".nav li").unbind("mouseenter mouseleave");$(".nav li a.parent").unbind("click").bind("click",function(e){e.preventDefault();$(this).parent("li").toggleClass("hover")})}else if(ww>=768){$(".slide-menu").css("display","none");$(".nav").show();$(".nav li").removeClass("hover");$(".nav li a").unbind("click");$(".nav li").unbind("mouseenter mouseleave").bind("mouseenter mouseleave",function(){$(this).toggleClass("hover")})}}
//]]>
