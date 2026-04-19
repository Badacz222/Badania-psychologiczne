// WSTAW TU SWÓJ LINK DO GOOGLE APPS SCRIPT
const SCRIPT_URL = "TU_WKLEJ_SWÓJ_LINK";

// generowanie unikalnego ID użytkownika
function getUserId() {
    let id = localStorage.getItem("userId");
    if (!id) {
        id = "user-" + Math.random().toString(36).substring(2) + Date.now();
        localStorage.setItem("userId", id);
    }
    return id;
}

function goToLoading() {
    const gender = document.getElementById("gender").value;
    const age = document.getElementById("age").value;
    const education = document.getElementById("education").value;

    localStorage.setItem("surveyData", JSON.stringify({
        gender, age, education
    }));

    window.location.href = "loading.html";
}

// obsługa strony ładowania
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
