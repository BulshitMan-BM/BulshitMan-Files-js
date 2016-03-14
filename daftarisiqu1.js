/**
 * TABLE OF CONTENT FOR BLOGGER WITH ACCORDION EFFECT
 * Original: BulshitMan
 * Modified by Dikhen mikhen - http://bulshitman.blogspot.com
 * Reupload by BulshitMan - http://bulshitman.blogspot.com
 */
var postTitle = new Array(),
   postUrl = new Array(),
   postMp3 = new Array(),
   postDate = new Array(),
   postLabels = new Array(),
   postBaru = new Array(),
   sortBy = 'titleasc',
   tocLoaded = false,
   postFilter = '',
   numberfeed = 0;

function loadtoc(_0xd19fxc) {
   function _0xd19fxd() {
      if ('entry' in _0xd19fxc['feed']) {
         var _0xd19fxe = _0xd19fxc['feed']['entry']['length'];
         numberfeed = _0xd19fxe;
         ii = 0;
         for (var _0xd19fxf = 0; _0xd19fxf < _0xd19fxe; _0xd19fxf++) {
            var _0xd19fx10 = _0xd19fxc['feed']['entry'][_0xd19fxf];
            var _0xd19fx11 = _0xd19fx10['title']['$t'];
            var _0xd19fx12 = _0xd19fx10['published']['$t']['substring'](0, 10);
            var _0xd19fx13;
            for (var _0xd19fx14 = 0; _0xd19fx14 < _0xd19fx10['link']['length']; _0xd19fx14++) {
               if (_0xd19fx10['link'][_0xd19fx14]['rel'] == 'alternate') {
                  _0xd19fx13 = _0xd19fx10['link'][_0xd19fx14]['href'];
                  break;
               };
            };
            var _0xd19fx15 = '';
            for (var _0xd19fx14 = 0; _0xd19fx14 < _0xd19fx10['link']['length']; _0xd19fx14++) {
               if (_0xd19fx10['link'][_0xd19fx14]['rel'] == 'enclosure') {
                  _0xd19fx15 = _0xd19fx10['link'][_0xd19fx14]['href'];
                  break;
               };
            };
            var _0xd19fx16 = '';
            if ('category' in _0xd19fx10) {
               for (var _0xd19fx14 = 0; _0xd19fx14 < _0xd19fx10['category']['length']; _0xd19fx14++) {
                  _0xd19fx16 = _0xd19fx10['category'][_0xd19fx14]['term'];
                  var _0xd19fx17 = _0xd19fx16['lastIndexOf'](';');
                  if (_0xd19fx17 != -1) {
                     _0xd19fx16 = _0xd19fx16['substring'](0, _0xd19fx17);
                  };
                  postLabels[ii] = _0xd19fx16;
                  postTitle[ii] = _0xd19fx11;
                  postDate[ii] = _0xd19fx12;
                  postUrl[ii] = _0xd19fx13;
                  postMp3[ii] = _0xd19fx15;
                  if (_0xd19fxf < maxNew) {
                     postBaru[ii] = true;
                  } else {
                     postBaru[ii] = false;
                  };
                  ii = ii + 1;
               };
            };
         };
      };
   };
   _0xd19fxd();
   sortBy = 'titleasc';
   sortPosts(sortBy);
   sortlabel();
   tocLoaded = true;
   displayToc2();
   document['write']('');
};

function sortlabel() {
   sortBy = 'orderlabel';
   sortPosts(sortBy);
   var _0xd19fx19 = 0;
   var _0xd19fxf = 0;
   while (_0xd19fxf < postTitle['length']) {
      temp1 = postLabels[_0xd19fxf];
      firsti = _0xd19fx19;
      do {
         _0xd19fx19 = _0xd19fx19 + 1;
      } while (postLabels[_0xd19fx19] == temp1);;
      _0xd19fxf = _0xd19fx19;
      sortPosts2(firsti, _0xd19fx19);
      if (_0xd19fxf > postTitle['length']) {
         break;
      };
   };
};

function sortPosts(sortBy) {
   function _0xd19fx1b(_0xd19fx1c, _0xd19fx1d) {
      var _0xd19fx1e = postTitle[_0xd19fx1c];
      postTitle[_0xd19fx1c] = postTitle[_0xd19fx1d];
      postTitle[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postDate[_0xd19fx1c];
      postDate[_0xd19fx1c] = postDate[_0xd19fx1d];
      postDate[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postUrl[_0xd19fx1c];
      postUrl[_0xd19fx1c] = postUrl[_0xd19fx1d];
      postUrl[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postLabels[_0xd19fx1c];
      postLabels[_0xd19fx1c] = postLabels[_0xd19fx1d];
      postLabels[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postBaru[_0xd19fx1c];
      postBaru[_0xd19fx1c] = postBaru[_0xd19fx1d];
      postBaru[_0xd19fx1d] = _0xd19fx1e;
   };
   for (var _0xd19fxf = 0; _0xd19fxf < postTitle['length'] - 1; _0xd19fxf++) {
      for (var _0xd19fx19 = _0xd19fxf + 1; _0xd19fx19 < postTitle['length']; _0xd19fx19++) {
         if (sortBy == 'titleasc') {
            if (postTitle[_0xd19fxf] > postTitle[_0xd19fx19]) {
               _0xd19fx1b(_0xd19fxf, _0xd19fx19);
            };
         };
         if (sortBy == 'titledesc') {
            if (postTitle[_0xd19fxf] < postTitle[_0xd19fx19]) {
               _0xd19fx1b(_0xd19fxf, _0xd19fx19);
            };
         };
         if (sortBy == 'dateoldest') {
            if (postDate[_0xd19fxf] > postDate[_0xd19fx19]) {
               _0xd19fx1b(_0xd19fxf, _0xd19fx19);
            };
         };
         if (sortBy == 'datenewest') {
            if (postDate[_0xd19fxf] < postDate[_0xd19fx19]) {
               _0xd19fx1b(_0xd19fxf, _0xd19fx19);
            };
         };
         if (sortBy == 'orderlabel') {
            if (postLabels[_0xd19fxf] > postLabels[_0xd19fx19]) {
               _0xd19fx1b(_0xd19fxf, _0xd19fx19);
            };
         };
      };
   };
};

function sortPosts2(_0xd19fx20, _0xd19fx21) {
   function _0xd19fx22(_0xd19fx1c, _0xd19fx1d) {
      var _0xd19fx1e = postTitle[_0xd19fx1c];
      postTitle[_0xd19fx1c] = postTitle[_0xd19fx1d];
      postTitle[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postDate[_0xd19fx1c];
      postDate[_0xd19fx1c] = postDate[_0xd19fx1d];
      postDate[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postUrl[_0xd19fx1c];
      postUrl[_0xd19fx1c] = postUrl[_0xd19fx1d];
      postUrl[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postLabels[_0xd19fx1c];
      postLabels[_0xd19fx1c] = postLabels[_0xd19fx1d];
      postLabels[_0xd19fx1d] = _0xd19fx1e;
      var _0xd19fx1e = postBaru[_0xd19fx1c];
      postBaru[_0xd19fx1c] = postBaru[_0xd19fx1d];
      postBaru[_0xd19fx1d] = _0xd19fx1e;
   };
   for (var _0xd19fxf = _0xd19fx20; _0xd19fxf < _0xd19fx21 - 1; _0xd19fxf++) {
      for (var _0xd19fx19 = _0xd19fxf + 1; _0xd19fx19 < _0xd19fx21; _0xd19fx19++) {
         if (postTitle[_0xd19fxf] > postTitle[_0xd19fx19]) {
            _0xd19fx22(_0xd19fxf, _0xd19fx19);
         };
      };
   };
};

function displayToc2() {
   var _0xd19fx19 = 0;
   var _0xd19fxf = 0;
   document['write']('<div id="daftar-isi">');
   while (_0xd19fxf < postTitle['length']) {
      temp1 = postLabels[_0xd19fxf];
      document['write']('<div class="sublabel">');
      document['write']('<div class="judul-label">' + temp1 + '</div>');
      document['write']('<div class="judul-list"><ol>');
      firsti = _0xd19fx19;
      var _0xd19fx24 = 'odd';
      do {
         if (_0xd19fx24 == 'odd') {
            document['write']('<li class="data-list list-ganjil">');
            _0xd19fx24 = 'even';
         } else {
            document['write']('<li class="data-list list-genap">');
            _0xd19fx24 = 'odd';
         };
         if (openNewTab) {
            document['write']('<a href="' + postUrl[_0xd19fx19] + '" target="_blank">' + postTitle[_0xd19fx19] + '</a>');
         } else {
            document['write']('<a href="' + postUrl[_0xd19fx19] + '">' + postTitle[_0xd19fx19] + '</a>');
         };
         if (showNew) {
            if (postBaru[_0xd19fx19] == true) {
               document['write'](' - <strong>' + baru + '</strong>');
            };
         };
         document['write']('</li>');
         _0xd19fx19 = _0xd19fx19 + 1;
      } while (postLabels[_0xd19fx19] == temp1);;
      _0xd19fxf = _0xd19fx19;
      document['write']('</ol></div></div>');
      sortPosts2(firsti, _0xd19fx19);
      if (_0xd19fxf > postTitle['length']) {
         break;
      };
   };
   
};
$(function () {
   if (accToc) {
      $('#daftar-isi .judul-list')['slideUp']();
      $('#daftar-isi .judul-label:first')['addClass']('headactive')['next']()['slideDown'](sDownSpeed);
      $('#daftar-isi .judul-label')['css']('cursor', 'pointer');
      $('#daftar-isi .judul-label')['click'](function () {
         if ($(this)['next']()['is'](':hidden')) {
            $('#daftar-isi .judul-label')['removeClass']('headactive')['next']()['slideUp'](sUpSpeed);
            $(this)['toggleClass']('headactive')['next']()['slideDown'](sDownSpeed);
         };
      });
   };
});
