// ===== Check if user is signed in =====
export async function checkAuth() {
  try {
    const res = await fetch('api/auth/me')

    if (!res.ok) {
      console.warn('Unexpected response:', res.status)
      return 'Guest'
    } 

    const user = await res.json()
    if (user.isGuest) {
      return false
    }

    return user.name

  } catch (err) {
    console.log(err, 'Auth check failed')
    return 'Guest' // fallback
  }
}

// ===== Greet user or guest =====

export function renderGreeting(username) {
  const user = username ? username : 'Guest'
  document.getElementById('greeting').textContent = `Welcome, ${user}!`
}

// ===== Only display logout button if logged in, else display log in/sign in options =====

export function showHideMenuItems(username) {
  const isLoggedIn = username
  document.getElementById('login').style.display = isLoggedIn ? 'none' : 'inline'
  document.getElementById('signup').style.display = isLoggedIn ? 'none' : 'inline'
  document.getElementById('logout-btn').style.display = isLoggedIn ? 'inline' : 'none'
}
