const defaultHost = 'https://xcancel.com'

document.addEventListener('DOMContentLoaded', async () => {
  /** @type {HTMLDivElement} */
  const statusDiv = window.statusDiv || document.getElementById('statusDiv')
  const resetStatusDiv = () => {
    statusDiv.innerText = ''
    statusDiv.style.visibility = 'invisible'
  }
  resetStatusDiv()

  const { host: initialHostValue } = await chrome.storage.local.get({
    host: defaultHost,
  })

  /** @type {HTMLInputElement} */
  const hostInput = window.hostInput || document.getElementById('hostInput')
  hostInput.value = initialHostValue
  hostInput.oninput = (e) => {
    if ('keyCode' in e && e.keyCode === 13) saveBtn.click()
    else if ('inputType' in e) {
      saveBtn.disabled =
        !hostInput.value.length || hostInput.value === initialHostValue
      resetBtn.disabled = hostInput.value === defaultHost
      resetStatusDiv()
    }
  }
  hostInput.onkeyup = hostInput.oninput

  /** @type {HTMLButtonElement} */
  const saveBtn = window.saveBtn || document.getElementById('saveBtn')
  saveBtn.disabled = true
  saveBtn.onclick = () => {
    const host = hostInput.value
    if (!host) return
    chrome.storage.local.set({ host }, () => {
      hostInput.blur()
      saveBtn.disabled = true
      statusDiv.textContent = 'saved!'
      statusDiv.style.visibility = 'visible'
    })
  }

  /** @type {HTMLButtonElement} */
  const resetBtn = window.resetBtn || document.getElementById('resetBtn')
  resetBtn.disabled = hostInput.value == defaultHost
  resetBtn.onclick = () => {
    chrome.storage.local.set({ host: defaultHost }, () => {
      hostInput.value = defaultHost
      hostInput.blur()
      saveBtn.disabled = true
      resetBtn.disabled = true
      resetStatusDiv()
    })
  }
})
