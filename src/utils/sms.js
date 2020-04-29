const accountSid = 'AC8c0cae24e87d6dcd2c8396b5cf8954f1'
const authToken = '3d749f6fcfd7c1a3bc290abef3154a94'
const client = require('twilio')(accountSid, authToken)

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+14422693893',
    to: '+6282181043299'
  })
  .then(message => console.log(message.sid))
