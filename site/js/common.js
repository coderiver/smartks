head.ready(function() {

        $('#switch-view').on('click', function() {
            $('#screen-container').toggleClass('is-switched');
        });

        $('.menu-btn').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $('body').addClass('is-menu-open');
            overlay.show();
            $('.out').triggerHandler('menu-open');
        });

        $('.out').bind('menu-open', function(event) {
            $(this).bind('click', function() {
                 $('body').removeClass('is-menu-open');
                 overlay.hide();
                 $(this).unbind('click');
            });
        });

        if ($('.js-dd').length) {
            $('.js-dd').each(function() {
                var drop     = $(this),
                    selected = drop.find('.js-dd-selected');
                    select   = drop.find('select');

                function setSelected() {
                    var text = drop.find('select option:selected').text();
                    if ( selected[0].tagName == 'INPUT' ) {
                        selected.val(text);
                        selected.change();
                    } else {
                        selected.text(text);
                    }
                }

                setSelected();

                select.on('change', function() {
                    setSelected();
                });
            });
        }

        var overlay = {

            isVisible :  false,
            className : "is-visible",
            element   : $('.page-overlay'),
            show: function() {
                if ( !this.isVisible ) {
                    this.element.addClass(this.className);
                    this.isVisible = true;
                }
            },
            hide: function() {
                if ( this.isVisible ) {
                    this.element.removeClass(this.className);
                    this.isVisible = false;
                }
            },
            toggle: function() {
                if ( this.isVisible ) {
                    this.hide();
                } else {
                    this.show();
                }
            }

        };

        $('.header .search-btn').on('click', function(event) {
            event.preventDefault();
            $('.header .search').toggleClass('is-visible');
            overlay.toggle();
        });

        //accordion
        (function() {

            var accordion = $('.accordion');

            if ( accordion.length ) {

                var itemSelector    = '.accordion__item',
                    btnSelector     = '.accordion__title',
                    contentSelector = '.accordion__content',
                    activeClass     = 'is-active';

                accordion.each(function() {
                    var el       = $(this),
                        btn      = el.find(btnSelector),
                        items    = el.find(itemSelector),
                        contents = el.find(contentSelector);

                    btn.on('click', function(event) {
                        event.preventDefault();

                        var currentBtn = $(this),
                            item       = currentBtn.parent(itemSelector),
                            content    = currentBtn.siblings(contentSelector);

                        if ( item.hasClass(activeClass) ) {
                            item.removeClass(activeClass);
                            content.slideUp(200);
                        } else {
                            items.removeClass(activeClass);
                            contents.slideUp(200);
                            item.addClass(activeClass);
                            content.slideDown(200);
                        }
                    });
                });
            }

        })();
});