const defaultHost = 'https://xcancel.com'
document.addEventListener(
  'click',
  async function (e) {
    const a = e.target.closest(
      "a[href^='https://x.com/'], a[href^='http://x.com/'], a[href^='https://twitter.com/'], a[href^='http://twitter.com/']"
    )
    if (!a) return

    e.preventDefault()

    try {
      const { host } = await chrome.storage.local.get({ host: defaultHost })
      const href = a.getAttribute('href')
      const url = new URL(href)
      const target = host + url.pathname
      window.open(target, '_blank')
    } catch (e) {
      console.error(e)
      return
    }
  },
  true
)
