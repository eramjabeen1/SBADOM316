document.addEventListener("DOMContentLoaded", () => {
    let currentAssistant = ''; // stores which superhero is selected

    // setting default background for the main page
    document.body.style.background = "url('https://i.etsystatic.com/23006761/r/il/d1347a/2807703306/il_1140xN.2807703306_k4x6.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";

    // references to different elements on the page
    const assistantMessage = document.getElementById('assistant-message');
    const heroButtons = document.querySelectorAll('.hero-btn');
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const triviaBtn = document.getElementById('trivia-btn');
    const triviaMessage = document.getElementById('trivia-message');
    const motivateBtn = document.getElementById('motivate-btn');
    const motivationMessage = document.getElementById('motivation-message');
    const toggleThemeBtn = document.getElementById('toggle-theme');
    const reminderInput = document.getElementById('reminder-text');
    const reminderTime = document.getElementById('reminder-time');
    const setReminderBtn = document.getElementById('set-reminder-btn');
    const reminderMessage = document.getElementById('reminder-message');


    // function for text to speech .. will see if have time to adjust pitch to match batmans deep voice etc
    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }

    // superhero messages when selected
    const messages = {
        'ironman': "hello, im iron man. lets get things done like a genius! Jarvis has malfunctioned, but dont worry i still got this!",
        'joker': "why so serious?! let's cause some chaos! get things done before harley brings her bat and squad, or i might just join them!",
        'batman': "i'm batman, strategic plans are made in the shadows. if you choose to work alone, be ready. but if you work with me, stay sharp.",
        'spiderman': "hey there! let's make this fun and get stuff done. you can always count on me! but if you slack Auntie May is gonna be upset!"
    };

    // superhero background images
    const heroImages = {
        'ironman': 'https://th.bing.com/th/id/R.eddba2ded16b273b3ec67c5441949c69?rik=jCACevbnKXLcJw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fbiJl8uL.jpg&ehk=7pWU1C0a1k%2bsf06BG8lXWVqqCCJBkqCs%2buMThyoR%2bzE%3d&risl=&pid=ImgRaw&r=0',
        'joker': 'https://wallpapers.com/images/featured/joker-4k-ultra-hd-nqksld537cd7elix.jpg',
        'batman': 'https://4kwallpapers.com/images/walls/thumbs_2t/18659.jpg',
        'spiderman': 'https://4kwallpapers.com/images/walls/thumbs_2t/13495.jpg'
    };

    // function to change the background when selecting a superhero
    const heroSounds = {
        'joker': new Audio('https://www.myinstants.com/media/sounds/joker-laugh.mp3')
    };

    function chooseAssistant(hero) {
        currentAssistant = hero;
        document.body.style.background = `url('${heroImages[hero]}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
        speak(messages[hero]); // speak hero introduction

        // HIDE the assistant message once a hero is selected
        assistantMessage.style.display = "none";

        // play sound maybe if i add later..
        if (heroSounds[hero]) {
            heroSounds[hero].play();
        }

        // spiderman animation 
        if (hero === "spiderman") {
            showHeroAnimation(hero);
        }
    }

    // adding event listener to hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function () {
            chooseAssistant(this.dataset.hero);
        });
    });

    // task manager
    addTaskBtn.addEventListener('click', function () {
        if (taskInput.value.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }
        let taskItem = document.createElement('li');
        taskItem.textContent = taskInput.value;
        let removeBtn = document.createElement('button');
        removeBtn.textContent = '✔ Done';
        removeBtn.style.marginLeft = '10px';
        removeBtn.addEventListener('click', () => taskItem.remove());
        taskItem.appendChild(removeBtn);
        taskList.appendChild(taskItem);
        speak(`Task added: ${taskInput.value}`);
        taskInput.value = '';
    });

    // reminder with pop up alert 
    setReminderBtn.addEventListener('click', function () {
        if (reminderInput.value.trim() === '' || reminderTime.value.trim() === '') {
            alert('Please enter a reminder and time.');
            return;
        }
        let time = parseInt(reminderTime.value) * 1000;
        let message = `Reminder: ${reminderInput.value}`;
        reminderMessage.textContent = `Reminder set for ${reminderTime.value} seconds...`;
        setTimeout(() => {
            alert(message);
            speak(message);
            reminderMessage.textContent = '';
        }, time);
    });

    // fun facts 
    triviaBtn.addEventListener('click', function () {
        if (!currentAssistant) {
            alert("Choose a superhero first!");
            return;
        }
        let facts = {
            'ironman': ["Iron Man built his first suit in a cave!", "Tony Stark has over 50 suits!", "Iron Man helped form the Avengers."],
            'joker': ["The Joker has no definitive origin story!", "He was originally meant to be killed off early.", "The Joker once ran for political office in comics."],
            'batman': ["Batman was trained by the League of Shadows!", "His real name is Bruce Wayne.", "Batman never kills his enemies."],
            'spiderman': ["Spider-Man was created by Stan Lee and Steve Ditko!", "Peter Parker was bitten by a radioactive spider.", "He made his first appearance in Amazing Fantasy #15."]
        };
        let randomFact = facts[currentAssistant][Math.floor(Math.random() * facts[currentAssistant].length)];
        triviaMessage.textContent = randomFact;
        speak(randomFact);
    });

    // superhero motivational quotes
    motivateBtn.addEventListener('click', function () {
        if (!currentAssistant) {
            alert("Choose a superhero first!");
            return;
        }
        let quotes = {
            'ironman': ["Heroes are made by the paths they choose, not the powers they are graced with.", "Sometimes you gotta run before you can walk."],
            'joker': ["Smile, because it confuses people.", "Introduce a little anarchy."],
            'batman': ["It's not who I am underneath, but what I do that defines me.", "The night is darkest just before the dawn."],
            'spiderman': ["With great power comes great responsibility!", "No matter how hard you try, you will make mistakes. It’s the best way to learn."]
        };

        let randomQuote = quotes[currentAssistant][Math.floor(Math.random() * quotes[currentAssistant].length)];
        motivationMessage.textContent = randomQuote;
        speak(randomQuote);
    });

    // dark light mode toggle even tho it wasnt really needed 
    toggleThemeBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
    });

    // spidey animation flying across screen
    function showHeroAnimation(hero) {
        if (hero !== "spiderman") return; // stops function if not spidey

        let heroLogo = document.createElement("img");
        heroLogo.src = 'https://pngfre.com/wp-content/uploads/spider-man-9-1.png';
        heroLogo.style.position = "absolute";
        heroLogo.style.height = "100px";
        heroLogo.style.zIndex = "1000";
        heroLogo.style.left = "-50px";
        heroLogo.style.top = "10%";
        heroLogo.style.animation = "swing 3s linear forwards";

        document.body.appendChild(heroLogo);

        setTimeout(() => {
            document.body.removeChild(heroLogo);
        }, 3000);
    }
});