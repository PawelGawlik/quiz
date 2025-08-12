const APP = {
    questionArr: [{
        id: 1,
        text: "Która z liczb jest liczbą pierwszą?",
        answers: [4, 8, 21, 7],
        correct: 3
    }, {
        id: 2,
        text: "Które z miast było w przeszłości stolicą Polski?",
        answers: ["Poznań", "Wrocław", "Kraków", "Gdańsk"],
        correct: 2
    }, {
        id: 3,
        text: 'Kto jest autorem powieści "Mistrz i Małgorzata"?',
        answers: ["Henryk Sienkiewicz", "Michaił Bułhakow", "Fiodor Dostojewski", "Albert Camus"],
        correct: 1
    }, {
        id: 4,
        text: "Do jakiej grupy cząstek elementarnych należy elektron?",
        answers: ["Kwarków", "Bozonów", "Hadronów", "Leptonów"],
        correct: 3
    }],
    h1: document.querySelector("h1"),
    h2: document.querySelector("h2"),
    ps: document.querySelectorAll("p"),
    inputs: document.querySelectorAll("input"),
    button: document.querySelector("button"),
    divs: document.querySelectorAll("div"),
    labels: document.querySelectorAll("label"),
    newP: document.createElement("p"),
    newDiv: document.createElement("div"),
    newButton:document.createElement("button"),
    index: 1,
    points: 0,
    createLi(param) {
        const lis = param.answers.map((el, index) => {
            const li = document.createElement("li");
            li.innerText = el;
            if(index === param.checked){
                li.classList.add("checked");
            }
            if(index === param.correct){
                li.classList.add("correct");
            }
            return li;
        })
        return lis;
    },
    createDiv(param) {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        const ol = document.createElement("ol");
        const lis = this.createLi(param);
        [...lis].forEach((el) => {
            ol.appendChild(el);
        });
        p.innerText = param.text;
        p2.innerText = `Prawidłowa odpowiedź: ${param.answers[param.correct]}`;
        div.appendChild(p);
        div.appendChild(ol);
        div.appendChild(p2);
        return div;
    },
    questionDisplay() {
        this.correctOrWrong(this.questionArr[this.index - 1]);
        if(this.index === this.questionArr.length){
            this.score();
            this.button.innerText = "Quiz od początku";
            this.button.onclick = this.newQuiz.bind(APP);
            return;
        }
        this.nextQuestion(this.questionArr[this.index]);
        this.index++;
    },
    nextQuestion(param) {
        [...this.labels].forEach((el) => {
            el.style.backgroundColor = "initial";
        })
        this.inputs.forEach((el, index) => {
            el.checked = false;
            el.value = param.answers[index];
        })
        this.h1.innerText = `Pytanie ${param.id}`;
        this.h2.innerText = param.text;
        [...this.ps].forEach((el, index) => {
            el.innerText = param.answers[index];
        })
        if(this.index === this.questionArr.length - 1){
            this.button.innerText = "Wynik quizu";
        }
    },
    score() {
        if(this.newDiv.children.length){
            [...this.newDiv.children].forEach((el) => {
                el.remove();
            })
        }
        this.divs[0].remove();
        document.body.appendChild(this.newP);
        document.body.appendChild(this.newDiv);
        document.body.appendChild(this.newButton);
        this.newButton.innerText = "Zobacz wyniki";
        this.newButton.onclick = () => {
            this.newDiv.classList.remove("hidden");
            this.newDiv.classList.add("visible");
            this.newButton.remove();
        }
        this.newDiv.classList.add("hidden");
        this.newDiv.classList.remove("visible");
        this.newP.innerText = `Wynik: ${this.points}/${this.questionArr.length}`;
        this.questionArr.forEach((el) => {
            this.newDiv.appendChild(this.createDiv(el));
        })
    },
    correctOrWrong(param) {
        if(this.inputs[param.correct].checked){
            this.points++;
        }
        param.checked = [...this.inputs].findIndex((el) => {
            return el.checked;
        })
    },
    newQuiz() {
        this.points = 0;
        this.index = 1;
        this.button.innerText = "Następne pytanie";
        this.button.onclick = this.questionDisplay.bind(APP);
        this.newDiv.remove();
        document.body.insertBefore(this.divs[0], this.divs[this.divs.length - 1]);
        this.newP.remove();
        this.newButton.remove();
        this.nextQuestion(this.questionArr[0]);
    }

}
APP.nextQuestion(APP.questionArr[0]);
APP.button.onclick = APP.questionDisplay.bind(APP);
[...APP.labels].forEach((el, index, arr) => {
    el.onclick = () => {
        arr.forEach((el2, index2) => {
            if(el2.style.backgroundColor === "brown" && index2 !== index){
                el2.style.backgroundColor = "initial";
            }
        })
        el.style.backgroundColor = "brown";
    }
})
window.onbeforeunload = (event) => {
    if(APP.index > 1){
        event.preventDefault();
        event.returnValue = true;
    }
}

