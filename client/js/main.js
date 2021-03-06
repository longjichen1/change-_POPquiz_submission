//const { data } = require("cheerio/lib/api/attributes");

// https://github.com/ayyazzafar/sortable-drag-and-drop-todo-list-with-javascript
let cards = document.querySelectorAll('.choice');
let lists = document.querySelectorAll('.choice-container');
const songs = [] 

const rand = Math.floor(Math.random() * 100);
const rand2 = Math.floor(Math.random() * 100);
const rand3 = Math.floor(Math.random() * 100);

const choices = document.querySelectorAll('.choice');

function getSongs(){
    fetch('http://localhost:5000/api/billboard').then((response) => {
        return response.json()
        
    }).then((data) => {
    
        for (let i = 0; i < 3; i++) {
            const rand = Math.floor(Math.random() * 100)
            const obj = {
                name: data[0][rand],
                rank: rand+1,
                artist: data[1][rand],
                image: data[2][rand]
            }
            songs.push(obj)
        }
        // console.log(songs)
    }).then(() => {
        
        choices.forEach((choice, index)=>{
            choice.querySelector('img').src=songs[index]['image'];
            choice.querySelector('p').innerText = songs[index]['name'] + '- by ' + songs[index]['artist'];
            choice.querySelector('h2').innerText = "RANK: " + (songs[index]['rank']);
            
        })
    })  
}
getSongs();
cards.forEach((card)=>{
    registerEventsOnCard(card);
});

lists.forEach((list)=>{
    list.addEventListener('dragover', (e)=>{
        e.preventDefault();
        let draggingCard = document.querySelector('.dragging');
        let cardAfterDraggingCard = getCardAfterDraggingCard(list, e.clientY);
        if(cardAfterDraggingCard){
            cardAfterDraggingCard.parentNode.insertBefore(draggingCard, cardAfterDraggingCard);
        } else{
            list.appendChild(draggingCard);
        }
        
    });
});

function getCardAfterDraggingCard(list, yDraggingCard){

    let listCards = [...list.querySelectorAll('.choice:not(.dragging)')];

    return listCards.reduce((closestCard, nextCard)=>{
        let nextCardRect = nextCard.getBoundingClientRect();
        let offset = yDraggingCard - nextCardRect.top - nextCardRect.height /2;

        if(offset < 0 && offset > closestCard.offset){
            return {offset, element: nextCard}
        } else{
            return closestCard;
        }
    
    }, {offset: Number.NEGATIVE_INFINITY}).element;

}

function registerEventsOnCard(card){
    card.addEventListener('dragstart', (e)=>{
        card.classList.add('dragging');
    });


    card.addEventListener('dragend', (e)=>{
        card.classList.remove('dragging');
    });
}

const button = document.querySelector('.submit-button');

button.addEventListener('click', ()=>{
    const rank = document.querySelectorAll('h2');
    rank.forEach((ranking)=>{
        ranking.style.display = "inline-block";
    })
})

const reset = document.querySelector('.reset');

reset.addEventListener('click', ()=>{
    location.reload(true);
})