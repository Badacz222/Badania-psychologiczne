// WSTAW TU SWÓJ LINK DO GOOGLE APPS SCRIPT
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfyiyAx9fNbnL13ILJRJwPyfByJWf2NePQlxW4Zx6AE_GFZvJBBnsxn4OJYDMVmTmt4g/exec";

// generowanie unikalnego ID użytkownika
function getUserId() {
    let id = localStorage.getItem("userId");
    if (!id) {
        id = "user-" + Math.random().toString(36).substring(2) + Date.now();
        localStorage.setItem("userId", id);
    }
    return id;
}

// BLOKADA: jeśli użytkownik już brał udział → pokazujemy komunikat
if (!window.location.pathname.includes("loading.html")) {
    if (localStorage.getItem("hasParticipated") === "true") {
        document.body.innerHTML = `
            <h2>Dziękujemy za udział w badaniu.</h2>
            <p>Celem niniejszego testu było sprawdzenie cierpliwości użytkownika nim zdecyduje się opuścić stronę.</p>
            <p>Państwa wynik został odnotowany.</p>
        `;
    }
}

function goToLoading() {
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const education = document.getElementById("education").value;

    localStorage.setItem("surveyData", JSON.stringify({
        gender, age, education
    }));

    // oznaczamy, że użytkownik wykonał badanie
    localStorage.setItem("hasParticipated", "true");

    window.location.href = "loading.html";
}

// OBSŁUGA STRONY ŁADOWANIA
if (window.location.pathname.includes("loading.html")) {

    const startTime = Date.now();

    window.addEventListener("beforeunload", () => {
        const endTime = Date.now();
        const timeSpent = Math.round((endTime - startTime) / 1000);

        const surveyData = JSON.parse(localStorage.getItem("surveyData"));
        const userId = getUserId();

        const payload = JSON.stringify({
            gender: surveyData.gender,
            age: surveyData.age,
            education: surveyData.education,
            timeSpent: timeSpent,
            userId: userId
        });

        navigator.sendBeacon(SCRIPT_URL, payload);
    });
}
