// // 1. Добавляем плавный скролл по клику на ссылки
// document.querySelectorAll('.header__black__bottom--wrapper a').forEach(link => {
//   link.addEventListener('click', function(event) {
//     event.preventDefault(); // Отключаем стандартное поведение

//     const targetId = this.getAttribute('href').substring(1); // Убираем #
//     const targetElement = document.getElementById(targetId); // Ищем элемент по ID

//     // Плавный скролл до нужной секции
//     targetElement.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     });
//   });
// });

// // 2. Выделение активной ссылки при скролле
// const sections = document.querySelectorAll('section'); // Все секции на странице

// window.addEventListener('scroll', () => {
//   let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

//   sections.forEach(section => {
//     const sectionTop = section.offsetTop - 100; // Смещение, чтобы подсветка была немного раньше
//     const sectionHeight = section.offsetHeight;
//     const sectionId = section.getAttribute('id');

//     if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
//       // Удаляем класс активной у всех ссылок
//       document.querySelectorAll('.header__black__bottom__navitem').forEach(link => {
//         link.classList.remove('active');
//       });

//       // Добавляем класс активной текущей секции
//       document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
//     }
//   });
// });