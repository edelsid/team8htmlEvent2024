const observer = new window.IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.header__black__bottom__navitem').forEach((link) => {
        const id = link.getAttribute('href').replace('#', '')
        if (id === entry.target.id) {
          link.classList.add('active')
        } else {
          link.classList.remove('active')
        }
      })
    }
  })
}, {
  threshold: 0.5
})

document.querySelectorAll('article').forEach((el) => {
  observer.observe(el)
})
