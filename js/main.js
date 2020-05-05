$(document).ready(function(){
    // REFERENCES 
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
        
        if (search !== '') {
        
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            method: 'GET',
            data: {
                api_key: '26864016a30e377316e6a20d4e37109e',
                language: 'it-IT',
                query: search
            },
            success: function(res) {
                var results = res.results;

                if (results.length > 0) {
                    
                    printResults(template, movieResults, results)

                } else {
                    alert('La ricerca non ha prodotto risultati');
                    searchInput.focus().select();
                }
                
            },
            error: function() {
                console.log('Errore chiamata');
            }
        });

        } else {
            alert('Campo di ricerca vuoto, inserisci una parola');
            searchInput.focus();
        }
        
    });

}); //<-- End ready

/* FUNCTIONS */
function printResults(template, container, results) {

    resetResults(container);

    for (var i = 0; i < results.length; i++ ) {
        var vote = results[i].vote_average;

        var context = {
            title: results[i].title,
            originalTitle: results[i].original_title,
            originalLanguage: results[i].original_language,
            voteAverage: rateStars(vote)
        }

        var html = template(context);
        container.append(html);
    }

}

function resetResults(container) {
    container.html('');
}

function rateStars(vote) {
    var rating = Math.ceil( vote / 2 );
    var emptyStars = 5 - rating;
    var starString = '';

    for (var j = 0; j < rating; j++) {
        starString += '<i class="fas fa-star"></i>';
    }
    
    for (var k = 0; k < emptyStars; k++) {
        starString += '<i class="far fa-star"></i>';
    }

    return starString
}