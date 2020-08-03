// Refs
const srcBtn = document.querySelector('#SearchButton')
const srcInput = document.querySelector('#SearchInput')
const container = document.querySelector('.Results')
const loader = document.querySelector('.Loader')

// Handlebars
const source = document.querySelector('#list-template').innerHTML
const template = Handlebars.compile(source)

/*****************
 * Event listeners
 *****************/

srcBtn.addEventListener('click', async function() {
    let query = srcInput.value.trim()
    
    if(query != '') {
        container.innerHTML = ''
        loader.classList.toggle('is-active')
        
        await fetchApi(query).then(data => {
            appendResults(data)
            loader.classList.toggle('is-active')
        })
    } else {
        srcInput.focus()
    }
})

srcInput.addEventListener('keypress', async function(e) {
    
    if(e.which == 13) {
        let query = srcInput.value.trim()

        if(query != '') {
            container.innerHTML = ''
            loader.classList.toggle('is-active')
            
            await fetchApi(query).then(data => {
                appendResults(data)
                loader.classList.toggle('is-active')
            })
        } else {
            srcInput.focus()
        }
    }
})