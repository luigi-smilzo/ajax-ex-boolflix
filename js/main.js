$(document).ready(function(){
    // REFERENCES 
    var searchInput = $('#SearchInput');
    var searchBtn = $('#SearchButton');
    var movieResults = $('.Results');
    var apiQueryObj = {
        url: 'https://api.themoviedb.org/3/search/',
        api_key: '26864016a30e377316e6a20d4e37109e',
        language: 'it-IT',
    }

    // HANDLEBARS INIT
    var source = $('#list-template').html();
    var template = Handlebars.compile(source);

    // EVENTS
    // Search
    searchBtn.click(function() {
        var search = searchInput.val().trim();
        resetResults(movieResults);

        if (search !== '') {
        
            apiRequest(apiQueryObj, 'movie', search, template, movieResults);
            apiRequest(apiQueryObj, 'tv', search, template, movieResults);

        } else {
            alert('Campo di ricerca vuoto, inserisci una parola');
            search.focus();
        }
        
    });

}); //<-- End ready

/* FUNCTIONS */
function printResults(template, container, results, type) {

    for (var i = 0; i < results.length; i++ ) {
        var title, originalTitle;

        if (type == 'Film') {
            title = results[i].title;
            originalTitle = results[i].original_title; 
        } else if (type == 'tv') {
            title = results[i].name;
            originalTitle = results[i].original_name;
        }

        var context = {
            title: title,
            originalTitle: originalTitle,
            originalLanguage: languageFlag(results[i].original_language),
            voteAverage: rateStars(results[i].vote_average),
            type: type
        }

        var html = template(context);
        container.append(html);
    }

}

function resetResults(container) {
    container.html('');
}

function languageFlag(langCode) {
    if (langCode != 'it' && langCode != 'en') {
        return langCode
    } else {
        return '<img src="img/' + langCode + '.svg" style="width:20px;">'
    }
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

function apiRequest(object, filmOrTv, search, template, container) {
    $.ajax({
        url: object.url + filmOrTv,
        method: 'GET',
        data: {
            api_key: object.api_key,
            language: object.language,
            query: search
        },
        success: function(res) {
            var results = res.results;

            if (results.length > 0) {
                
                printResults(template, container, results, filmOrTv)

            } else {
                console.log('No', filmOrTv, 'found');
            }
            
        },
        error: function() {
            console.log('Errore chiamata');
        }
    })
}