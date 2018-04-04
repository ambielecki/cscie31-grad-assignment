# Assignment #4 - Express Routing, MongoDB, and Mongoose

### Live URL
<http://cscie31.andrewbielecki.com:8081/>

### Login Credentials - You will need this for any of the CUD in CRUD
username: ta_user

password: ta_pass

### Description
Continuing with the theme of a site for a Little League baseball team, but now incorporating a proper DB. 
Uses Mongo for storage of Roster, Events (schedule), and updates.  CRUD operations are handled with Mongoose 
models.

Since you gave us three weeks I decided to explore authentication with passport js, bit of a pain, but I got a 
functionaly implementation going.

### Known Limitations (aka, what I would add with more time)
* There is virtually no validation of form fields (just the simple file extension checking we were shown in 
lecture)
* Essentially no 404 type error handling (it will notice if you try to find a model with the wrong id, but that 
is it)
* I'm allowing raw output for posts without any real sanitation in the backend
* Try / catch use is pretty basic and just lumping all errors into one catch
* Not enough use of auth (a logged in user can still get to /login for example) - mainly just wanted to get some 
sort of auth up an running
* No checking for unique ids when creating users, but that's ok, I'd be handing out login credentials (should probably 
build a user edit to in case someone forgets their id)
* Users is incomplete, just have a create form for admin 

### Packages Not Mentioned in Lecture
* [nunjucks](https://github.com/mozilla/nunjucks) : templating engine
* [moment-timezone](https://momentjs.com/timezone/) : easy JS date handling with timezone support
* [passport](http://www.passportjs.org/) : authentication
* [passport-local](https://github.com/jaredhanson/passport-local) : strategy for local username / password auth
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js) : need to hash those passwords

### Other Resources
* [Materialize CSS](http://next.materializecss.com/) 
: using the 1.0 alpha and recompiling scss from source
* [tinymce](https://www.tinymce.com/) 
: basic editor for creating posts
* [unknown.jpg](https://www.hearingtracker.com/assets/avatar_unknown-3809f4251f011bc6f801ea7c0d667f48552457edfa92dde7d20ea822e37bd068.jpg) 
: an unknown user avatar I found on google images
* [winter baseball image](http://insportscenters.com/insports-baseball-and-softball-winter-workouts/) 
: another image from google images
* [Call async/await functions in parallel](https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel) 
: StackOverflow for using destructuring and Promise.all() (using async/await really helped code readability for me)
* [Shorten string without cutting words in JS](https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript) 
: StackOverflow for trimming a string (used in posts to limit characters in preview)
* [Hashing Passwords with Passport](https://stackoverflow.com/questions/37668680/how-to-hash-password-before-saving-to-db-to-be-compatible-with-passport-module) 
: StackOverflow for using hashed passwords with Passport (why isn't this standard in the package, ugh)
* [Failed to Serialize User into Session](https://stackoverflow.com/questions/19948816/error-failed-to-serialize-user-into-session) 
: StackOverflow for some help with passport sessions (noticing a theme here? Lots of SO :) )
* Borrowed heavily from lecture on photo sharing for file uploads