// =============== Variables ==================
// ============================================
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
const result = document.querySelector(".result")

let word = document.querySelector('em')
let i = 0

//============== Tableau d'objets ==========
//==========================================

let myItems = [];
console.log(myItems);
myItems = JSON.parse(localStorage.getItem('mots')) || []
// Le sigle || est un opérateur de coalescence nulle, il renvoie la première valeur qui est non falsy (c’est-à-dire différente de null, undefined, false, 0, NaN ou une chaîne vide)
span.innerHTML = myItems.length;
if (myItems.length != 0) {
    apply.classList.add('print')
}


console.log(translation.value);

//============== FONCTIONS =================
//==========================================

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

function randomIntFromInterval(min, max) { 
    // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function genrateInt() {
    i = randomIntFromInterval(0, (myItems.length - 1))
    console.log(`i vaut ${i}`);
    word.innerHTML = myItems[i].original
}

function giveResult() {
    result.classList.remove('green')
    result.classList.remove('red')
    let insertedWord = submittedWord.value.toLowerCase()
    console.log(`Le mot orignal : ${myItems[i].original}`);
    console.log(`Le mot traduit : ${myItems[i].translation}`);
    console.log(`Le mot entré : ${insertedWord}`);
    
    if (insertedWord === myItems[i].translation){
        console.log("Bonne réponse");
        result.classList.add('green')
        genrateInt()
        result.innerHTML = "Bonne réponse!"
        submittedWord.value = ""
    }
    else if (insertedWord === '') {
        result.innerHTML = "Entre un mot stp!"
    }
    else {
        console.log("Mauvaise réponse")
        result.classList.add('red')
        result.innerHTML = "Mauvaise réponse!"
    }
    setTimeout(() => {
        result.innerHTML = ""
        result.setAttribute("class", "result")
      }, 1500)
}


//============== EVENTS =================
//==========================================

send.addEventListener('click', function(){
    if (original.value === '' || translation.value === '') {
        error.innerHTML = `Entrez un mot et sa traduction, svp!`
    }
    else {
        error.innerHTML = ''
        let originalWord = original.value.toLowerCase()
        let translationWord = translation.value.toLowerCase()
        console.log(originalWord);
        console.log(translationWord);
        addItemLine(originalWord, translationWord)
        calculateNbWords (myItems)
        localStorage.setItem('mots', JSON.stringify(myItems))
        let cat = localStorage.getItem("mots");
        console.log(cat);
        original.value = ''
        translation.value = ''
        if (myItems.length === 1) {
            apply.classList.add('print')
        }
    }
})


erase.addEventListener('click', function() {
    localStorage.clear();
    let cat = localStorage.getItem("mots");
    console.log(cat);
    myItems = [];
    apply.classList.remove('print')
    calculateNbWords (myItems)
})

apply.addEventListener('click', function() {
    result.innerHTML = ``
    submittedWord.value = ``
    test.classList.toggle('print')
    genrateInt()
})

submit.addEventListener('click', function() {
    giveResult()
})
submittedWord.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        giveResult();
    }
})

cross.addEventListener('click', function() {
    //submittedWord.innerHTML = ''
    test.classList.toggle('print')
})


