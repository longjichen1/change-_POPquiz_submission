const choices = document.querySelectorAll('.choice')


choices.forEach(choice =>{
    console.log('hi')
    const p = choice.querySelector('p')
    choice.addEventListener('dragstart', () =>{
        p.innerText = "hi"
    })
    choice.addEventListener('dragend', () =>{
        p.innerText="1"
    })
})