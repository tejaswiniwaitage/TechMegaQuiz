document.addEventListener("DOMContentLoaded", function () {
  const htmlQuestions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyperlinks Text Mark Language",
        "Home Tool Markup Language",
      ],
      answer: 0,
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<h1>"],
      answer: 1,
    },
    {
      question: "Which tag is used for inserting an image?",
      options: ["<img>", "<image>", "<src>", "<pic>"],
      answer: 0,
    },
    {
      question: "HTML files have extension?",
      options: [".ht", ".web", ".html", ".doc"],
      answer: 2,
    },
    {
      question: "Which tag is used for paragraph?",
      options: ["<para>", "<text>", "<h1>", "<p>"],
      answer: 3,
    },
    {
      question: "Which tag creates a line break?",
      options: ["<lb>", "<br>", "<break>", "<hr>"],
      answer: 1,
    },
    {
      question: "Which tag is used for headings?",
      options: ["<head>", "<heading>", "<h1>", "<title>"],
      answer: 2,
    },
    {
      question: "Which attribute is used for image source?",
      options: ["href", "alt", "src", "link"],
      answer: 2,
    },
    {
      question: "Which tag creates a list?",
      options: ["<ul>", "<li>", "<ol>", "<list>"],
      answer: 0,
    },
    {
      question: "Which tag is used for bold text?",
      options: ["<bold>", "<stronger>", "<bt>", "<b>"],
      answer: 3,
    },
  ];

  const cssQuestions = [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style System",
        "Color Style Sheet",
        "Computer Style Sheet",
      ],
      answer: 0,
    },
    {
      question: "Which property changes text color?",
      options: ["text-color", "font-color", "color", "bgcolor"],
      answer: 2,
    },
    {
      question: "Which property controls font size?",
      options: ["text-size", "font-size", "size", "font-style"],
      answer: 1,
    },
    {
      question: "How to select an id?",
      options: ["#id", ".id", "*id", "id"],
      answer: 0,
    },
    {
      question: "How to select a class?",
      options: ["#class", "*class", "class", ".class"],
      answer: 3,
    },
    {
      question: "Which property sets background color?",
      options: ["background-color", "bgcolor", "color-bg", "background"],
      answer: 0,
    },
    {
      question: "Which property adds space inside element?",
      options: ["margin", "border", "padding", "spacing"],
      answer: 2,
    },
    {
      question: "Which property adds space outside element?",
      options: ["padding", "margin", "space", "border"],
      answer: 1,
    },
    {
      question: "Which property is used for border?",
      options: ["border", "outline", "frame", "line"],
      answer: 0,
    },
    {
      question: "Which display value makes block inline?",
      options: ["block", "flex", "none", "inline"],
      answer: 3,
    },
  ];

  const jsQuestions = [
    {
      question: "JavaScript is a?",
      options: [
        "Markup Language",
        "Programming Language",
        "Styling Language",
        "Database",
      ],
      answer: 1,
    },
    {
      question: "Which keyword declares variable?",
      options: ["var", "int", "string", "letvar"],
      answer: 0,
    },
    {
      question: "Which symbol is used for comments?",
      options: ["<!-- -->", "#", "**", "//"],
      answer: 3,
    },
    {
      question: "Which method prints to console?",
      options: ["console.log()", "print()", "echo()", "log()"],
      answer: 0,
    },
    {
      question: "Which keyword is used for function?",
      options: ["fun", "define", "function", "method"],
      answer: 2,
    },
    {
      question: "Which operator is for equality?",
      options: ["=", "!=", "===", "=="],
      answer: 3,
    },
    {
      question: "Which loop is used?",
      options: ["loop", "for", "repeat", "iterate"],
      answer: 1,
    },
    {
      question: "Which event occurs on click?",
      options: ["onclick", "onhover", "onchange", "onload"],
      answer: 0,
    },
    {
      question: "Which keyword is used for constant?",
      options: ["var", "let", "const", "constant"],
      answer: 2,
    },
    {
      question: "JavaScript runs in?",
      options: ["Compiler", "Database", "Server only", "Browser"],
      answer: 3,
    },
  ];

  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 15;
  let timer;

  const elements = {
    score: document.getElementById("score"),
    currentQ: document.getElementById("current-q"),
    timeLeft: document.getElementById("time-left"),
    questionContainer: document.getElementById("question-container"),
    resultScreen: document.getElementById("result-screen"),
    question: document.getElementById("question"),
    options: document.getElementById("options"),
    qNumber: document.getElementById("q-number"),
    finalScore: document.getElementById("final-score"),
    grade: document.getElementById("grade"),
    restart: document.getElementById("restart"),
  };

  let selectedCategory = localStorage.getItem("quizCategory");
  let quizData = [];

  if (selectedCategory === "html") {
    quizData = htmlQuestions;
  } else if (selectedCategory === "css") {
    quizData = cssQuestions;
  } else {
    quizData = jsQuestions;
  }

  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 15;

    elements.timeLeft.textContent = timeLeft;

    elements.questionContainer.style.display = "block";
    elements.resultScreen.style.display = "none";
    updateDisplay();
    loadQuestion();
  }

  function loadQuestion() {
    clearInterval(timer);
    timeLeft = 15;
    if (currentQuestion >= quizData.length) {
      endQuiz();
      return;
    }

    elements.timeLeft.textContent = timeLeft;

    const q = quizData[currentQuestion];
    elements.question.textContent = q.question;
    elements.qNumber.textContent = currentQuestion + 1;
    elements.currentQ.textContent = currentQuestion + 1;

    elements.options.innerHTML = "";
    q.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = option;
      btn.onclick = () => selectAnswer(index);
      elements.options.appendChild(btn);
    });

    startTimer();
  }

  function selectAnswer(selectedIndex) {
    clearInterval(timer);
    const options = elements.options.children;

    quizData[currentQuestion].options.forEach((_, index) => {
      if (index === quizData[currentQuestion].answer) {
        options[index].classList.add("correct");
      } else if (index === selectedIndex) {
        options[index].classList.add("incorrect");
      }
      options[index].style.pointerEvents = "none";
    });

    if (selectedIndex === quizData[currentQuestion].answer) {
      score++;
    }

    setTimeout(() => {
      currentQuestion++;
      updateDisplay();
      loadQuestion();
    }, 1500);
  }

  function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
      timeLeft--;
      elements.timeLeft.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz(true);
      }
    }, 1000);
  }

  function updateDisplay() {
    elements.score.textContent = score;
  }

  function endQuiz(isTimeup = false) {
    elements.questionContainer.style.display = "none";
    elements.resultScreen.style.display = "block";
    elements.finalScore.textContent = score;

    if (isTimeup) {
      elements.grade.textContent = "⏰ Time's Up!";
      elements.grade.className = "grade poor";
      return;
    }

    const percentage = (score / quizData.length) * 100;
    let gradeText = "";

    if (percentage >= 80) {
      gradeText = "👏 Excellent! Tech Master!";
      elements.grade.className = "grade excellent";
    } else if (percentage >= 60) {
      gradeText = "👍 Good Job! Keep Learning!";
      elements.grade.className = "grade good";
    } else {
      gradeText = "📚 Practice More! You Got This!";
      elements.grade.className = "grade poor";
    }

    elements.grade.textContent = gradeText;
  }

  elements.restart.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  startQuiz();
});