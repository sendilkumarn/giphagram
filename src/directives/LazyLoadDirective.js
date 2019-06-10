export default {
  inserted: el => {
    function loadImage () {
      const imageElement = Array.from(el.children).find(
        el => el.nodeName === 'IMG'
      )

      if (imageElement && imageElement.dataset.url) {
        imageElement.addEventListener('load', () => {
          setTimeout(() => el.classList.add('loaded'), 100)
        })
        imageElement.addEventListener('error', () => console.error('error'))
        imageElement.src = imageElement.dataset.url
      }
    }

    function handleIntersect (entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {

        } else {
          loadImage()
          observer.unobserve(el)
        }
      })
    }

    function createObserver () {
      const options = {
        root: null,
        threshold: '0'
      }
      const observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(el)
    }

    if (!window['IntersectionObserver']) {
      loadImage()
    } else {
      createObserver()
    }
  }
}
