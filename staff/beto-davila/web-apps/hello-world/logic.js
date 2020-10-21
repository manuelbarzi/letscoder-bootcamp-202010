
function registerUser(fullname, email, password, repassword) {
    if(typeof fullname !== 'string') throw new TypeError(fullname + ' is not a fullname');
    if (!fullname.trim().length) throw new Error('fullname is empty or blank');
    if(typeof email !== 'string') throw new TypeError(email + ' is not an email');
    if (!email.trim().length) throw new Error('email is empty or blank');
    if(typeof password !== 'string') throw new TypeError(password + ' is not a password');
    if (!password.trim().length) throw new Error('password is empty or blank');
    if(typeof repassword !== 'string') throw new TypeError(repassword + ' is not a repeated password');
    if (!repassword.trim().length) throw new Error("repeat password is empty or blank");
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) throw new Error("invalid e-mail");
    if (password !== repassword) throw new Error('passwords do not match');

      var user = users.find(function(user) {return user.email === email});
  
      if (user) throw new Error('The user is being used already'); 

        user = {
            fullname: fullname,
            email: email,
            password: password
          };

      users.push(user);     
}


function authenticateUser (email, password) {

        if(typeof email !== 'string') throw new TypeError(email + ' is not an email');
        if(!email.trim().length) throw new Error('email is empty or blank');
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) throw new Error('invalid e-mail');
        if(typeof password !== 'string') throw new TypeError(password + ' is not a password');
        if (!password.trim().length) throw new Error('password is empty or blank');

        var user = users.find(function(user) {return user.email === email && user.password === password});

        if (!user) throw new Error ('wrong credentials');
}