function getNav() {
  var mainNav = $('ul.main-navigation, ul[role=main-navigation]').before('<fieldset class="mobile-nav">')
  var mobileNav = $('fieldset.mobile-nav').append('<select>');
  mobileNav.find('select').append('<option value="">Navigate&hellip;</option>');
  var addOption = function(i, option) {
    mobileNav.find('select').append('<option value="' + this.href + '">&raquo; ' + $(this).text() + '</option>');
  }
  mainNav.find('a').each(addOption);
  $('ul.subscription a').each(addOption);
  mobileNav.find('select').bind('change', function(event) {
    if (event.target.value) { window.location.href = event.target.value; }
  });
}

function addSidebarToggler() {
  if(!$('body').hasClass('sidebar-footer')) {
    $('#content').append('<span class="toggle-sidebar"></span>');
    $('.toggle-sidebar').bind('click', function(e) {
      e.preventDefault();
      $('body').toggleClass('collapse-sidebar');
      $('body').trigger('onSideShow');
    });
  }
  var sections = $('aside.sidebar > section');
  if (sections.length > 1) {
    sections.each(function(index, section){
      if ((sections.length >= 3) && index % 3 === 0) {
        $(section).addClass("first");
      }
      var count = ((index +1) % 2) ? "odd" : "even";
      $(section).addClass(count);
    });
  }
  if (sections.length >= 3){ $('aside.sidebar').addClass('thirds'); }
}

function testFeatures() {
  var features = ['maskImage'];
  $(features).map(function(i, feature) {
    if (Modernizr.testAllProps(feature)) {
      $('html').addClass(feature);
    } else {
      $('html').addClass('no-'+feature);
    }
  });
  if ("placeholder" in document.createElement("input")) {
    $('html').addClass('placeholder');
  } else {
    $('html').addClass('no-placeholder');
  }
}

$('document').ready(function() {
  testFeatures();
  getNav();
  addSidebarToggler();
});

// iOS scaling bug fix
// Rewritten version
// By @mathias, @cheeaun and @jdalton
// Source url: https://gist.github.com/901295
(function(doc) {
  var addEvent = 'addEventListener',
      type = 'gesturestart',
      qsa = 'querySelectorAll',
      scales = [1, 1],
      meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
  function fix() {
    meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
    doc.removeEventListener(type, fix, true);
  }
  if ((meta = meta[meta.length - 1]) && addEvent in doc) {
    fix();
    scales = [0.25, 1.6];
    doc[addEvent](type, fix, true);
  }
}(document));

// hotkeys
(function() {
  $(document).bind('keypress.hotkey', function(event) {
      var sTop = $('body').scrollTop();

      switch (event.which) {
          // [s]
          case 115:
              setTimeout(function() {
                $('.search').focus();
              }, 10);
              break;
          // [t]
          case 116:
              $('body').animate({ scrollTop: 0 }, 300);
              break;
          // vim like key
          // [G]
          case 71:
              $('body').animate({ scrollTop: 1000000 }, 100);
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
              $('body').animate({ scrollTop: sTop + 300 }, 100);
              break;
          // [k]
          case 107:
              $('body').animate({ scrollTop: sTop - 300 }, 100);
              break;
          default:
      }
  });
})();
