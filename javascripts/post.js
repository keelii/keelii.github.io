/**
 * Name: Auto generate nested TOC for octopress
 * Author: keelii
 */
(function($) {
    // Get headding items
    var $content = $('#content');
    var headdings = $content.find('h2,h3,h4,h5,h6')
    var results = [];
    var count = 0;

    headdings.each(function(index) {
        this.id = 'TOC-' + index;
    });
    headdings.each(function(index) {
        var text = $(this).text();
        var tagName = this.nodeName.toLowerCase();
        var level = parseInt(tagName.replace(/h/g, ''));

        function getLevel($ele) {
            return parseInt($ele[0].tagName.charAt(1));
        }
        function getParentId($el, idx) {
            for (var i = idx; i >= 0; i--) {
                var curr = idx[i];

                if (getLevel(headdings.eq(i)) < getLevel($el)) {
                    return headdings.eq(i).attr('id');
                }
            }

            return 0;
        }

        if (text) {
            var node = {
                id: this.id,
                text: text,
                level: level,
                parent: 0
            };

            var pid = getParentId($(this), index);
            if (pid) {
                node.parent = pid
            }
            results.push(node)
            count++;
        }

    });

    function listToTree(data) {
        var ID_KEY = 'id';
        var PARENT_KEY = 'parent';
        var CHILDREN_KEY = 'children';

        var tree = [];
        var childrenOf = {};
        var item, id, parentId;

        for (var i = 0, length = data.length; i < length; i++) {
            item = data[i];
            id = item[ID_KEY];
            parentId = item[PARENT_KEY] || 0;
            // every item may have children
            childrenOf[id] = childrenOf[id] || [];
            // init its children
            item[CHILDREN_KEY] = childrenOf[id];

            if (parentId != 0) {
                // init its parent's children object
                childrenOf[parentId] = childrenOf[parentId] || [];
                // push it into its parent's children object
                childrenOf[parentId].push(item);
            } else {
                tree.push(item);
            }
        };

        return tree;
    }

    var res = listToTree(results);
    var foldChar = ['▼', '▲'];

    function buildTOC(data) {
        var list = [];
        for (var i = 0, l = data.length; i < l; i++) {
            var curr = data[i];

            if (curr.children.length) {
                list.push('<li data-fold="false" class="level-'+ curr.level +'"><a href="#'+ curr.id +'">'+ curr.text +'</a><span class="fold-toc">'+ foldChar[0] +'</span>');
                list.push('<ol>'+ buildTOC(curr.children) +'</ol></li>');
            } else {
                list.push('<li data-fold="true" class="level-'+ curr.level +'"><a  href="#'+ curr.id +'">'+ curr.text +'</a></li>');
            }
        }
        return list.join('');
    }

    var template = '\
    <section id="side-toc" class="side-toc odd">\
        <h1>Table of contents</h1>\
        <ol>{items}</ol>\
    </section>';

    var s = buildTOC(res);
    var $target = $('.sidebar');
    $target.append(template.replace('{items}', s));


    // Bind some event
    var $toc = $('#side-toc')
    var oTop = $toc.offset().top;

    $(window).bind('scroll.checkToc resize.checkToc', function() {
        var sWidth = $('.sidebar').width();
        var sTop = $('html').scrollTop() || $('body').scrollTop();

        if (sTop > oTop) {
            $toc.addClass('toc-fixed').css('width', sWidth);
        } else {
            $toc.removeClass('toc-fixed').css('width', 'auto');
        }
    });

    // fold
    $toc.delegate('.fold-toc', 'click', function() {
        var $item = $(this).parent();
        var $childs = $item.children('ol,ul');
        var isUnFold = $item.attr('data-fold') === "false";
        if (isUnFold) {
            $childs.hide();
            $(this).html(foldChar[1]);
            $item.attr('data-fold', 'true');
        } else {
            $childs.show();
            $(this).html(foldChar[0]);
            $item.attr('data-fold', 'false');
        }
    });
})(jQuery);
