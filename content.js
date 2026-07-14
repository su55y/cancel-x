const defaultHost = 'https://nitter.net',
  targetQuery =
    "a[href^='https://x.com/'], a[href^='http://x.com/'], a[href^='https://twitter.com/'], a[href^='http://twitter.com/']"

async function clickHandler(e) {
  const a = e.target.closest(targetQuery)
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
}

document.addEventListener('click', clickHandler, true)
