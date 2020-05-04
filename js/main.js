$(document).ready(function(){
    // REFERENCES 
    var myApi = 'https://api.themoviedb.org/3/search/movie';
    var myKey = '?api_key=26864016a30e377316e6a20d4e37109e';
    var searchInput = $('#SearchInput');
    var searchBtn = $('#SearchButton');
    var movieResults = $('.Results');

    // HANDLEBARS INIT
    var source = $('#list-template').html();
    var template = Handlebars.compile(source);

    // EVENTS
    // Search
    searchBtn.click(function() {
        var search = searchInput.val().trim();
        
        // reset
        searchInput.val('');
        movieResults.html('');
        
        $.ajax({
            url: myApi + myKey,
            method: 'GET',
            data: {
                language: 'it-IT',
                query: search
            },
            success: function(res) {
                var results = res.results;
                
                for (var i = 0; i < results.length; i++ ) {

                    var context = {
                        title: results[i].title,
                        originalTitle: results[i].original_title,
                        originalLanguage: results[i].original_language,
                        voteAverage: results[i].vote_average
                    }

                    var html = template(context);
                    movieResults.append(html);

                }
            },
            error: function() {
                console.log('Errore chiamata');
            }
        });
    });

}); //<-- End ready