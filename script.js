// Temporizador y estadísticas
let timer = 25 * 60; // 25 minutos
let interval;
const timerDisplay = document.getElementById("timer");

// Botones
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const completeButton = document.getElementById("complete");
const toggleStatsButton = document.getElementById("toggle-stats");

// Elementos de estadísticas
const statisticsSection = document.getElementById("statistics");
const dailyPomodoros = document.getElementById("daily-pomodoros");
const weeklyPomodoros = document.getElementById("weekly-pomodoros");
const monthlyPomodoros = document.getElementById("monthly-pomodoros");
const yearlyPomodoros = document.getElementById("yearly-pomodoros");

// Actualizar estadísticas en el DOM
function updateStatistics() {
    const stats = JSON.parse(localStorage.getItem("pomodoroStats")) || {
        daily: 0,
        weekly: 0,
        monthly: 0,
        yearly: 0,
        lastUpdate: new Date().toISOString(),
    };

    dailyPomodoros.textContent = stats.daily;
    weeklyPomodoros.textContent = stats.weekly;
    monthlyPomodoros.textContent = stats.monthly;
    yearlyPomodoros.textContent = stats.yearly;
}

// Incrementar pomodoro completado
function completePomodoro() {
    // Verifica si quedan 5 minutos o menos para completar el pomodoro
    if (timer > 5 * 60) {
        alert("Eduardo, a quién crees que vas a engañar???");
    } else {
        const now = new Date();
        const stats = JSON.parse(localStorage.getItem("pomodoroStats")) || {
            daily: 0,
            weekly: 0,
            monthly: 0,
            yearly: 0,
            lastUpdate: now.toISOString(),
        };

        const lastUpdate = new Date(stats.lastUpdate);

        // Reset estadísticas según la fecha
        if (now.toDateString() !== lastUpdate.toDateString()) {
            stats.daily = 0;
        }
        if (now.getWeek() !== lastUpdate.getWeek()) {
            stats.weekly = 0;
        }
        if (now.getMonth() !== lastUpdate.getMonth()) {
            stats.monthly = 0;
        }
        if (now.getFullYear() !== lastUpdate.getFullYear()) {
            stats.yearly = 0;
        }

        // Incrementar contadores
        stats.daily++;
        stats.weekly++;
        stats.monthly++;
        stats.yearly++;
        stats.lastUpdate = now.toISOString();

        // Guardar en localStorage
        localStorage.setItem("pomodoroStats", JSON.stringify(stats));
        updateStatistics();
    }
}

// Alternar visibilidad de estadísticas
function toggleStatistics() {
    if (statisticsSection.style.display === "none") {
        statisticsSection.style.display = "block";
    } else {
        statisticsSection.style.display = "none";
    }
}

// Iniciar temporizador
function startTimer() {
    if (!interval) {
        interval = setInterval(() => {
            timer--;
            const minutes = Math.floor(timer / 60);
            const seconds = timer % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;
            if (timer <= 0) {
                clearInterval(interval);
                alert("¡Pomodoro completado!");
            }
        }, 1000);
    }
}

// Pausar temporizador
function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

// Reiniciar temporizador
function resetTimer() {
    clearInterval(interval);
    interval = null;
    timer = 25 * 60;
    timerDisplay.textContent = "25:00";
}

// Obtener semana del año
Date.prototype.getWeek = function () {
    const onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil(((this - onejan) / 86400000 + onejan.getDay() + 1) / 7);
};

// Inicializar eventos
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
completeButton.addEventListener("click", completePomodoro);
toggleStatsButton.addEventListener("click", toggleStatistics);

// Inicializar estadísticas
updateStatistics();
