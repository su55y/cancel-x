const defaultHost = 'https://xcancel.com'

document.addEventListener('DOMContentLoaded', () => {
  /** @type {HTMLDivElement} */
  const statusDiv = window.statusDiv || document.getElementById('statusDiv')
  const resetStatusDiv = () => {
    statusDiv.innerText = ''
    statusDiv.style.visibility = 'invisible'
  }
  resetStatusDiv()

  /** @type {HTMLInputElement} */
  const hostInput = window.hostInput || document.getElementById('hostInput')
  hostInput.oninput = (e) => {
    if ('keyCode' in e && e.keyCode === 13) saveBtn.click()
    else if ('inputType' in e) {
      saveBtn.disabled = !hostInput.value.length
      resetStatusDiv()
    }
  }
  hostInput.onkeyup = hostInput.oninput
  chrome.storage.local.get({ host: defaultHost }, (result) => {
    hostInput.value = result.host
    saveBtn.disabled = true
  })

  /** @type {HTMLButtonElement} */
  const saveBtn = window.saveBtn || document.getElementById('saveBtn')
  saveBtn.disabled = true
  saveBtn.onclick = () => {
    const host = hostInput.value
    if (!host) return
    chrome.storage.local.set({ host }, () => {
      statusDiv.textContent = 'saved!'
      statusDiv.style.visibility = 'visible'
      hostInput.blur()
      saveBtn.disabled = true
    })
  }
})
