sign up to our blog with the following details: 
Name: attacker
Email: a@mail.com
Username: attacker
Password: 1234

after you loggeded-in go to F12 (inspect) in the browser, then "Application", then "Cookies", you will be able to see the LoggedUser cookie - its value should look like this:
{"token":"<THE TOKEN>","email":"a@mail.com","name":"attacker","id":11,"userName":"attacker"}

then, put in the cmd the following command:

curl -X POST  -H "Content-Type: application/x-www-form-urlencoded"  -H "Authorization: Bearer <THE TOKEN FROM BEFORE>" -d "title=Attack Title&content=Attack Content&email=a@mail.com" http://localhost:3000/api/post

and you should see that a new post was created in the drafts in the unprotected version, and you will get something like this in cmd: {"id":25,"title":"Attack Title","content":"Attack Content","published":false,"authorId":13,"video_url":null}.

in the protected version you will get the message: {"message":"Invalid CSRF token"} 






