(function() {
    document.body.style.backgroundImage = "url('../logo.jpg')";
    // Functions
    function buildQuiz(){
        
        const output = [];
  
        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
  
                // variable to store the list of possible answers
                const answers = [];
  
                // and for each available answer...
                for(letter in currentQuestion.answers) {
  
                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                        </label>`
                    );
                }
  
                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                        <div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            }
        );
  
        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }
  
    function showResults() {
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');
  
        // keep track of user's answers
        let numCorrect = 0;
        let countA = 0;
        let countB = 0;
        let countC = 0;
        let countD = 0;
  
        // for each question...
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
            // count the selected answer
            if (userAnswer === "a") {
                countA++;
            } else if (userAnswer === "b") {
                countB++;
            } else if (userAnswer === "c") {
                countC++;
            }
  
           
            if(userAnswer === currentQuestion.correctAnswer){
               
                numCorrect++;
                answerContainers[questionNumber].style.color = '#008000';
            }
            else{
                answerContainers[questionNumber].style.color = '#FF0000';
            }
        });
       
        resultsContainer.innerHTML = `<br>
                                      A: ${countA} times<br>
                                      B: ${countB} times<br>
                                      C: ${countC} times<br>
                                      D: ${countD} times`;
        
        setTimeout(function(){location.replace("../ctrlgreenhome.html"+numCorrect); }, 10000);
    }
  
    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0) {
            previousButton.style.display = 'none';
        }
        else{
            previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else{
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }
  
    function showNextSlide() {
        showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "You're going to a concert. Do you:",
            answers: {
                a: "Show up with a reusable water bottle",
                b: "Promote wearing thrifted or vintage clothes (i.e. giving pre-loved clothes a second life)",
                c: "Encourage everyone to bike or carpool there",
                d: "The Images", 
            },
            correctAnswer: ""
        },
        {
            question: "Who is the brand ambassador of jewellery brand Mirari?",
            answers: {
                a: "Bipasha Basu",
                b: "Kalyani Chawla",
                c: "Anoushka Shankar",
                d: "Kareena Kapoor"
            },
            correctAnswer: "c"
        },
        {
            question: "Which city is known as the world of fashion?",
            answers: {
                a: "Mumbai",
                b: "London",
                c: "Paris",
                d: "Los Angeles",
            },
            correctAnswer: "c"
        },
        {
            question: "Who started fashion magazine?",
            answers: {
                a: "Irving Penn",
                b: "Samuel Beeton",
                c: "Annie Leibovitz",
                d: "Kate Betts",
            },
            correctAnswer: "b"
        },
        {
            question: "What is the name of hereditary dress of Indian Women?",
            answers: {
                a: "Saree",
                b: "Kurta",
                c: "Lehenga",
                d: "Dupatta",
            },
            correctAnswer: "a"
        },
        {
            question: "What is the name of the loose covering for the shoulder?",
            answers: {
                a: "Stole",
                b: "Shawl",
                c: "Scarf",
                d: "Dupatta",
            },
            correctAnswer: "b"
        },
        {
            question: "In which country did waterproof jacket find out?",
            answers: {
                a: "Greenland",
                b: "Ireland",
                c: "Germany",
                d: "India",
            },
            correctAnswer: "a"
        },
        {
            question: "A top that is fitted on top and then ruffled around the waistline is called?",
            answers: {
                a: "Frilled Top",
                b: "Cape Top",
                c: "Crop Top",
                d: "Peplum Top",
            },
            correctAnswer: ""
        },
        {
            question: "Another term for activewear/sportswear is?",
            answers: {
                a: "Atelier",
                b: "Athelewear",
                c: "Athleisure",
                
            },
            correctAnswer: ""
        },
        {
            question: "What does VLCC stands for?",
            answers: {
                a: "Veena Lamba's Curls and Curves",
                b: "Vandana Luthra's Curls and Curves",
                c: "Vandana Luthra's Curls and Contour",
               
            },
            correctAnswer: ""
        }      
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

})();
