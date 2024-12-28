import { Services, About, Projects, Team } from "./src/js/index";

// document.addEventListener('DOMContentLoaded', function () {
//   // Определяем настройки для IntersectionObserver
//   const options = {
//     root: null, // Будет отслеживать пересечение с viewport
//     rootMargin: '0px',
//     threshold: 0.1 // Элемент считается видимым, если хотя бы 10% его площади в зоне видимости
//   }

//   // Callback-функция, которая срабатывает при пересечении элемента с областью видимости
//   const callback = (entries, observer) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('active')
//       } else {
//         entry.target.classList.remove('active')
//       }
//     })
//   }

//   // Создаем новый IntersectionObserver
//   const observer = new window.IntersectionObserver(callback, options)

//   // Находим все элементы с классами .left и .right и наблюдаем за ними
//   const targets = document.querySelectorAll('.left, .right')
//   targets.forEach(target => {
//     observer.observe(target)
//   })
// })

//cards.init();