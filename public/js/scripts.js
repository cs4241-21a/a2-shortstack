let submitted = false
const submit = function( e ) {
    if (!submitted){
        submitted = true
        let data = []
        // prevent default form action from being carried out
        e.preventDefault()
        
        const nickname = document.querySelector( '#name' ),
            age = document.querySelector( '#age' ),
            region = document.querySelector( '#region_dropdown' ),
            json = { nickname: nickname.value,
                    age: age.value, 
                    region: region.value,
                    correct: correct,
                    time: final_time/100 },
                body = JSON.stringify( json )

        document.getElementById("hide_text").style.visibility = "visible"

        fetch( '/submit', {
            method:'POST',
            body
        })
        .then( function( response ) {
            return response.json()
        })
        .then( function( json ){
            data = json
            console.log( data )
            document.querySelector('tbody').innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                entry = data[i]
                console.log(entry.nickname, entry.age, entry.region, entry.correct, entry.time, entry.speed)
                tbody = "<tr><td>" + entry.nickname + "</td><td>" + entry.age + "</td><td>" + entry.region + "</td><td>" + entry.correct + "</td><td>" + entry.time + "</td><td>" + entry.speed + "</td></tr>"
                document.querySelector('tbody').insertAdjacentHTML("afterbegin", tbody)
            }
        })
    }

    return false
}

let time = 0
let final_time = 0
let correct = 0

const timer = function() {
    time += 1
    document.getElementById("timer").innerText = time/100
}

let started = false
let clock = 0
const start = function( e ) {
    if (!started) {
        time = 0
        clock = setInterval(timer, 10)
        document.addEventListener('keydown', handleKeys)
        makeQuiz()
        started = true
    }
}

let X = 0
let Y = 0
let ans = ""

const makeQuiz = function () {
    X = Math.floor(Math.random() * 100)
    Y = Math.floor(Math.random() * 100)
    document.getElementById("prompt").innerText = X + " + " + Y + " = "
}

const handleKeys = function ( e ) {
    if (e.key >=0 && e.key <=9) {
        ans += e.key
        document.getElementById("answer").innerText = ans
    } else if (e.keyCode === 8) {
        ans = ans.slice(0, ans.length-1)
        if (ans.length === 0) {
            document.getElementById("answer").innerText = "Answer"
        } else {
            document.getElementById("answer").innerText = ans
        }
        
    } else if (e.keyCode === 13) {
        answer = document.getElementById("answer").innerText
        if (answer == (X+Y)) {
            correct += 1
            document.getElementById("running_correct").innerText = "Correct: " + correct
            document.getElementById("answer").innerText = "Answer"
            ans = ""
            makeQuiz()
        } else {
            document.getElementById("answer").innerText = "Answer"
            ans = ""
            end()
        }
    }
}

const end = function() {
    document.getElementById("hide_game").style.visibility = "hidden"
    document.getElementById("hide_congrats").style.visibility = "visible"
    document.getElementById("leaderboard_form").style.visibility = "visible"
    document.getElementById("hide_end").style.visibility = "visible"
    document.getElementById("total_time").innerText = "Elapsed Time: " + time/100 + " s"
    document.getElementById("correct").innerText = "Number Correct: " + correct
    document.removeEventListener('keydown', handleKeys)
    clearInterval(clock)
    final_time = time
    document.getElementById("timer").innerText = "Timer"
}

const restart = function() {
    document.getElementById("hide_game").style.visibility = "visible"
    document.getElementById("leaderboard_form").style.visibility = "hidden"
    document.getElementById("hide_end").style.visibility = "hidden"
    document.getElementById("hide_text").style.visibility = "hidden"
    document.getElementById("hide_congrats").style.visibility = "hidden"
    started=false
    submitted=false
    document.getElementById("timer").innerText = "Timer"
}

window.onload = function() {
    document.getElementById("hide_game").style.visibility = "visible"
    document.getElementById("leaderboard_form").style.visibility = "hidden"
    document.getElementById("hide_end").style.visibility = "hidden"
    document.getElementById("hide_text").style.visibility = "hidden"
    //document.getElementById("table_hide").style.visibility = "hidden"
    document.getElementById("hide_congrats").style.visibility = "hidden"

    const start_button = document.querySelector( "#start" )
    start_button.onclick = start

    const submit_button = document.querySelector( "#submit" )
    submit_button.onclick = submit

    const retry_button = document.querySelector( "#retry" )
    retry_button.onclick = restart

}

