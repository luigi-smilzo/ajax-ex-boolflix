async function fetchApi(query) {
    const url = 'https://api.themoviedb.org/3/search/movie?query=' + query + '&language=it_IT'
    const api_key = '&api_key=26864016a30e377316e6a20d4e37109e'
    
    const response = await fetch(url + api_key)
    const data = response.json()

    return data;
}

function appendResults(data) {
    for (let i = 0; i < data.results.length; i++) {
        const item = data.results[i];
        
        let context = {
            title: item.title,
            originalTitle: item.originalTitle,
            originalLanguage: languageFlag(item.original_language),
            voteAverage: rateStars(item.vote_average),
            type: 'Film',
            posterPath: posterPath(item.poster_path),
            overview: item.overview.substr(0, 200) + '...',
            index: i
        }
    
        let html = template(context)
        container.innerHTML += html
    }
}

function posterPath(posterPath) {
    if (posterPath == null) {
        return 'img/no-poster.png'
    } else {
        return 'https://image.tmdb.org/t/p/' + 'w342/' + posterPath
    }
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
