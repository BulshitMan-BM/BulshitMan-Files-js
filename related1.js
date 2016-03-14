  <div id='related-posts'>
    <b:loop values='data:post.labels' var='label'>
    <b:if cond='data:label.isLast != &quot;true&quot;'>
    </b:if>
    <b:if cond='data:blog.pageType == &quot;item&quot;'>
    <script expr:src='&quot;/feeds/posts/default/-/&quot; + data:label.name + &quot;?alt=json-in-script&amp;callback=related_results_labels_thumbs&amp;max-results=999&quot;' type='text/javascript'/></b:if></b:loop>
    <script type='text/javascript'>
    var currentposturl=&quot;<data:post.url/>&quot;;
    var maxresults=3;
    var relatedpoststitle=&quot;Related Posts :&quot;;
    removeRelatedDuplicates_thumbs();
    printRelatedLabels_thumbs();
