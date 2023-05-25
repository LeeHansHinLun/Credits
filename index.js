const darkModeValue = false;

fetch('credits.json')
    .then(response => response.json())
    .then(data => {
        // Process the data and replace \n with <br> tags
        data.forEach(credit => {
            credit.description = credit.description.replace(/\n/g, '<br>');
        });

        // Generate the credits
        generateCredits(data);
    });

function generateCredits(creditsData) {
    const creditsContainer = document.getElementById('credits-container');

    creditsData.forEach(credit => {
        const creditElement = document.createElement('div');
        creditElement.classList.add('credit');

        const heading = document.createElement('h3');
        heading.textContent = credit.name;

        const description = document.createElement('p');
        description.innerHTML = credit.description;

        const button = document.createElement('a');
        button.classList.add('button');
        button.href = credit.url;
        button.target = '_blank';
        button.textContent = 'Visit Website';

        creditElement.appendChild(heading);
        creditElement.appendChild(description);
        creditElement.appendChild(button);

        creditsContainer.appendChild(creditElement);
    });
}

// Dark Mode (Or else my eyes would burn)
document.addEventListener('DOMContentLoaded', () => {
    /**
     * Old code
    const toggleButton = document.getElementById('toggle-button');
    const creditsContainer = document.getElementById('credits-container');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        creditsContainer.classList.toggle('dark-mode');
        toggleButton.classList.toggle('dark-mode');
    });
     */
    darkMode(true);
});

function darkMode(conditional) {
    const toggleButton = document.getElementById('toggle-button');
    const creditsContainer = document.getElementById('credits-container');
    const body = document.body;

    if (conditional) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            creditsContainer.classList.toggle('dark-mode');
            toggleButton.classList.toggle('dark-mode');
            
            if (darkModeValue) {
                darkModeValue = false;

                if (checkCookieExistence("darkMode")) {
                    modifyCookie("darkMode", "false", 365);
                } else {
                    setCookie("darkMode", "false", 365)
                }
            } else {
                darkModeValue = true;

                if (checkCookieExistence("darkMode")) {
                    modifyCookie("darkMode", "true", 365);
                } else {
                    setCookie("darkMode", "true", 365)
                }
            }
        });
    } else {
        body.classList.toggle('dark-mode');
        creditsContainer.classList.toggle('dark-mode');
        toggleButton.classList.toggle('dark-mode');
    }
}

// Read darkMode data, only check if it exists
if (checkCookieExistence("darkMode")) {
    console.log("Dark mode is already set!")
    const cookie = getCookie("darkMode")
    
    // Start checking
    if (cookie == "true") {
        darkMode(); // Not conditional (button press not required)
        console.log("Dark mode enabled");
    } else {
        console.log("Dark mode disabled by default");
    }
} else {
    console.log("Dark mode is not set!")
}


/**
 * CookieLib
 * Simple cookie manager
 */

// Sets a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Get a cookie value
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return ""; // Return an empty string if cookie not found
}

// Modifies a cookie
function modifyCookie(name, value, days) {
    setCookie(name, value, days);
}

function checkCookieExistence(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return true; // Cookie found
        }
    }
    return false; // Cookie not found
}