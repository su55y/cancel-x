const defaultHost = 'https://xcancel.com'
document.addEventListener(
  'click',
  async function (e) {
    const a = e.target.closest(
      "a[href^='https://x.com/'], a[href^='http://x.com/']"
    )
    if (!a) return

    e.preventDefault()

    const { host } = await chrome.storage.local.get({ host: defaultHost })
    const href = a.getAttribute('href')
    const path = href.replace(/^https?:\/\/x.com/, '')
    const target = host + path
    window.open(target, '_blank')
  },
  true
)
