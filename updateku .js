    <b:if cond='data:post.numComments != 0'>
      var Items = <data:post.commentJso/>;
        var Msgs = <data:post.commentMsgs/>;
            var Config = <data:post.commentConfig/>;
                <b:else/>
                  var Items = {
                  };
    var Msgs = {
    };
    var Config = {
      &#39;
      maxThreadDepth&#39;
      :&#39;
      0&#39;
    };

  </b:if>
    //<![CDATA[
Config.maxThreadDepth = 2; 
var Cur_Cform_Hdr='.comment_form';var Cur_Cform_Url=$('#comment-editor').attr('src');function trim(a){var b=' \n\r\t\f\x5b\x5d\x7c\x7d\x3c\x3e\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';for(var i=0;i<a.length;i++){if(b.indexOf(a.charAt(i))!=-1){a=a.substring(0,i);break}}return a}$('.comment_wrap .comment_body p').html(function(i,h){temp=h.toLowerCase();index=temp.indexOf('@<a href="#c');if(index!=-1){index_tail=temp.indexOf('</a>',index);if(index_tail!=-1){h=h.substring(0,index)+h.substring(index_tail+4)}}return h});function Valid_Par_Id(a){r=a.indexOf('c');if(r!=-1)a=a.substring(r+1);return a}function Cform_Ins_ParID(a){a='&parentID='+a+'#%7B';n_cform_url=Cur_Cform_Url.replace(/#%7B/,a);return n_cform_url}function Reset_Comment_Form(){html=$(Cur_Cform_Hdr).html();$(Cur_Cform_Hdr).html('');Cur_Cform_Hdr='.comment_form';$(Cur_Cform_Hdr).html(html);$('#comment-editor').attr('src',Cur_Cform_Url)}function Display_Reply_Form(e){par_id=$(e).attr('id');par_id=Valid_Par_Id(par_id);html=$(Cur_Cform_Hdr).html();if(Cur_Cform_Hdr=='.comment_form'){reset_html='<a href="#origin_cform" onclick="Reset_Comment_Form()">'+Msgs.addComment+'</a><a name="origin_cform"/>';$(Cur_Cform_Hdr).html(reset_html)}else{$(Cur_Cform_Hdr).html('')}Cur_Cform_Hdr='#r_f_c'+par_id;$(Cur_Cform_Hdr).html(html);$('#comment-editor').attr('src',Cform_Ins_ParID(par_id))}cur_url=window.location.href;search_formid='#comment-form_';search_index=cur_url.indexOf(search_formid);if(search_index!=-1){ret_id=cur_url.substring(search_index+search_formid.length);Display_Reply_Form('#rc'+ret_id)}for(var i=0;i<Items.length;i++){if('parentId'in Items[i]){var par_id=Items[i].parentId;var par_level=parseInt($('#c'+par_id+':first').attr('data-level'));$('#c'+par_id+' .comment_child:first').html(function(a,b){var c=Items[i].id;if(par_level>=Config.maxThreadDepth){$('#c'+c+':first .comment_reply').remove()}var d=$('#c'+c+':first').html();d='<div class="comment_wrap" id="c'+c+'" data-level="'+(par_level+1)+'">'+d+'</div>';$('#c'+c).remove();return(b+d)})}}var avatar=$("#comments");avatar.find('.comment_avatar img').each(function(){var a=$(this).attr('src');$(this).show().attr('src',a.replace(/\/s[0-9]+(\-c)?\//,"/s55-c/"))});
//]]>
