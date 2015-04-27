head.ready(function() {

        var menuBtn     = $('.menu-btn'),
            body        = $('body'),
            pageOverlay = $('.page-overlay'),
            dropdown    = $('.js-dd'),
            searchBtn   = $('.search-btn'),
            settingsBtn = $('.settings-btn');


        $('#switch-view').on('click', function() {
            $('#screen-container').toggleClass('is-switched');
        });

        var menu = {
            visible        :  false,
            element        : $('.menu'),
            container      : body,
            className      : 'is-menu-open',
            show: function() {
                this.visible = true;
                this.element.show();
                this.container.addClass(this.className);
            },
            hide: function() {
                this.container.removeClass(this.className);
                setTimeout(function() {
                    this.element.hide();
                    this.visible = false;
                }.bind(this), 400);
            },
            toggle: function() {
                if ( this.visible ) {
                    this.hide();
                } else {
                    this.show();
                }
            }
        };

        var overlay = {

            visible   : false,
            className : "is-visible",
            element   : pageOverlay,
            show: function() {
                if ( !this.visible ) {
                    this.element.show();
                    setTimeout(function() {
                        this.element.addClass(this.className);
                    }.bind(this), 10);
                    this.visible = true;
                }
            },
            hide: function() {
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
                    this.hide();
                } else {
                    this.show();
                }
            }

        };

        var search = {
            visible   : false,
            className : "is-visible",
            element   : $('.search'),
            show: function() {
                this.visible = true;
                this.element.addClass(this.className);
            },
            hide: function() {
                this.element.removeClass(this.className);
                this.visible = false;
            },
            toggle: function() {
                if ( this.visible ) {
                    this.hide();
                } else {
                    this.show();
                }
            }
        };

        var settings = {
            visible   : false,
            className : "is-visible",
            element   : $('.settings'),
            show: function() {
                this.visible = true;
                this.element.show();
                setTimeout(function() {
                    this.element.addClass(this.className);
                }.bind(this), 10);
            },
            hide: function() {
                this.element.removeClass(this.className);
                setTimeout(function() {
                    this.element.hide();
                    this.visible = false;
                }.bind(this), 350);
            },
            toggle: function() {
                if ( this.visible ) {
                    this.hide();
                } else {
                    this.show();
                }
            }
        };


        menuBtn.on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            menu.toggle();
            overlay.toggle();
            pageOverlay.trigger('menu-open');
        });

        pageOverlay.bind('menu-open', function() {
            pageOverlay.bind('click', function() {
                 menu.hide();
                 overlay.hide();
                 pageOverlay.unbind('click');
            });
        });

        searchBtn.on('click', function(event) {
            event.preventDefault();
            search.toggle();
            overlay.toggle();
            pageOverlay.trigger('search-open');
        });

        pageOverlay.bind('search-open', function() {
            pageOverlay.bind('click', function() {
                 search.hide();
                 overlay.hide();
                 pageOverlay.unbind('click');
            });
        });

        settingsBtn.on('click', function() {
            settings.toggle();
            overlay.toggle();
        });

        // var Dropdown = function(element) {
        //     this.element  = $(this);
        //     this.selected = this.element.find('.js-dd-selected');
        //     this.select   = this.element.find('select');
        // };

        // Dropdown.prototype.setSelected = function() {
        //     var text = this.element.find('select option:selected').text();
        //     if ( selected[0].tagName == 'INPUT' ) {
        //         selected.val(text);
        //         selected.change();
        //     } else {
        //         selected.text(text);
        //     }
        // };

        // Dropdown.prototype.init = function() {
        //     this.setSelected();
        //     this.select.on('change', function() {
        //         this.setSelected();
        //     });
        // };

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