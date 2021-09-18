function quizInit() {

    // Selectors
    var $quizQuestionText = $('.quiz .question .questionText');
    var $quizQuestionOptions = $('.quiz .question .options');
    var $quizProgress= $('.quiz progress');
    var $quizProgressDataCurrent= $('.quiz .progressData .current');
    var $quizProgressDataLimit= $('.quiz .progressData .limit');
  
    // Data input for Questions and Results
    var questions = [{
      text: '<b>Practice Question</b><br><br>I have felt happy',
      answers: {
        type: 'multiple',
        options: [{
          text: 'Yes all of the time',
          weight: 0
        }, {
          text: 'Yes most of the time',
          weight: 0
        }, {
          text: 'No, not very often',
          weight: 0
        },{
          text: 'No, not at all',
          weight: 0
        }]
      },
    },{
      text: 'I have been able to laugh and see the funny side of things',
      answers: {
        type: 'multiple',
        options: [{
          text: 'As much as I always could',
          weight: 0
        }, {
          text: 'Not so much now',
          weight: 1
        }, {
          text: 'Definitely not so much now',
          weight: 2
        },{
          text: 'Not at all',
          weight: 3
        }]
      },
    }, {
      text: 'I have looked forward with enjoyment to things',
      answers: {
        type: 'multiple',
        options: [{
          text: 'As much as I ever did',
          weight: 0
        }, {
          text: 'Rather less than I used to',
          weight: 1
        }, {
          text: 'Definitely less than I used to',
          weight: 2
        },{
          text: 'Hardly at all',
          weight: 3
        }]
      },
    },{
      text: 'I have blamed myself unecessarily when things went wrong',
      answers: {
        type: 'multiple',
        options: [{
          text: 'Yes, most of the time',
          weight: 3
        }, {
          text: 'Yes, some of the time',
          weight: 2
        }, {
          text: 'Not very often',
          weight: 1
        },{
          text: 'No, never',
          weight: 0
        }]
      },
    },{
      text: 'I have been anxious or worried for no good reason',
      answers: {
        type: 'multiple',
        options: [{
          text: 'No, not at all',
          weight: 0
        }, {
          text: 'Hardly ever',
          weight: 1
        }, {
          text: 'Yes, sometimes',
          weight: 2
        },{
          text: 'Yes, very often',
          weight: 3
        }]
      },
    },{
        text: 'I have felt scared or panicky for no very good reason',
        answers: {
          type: 'multiple',
          options: [{
            text: 'Yes, quite a lot',
            weight: 3
          }, {
            text: 'Yes, sometimes',
            weight: 2
          }, {
            text: 'No, not much',
            weight: 1
          },{
            text: 'No, not at all',
            weight: 0
          }]
        },
      },{
          text: 'Things have been getting on top of me',
          answers: {
            type: 'multiple',
            options: [{
              text: 'Yes, most of the time I have not been able to cope at all',
              weight: 3
            }, {
              text: 'Yes, sometimes I have not been coping as well as usual',
              weight: 2
            }, {
              text: 'No, most of the time I have coped quite well',
              weight: 1
            },{
              text: 'No, I have been coping as well as ever',
              weight: 0
            }]
          },
        },{
            text: 'I have been so unhappy that I have had difficulty sleeping',
            answers: {
              type: 'multiple',
              options: [{
                text: 'Yes, most of the time',
                weight: 3
              }, {
                text: 'Yes, sometimes',
                weight: 2
              }, {
                text: 'Not very often',
                weight: 1
              },{
                text: 'No, not at all',
                weight: 0
              }]
            },
          },{
              text: 'I have felt sad or miserable',
              answers: {
                type: 'multiple',
                options: [{
                  text: 'Yes, most of the time',
                  weight: 3
                }, {
                  text: 'Yes, quite often',
                  weight: 2
                }, {
                  text: 'Not very often',
                  weight: 1
                },{
                  text: 'No, not at all',
                  weight: 0
                }]
              },
            },{
                text: 'I have been so unhappy that I have been crying',
                answers: {
                  type: 'multiple',
                  options: [{
                    text: 'Yes, most of the time',
                    weight: 3
                  }, {
                    text: 'Yes, quite often',
                    weight: 2
                  }, {
                    text: 'Only occasionally ',
                    weight: 1
                  },{
                    text: 'No, never',
                    weight: 0
                  }]
                },
              },{
                  text: 'The thought of harming myself has occurred to me',
                  answers: {
                    type: 'multiple',
                    options: [{
                      text: 'Yes, quite often',
                      weight: 3
                    }, {
                      text: 'Sometimes',
                      weight: 2
                    }, {
                      text: 'Hardly ever',
                      weight: 1
                    },{
                      text: 'Never',
                      weight: 0
                    }]
                  },
    }];
  
  
    // QUIZ ENGINE
    function quiz() {
      var currentQuestion = 0; // default starting value
      var currentScore = 0; // default starting value
      $quizProgress.attr("max", questions.length);
      $quizProgressDataLimit.html(questions.length);
      renderQuestion(currentQuestion);
  
      // RENDER
      function renderQuestion() {
        var question = questions[currentQuestion];
        var optionsHtml = [];
        var questionText = question.text;
        var questionOptionText = question.answers.options;
        $quizQuestionText.html(questionText);
        for(var i = 0; i < questionOptionText.length; i++) {
          if (question.answers.type == 'range'){
            var questionOptionItem = '<button class="quiz-opt range" value="'+questionOptionText[i].weight+'" id="'+questionOptionText[i].text+'">'+questionOptionText[i].text+'</button>'
          } else {
            var questionOptionItem = '<button class="quiz-opt" value="'+questionOptionText[i].weight+'" id="'+questionOptionText[i].text+'">'+questionOptionText[i].text+'</button>'
          }
          optionsHtml.push(questionOptionItem);
        }
        $quizQuestionOptions.html(optionsHtml.join(''));
        $('.quiz button').click(nextQuestion);
      } // END renderQuestion
  
      // HANDLER
      function nextQuestion() {
        currentQuestion += 1;
        var optionValue = parseInt(this.value);
        currentScore += optionValue;
        console.log('currentScore=', currentScore);
        $quizProgress.attr("value", currentQuestion);
        $quizProgressDataCurrent.html(currentQuestion);
        if (questions.length == currentQuestion){
          calculateResults();
        } else {
          renderQuestion();
          // addToAnswerLog();
        }
      } // END nextQuestion
  
      // RESULTS
      function calculateResults() {
          if (currentScore < 10 || currentScore == 10) {
              $('.quiz .question').html(`<p class="scoreText">You scored ${currentScore} out of 30.</p><br><br><p class=resultText>It is not likely that you have mental health concerns, however, always consult your primary care provider or mental health provider if you have any questions.</p>`)
        } else {
              $('.quiz .question').html(`<p class="scoreText">You scored ${currentScore} out of 30.<p><br><br><p class=resultText>Your score suggests that you may be living with mental health burdens that are affecting your day-to-day life. At your next wellness check up, talk to your primary care physician or current mental health care provider about your results.</p>`)
    }
   }
  }

    // END quiz engine
  
    // Init render
    quiz();
  
  } // END quizInit
  
  $(function() {
    quizInit();
  });

window.onload = function() {
    if(/iP(hone|ad)/.test(window.navigator.userAgent)) {
        document.body.addEventListener('touchstart', function() {}, false);
    }
}
