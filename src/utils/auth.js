const KEY = 'tm_user_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

export function loginSession(user) {
  const payload = { ...user, createdAt: new Date().toISOString() }
  localStorage.setItem(KEY, JSON.stringify(payload))
}

export function logoutSession() {
  localStorage.removeItem(KEY)
}

export function getSession() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.createdAt && Date.now() - new Date(parsed.createdAt).getTime() > SESSION_TTL_MS) {
      logoutSession()
      return null
    }
    return parsed
  } catch (err) {
    console.error('Failed reading session', err)
    logoutSession()
    return null
  }
}

export function isLoggedIn() {
  return getSession() !== null
}
