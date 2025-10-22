Email.send({
  Host : "smtp.elasticemail.com",
  Username : "username",
  Password : "password",
  To : 'them@website.com',
  From : "drigo250601souza@gmail.com",
  Subject : "This is the subject",
  Body : "And this is the body"
}).then(
message => alert(message)
);
