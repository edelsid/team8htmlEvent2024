// Находим кнопки и диалоговое окно
const buttons = document.querySelectorAll('.htp__button');
const videoDialog = document.querySelector('.video-dialog');
const closeDialogButton = document.querySelector('.close-dialog');
const youtubeVideo = document.getElementById('youtube-video');
const playButton = document.querySelector('.play-button');

// Массив с ссылками на видео
const videos = [
  'https://www.youtube.com/embed/l-aV3qt6dKw?si=nWex3Bd8kYzUEGtC', // Видео для первой кнопки
  'https://www.youtube.com/embed/drb-2-B1Rbc?si=qWChaTqZd4dy9eM_', // Видео для второй кнопки
  'https://www.youtube.com/embed/Yrja61My-Hg?si=uyAOWeCMv3P-kqad', // Видео для третьей кнопки
];

// Функция для смены активной кнопки и показа видео
let selectedButtonIndex = 0; // Индекс выбранной кнопки

// Функция для смены активной кнопки
function handleButtonClick(event) {
  // Убираем активные классы со всех кнопок
  buttons.forEach((button, index) => {
    button.classList.remove('htp__button--active');
    button.querySelector('.htp__button-text').classList.remove('htp__button-text--active');
  });

  // Добавляем активные классы на кликнутую кнопку
  const clickedButton = event.currentTarget;
  clickedButton.classList.add('htp__button--active');
  clickedButton.querySelector('.htp__button-text').classList.add('htp__button-text--active');

  // Сохраняем индекс нажатой кнопки
  selectedButtonIndex = Array.from(buttons).indexOf(clickedButton);
}

// Открытие модального окна
playButton.addEventListener('click', () => {
  const videoUrl = videos[selectedButtonIndex]; // Получаем URL видео
  youtubeVideo.src = videoUrl; // Устанавливаем src для iframe
  videoDialog.showModal(); // Показываем модальное окно
});

// Закрытие модального окна
closeDialogButton.addEventListener('click', () => {
  videoDialog.close();
  youtubeVideo.src = ''; // Очищаем ссылку на видео, чтобы остановить воспроизведение
});

// Назначаем обработчик событий на каждую кнопку
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

