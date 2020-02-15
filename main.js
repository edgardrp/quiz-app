let questions = null;
let numberOfQuestions = 5;
let currentQuestion = null;
let answers = null;
let apiKey = "";

$(document).ready(() => {
    currentQuestion = 0;
    localStorage.setItem("currentQuestion", currentQuestion);
    $.getJSON( "db/db.json", ( data ) => {
        questions = data;
        renderQuestion();
    });
    $("#btnNavigation").on("click", () => {
        nextQuestion();
    });
    $("#btnFinish").on("click", () => {
        finishQuiz();
    });
});

function nextQuestion() {
    let progress = 0;
    currentQuestion = parseInt(localStorage.getItem("currentQuestion"));
    currentQuestion++;
    if (currentQuestion < numberOfQuestions) {
        evaluateAnswer();
        progress = currentQuestion * 20;
        $('.progress-bar').css('width', progress+'%').attr('aria-valuenow', progress); 
        renderQuestion();
    } else {
        $('.progress-bar').css('width', 100+'%').attr('aria-valuenow', 100); 
        finishQuiz();
    }
    localStorage.setItem("currentQuestion", currentQuestion);
}

function renderQuestion() {
    $("#answer").html('');
    let question = questions[currentQuestion];
    $("#questionText").text(question.text);
    switch (currentQuestion) {
        case 0:
            let radioId = "radioId";
            $.each(question.answers, (index, value) => {
                $("#answer").append("<input name=" + radioId + " type=\"radio\" value = "+  index + "/>" + value + "<br/>");
            });
            break;
        case 1:
            let cehckId = "checkId";
            $.each(question.answers, (index, value) => {
                cehckId = cehckId + index;
                $("#answer").append("<input type=\"checkbox\"  id=\"" + cehckId +"\" name=\"" + cehckId + "\" value=\"" + cehckId + "\">");
                $("#answer").append("<label for=\"" + cehckId + "\"> " + value + "</label><br/>");
            });
            break;
        case 2:
            $("#answer").append("<label for=\"txtPalindrome\">Palindrome goes here</label><input type=\"text\" id=\"txtPalindrome\"/>");
            break;
        case 3:
            $("#answer").append("<label for=\"txtPalindrome1\">Regular</label><input type=\"text\" id=\"txtPalindrome1\"/><br/>");
            $("#answer").append("<label for=\"txtPalindrome2\">Reverse</label><input type=\"text\" id=\"txtPalindrome2\"/>");
            break;
        case 4:
            let radioIdRestaurant = "radioIdRestaurant";
            $.ajax({
                headers: {
                    Accept : "application/json",
                    "user-key" : apiKey,
                },
                url: "https://developers.zomato.com/api/v2.1/search?entity_id=306&entity_type=city"
            }).done((data) => {
                $.each(data.restaurants, (index, value) => {
                    $("#answer").append("<input name=" + radioIdRestaurant + " type=\"radio\" value = "+  index + "/>" + value.restaurant.name + "<br/>");
                });
            });
            break;
        default:
            break;
    }
}
function evaluateAnswer() {
    // TO DO
}

function finishQuiz() {
    // TO DO
}

function palindrome(str) {
    let re = /[\W_]/g;
    let lowRegStr = str.toLowerCase().replace(re, '');
    let reverseStr = lowRegStr.split('').reverse().join(''); 
    return reverseStr === lowRegStr;
  }