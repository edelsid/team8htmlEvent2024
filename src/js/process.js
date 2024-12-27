import checkDOM from "./checkDom";
import data from "../assets/tabs.json" with { type: "json" };

export default class Process {
  constructor(container) {
    this.bindToDOM(container);
    this.active = 1;
  }

  bindToDOM(container) {
    checkDOM(container);
    this.container = container;
    this.modal = this.container.querySelector(".modal");
    this.previewScreen = this.container.querySelector(".video__player");
    this.tabArea = this.container.querySelector(".process__tabs");
  }

  init() {
    const playBtn = this.container.querySelector(".btn-play");
    playBtn.addEventListener("click", (e) => this.openModal(e));
    data.forEach((item) => {
      const newTab = this.setTab(item);
      const btn = newTab.firstElementChild;
      if (Number(btn.id) === this.active) {
        btn.classList.add("active");
        this.previewScreen.src = data[this.active - 1].img;
      }
      this.tabArea.appendChild(newTab);
    });
    this.tabArea.addEventListener("click", (e) => this.changeTab(e.target));
  }

  setTab(data) {
    const newTab = document.createElement("li");
    newTab.className = "process__item";
    newTab.innerHTML = `
    <button class="btn btn-switch" type="button" id="${data.id}">
      0${data.id} ${data.title}
    </button>`;
    return newTab;
  }

  changeTab(target) {
    for (let i = 0; i < this.tabArea.children.length; i += 1) {
      const child = this.tabArea.children[i].firstElementChild;
      child.classList.remove("active");
    };
    target.classList.add("active");
    this.previewScreen.src = data[target.id - 1].img;
  }

  openModal() {
    this.modal.showModal();
  }

  closeModal() {
    this.modal.close();
  }
}

const root = document.querySelector(".process");
const process = new Process(root);
process.init();

// // Находим кнопки и диалоговое окно
// const buttons = document.querySelectorAll('.htp__button')
// const videoDialog = document.querySelector('.video-dialog')
// const closeDialogButton = document.querySelector('.close-dialog')
// const youtubeVideo = document.getElementById('youtube-video')
// const playButton = document.querySelector('.play-button')

// // Функция для смены активной кнопки и показа видео
// let selectedButtonIndex = 0 // Индекс выбранной кнопки

// // Функция для смены активной кнопки
// function handleButtonClick (event) {
//   // Убираем активные классы со всех кнопок
//   buttons.forEach((button, index) => {
//     button.classList.remove('htp__button--active')
//     button.querySelector('.htp__button-text').classList.remove('htp__button-text--active')
//   })

//   // Добавляем активные классы на кликнутую кнопку
//   const clickedButton = event.currentTarget
//   clickedButton.classList.add('htp__button--active')
//   clickedButton.querySelector('.htp__button-text').classList.add('htp__button-text--active')

//   // Сохраняем индекс нажатой кнопки
//   selectedButtonIndex = Array.from(buttons).indexOf(clickedButton)
// }

// // Открытие модального окна
// playButton.addEventListener('click', () => {
//   const videoUrl = videos[selectedButtonIndex] // Получаем URL видео
//   youtubeVideo.src = videoUrl // Устанавливаем src для iframe
//   videoDialog.showModal() // Показываем модальное окно
// })

// // Закрытие модального окна
// closeDialogButton.addEventListener('click', () => {
//   videoDialog.close()
//   youtubeVideo.src = '' // Очищаем ссылку на видео, чтобы остановить воспроизведение
// })

// // Назначаем обработчик событий на каждую кнопку
// buttons.forEach(button => {
//   button.addEventListener('click', handleButtonClick)
// })
