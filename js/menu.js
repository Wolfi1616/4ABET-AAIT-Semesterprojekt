    //NAV-MENU (& TOGGLE SECTIONS)
    $('section').css('display', 'none');
    $('section').first().css('display', 'block');

    var text = $('ul').html();
    $('section > h2').each(function () {
        text += '<li>' + $(this).text() + '</li>';
    });
    $('ul').html(text);


    $('nav li').on('click', function() {

        var text = $(this).text();
        var section;
        $('h2').each(function() {
            section = $(this).parent();
            if( $(this).text() == text) {
                section.css('display', 'block' );
            } else {
                section.css('display', 'none');
            }
        })
    });