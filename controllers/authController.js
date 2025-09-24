import validator from 'validator';

export async function registerUser(req, res) {

  let { name, email, username, password } = req.body

  // 1. Validate the incoming user data.
  // - Make sure all fields are present.
  if (!name || !email || !username || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // - Remove any whitespace where appropriate.
  name=name.trim()
  email=email.trim()
  username=username.trim()

  // - Use regex /^[a-zA-Z0-9_-]{1,20}$/ to check the username
  const usernameRegex = /^[a-zA-Z0-9_-]{1,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: 'Username must be 1-20 characters long and can only contain letters, numbers, underscores, and hyphens.' });
  }

  // - Use the Validator package to check the email format is valid.
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  console.log(req.body)


}