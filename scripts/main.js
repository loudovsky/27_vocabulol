const original = document.querySelector(".original")
const translation = document.querySelector(".translation")
const erase = document.querySelector(".erase")
const send = document.querySelector(".send")
const span = document.querySelector("span")
const error = document.querySelector(".error")
const apply = document.querySelector(".apply")
const test = document.querySelector(".test")
const cross = document.querySelector(".cross")
const submit = document.querySelector(".submit")
const submittedWord = document.querySelector(".submit-word")

let word = document.querySelector('em')
let myItems = [];
myItems = JSON.parse(localStorage.getItem('mots'))
span.innerHTML = myItems.length;





console.log(translation.value);

function calculateNbWords (tab) { 
    span.innerHTML = tab.length;
}
function addItemLine (mot1, mot2) {
    let newItemLine = {
        original : mot1,
        translation : mot2, 
    }
    myItems.push(newItemLine)
    console.log(myItems);
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

send.addEventListener('click', function(){
    if (original.value === '' || translation.value === '') {
        error.innerHTML = `Entrez un mot et sa traduction, svp!`
    }
    else {
        error.innerHTML = ''
        addItemLine(original.value, translation.value)
        calculateNbWords (myItems)
        localStorage.setItem('mots', JSON.stringify(myItems))
        let cat = localStorage.getItem("mots");
        console.log(cat);
        original.value = ''
        translation.value = ''
    }
})


erase.addEventListener('click', function() {
    localStorage.clear();
    let cat = localStorage.getItem("mots");
    console.log(cat);
    myItems = [];
    calculateNbWords (myItems)
})

apply.addEventListener('click', function() {
    test.classList.toggle('print')
    let i = 0
    i = randomIntFromInterval(0, (myItems.length - 1))
    word.innerHTML = myItems[i].original
    submit.addEventListener('click', function() {
        if (submittedWord.value === myItems[i].translation){
            console.log("Bonne réponse");
            i = randomIntFromInterval(0, (myItems.length - 1))
            word.innerHTML = myItems[i].original
        }
        else {
            console.log("Mauvaise réponse")
        }
        submittedWord.value = ""
    })
})

cross.addEventListener('click', function() {
    test.classList.toggle('print')
})


