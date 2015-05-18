head.ready(function() {

        var menuBtn     = $('.menu-btn'),
            body        = $('body'),
            pageOverlay = $('.page-overlay'),
            dropdown    = $('.js-dd'),
            searchBtn   = $('.search-btn'),
            settingsBtn = $('.settings-btn'),
            amount      = $('.js-amount');


        $('#switch-view').on('click', function() {
            $('#screen-container').toggleClass('is-switched');
        });

        var menu = {
            visible        : false,
            element        : $('.menu'),
            container      : body,
            className      : 'is-menu-open',
            open: function() {
                this.visible = true;
                this.element.show();
                this.container.addClass(this.className);
            },
            close: function() {
                this.container.removeClass(this.className);
                setTimeout(function() {
                    this.element.hide();
                    this.visible = false;
                }.bind(this), 400);
            },
            toggle: function() {
                if ( this.visible ) {
                    this.close();
                } else {
                    this.open();
                }
            }
        };

        var overlay = {

            visible   : false,
            className : "is-visible",
            element   : pageOverlay,
            open: function() {
                if ( !this.visible ) {
                    this.element.show();
                    setTimeout(function() {
                        this.element.addClass(this.className);
                    }.bind(this), 10);
                    this.visible = true;
                }
            },
            close: function() {
                if ( this.visible ) {
                    this.element.removeClass(this.className);
                    setTimeout(function() {
                        this.element.hide();
                        this.visible = false;
                    }.bind(this), 350);
                }
            },
            toggle: function() {
                if ( this.visible ) {
                    this.close();
                } else {
                    this.open();
                }
            }

        };

        var search = {
            visible   : false,
            className : "is-visible",
            element   : $('.search'),
            open: function() {
                this.visible = true;
                this.element.addClass(this.className);
            },
            close: function() {
                this.element.removeClass(this.className);
                this.visible = false;
            },
            toggle: function() {
                if ( this.visible ) {
                    this.close();
                } else {
                    this.open();
                }
            }
        };

        var settings = {
            visible : false,
            className : 'is-visible',
            showMoreClass: 'is-show-more',
            element : $('.settings'),
            button : $('.settings-btn'),
            init: function() {
                var _ = this,
                    link = this.element.find('.settings__list a'),
                    backButton = this.element.find('.breadcrumbs__link');
                    settingsItems = this.element.find('.js-settings-items').children();

                settingsItems.hide();

                link.on('click', function(event) {
                    event.preventDefault();
                    var targetSettingsItem = $(this).attr('href');
                    $(targetSettingsItem).show();
                    _.showMore();
                });
                _.button.on('click', function(event) {
                    event.preventDefault();
                    _.toggle();
                    overlay.toggle();
                    settingsItems.hide();
                    _.hideMore();
                });
                backButton.on('click', function(event) {
                    event.preventDefault();
                    setTimeout(function() {
                        settingsItems.hide();
                    }, 400);
                    _.hideMore();
                });

            },
            open: function() {
                this.visible = true;
                this.element.show();
                setTimeout(function() {
                    this.element.addClass(this.className);
                }.bind(this), 10);
            },
            close: function() {
                this.element.removeClass(this.className);
                setTimeout(function() {
                    this.element.hide();
                    this.visible = false;
                }.bind(this), 350);
            },
            toggle: function() {
                if ( this.visible ) {
                    this.close();
                } else {
                    this.open();
                }
            },
            showMore: function(settingsItem) {
                this.element.addClass(this.showMoreClass);
            },
            hideMore: function(settingsItem) {
                this.element.removeClass(this.showMoreClass);
            }
        };

        if ( $('.settings').length ) {
            settings.init();
            // settingsBtn.on('click', function() {
            //     settings.toggle();
            //     overlay.toggle();
            // });
        }


        menuBtn.on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            menu.toggle();
            if ( search.visible ) {
                search.close();
                overlay.open();
            } else if ( settings.visible ) {
                settings.close();
                overlay.open();
            } else {
                overlay.toggle();
            }
        });

        searchBtn.on('click', function(event) {
            event.preventDefault();
            search.toggle();
            overlay.toggle();
        });

        pageOverlay.bind('click', function() {
            if ( menu.visible ) menu.close();
            if ( search.visible ) search.close();
            if ( settings.visible ) settings.close();
            overlay.close();
        });

        if ( dropdown.length ) {
            dropdown.each(function() {
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

        //accordion
        (function() {

            var accordion = $('.accordion');

            if ( accordion.length ) {

                var itemSelector    = '.accordion__item',
                    btnSelector     = '.accordion__head',
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

        if ( amount.length ) {
            amount.each(function() {
                var el = $(this),
                    input = el.find('.amount__value'),
                    plus  = el.find('.amount__plus'),
                    minus  = el.find('.amount__minus');

                plus.on('click', function(event) {
                    event.preventDefault();
                    value = input.val();
                    if ( value >= 130 ) return;
                    input.val(++value);
                });

                minus.on('click', function(event) {
                    event.preventDefault();
                    value = input.val();
                    if ( value <= 1 ) return;
                    input.val(--value);
                });
            });
        }

        $('.js-popup').on('click', function(event) {
            event.preventDefault();
            var target = $(this).data('popup');
            $('#' + target).fadeIn(300);
        });

        $('.js-popup-close').on('click', function(event) {
            event.preventDefault();
            $(this).parents('.popup').fadeOut(300);
        });


});