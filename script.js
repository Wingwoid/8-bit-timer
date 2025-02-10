let timerInterval;
let timeElapsed = 0; // Время в секундах
let isRunning = false; // Флаг для отслеживания состояния таймера

const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const starsContainer = document.querySelector('.stars');
const timerContainer = document.querySelector('.timer-container');

// Обновление дисплея таймера
function updateTimerDisplay() {
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Добавление звёздочки и воспроизведение звука
function addStar() {
  const star = document.createElement('span');
  star.classList.add('star');
  star.textContent = '🦉';
  starsContainer.appendChild(star);

  // Воспроизведение звука с Google Drive
  const audio = new Audio('https://raw.githubusercontent.com/Wingwoid/8-bit-timer/main/owl-humanatone.wav');
  audio.play().catch((error) => {
    console.error('Ошибка воспроизведения звука:', error);
  });
}

// Запуск или возобновление таймера
function startOrResumeTimer() {
  if (!isRunning) {
    timerInterval = setInterval(() => {
      timeElapsed++;
      updateTimerDisplay();

      // Проверка на каждые 10 секунд (для тестирования)
      if (timeElapsed % 10 === 0 && timeElapsed > 0) {
        addStar();
      }

      // Для финальной версии: проверка каждые 10 минут
      // if (timeElapsed % (10 * 60) === 0) {
      //   addStar();
      // }
    }, 1000);

    // Изменение текста кнопки на "Стоп"
    stopBtn.textContent = '❚❚';
    isRunning = true;
  }
}

// Запуск или возобновление таймера
function startOrResumeTimer() {
  if (!isRunning) {
    timerInterval = setInterval(() => {
      timeElapsed++;
      updateTimerDisplay();

      // Проверка на каждые 10 секунд (для тестирования)
      if (timeElapsed % 10 === 0 && timeElapsed > 0) {
        addStar();
      }

      // Для финальной версии: проверка каждые 10 минут
      // if (timeElapsed % (10 * 60) === 0) {
      //   addStar();
      // }
    }, 1000);

    // Изменение текста кнопки на "Стоп"
    stopBtn.textContent = '❚❚';
    isRunning = true;

    // Добавляем класс running для анимации
    timerContainer.classList.add('running');
  }
}

// Остановка таймера
function stopTimer() {
  clearInterval(timerInterval);

  // Изменение текста кнопки на "Старт"
  stopBtn.textContent = '▶';
  isRunning = false;

  // Убираем класс running
  timerContainer.classList.remove('running');
}

// Сброс таймера
function resetTimer() {
  clearInterval(timerInterval);
  timeElapsed = 0;
  updateTimerDisplay();

  // Удалить все звёздочки
  starsContainer.innerHTML = '';

  // Вернуть кнопку "Стоп" в исходное состояние
  stopBtn.textContent = '❚❚';
  stopBtn.style.display = 'none';

  // Показать кнопку "Старт", скрыть кнопки "Стоп" и "Обнулить"
  startBtn.style.display = 'inline-block';
  stopBtn.style.display = 'none';
  resetBtn.style.display = 'none';

  // Убираем класс running
  timerContainer.classList.remove('running');
  isRunning = false;
}
// Назначение обработчиков событий
startBtn.addEventListener('click', () => {
  startBtn.style.display = 'none'; // Скрыть кнопку "Старт"
  stopBtn.style.display = 'inline-block'; // Показать кнопку "Стоп"
  resetBtn.style.display = 'inline-block'; // Показать кнопку "Обнулить"
  startOrResumeTimer();
});

stopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopTimer(); // Остановить таймер
  } else {
    startOrResumeTimer(); // Возобновить таймер
  }
});

resetBtn.addEventListener('click', resetTimer);

// Инициализация начального значения таймера
updateTimerDisplay();
