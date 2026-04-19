const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-xDEVHoY2uWvTup0kOWhzYxDpJ7Yc4Sna74wbSenv79MJBsHAPIJfF9zlxkmjegN4/exec";

function goToLoading() {
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const education = document.getElementById("education").value;

    localStorage.setItem("surveyData", JSON.stringify({
        gender, age, education
    }));

    localStorage.setItem("hasParticipated", "true");

    window.location.href = "loading.html";
}

if (window.location.pathname.includes("loading.html")) {
    const startTime = Date.now();

    window.addEventListener("beforeunload", () => {
        const endTime = Date.now();
        const timeSpent = Math.round((endTime - startTime) / 1000);

        const surveyData = JSON.parse(localStorage.getItem("surveyData"));

        navigator.sendBeacon(SCRIPT_URL, JSON.stringify({
            gender: surveyData.gender,
            age: surveyData.age,
            education: surveyData.education,
            timeSpent: timeSpent
        }));
    });
}

window.onload = () => {
    if (localStorage.getItem("hasParticipated") === "true" &&
        !window.location.pathname.includes("loading.html")) {

        document.body.innerHTML = `
            <h2>Dziękujemy za udział w badaniu.</h2>
            <p>Celem niniejszego testu było sprawdzenie cierpliwości użytkownika nim zdecyduje się opuścić stronę.</p>
            <p>Państwa wynik został odnotowany.</p>
        `;
    }
};
