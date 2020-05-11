// hotkeys
(function() {
  $(document).bind('keypress.hotkey', function(event) {
      var sTop = $('body,html').scrollTop();

      switch (event.which) {
          // [/]
          case 47:
              $('body,html').scrollTop(0);
              setTimeout(function() {
                $('.search').focus();
              }, 10);
              break;
          // [t]
          case 116:
              $('body,html').scrollTop(0);
              break;
          // vim like key
          // [G]
          case 71:
              $('body,html').scrollTop(1000000);
              break;
          // [h]
          case 104:
              var $left = $('.basic-alignment.left');
              if ($left.length) {
                  location.href = $left.find('a').attr('href');
              }
              break;
          // [l]
          case 108:
              var $right = $('.basic-alignment.right');
              if ($right.length) {
                  location.href = $right.find('a').attr('href');
              }
              break;
          // [j]
          case 106:
              $('body,html').scrollTop(sTop + 300);
              break;
          // [k]
          case 107:
              $('body,html').scrollTop(sTop - 300);
              break;
          default:
      }
  });
})();