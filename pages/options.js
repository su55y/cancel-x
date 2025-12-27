const defaultHost = 'https://xcancel.com'

document.addEventListener('DOMContentLoaded', async () => {
  /** @type {HTMLDivElement} */
  const statusDiv = window.statusDiv || document.getElementById('statusDiv')
  const showStatusDiv = ({ msg, error = false }) => {
    statusDiv.innerText = msg
    statusDiv.style.visibility = 'visible'
    statusDiv.className = 'status-' + (error ? 'error' : 'ok')
  }
  const resetStatusDiv = () => {
    statusDiv.innerText = ''
    statusDiv.style.visibility = 'invisible'
    statusDiv.className = ''
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

  const parseUrl = (s) => {
    try {
      const u = new URL(s)
      console.log(u)
      if (!u.host.match(/^\w[\w\-\.]+(?:\:\d+)?$/) || !u.host.includes('.'))
        throw Error(`Invalid host '${u.host}'`)
      return {
        host: (u.origin + u.pathname).replace(/\/*$/, ''),
        error: null,
      }
    } catch (e) {
      return { host: s, error: e.message }
    }
  }

  /** @type {HTMLButtonElement} */
  const saveBtn = window.saveBtn || document.getElementById('saveBtn')
  saveBtn.disabled = true
  saveBtn.onclick = () => {
    const { host, error } = parseUrl(hostInput.value)
    if (!host) return
    if (error) {
      showStatusDiv({ msg: error, error: true })
      return
    }
    chrome.storage.local.set({ host }, () => {
      hostInput.value = host
      hostInput.blur()
      resetBtn.disabled = host === defaultHost
      saveBtn.disabled = true
      showStatusDiv({ msg: 'saved!' })
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
