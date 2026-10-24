/*A BIRTHDAY WORLD FOR MY KUCHU PUCHU 💗
   Complete JavaScript*/

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /*1. HELPERS & PAGE NAVIGATION*/

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const screens = $$(".screen");
    const globalHearts = $("#globalHearts");
    let currentScreen = "wishScreen";

    /* CUTE FLOATING HEARTS — PASSWORD PAGE 💗 */

const passwordScreen = $("#passwordScreen");

if (passwordScreen && !$(".password-floating-hearts", passwordScreen)) {
const heartContainer = document.createElement("div");
heartContainer.className = "password-floating-hearts";
heartContainer.setAttribute("aria-hidden", "true");


const symbols = ["♡", "♥", "💕", "💗", "♡"];
const colors = ["#ffb6d9", "#ffc7e8", "#f7a8d4", "#ffd6ec", "#e9b7ff"];

for (let i = 24; i > 0; i--) {
    const heart = document.createElement("span");

    heart.className = "wish-floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.setProperty("--heart-left", `${Math.random() * 100}%`);
    heart.style.setProperty("--heart-size", `${10 + Math.random() * 15}px`);
    heart.style.setProperty("--heart-duration", `${9 + Math.random() * 12}s`);
    heart.style.setProperty("--heart-delay", `${-Math.random() * 18}s`);
    heart.style.setProperty("--heart-drift", `${-35 + Math.random() * 70}px`);
    heart.style.setProperty("--heart-opacity", `${0.25 + Math.random() * 0.4}`);
    heart.style.setProperty(
        "--heart-color",
        colors[Math.floor(Math.random() * colors.length)]
    );

    heartContainer.appendChild(heart);
}

passwordScreen.prepend(heartContainer);


}


    /* CUTE FLOATING HEARTS — FIRST PAGE ONLY 💗 */

const wishScreen = $("#wishScreen");

if (wishScreen && !$(".wish-floating-hearts", wishScreen)) {
const heartContainer = document.createElement("div");
heartContainer.className = "wish-floating-hearts";
heartContainer.setAttribute("aria-hidden", "true");


const heartSymbols = ["♡", "♥", "♡", "💕", "♡", "💗"];
const heartColors = [
    "#ffb6d9",
    "#ffc7e8",
    "#f7a8d4",
    "#ffd6ec",
    "#e9b7ff"
];

for (let i = 0; i < 26; i++) {
    const heart = document.createElement("span");

    heart.className = "wish-floating-heart";
    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.setProperty("--heart-left", `${Math.random() * 100}%`);
    heart.style.setProperty("--heart-size", `${10 + Math.random() * 15}px`);
    heart.style.setProperty("--heart-duration", `${9 + Math.random() * 12}s`);
    heart.style.setProperty("--heart-delay", `${-Math.random() * 18}s`);
    heart.style.setProperty("--heart-drift", `${-35 + Math.random() * 70}px`);
    heart.style.setProperty("--heart-opacity", `${0.25 + Math.random() * 0.4}`);
    heart.style.setProperty(
        "--heart-color",
        heartColors[Math.floor(Math.random() * heartColors.length)]
    );

    heartContainer.appendChild(heart);
}

wishScreen.prepend(heartContainer);


}

    /* MEMORY BOOK ELEMENTS */
    const totalPhotos = 31;
    const photoFolder = "photos.jpg/";
    const BOOK_SPEED = 4500;

    const memoryPhoto = $("#memoryPhoto");
    const pageNumber = $("#pageNumber");
    const memoryCaption = $("#memoryCaption");
    const bookCover = $("#bookCover");
    const bookPage = $("#bookPage");
    const openBookButton = $("#openBookButton");
    const pauseBookButton = $("#pauseBook");
    const replayBookButton = $("#replayBook");
    const bookNextButton = $("#bookNext");
    const bookFinishButton = $("#bookFinish");

    let currentPhoto = 1;
    let bookTimer = null;
    let bookPaused = false;
    let bookOpened = false;
    let bookOpenDelay = null;

    function stopBookTimer() {
        clearInterval(bookTimer);
        bookTimer = null;
    }

    function resetBook() {
        stopBookTimer();
        clearTimeout(bookOpenDelay);

        bookOpened = false;
        bookPaused = false;
        currentPhoto = 1;

        if (bookCover) {
            bookCover.classList.remove("book-cover-open");
        }

        if (bookPage) {
            bookPage.classList.add("hidden");
            bookPage.classList.remove("book-page-open");
        }

        if (pauseBookButton) {
            pauseBookButton.textContent = "Pause";
        }
    }

    function showScreen(screenId) {
        const nextScreen = document.getElementById(screenId);

        if (!nextScreen) {
            console.warn("Screen not found:", screenId);
            return;
        }

        screens.forEach(screen => {
            screen.classList.remove("active");
            screen.setAttribute("aria-hidden", "true");
        });

        nextScreen.classList.add("active");
        nextScreen.setAttribute("aria-hidden", "false");

        currentScreen = screenId;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        /* AUTOMATICALLY OPEN MEMORY BOOK */
        if (screenId === "bookScreen") {
            resetBook();

            bookOpenDelay = setTimeout(() => {
                if (currentScreen === "bookScreen") {
                    openBook();
                }
            }, 400);
        } else {
            stopBookTimer();
        }

        if (screenId === "birthdayScreen") {
            runBirthdayAnimation();
        }

        if (screenId === "treeScreen") {
            startTreeStars();
        }

        if (screenId === "arrowScreen") {
            resetArrowScene();
        }

        if (screenId === "kuchuScreen") {
            runKuchuAnimation();
        }

        if (screenId === "surpriseScreen") {
            animateTeddies();
        }

        if (screenId === "endingScreen") {
            resetFinalHeart();
        }

        createGlobalHearts();
    }

    $$("[data-go]").forEach(button => {
        button.addEventListener("click", () => {
            showScreen(button.dataset.go);
        });
    });


    /*2. GLOBAL FLOATING HEARTS*/

    function createGlobalHearts() {
        if (!globalHearts) return;

        globalHearts.replaceChildren();
        clearInterval(globalHeartTimer);
        globalHeartTimer = null;

        if (![
    "birthdayScreen",
    "kuchuScreen",
    "letterScreen",
    "endingScreen"
    ].includes(currentScreen)) {
    return;
}

        globalHeartTimer = setInterval(() => {
            const heart = document.createElement("span");

            heart.className = "global-floating-heart";

            heart.textContent = [
                "♡", "♥", "💗", "✦"
            ][Math.floor(Math.random() * 4)];

            heart.style.left = `${Math.random() * 100}%`;

            heart.style.setProperty(
                "--heart-duration",
                `${6 + Math.random() * 5}s`
            );

            heart.style.fontSize =
                `${12 + Math.random() * 22}px`;

            globalHearts.appendChild(heart);

            setTimeout(() => heart.remove(), 9500);
        }, 450);
    }


    /*3. MAKE A WISH & BLOW CANDLES*/

    const birthdayCake = $("#birthdayCake");
    const wishMessage = $("#wishMessage");
    const blowCandlesButton = $("#blowCandlesButton");
    const wishContinueButton = $("#wishContinueButton");
    const replayWishButton = $("#replayWishButton");

    let candlesBlown = false;
    let automaticBlowTimer = null;

    function blowCandles(automatic = false) {
        if (candlesBlown) return;

        candlesBlown = true;

        $$(".flame").forEach((flame, index) => {
            setTimeout(() => {
                flame.classList.add("flame-out");
            }, index * 180);
        });

        if (birthdayCake) {
            birthdayCake.classList.add("candles-blown");
        }

        if (wishMessage) {
            wishMessage.textContent = automatic
                ? "Your wish is floating into the stars, Motu✨"
                : "Wish made! May your beautiful dreams come true My Motu💗";

            wishMessage.classList.add("wish-message-reveal");
        }

        if (blowCandlesButton) {
            blowCandlesButton.disabled = true;
            blowCandlesButton.textContent =
                "Wish sent to the God";
        }

        if (wishContinueButton) {
            wishContinueButton.classList.remove("hidden");

            wishContinueButton.animate(
                [
                    {
                        opacity: 0,
                        transform: "translateY(12px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 800,
                    fill: "forwards"
                }
            );
        }

        createWishParticles();
    }

    function resetWish() {
        clearTimeout(automaticBlowTimer);
        candlesBlown = false;

        $$(".flame").forEach(flame => {
            flame.classList.remove("flame-out");
        });

        if (birthdayCake) {
            birthdayCake.classList.remove("candles-blown");
        }

        if (wishMessage) {
            wishMessage.textContent =
                "Make a beautiful wish, Betuu";

            wishMessage.classList.remove("wish-message-reveal");
        }

        if (blowCandlesButton) {
            blowCandlesButton.disabled = false;
            blowCandlesButton.textContent =
                "Send your wish to God!";
        }

        if (wishContinueButton) {
            wishContinueButton.classList.add("hidden");
        }

        automaticBlowTimer = setTimeout(() => {
            if (currentScreen === "wishScreen") {
                blowCandles(true);
            }
        }, 10000);
    }

    if (blowCandlesButton) {
        blowCandlesButton.addEventListener("click", () => {
            clearTimeout(automaticBlowTimer);
            blowCandles(false);
        });
    }

    if (replayWishButton) {
        replayWishButton.addEventListener("click", resetWish);
    }

    resetWish();


    /*4. PASSWORD — DOSA*/

    const passwordForm = $("#passwordForm");
    const passwordInput = $("#passwordInput");
    const teddyError = $("#teddyError");

    if (passwordForm) {
        passwordForm.addEventListener("submit", event => {
            event.preventDefault();

            const enteredPassword = passwordInput.value
                .trim()
                .toUpperCase();

            if (enteredPassword === "DOSA") {
                if (teddyError) {
                    teddyError.textContent =
                        "Awww yaad aagaya betu ko";

                    teddyError.classList.remove("error-message");
                    teddyError.classList.add("success-message");
                }

                passwordInput.value = "";

                setTimeout(() => {
                    showScreen("birthdayScreen");
                }, 650);
            } else {
                if (teddyError) {
                    teddyError.classList.remove("success-message");
                    teddyError.classList.add("error-message");

                    teddyError.textContent =
                        "Kya matlab aapko yaad ni hai ab dekhna";
                }

                const card = $(".password-card");

                if (card) {
                    card.classList.remove("password-shake");
                    void card.offsetWidth;
                    card.classList.add("password-shake");
                }

                passwordInput.value = "";
                passwordInput.focus();
            }
        });
    }


    /*5. HAPPY BIRTHDAY ANIMATION*/

    function runBirthdayAnimation() {
        const heading = $(".birthday-heading");
        const frame = $(".birthday-heart-frame");
        const sparkles = $(".birthday-sparkles");

        if (heading) {
            heading.classList.remove("birthday-enter");
            void heading.offsetWidth;
            heading.classList.add("birthday-enter");
        }

        if (frame) {
            frame.classList.remove("heart-frame-enter");
            void frame.offsetWidth;
            frame.classList.add("heart-frame-enter");
        }

        if (sparkles) {
            sparkles.replaceChildren();

            for (let i = 0; i < 45; i++) {
                const star = document.createElement("span");

                star.className = "birthday-star";
                star.textContent =
                    Math.random() > 0.5 ? "✦" : "·";

                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;

                star.style.animationDelay =
                    `${Math.random() * 3}s`;

                sparkles.appendChild(star);
            }
        }
    }


    /* 6. MEMORY BOOK — AUTOMATIC 31-PHOTO SLIDESHOW*/

    const captions = [
        "Every little moment with you is precious. ♡",
        "A memory I wish I could frame forever. 💗",
        "You make ordinary days feel extraordinary.",
        "One photograph, a thousand feelings.",
        "A little moment, a lot of happiness. ✨",
        "Some memories never lose their magic.",
        "A smile that makes the whole day brighter.",
        "Keeping this moment close to my heart.",
        "A beautiful memory in our little story.",
        "If moments could last forever, this would. ♡",
        "The kind of memory that makes me smile.",
        "One more reason to be grateful for you.",
        "A page in our story worth keeping.",
        "This moment deserves its own little celebration.",
        "Some pictures feel like a warm hug.",
        "A memory wrapped in a little happiness.",
        "The best moments are often the simplest.",
        "Another page filled with smiles.",
        "A tiny memory with a big place in my heart.",
        "A moment to revisit whenever we want.",
        "Saving the happiness in this picture.",
        "Our little collection of lovely moments.",
        "This memory is one of my favourites. 💕",
        "A photograph today, a treasure tomorrow.",
        "A smile worth remembering again and again.",
        "Another beautiful piece of our story.",
        "A moment that deserves a thousand hearts.",
        "A little happiness preserved in a picture.",
        "Every photo has its own special feeling.",
        "Almost at the end of our little journey. ♡",
        "The final page, but never the end of lovely memories. 💗"
    ];

    function displayPhoto(photoIndex) {
        if (!memoryPhoto) return;

        currentPhoto = Math.max(
            1,
            Math.min(totalPhotos, photoIndex)
        );

        memoryPhoto.classList.remove("photo-page-turn");
        void memoryPhoto.offsetWidth;
        memoryPhoto.classList.add("photo-page-turn");

        memoryPhoto.src =
            `${photoFolder}${currentPhoto}.jpeg`;

        memoryPhoto.alt =
            `Memory photograph ${currentPhoto}`;

        if (pageNumber) {
            pageNumber.textContent =
                `Memory ${currentPhoto} of ${totalPhotos}`;
        }

        if (memoryCaption) {
            memoryCaption.textContent =
                captions[currentPhoto - 1];
        }

        if (bookNextButton) {
            bookNextButton.classList.toggle(
                "hidden",
                currentPhoto === totalPhotos
            );
        }

        if (bookFinishButton) {
            bookFinishButton.classList.toggle(
                "hidden",
                currentPhoto !== totalPhotos
            );
        }
    }

    function openBook() {
        if (bookOpened) return;

        bookOpened = true;

        if (bookCover) {
            bookCover.classList.add("book-cover-open");
        }

        /* Wait for the cover animation before showing the photo page */
        setTimeout(() => {
            if (currentScreen !== "bookScreen") return;

            if (bookPage) {
                bookPage.classList.remove("hidden");
                bookPage.classList.add("book-page-open");
            }

            displayPhoto(1);

            /* Automatically start the slideshow */
            startBookSlideshow();
        }, 900);
    }

    function startBookSlideshow() {
        stopBookTimer();

        bookPaused = false;

        if (pauseBookButton) {
            pauseBookButton.textContent = "Pause";
        }

        bookTimer = setInterval(() => {
            if (currentScreen !== "bookScreen" || bookPaused) {
                return;
            }

            if (currentPhoto < totalPhotos) {
                displayPhoto(currentPhoto + 1);
            } else {
                stopBookTimer();
            }
        }, BOOK_SPEED);
    }

    /* Optional manual open button */
    if (openBookButton) {
        openBookButton.addEventListener("click", () => {
            if (!bookOpened) {
                openBook();
            }
        });
    }

    /* Next photo */
    if (bookNextButton) {
        bookNextButton.addEventListener("click", () => {
            if (!bookOpened) {
                openBook();
                return;
            }

            if (currentPhoto < totalPhotos) {
                displayPhoto(currentPhoto + 1);
            }

            if (currentPhoto === totalPhotos) {
                stopBookTimer();
            }
        });
    }

    /* Pause and resume */
    if (pauseBookButton) {
        pauseBookButton.addEventListener("click", () => {
            if (!bookOpened) return;

            bookPaused = !bookPaused;

            pauseBookButton.textContent =
                bookPaused ? "Resume" : "Pause";
        });
    }

    /* Replay from the first photo */
    if (replayBookButton) {
        replayBookButton.addEventListener("click", () => {
            stopBookTimer();

            if (currentScreen !== "bookScreen") {
                showScreen("bookScreen");
                return;
            }

            resetBook();
            openBook();
        });
    }

    /* Finish the book */
    if (bookFinishButton) {
        bookFinishButton.addEventListener("click", () => {
            stopBookTimer();
            showScreen("optionsScreen");
        });
    }

    /* Show a helpful message if a photo cannot load */
    if (memoryPhoto) {
        memoryPhoto.addEventListener("error", () => {
            memoryPhoto.alt =
                `Photo ${currentPhoto} could not be loaded. Check its filename and folder.`;

            console.warn(
                "Could not load photo:",
                memoryPhoto.src
            );
        });
    }



    /*8. CUPID'S ARROW*/

    const targetHeart = $("#targetHeart");
    const cupidArrow = $("#cupidArrow");
    const arrowParticles = $("#arrowParticles");
    const shootArrowButton = $("#shootArrow");

    let arrowInProgress = false;

    function resetArrowScene() {
        arrowInProgress = false;

        if (targetHeart) {
            targetHeart.classList.remove(
                "heart-hit",
                "heart-explosion"
            );
        }

        if (cupidArrow) {
            cupidArrow.classList.remove("arrow-shooting");
        }

        if (shootArrowButton) {
            shootArrowButton.disabled = false;
            shootArrowButton.textContent =
                "Release the Arrow 💘";
        }

        if (arrowParticles) {
            arrowParticles.replaceChildren();
        }
    }

    function createArrowExplosion() {
        if (!arrowParticles) return;

        arrowParticles.replaceChildren();

        for (let i = 0; i < 55; i++) {
            const particle = document.createElement("span");

            particle.className = "arrow-particle";

            particle.textContent = [
                "♥", "♡", "✦", "💗"
            ][Math.floor(Math.random() * 4)];

            const angle = Math.random() * Math.PI * 2;
            const distance = 60 + Math.random() * 240;

            particle.style.setProperty(
                "--particle-x",
                `${Math.cos(angle) * distance}px`
            );

            particle.style.setProperty(
                "--particle-y",
                `${Math.sin(angle) * distance}px`
            );

            particle.style.setProperty(
                "--particle-delay",
                `${Math.random() * 0.25}s`
            );

            arrowParticles.appendChild(particle);
        }
    }

    if (shootArrowButton) {
        shootArrowButton.addEventListener("click", () => {
            if (arrowInProgress) return;

            arrowInProgress = true;
            shootArrowButton.disabled = true;

            shootArrowButton.textContent =
                "Love is on its way... 💗";

            if (cupidArrow) {
                cupidArrow.classList.remove("arrow-shooting");
                void cupidArrow.offsetWidth;
                cupidArrow.classList.add("arrow-shooting");
            }

            setTimeout(() => {
                if (currentScreen !== "arrowScreen") return;

                if (targetHeart) {
                    targetHeart.classList.add("heart-hit");
                }

                createArrowExplosion();
            }, 1000);

            setTimeout(() => {
                if (currentScreen !== "arrowScreen") return;

                if (targetHeart) {
                    targetHeart.classList.add("heart-explosion");
                }
            }, 1350);

            setTimeout(() => {
                if (currentScreen === "arrowScreen") {
                    showScreen("loveYouScreen");
                }
            }, 2400);
        });
    }


    /*10. KUCHU PUCHU HEART ANIMATION*/


    function runKuchuAnimation() {
        const content = $(".kuchu-content");
        const heart = $(".kitten-heart");
        const title = $(".kuchu-title");

        if (content) {
            content.classList.remove("kuchu-enter");
            void content.offsetWidth;
            content.classList.add("kuchu-enter");
        }

        if (heart) {
            heart.classList.remove("kitten-heart-pulse");
            void heart.offsetWidth;
            heart.classList.add("kitten-heart-pulse");
        }

        if (title) {
            title.classList.remove("kuchu-title-enter");
            void title.offsetWidth;
            title.classList.add("kuchu-title-enter");
        }

        createKuchuParticles();
    }

    function createKuchuParticles() {
    const container = $(".kuchu-content");
    if (!container) return;

    $$(".kuchu-particle", container).forEach(p => p.remove());
}

    /*11. VINTAGE LOVE LETTER*/

    const letterMessage = $("#letterMessage");

    if (letterMessage) {
        letterMessage.setAttribute("aria-live", "polite");
    }


    /*12. TEDDY BEAR SURPRISE*/

    function animateTeddies() {
        const teddyGarden = $("#teddyGarden");
        if (!teddyGarden) return;

        $$(".teddy", teddyGarden).forEach((teddy, index) => {
            teddy.classList.remove("teddy-arrive");
            void teddy.offsetWidth;

            setTimeout(() => {
                teddy.classList.add("teddy-arrive");
            }, index * 180);
        });

        const gift = $(".surprise-gift");

        if (gift) {
            gift.classList.remove("gift-pop");
            void gift.offsetWidth;
            gift.classList.add("gift-pop");
        }
    }


    /*13. FINAL PAGE — GROWING HEART*/

    const endingHeart = $("#endingHeart");
    const finalButton = $("#finalButton");
    const restartJourneyButton = $("#restartJourney");

    let finalHeartGrown = false;

    function resetFinalHeart() {
        finalHeartGrown = false;

        if (endingHeart) {
            endingHeart.classList.remove("final-heart-grow");
        }

        if (finalButton) {
            finalButton.textContent = "Grow One Last Heart 💗";
            finalButton.disabled = false;
        }
    }

    function growFinalHeart() {
        if (finalHeartGrown) return;

        finalHeartGrown = true;

        if (endingHeart) {
            endingHeart.classList.remove("final-heart-grow");
            void endingHeart.offsetWidth;
            endingHeart.classList.add("final-heart-grow");
        }

        if (finalButton) {
            finalButton.textContent = "A Heart Full of Love 💖";
        }

        createFinalHeartParticles();
    }

    function createFinalHeartParticles() {
        const container = $(".ending-content");
        if (!container) return;

        $$(".final-heart-particle", container).forEach(p => p.remove());

        for (let i = 0; i < 65; i++) {
            const particle = document.createElement("span");

            particle.className = "final-heart-particle";

            particle.textContent = [
                "♥", "♡", "✦", "💕"
            ][Math.floor(Math.random() * 4)];

            particle.style.left = `${Math.random() * 100}%`;

            particle.style.top =
                `${30 + Math.random() * 50}%`;

            particle.style.setProperty(
                "--final-x",
                `${(Math.random() - 0.5) * 300}px`
            );

            particle.style.setProperty(
                "--final-y",
                `${-40 - Math.random() * 200}px`
            );

            container.appendChild(particle);

            setTimeout(() => particle.remove(), 3000);
        }
    }

    if (finalButton) {
        finalButton.addEventListener("click", growFinalHeart);
    }

    if (restartJourneyButton) {
        restartJourneyButton.addEventListener("click", () => {
            resetBook();
            resetWish();
            resetTree();
            resetArrowScene();
            resetFinalHeart();
            showScreen("wishScreen");
        });
    }


    /*14. INITIAL STATE*/

    screens.forEach(screen => {
        const isActive = screen.id === "wishScreen";

        screen.classList.toggle("active", isActive);

        screen.setAttribute(
            "aria-hidden",
            String(!isActive)
        );
    });

    if (bookPage) {
        bookPage.classList.add("hidden");
    }

    if (bookCover) {
        bookCover.classList.remove("book-cover-open");
    }

    if (treeCanopy) {
        treeCanopy.replaceChildren();
    }

    if (arrowParticles) {
        arrowParticles.replaceChildren();
    }

    if (passwordInput) {
        passwordInput.autocomplete = "off";
    }

    createLoveYouParticles();
    createGlobalHearts();

    console.log("Birthday surprise loaded successfully 💗");

});

/*DO YOU LOVE ME? — RUNAWAY NO BUTTON*/

(() => {
    const yesButton = document.getElementById("loveYesButton");
    const noButton = document.getElementById("loveNoButton");
    const buttonsArea = document.getElementById("loveQuestionButtons");
    const answerMessage = document.getElementById("loveAnswerMessage");

    if (!yesButton || !noButton || !buttonsArea || !answerMessage) {
        return;
    }

    let noHasEscaped = false;

    function moveNoButton(event) {
        if (answerMessage.hidden === false) return;

        // Desktop: only run when the pointer approaches the NO button.
        if (event && event.type === "pointerenter"
            && event.pointerType !== "mouse") {
            return;
        }

        const margin = 12;
        const maxX = Math.max(
            margin,
            window.innerWidth - noButton.offsetWidth - margin
        );
        const maxY = Math.max(
            margin,
            window.innerHeight - noButton.offsetHeight - margin
        );

        let x;
        let y;
        let attempts = 0;

        do {
            x = margin + Math.random() * (maxX - margin);
            y = margin + Math.random() * (maxY - margin);
            attempts++;
        } while (
            attempts < 30 &&
            Math.abs(x - noButton.getBoundingClientRect().left) < 150 &&
            Math.abs(y - noButton.getBoundingClientRect().top) < 100
        );

        noButton.classList.add("running-away");
        noHasEscaped = true;
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
    }

    // The NO button runs away when the mouse gets close.
    noButton.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse") {
            moveNoButton(event);
        }
    });

    // Also move it if someone tries clicking/tapping it.
    noButton.addEventListener("pointerdown", (event) => {
        event.preventDefault();
        moveNoButton(event);
    });

    noButton.addEventListener("click", (event) => {
        event.preventDefault();
        moveNoButton(event);
    });

    yesButton.addEventListener("click", () => {
        answerMessage.hidden = false;
        yesButton.hidden = true;
        noButton.hidden = true;

        // Keep the layout tidy after the answer.
        buttonsArea.style.minHeight = "0";

        // The message appears below the question.
        answerMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    // Reset the NO button when the surprise page is opened again.
    document.querySelectorAll('[data-go="surpriseScreen"]').forEach(button => {
        button.addEventListener("click", () => {
            noButton.classList.remove("running-away");
            noButton.style.left = "";
            noButton.style.top = "";
            noButton.hidden = false;
            yesButton.hidden = false;
            answerMessage.hidden = true;
            buttonsArea.style.minHeight = "";
            noHasEscaped = false;
        });
    });

    // Keep the runaway button within the visible screen after resizing.
    window.addEventListener("resize", () => {
        if (!noHasEscaped || noButton.hidden) return;

        const margin = 12;
        const maxX = Math.max(margin, window.innerWidth - noButton.offsetWidth - margin);
        const maxY = Math.max(margin, window.innerHeight - noButton.offsetHeight - margin);

        const rect = noButton.getBoundingClientRect();
        noButton.style.left = `${Math.min(Math.max(margin, rect.left), maxX)}px`;
        noButton.style.top = `${Math.min(Math.max(margin, rect.top), maxY)}px`;
    });
})();

/*FINAL PAGE — AUTO-SLIDING MEMORY GALLERY*/

(() => {
    const gallery = document.getElementById("endingMemoryGallery");
    const track = document.getElementById("endingGalleryTrack");

    if (!gallery || !track) return;

    const totalPhotos = 31;
    const photoFolder = "photos.jpg/";
    const slideDelay = 2800;

    let currentSlide = 0;
    let slideTimer = null;
    let isGalleryReady = false;

    function buildGallery() {
        if (isGalleryReady) return;

        // Add the original 31 photos.
        for (let i = 1; i <= totalPhotos; i++) {
            const frame = document.createElement("div");
            frame.className = "ending-polaroid";

            const img = document.createElement("img");
            img.src = `${photoFolder}${i}.jpeg`;
            img.alt = `Our memory ${i}`;
            img.loading = i <= 4 ? "eager" : "lazy";
            img.draggable = false;

            // Hide missing images instead of breaking the gallery.
            img.addEventListener("error", () => {
                frame.style.display = "none";
            });

            frame.appendChild(img);
            track.appendChild(frame);
        }

        // Duplicate the first few frames for a smooth loop.
        for (let i = 1; i <= 4; i++) {
            const original = track.children[i - 1];

            if (original) {
                const clone = original.cloneNode(true);
                clone.setAttribute("aria-hidden", "true");
                track.appendChild(clone);
            }
        }

        isGalleryReady = true;
    }

    function slideGallery() {
        const firstFrame = track.querySelector(".ending-polaroid");

        if (!firstFrame) return;

        const gap = parseFloat(
            getComputedStyle(track).columnGap
        ) || 22;

        const frameWidth = firstFrame.getBoundingClientRect().width;

        currentSlide++;

        track.style.transform =
            `translateX(-${currentSlide * (frameWidth + gap)}px)`;

        // Return to the beginning seamlessly after the original photos.
        if (currentSlide >= totalPhotos) {
            setTimeout(() => {
                track.style.transition = "none";
                currentSlide = 0;
                track.style.transform = "translateX(0)";

                // Force the browser to apply the reset before animating again.
                void track.offsetWidth;

                track.style.transition =
                    "transform 1s cubic-bezier(.22, .8, .25, 1)";
            }, 1050);
        }
    }

    function startSlideshow() {
        buildGallery();

        if (slideTimer) return;

        slideTimer = setInterval(slideGallery, slideDelay);
    }

    function stopSlideshow() {
        clearInterval(slideTimer);
        slideTimer = null;
    }

    // Start the automatic slideshow only when the final page is active.
    const endingScreen = document.getElementById("endingScreen");

    if (endingScreen) {
        const observer = new MutationObserver(() => {
            if (endingScreen.classList.contains("active")) {
                startSlideshow();
            } else {
                stopSlideshow();
            }
        });

        observer.observe(endingScreen, {
            attributes: true,
            attributeFilter: ["class"]
        });

        if (endingScreen.classList.contains("active")) {
            startSlideshow();
        }
    }

    // Recalculate slide width when the screen changes size.
    window.addEventListener("resize", () => {
        const firstFrame = track.querySelector(".ending-polaroid");

        if (!firstFrame) return;

        track.style.transition = "none";

        const gap = parseFloat(
            getComputedStyle(track).columnGap
        ) || 22;

        const frameWidth = firstFrame.getBoundingClientRect().width;

        track.style.transform =
            `translateX(-${currentSlide * (frameWidth + gap)}px)`;

        void track.offsetWidth;

        track.style.transition =
            "transform 1s cubic-bezier(.22, .8, .25, 1)";
    });
})();


/*A WALL FULL OF US — PHOTO WALL*/

(() => {
    const gallery = document.getElementById("photoWallGallery");
    const lightbox = document.getElementById("photoLightbox");
    const lightboxPhoto = document.getElementById("lightboxPhoto");
    const closeButton = document.getElementById("closePhotoLightbox");

    if (!gallery || !lightbox || !lightboxPhoto || !closeButton) return;

    // Prevent duplicate frames if this code is initialized again.
    if (gallery.dataset.initialized === "true") return;
    gallery.dataset.initialized = "true";

    for (let i = 1; i <= 31; i++) {
        const frame = document.createElement("button");
        frame.type = "button";
        frame.className = "photo-wall-frame";
        frame.setAttribute("aria-label", `Open memory ${i}`);

        const img = document.createElement("img");
        img.src = `photos.jpg/${i}.jpeg`;
        img.alt = `Our memory ${i}`;
        img.loading = i <= 8 ? "eager" : "lazy";
        img.draggable = false;

        img.addEventListener("error", () => {
            frame.remove();
        });

        frame.appendChild(img);
        gallery.appendChild(frame);

        frame.addEventListener("click", () => {
            lightboxPhoto.src = img.src;
            lightboxPhoto.alt = img.alt;
            lightbox.hidden = false;
            closeButton.focus();
        });
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightboxPhoto.src = "";
    }

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !lightbox.hidden) {
            closeLightbox();
        }
    });
})();

/*💗 SEND YOU A MILLION HEARTS*/

(() => {
    const button = document.getElementById("millionHeartsButton");

    if (!button || button.dataset.initialized === "true") return;

    button.dataset.initialized = "true";

    const hearts = ["💗", "♥", "💕", "♡", "❤️", "💞"];

    button.addEventListener("click", () => {
        // Create a beautiful shower of flying hearts.
        for (let i = 0; i < 65; i++) {
            setTimeout(() => {
                const heart = document.createElement("span");

                heart.className = "million-heart";
                heart.textContent =
                    hearts[Math.floor(Math.random() * hearts.length)];

                heart.style.left = `${Math.random() * 96}%`;
                heart.style.setProperty(
                    "--fly-duration",
                    `${2.5 + Math.random() * 2.5}s`
                );

                heart.style.fontSize = `${18 + Math.random() * 25}px`;

                document.body.appendChild(heart);

                heart.addEventListener("animationend", () => {
                    heart.remove();
                }, { once: true });

            }, i * 35);
        }

        // Little button celebration!
        button.textContent = "All My Love, Just for You! 💗";
    });
})();

/*🎂 BIRTHDAY LOVE EXPLOSION*/

(() => {
    const button = document.getElementById("birthdayHeartsButton");

    if (!button || button.dataset.initialized === "true") return;

    button.dataset.initialized = "true";

    const hearts = ["💗", "♥", "♡", "❤️",];

    button.addEventListener("click", () => {
        for (let i = 0; i < 65; i++) {
            setTimeout(() => {
                const heart = document.createElement("span");

                heart.className = "million-heart";
                heart.textContent =
                    hearts[Math.floor(Math.random() * hearts.length)];

                heart.style.left = `${Math.random() * 96}%`;
                heart.style.setProperty(
                    "--fly-duration",
                    `${2.5 + Math.random() * 2.5}s`
                );

                heart.style.fontSize = `${18 + Math.random() * 25}px`;

                document.body.appendChild(heart);

                heart.addEventListener("animationend", () => {
                    heart.remove();
                }, { once: true });

            }, i * 35);
        }

        button.textContent = "Now Summuu is Full of Love!";
    });
})();
