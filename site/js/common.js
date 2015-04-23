head.ready(function() {

        $('#switch-view').on('click', function() {
            $('#screen-container').toggleClass('is-switched');
        });

        $('.menu-btn').on('click', function() {
            $('body').toggleClass('is-menu-open');
        });

        if ($('.js-dd').length) {
            $('.js-dd').each(function() {
                var drop     = $(this),
                    selected = drop.find('.js-dd-selected');
                    select   = drop.find('select');

                function setSelected() {
                    var text = drop.find('select option:selected').text();
                    if ( selected[0].tagName == 'INPUT' ) {
                        // text = select.val();
                        selected.val(text);
                        selected.change();
                    } else {
                        // text = drop.find('select option:selected').text();
                        selected.text(text);
                    }
                }

                setSelected();

                select.on('change', function() {
                    setSelected();
                });
            });
        }
});