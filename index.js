
const likes = []
const dislikes = []

$(document).ready(function () {

    $('#fact').on('click', function () {
        $.ajax("https://dogapi.dog/api/facts", {
            success: function (response) {
                showFact(response.facts)
                hideGenBtn()
                showButtons()
            },
            errror: function (error) {
                console.log(error);
            }
        });
    })

    $('#likes').on('click', function() {
        showLikes()
    })

    $('#dislikes').on('click', function() {
        showDislikes()
    })
});


function showLikes() {
    $('#likes_div').remove()
    $('#dislikes_div').remove()
    const div = document.createElement('div')
    div.id = 'likes_div'
    if(likes.length > 0){
        likes.forEach(item => {
            const p = document.createElement('p')
            console.log(item);
            p.textContent = item
            div.append(p)
        })
    }else{
        const p = document.createElement('p')
        p.textContent = 'No likes'
        div.append(p)
    }
    $('#likes_dislikes').append(div)
}

function showDislikes() {
    $('#likes_div').remove()
    $('#dislikes_div').remove()
    const div = document.createElement('div')
    div.id = 'dislikes_div'
    if(dislikes.length > 0){
        dislikes.forEach(item => {
            const p = document.createElement('p')
            console.log(item);
            p.textContent = item
            div.append(p)
        })
    }else{
        const p = document.createElement('p')
        p.textContent = 'No dislikes'
        div.append(p)
    }
    $('#likes_dislikes').append(div)
}

function showFact(text) {
    const fact = document.createElement('p')
    fact.textContent = text
    fact.classList.add('border', 'rounded', 'mt-4', 'p-3')
    fact.id = 'fact_text'
    $('#facts_div').append(fact);
}

const hideGenBtn = () => {
    $('#fact').hide()
}

const btnClasses = ['btn', 'btn-primary', 'm-2']

function refresh() {
    $('#buttons').remove()
    $('#fact_text').remove()
}

function showButtons() {
    const div = document.createElement('div')
    div.classList.add('container')
    div.id = 'buttons'

    const like = document.createElement('button')
    like.textContent = 'Like'
    like.classList.add(...btnClasses)
    like.id = 'like'
    div.append(like)

    const dislike = document.createElement('button')
    dislike.textContent = 'Dislike'
    dislike.classList.add(...btnClasses)
    dislike.id = 'dislike'
    div.append(dislike)

    const nextFact = document.createElement('button')
    nextFact.textContent = 'Next fact'
    nextFact.id = 'nextFact'
    nextFact.classList.add(...btnClasses)
    div.append(nextFact)

    $('#facts_div').append(div);

    $('#nextFact').ready(function () {
        $('#nextFact').on('click', function () {
            console.log('fegg');
            $.ajax("https://dogapi.dog/api/facts", {
                success: function (response) {
                    refresh()
                    hideGenBtn()
                    showFact(response.facts)
                    showButtons()
                },
                errror: function (error) {
                    console.log(error);
                }
            });
        })
    })

    $('#like').ready(function () {
        $('#like').on('click', function () {
            console.log('liked');
            const value = $('#fact_text').text()
            likes.push(value)
        })
    })

    $('#dislike').ready(function () {
        $('#dislike').on('click', function () {
            console.log('disliked');
            const value = $('#fact_text').text()
            dislikes.push(value)
        })
    })

}

