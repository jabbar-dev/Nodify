const usersDB = {
    users : require('../model/users.json'),
    setUsers : function (data) {this.users = data}
}

const bcrypt = require ('bcrypt');

const handleLogin = async(req, res) =>{

        const {user, password} = req.body
        if(!user || !password) return res.status(400).json({"message":"Missing user or password"});
        const foundUser = usersDB.users.find(person => person.username === user);

        if(!foundUser) return res.status(401).send("Unauthorized"); //Unauthorized
        //evaluate password
        const match = await bcrypt.compare(password, foundUser.password);
        if(match){
            //JWT Token
            res.json({"success": `Welcome ${user}`});
        }
        else {
            res.status(401).json({"message":"Invalid Password"});
        }

}

module.exports = {handleLogin};