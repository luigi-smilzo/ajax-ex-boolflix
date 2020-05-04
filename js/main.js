$(document).ready(function(){
    // REFERENCES 
    var myApi = 'https://api.themoviedb.org/3/search/movie';
    var myKey = '?api_key=26864016a30e377316e6a20d4e37109e';
    var searchInput = $('#SearchInput');
    var searchBtn = $('#SearchButton');

    // HANDLEBARS
    var source = $('#list-template').html();
    var template = Handlebars.compile(source);

    // EVENTS
    // Search
    searchBtn.click(function() {
        var search = searchInput.val().trim();

        $.ajax({
            url: myApi + myKey,
            method: 'GET',
            data: {
                language: 'it-IT',
                query: search
            },
            success: function(res) {
                console.log(res);
            },
            error: function() {
                console.log('Errore chiamata');
            }
        });
    });










}); //<-- End ready