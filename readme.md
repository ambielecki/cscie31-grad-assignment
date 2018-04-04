## Graduate Assignment - Authentication with Passport

### Description
Authentication (such as the ability to log in with a username and password) 
is an important aspect of almost any web application, in this assignment we will go over the basics of using 
passport and the passport-local strategy to set up a simple example of database driven authentication.

This lesson assumes that you have an Express app setup and are comfortable with basic HTML layout and templating. Oh and 
don't you remember how we set up old input and flash messages, no, sorry, guess we skipped that lesson :)
It will also assume that you have a connection to a mongo db with mongoose installed along with other packages 
such as cookie-parser, express-session, and connect-flash

Okay let's get started.

First thing to do is to take a look at the docs for the package we will be using, passport at <http://www.passportjs.org/>.
As with most packages we will want to go ahead and install with npm
```javascript
npm install passport --save
```
Next since we will be setting up a local db based auth we can look at the documentation, 
<http://www.passportjs.org/docs/username-password/> and install the necessary strategy
```javascript
npm install passport-local --save
```
What is a strategy?  It is the method through which passport will authenticate you, it can either be through 
a service like Oauth, using existing credentials like a Google signin, or Linkedin, or through a something like 
a local username and saved password.

Speaking of passwords. Something that is dangerously not mentioned in the passport docs is that passowrds 
should NEVER, repeat NEVER, be stored in plaintext in your database, passwords should always be hashed or encrypted, 
so, one more package to install, bcrypt, which will provide a hashing algorithm. Run away screaming from any site 
that can send you your actual password if you ask for a reset.
```javascript
npm install bcryptjs --save
```
Now that we have everything installed, let's get the basics setup for later use. Create a userModel file as we have 
before with username, password, and type fields (this will allow us some more granular auth).  -Refer to code in 
/models/userModel.js which includes hashing the password with bcrypt

We will also need a controller, routes, and views setup in /controllers/userController.js /views/users and /routes/users.js  
These will point us to basic pages to create a new user, nothing fancy 
(normally we wouldn't let every user set type, but this is an example)

Whew, basics are done.  In app.js let's require all of our new packages and set up our 
authentication config (search for authentication config comment).

To start off we will need to use the passport.initialize() and passport.session() middlewares to start up 
and use persistent logins respectively.

First we need  our strategy, which in this case is our required package, passport-locat (assigned to LocalStrategy) 
Now we will set our middleware, which takes a strategy, which itself will take a closure which passes username, password from the request along with done, 
which is returned with err, user, and options such as message.

Within this closure is where we will authenticate our user.  First, find the user by searching mongo for our username, 
if no user is found, immediately return done(null, false, { message: "Some message"}). There is no error, false for user, 
and a message to be flashed.  If there is an error return done(err);

If we find a user, we must compare the password supplied in the request to the stored password using the bcrypt.compare function, 
which takes the plaintext password from the request, the encrypted password and a closure with error and result.  The result 
is whether the password matches the saved hash.  If this match, we return done(null, user, { message: "Some success message" });  
And woohoo we're authenticated.

This will then be saved in the session through the passport.serializeUser function, which will save the user id into the session 
for subsequent requests (which will be found througha cookie sent in the response after auth and returned to us).  

On subsequent request, we can find our user from the passport.deserializeUSer function, which will find the user by id and store in the 
session for the current request.  We can then use that user for authenticating routes.

Whew, we now have a users, let's set up some middleware to help us lock down routes.  Refer to 
/helpers/local_authorize.js.  Here we've set up two pieces of middleware that will redirect a user 
if their types are not sufficient.  We can see this in action in the test routes in /routes/test.js and controllers/testController

### Packages We're Using 
* [nunjucks](https://github.com/mozilla/nunjucks) : templating engine (way better than that nasty PUG stuff)
* [passport](http://www.passportjs.org/) : authentication
* [passport-local](https://github.com/jaredhanson/passport-local) : strategy for local username / password auth
* [bcryptjs](https://github.com/dcodeIO/bcrypt.js) : need to hash those passwords

### Other Resources
* [Materialize CSS](http://next.materializecss.com/) 
: using the 1.0 alpha and recompiling scss from source
* [Hashing Passwords with Passport](https://stackoverflow.com/questions/37668680/how-to-hash-password-before-saving-to-db-to-be-compatible-with-passport-module) 
: StackOverflow for using hashed passwords with Passport (why isn't this standard in the package, ugh)
* [Failed to Serialize User into Session](https://stackoverflow.com/questions/19948816/error-failed-to-serialize-user-into-session) 
: StackOverflow for some help with passport sessions (noticing a theme here? Lots of SO :) )
* Borrowed heavily from lecture on photo sharing for file uploads