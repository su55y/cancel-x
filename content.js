document.addEventListener(
  'click',
  async function (e) {
    const a = e.target.closest(
      "a[href^='https://x.com/'], a[href^='http://x.com/']"
    )
    if (!a) return
    const href = a.getAttribute('href')
    const path = href.replace(/^https?:\/\/x.com\//, '')
    const target = 'https://xcancel.com/' + path
    e.preventDefault()
    window.open(target, '_blank')
  },
  true
)
