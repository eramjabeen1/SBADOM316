document.addEventListener("DOMContentLoaded", () => {
    let currentAssistant = ''; // stores which superhero is selected

    // getting references to different elements on the page
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

    // superhero messages when selected
    const messages = {
        'ironman': "hello, i'm iron man. let's get things done like a genius!",
        'joker': "why so serious? let's cause some chaos!",
        'batman': "i'm batman. let's be strategic about this.",
        'spiderman': "hey there! let's make this fun and get stuff done."
    };

    // superhero background images
    const heroImages = {
        'ironman': 'https://th.bing.com/th/id/R.eddba2ded16b273b3ec67c5441949c69?rik=jCACevbnKXLcJw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fbiJl8uL.jpg&ehk=7pWU1C0a1k%2bsf06BG8lXWVqqCCJBkqCs%2buMThyoR%2bzE%3d&risl=&pid=ImgRaw&r=0',
        'joker': 'https://wallpapers.com/images/featured/joker-4k-ultra-hd-nqksld537cd7elix.jpg',
        'batman': 'https://4kwallpapers.com/images/walls/thumbs_2t/18659.jpg',
        'spiderman': 'https://4kwallpapers.com/images/walls/thumbs_2t/13495.jpg'
    };

    // function to change the background when selecting a superhero
    function chooseAssistant(hero) {
        currentAssistant = hero;
        document.body.style.background = `url('${heroImages[hero]}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

    // adding event listener to hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function () {
            chooseAssistant(this.dataset.hero);
        });
    });

    // task manager - adding tasks
    addTaskBtn.addEventListener('click', function () {
        if (taskInput.value.trim() === '') {
            alert('task cannot be empty!'); // prevents adding blank tasks
            return;
        }
        let taskItem = document.createElement('li');
        taskItem.textContent = taskInput.value;
        let removeBtn = document.createElement('button'); // adds remove button
        removeBtn.textContent = '💥'; // explosion emoji for delete button
        removeBtn.style.marginLeft = '10px';
        removeBtn.addEventListener('click', () => taskItem.remove()); // removes task on click
        taskItem.appendChild(removeBtn);
        taskList.appendChild(taskItem);
        taskInput.value = ''; // clears input after adding task
    });

    // set a reminder with a pop-up alert
    setReminderBtn.addEventListener('click', function () {
        if (reminderInput.value.trim() === '' || reminderTime.value.trim() === '') {
            alert('please enter a reminder and time.'); // prevents empty reminders
            return;
        }
        let time = parseInt(reminderTime.value) * 1000; // converts seconds to milliseconds
        let message = `reminder: ${reminderInput.value}`;
        reminderMessage.textContent = `reminder set for ${reminderTime.value} seconds...`;
        setTimeout(() => {
            alert(message);
            reminderMessage.textContent = '';
        }, time);
    });

    // superhero trivia - displays a random fact
    triviaBtn.addEventListener('click', function () {
        if (!currentAssistant) {
            alert("choose a superhero first!"); // makes sure a hero is selected first
            return;
        }
        let facts = {
            'ironman': ["iron man built his first suit in a cave!", "tony stark has over 50 suits!", "iron man helped form the avengers."],
            'joker': ["the joker has no definitive origin story!", "he was originally meant to be killed off early.", "the joker once ran for political office in comics."],
            'batman': ["batman was trained by the league of shadows!", "his real name is bruce wayne.", "batman never kills his enemies."],
            'spiderman': ["spider-man was created by stan lee and steve ditko!", "peter parker was bit by a radioactive spider.", "he made his first appearance in amazing fantasy #15."]
        };
        let randomFact = facts[currentAssistant][Math.floor(Math.random() * facts[currentAssistant].length)];
        triviaMessage.textContent = randomFact;
    });

    // motivational quotes for each hero
    motivateBtn.addEventListener('click', function () {
        if (!currentAssistant) {
            alert("choose a superhero first!"); // makes sure a hero is selected first
            return;
        }
        let quotes = {
            'ironman': ["sometimes you gotta run before you can walk!", "heroes are made by the paths they choose, not the powers they are graced with.", "i am iron man."],
            'joker': ["smile, because it confuses people.", "if you're good at something, never do it for free.", "introduce a little anarchy."],
            'batman': ["it's not who i am underneath, but what i do that defines me.", "a hero can be anyone.", "i wear a mask. and that mask is not to hide who i am, but to create what i am."],
            'spiderman': ["with great power comes great responsibility!", "no one can win every battle, but no man should fall without a struggle.", "sometimes we have to be steady and give up the things we want the most."]
        };
        let randomQuote = quotes[currentAssistant][Math.floor(Math.random() * quotes[currentAssistant].length)];
        motivationMessage.textContent = randomQuote;
    });

    // dark mode toggle button
    toggleThemeBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');
    });

    // default background for main page
    document.body.style.background = "url('https://i.etsystatic.com/23006761/r/il/d1347a/2807703306/il_1140xN.2807703306_k4x6.jpg') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
});