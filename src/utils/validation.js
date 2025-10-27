export function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '')
}

export function validateAuth({ email, password }) {
  const errors = {}
  if (!email) errors.email = 'Email is required'
  else if (!isEmail(email)) errors.email = 'Enter a valid email'
  if (!password) errors.password = 'Password is required'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters'
  return errors
}

export function validateTicket({ title, description, status }) {
  const errors = {}
  if (!title || !title.trim()) errors.title = 'Title is required'
  if (!description || description.trim().length < 10) errors.description = 'Description must be at least 10 characters'
  if (!status || !['Open','Closed'].includes(status)) errors.status = 'Status must be Open or Closed'
  return errors
}
