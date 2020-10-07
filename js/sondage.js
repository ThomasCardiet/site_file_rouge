const responses = document.getElementsByClassName("response");
const checkboxs = document.getElementsByClassName("checkbox");
const questionTitle = document.getElementById("question");

const user = {
    name: prompt("Quel est ton nom", "Nom"),
    good_answer: 0,
}

let h3_pseudo = document.createElement('h3');
h3_pseudo.className = "pseudo";
h3_pseudo.textContent = 'Votre nom: ' + user.name;
questionTitle.insertAdjacentElement('afterend', h3_pseudo);

var nb_question = 0;

class question {
    title;
    choices;
    constructor(title, choices) {
        this.title = title;
        this.choices = choices;
    }
}

const sondage = {
    title: "Le thème des couleurs",
    questions: [

        new question(
            "Quelle est la bonne combinaison de couleurs nécessaire à la confection du noir ?",
            [
                {choice: "Bleu, Jaune, Rouge", isRight: true},
                {choice: "Bleu, Blanc, Rouge", isRight: false},
                {choice: "Bleu, Vert, Rouge", isRight: false},
                {choice: "Vert, Blanc, Rouge", isRight: false},
                ]
        ),

        new question(
            "Quelle couleur obtient-on avec du rouge et du bleu ?",
            [
                {choice: "Gris", isRight: false},
                {choice: "Violet", isRight: true},
                {choice: "Orange ", isRight: false},
                {choice: "Vert", isRight: false},
            ]
        ),

        new question(
            "Quel est l'intru ?",
            [
                {choice: "Rouge", isRight: false},
                {choice: "Jaune", isRight: false},
                {choice: "Vert ", isRight: true},
                {choice: "Bleu", isRight: false},
            ]
        ),

        new question(
            "Combien y a t'il de couleurs dans l'arc-en-ciel ?",
            [
                {choice: "5", isRight: false},
                {choice: "8", isRight: false},
                {choice: "7", isRight: true},
                {choice: "10", isRight: false},
            ]
        ),

        new question(
            "De quelle couleur est le cheval blanc d'Henry IV",
            [
                {choice: "Bleu", isRight: false},
                {choice: "Noir", isRight: false},
                {choice: "Blanc", isRight: false},
                {choice: "Gris avec la poussière", isRight: true},
            ]
        ),

        new question(
            "De quelle couleur est l'eau",
            [
                {choice: "Vert", isRight: false},
                {choice: "Transparant", isRight: true},
                {choice: "Blanc", isRight: false},
                {choice: "Bleu", isRight: false},
            ]
        ),

        new question(
            "Un schtroumpf tombe et se fait un 'Bleu' de quelle couleur est sa blessure lors de la chute ?",
            [
                {choice: "Rouge", isRight: true},
                {choice: "Bleu", isRight: false},
                {choice: "Jaune", isRight: false},
                {choice: "Marron", isRight: false},
            ]
        ),

        new question(
            "Quelle est la couleur de l'éléctricité ?",
            [
                {choice: "Bleu", isRight: false},
                {choice: "Vert", isRight: false},
                {choice: "Gris", isRight: false},
                {choice: "Pas de couleur", isRight: true},
            ]
        ),

        new question(
            "Quelle est la couleur de la gorge d'un Rougegorge ?",
            [
                {choice: "Rouge", isRight: false},
                {choice: "Blanc", isRight: false},
                {choice: "Orange foncé", isRight: true},
                {choice: "Gris", isRight: false},
            ]
        )
    ]
}

changeQuestion();

$("#button").click(function() {
    let checked = 0;
    let checked_answer = null;
    Array.prototype.forEach.call(checkboxs, check => {
        if(check.checked) {
            checked++;
            checked_answer = check;
        }
    })
    if(checked > 1) {
        alert("1 seul choix est possible")
        return false;
    }else if(checked <= 0 || checked_answer == null) {
        alert("Vous devez cocher une case")
        return false;
    }

    if(sondage.questions[nb_question].choices[checked_answer.id].isRight) {
        user.good_answer ++;
    }
    nb_question ++;
    changeQuestion();
})

function changeQuestion() {
    if(nb_question >= sondage.questions.length) {
        //results

        let results = document.createElement('h3');
        results.className = "results";
        results.textContent = 'Votre Score: ' + ((user.good_answer/nb_question)*100).toFixed(2) + '/100';
        h3_pseudo.insertAdjacentElement('afterend', results);

        return;
    }


    questionTitle.innerHTML = (nb_question+1) + "# "  + sondage.questions[nb_question].title;
    Array.prototype.forEach.call(responses, function (response, index) {
        responses[index].innerHTML = sondage.questions[nb_question].choices[index].choice;
    })

    Array.prototype.forEach.call(checkboxs, check => {
        if(check.checked) check.checked = false;
    })
}