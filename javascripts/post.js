(function(win, doc) {
    var $toc = $('#side-toc')

    function detectFix() {
        var oTop = $toc.offset().top;

        return function() {
            var sWidth = $('.sidebar').width();
            var sTop = $('html').scrollTop() || $('body').scrollTop();
            var enabled = !$('body').hasClass('collapse-sidebar');

            if (sTop > oTop && enabled) {
                $toc.addClass('toc-fixed').css('width', sWidth);
            } else {
                $toc.removeClass('toc-fixed').css('width', '100%');
            }
        }
    }
    function fixTOC() {
        if (!$toc.length) { return false; }

        var handler = detectFix();

        handler();

        $(window).bind('scroll.checkToc resize.checkToc', handler);
        $(document).delegate('.toggle-sidebar', 'click', handler);
    }

    function initTOCFold() {
        var $toc = $('#side-toc');
        var $items = $toc.find('nav>ul>li>ul li')
        var FOLD_ARR = ['▼', '▲'];

        $items.each(function() {
            if ($(this).find('ul').length) {
                $(this).append('<span data-open="1" class="fold-toc">'+ FOLD_ARR[0] +'</span>')
            }
        });

        function handleFold() {
            var $ul = $(this).parent().children('ul');
            var isOpen = $(this).data('open');

            if (isOpen) {
                $(this).text(FOLD_ARR[1]);
                $ul.hide();
                $(this).data('open', 0);
            } else {
                $(this).text(FOLD_ARR[0]);
                $ul.show();
                $(this).data('open', 1);
            }
        }

        $toc.delegate('.fold-toc', 'click', handleFold);
    }

    function init() {
        fixTOC();
        initTOCFold();
    }

    $(init);
})(window, document);