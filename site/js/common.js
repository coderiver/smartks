head.ready(function() {

    console.log('Hello from the Hell');

    $('#switch-view').on('click', function() {
        $('#screen-container').toggleClass('is-switched');
    });

    $('.menu-btn').on('click', function() {
        $('body').toggleClass('is-menu-open');
    });

});