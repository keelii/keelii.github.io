/**
 * Name: Auto generate nested TOC for octopress
 * Author: keelii
 */
(function($) {
    function TOC(selectors, foldChars) {
        this.selectors = selectors;
        this.foldChars = foldChars;
    }

    TOC.prototype = {
        constructor: TOC,
        init: function () {
            this.$content = $('#content');
            this.$headdings = this.$content.find(this.selectors);

            var $defaultSidebar = $('.default-post-sidebar');

            this.enabled = true;

            // if has headdings only show toc
            // else just show normal sidebar(default is hide on post page)
            if (this.$headdings.length < 2) {
                $defaultSidebar.show();
            } else {
                this.buildTOC();
                this.bindEvent();
            }
        },
        handleScroll: function () {
            var sWidth = $('.sidebar').width();
            var sTop = $('html').scrollTop() || $('body').scrollTop();

            if (sTop > this.oTop && this.enabled) {
                this.$toc.addClass('toc-fixed').css('width', sWidth);
            } else {
                this.$toc.removeClass('toc-fixed').css('width', '100%');
            }
        },
        handleFold: function (e) {
            var $this = $(e.target);
            var $item = $this.parent();
            var $childs = $item.children('ol,ul');
            var isUnFold = $item.attr('data-fold') === "false";
            if (isUnFold) {
                $childs.hide();
                $this.html(foldChar[1]);
                $item.attr('data-fold', 'true');
            } else {
                $childs.show();
                $this.html(foldChar[0]);
                $item.attr('data-fold', 'false');
            }
        },
        handleSideShow: function () {
            this.enabled = !$('body').hasClass('collapse-sidebar');
        },
        bindEvent: function () {
            var foldChar = this.foldChars;
            // Bind some event
            this.$toc = $('#side-toc')
            this.oTop = this.$toc.offset().top;

            $('body').bind('onSideShow', $.proxy(this.handleSideShow, this))

            $(window).bind('scroll.checkToc resize.checkToc', $.proxy(this.handleScroll, this));
            // fold
            this.$toc.delegate('.fold-toc', 'click', $.proxy(this.handleFold, this));
        },
        buildTOC: function () {
            var foldChar = this.foldChars;
            var results = this.collectHeaddings();
            var data = this.listToTree(results);
            var html = genHTML(data);

            function genHTML(data) {
                var list = [];
                for (var i = 0, l = data.length; i < l; i++) {
                    var curr = data[i];

                    if (curr.children.length) {
                        list.push('<li data-fold="false" class="level-' + curr.level + '"><a href="#' + curr.id + '">' + curr.text + '</a><span class="fold-toc">' + foldChar[0] + '</span>');
                        list.push('<ol>' + genHTML(curr.children) + '</ol></li>');
                    } else {
                        list.push('<li data-fold="true" class="level-' + curr.level + '"><a  href="#' + curr.id + '">' + curr.text + '</a></li>');
                    }
                }
                return list.join('');
            }

            this.render(html);
        },
        render: function (html) {
            var template = '\
            <section id="side-toc" class="side-toc odd">\
                <h1>Table of contents</h1>\
                <ol>{items}</ol>\
            </section>';

            $('.sidebar').append(template.replace('{items}', html));
        },
        collectHeaddings: function () {
            // Get headding items
            var $content = this.$content;
            var $headdings = this.$headdings;
            var results = [];
            var count = 0;

            $headdings.each(function(index) { this.id = 'TOC-' + index; });
            $headdings.each(function(index) {
                var text = $(this).text();
                var tagName = this.nodeName.toLowerCase();
                var level = parseInt(tagName.replace(/h/g, ''));

                function getLevel($ele) {
                    return parseInt($ele[0].tagName.charAt(1));
                }
                function getParentId($el, idx) {
                    for (var i = idx; i >= 0; i--) {
                        var curr = idx[i];

                        if (getLevel($headdings.eq(i)) < getLevel($el)) {
                            return $headdings.eq(i).attr('id');
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

            return results;
        },
        listToTree: function (data) {
            data = data || [];

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
    };

    var toc = new TOC('h2,h3,h4,h5,h6', ['▼', '▲']);
    toc.init();

})(jQuery);

// Share to weibo
function shareToWeibo() {
    var url = 'http://service.weibo.com/share/share.php?';
    var param = {
        appkey: 1928961218,
        url: location.href,
        title: document.title + ' @keelii',
        source: 'Something',
        sourceUrl: location.protocol + '//' + location.hostname,
        content: 'utf8',
        searchPic: true
    };
    var $firstImage = $('#content img').eq(0);
    if ( $firstImage.length ) {
        param.pic = $firstImage.attr('src');
    }
    var shareUrl = url + $.param(param);
    window.open(shareUrl);
}