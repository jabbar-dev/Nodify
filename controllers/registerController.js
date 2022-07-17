const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}

const fsPromises  = require('fs').promises;
const path = require('path');

//Install BCrypt to Hash and Save Passwords
const bcrypt = require('bcrypt');

const handleNewUser = async(req, res) =>{
    const {user, password} = req.body
    if(!user || !password) return res.status(400).json({"message":"Missing user or password"});

    //Check for Duplicate Username In DB
    const duplicate = usersDB.users.find(person => person.username === user);
    if(duplicate) return res.status(409); //Conflict
    
    try{
        //Encrypt Password
        const hashedPWD = await bcrypt.hash(password, 10); 

        //Store the new user in the DB
        const newUser = {"username" : user, "password":hashedPWD}
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '../model/users.json'),
            JSON.stringify(usersDB.users)
        )
        console.log(usersDB.users);
        res.status(201).json({'success': `new User ${user} created`});

    }catch(err){
        res.status(500).json({"message":"Error Creating User"});
    }
}

module.exports = {handleNewUser};