const defaultHost = 'https://xcancel.com'

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get({ host: defaultHost }, (result) => {
    document.getElementById('hostInput').value = result.host
  })

  document.getElementById('save').addEventListener('click', () => {
    const host = document.getElementById('hostInput').value
    if (!host) return
    chrome.storage.local.set({ host }, () => {
      document.getElementById('status').textContent = 'Saved!'
    })
  })
})
