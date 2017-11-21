var debug=require('debug')("pm:pmcore:"+__filename);

// Singleton
var pmCore;

// ---------------------------------------------------------------------------
// Login & Connections
// ---------------------------------------------------------------------------

exports.getPMCore = function () {
    if (pmCore == undefined)
        pmCore = new PMCore();
    return pmCore;
}

function PMCore() {
    this.users = [];
    this.users.userList = [];
};



PMCore.prototype.getUsers = function () {
    return this.users.userList;
}

PMCore.prototype.findUser = function( userID ) {
    console.log("check things");
    console.log(this.users);
    if (userID == undefined) return null;
    // convert to binary search
    for (x=0; x<this.users.userList.length; x++) {
        console.log('-------------------------');
        console.log(this.users.userList[x].password);

        // console.log(this.users[x].account.userID+' == '+userID)
        if (this.users.userList[x].password == userID)
            return this.users.userList[x];
    }
    return null;
}

/** ---------------------------------------------------------------------------
 * Login function
 * @param username
 * @param password
 * @returns {*} userObj or null if not found
 */


PMCore.prototype.login = function( username, password ) {
    var obj = [];

    obj.username = username;
    obj.password = password;
    obj.userIndex = pmCore.users.userList.length;


    var obj1 = [];
    obj1.username = 'computer';
    obj1.password = 'asdf';
    pmCore.users.userList.push(obj1);

    pmCore.users.userList.push(obj);

    //if (userObj) {
    //    if (userObj.checkPassword(password)) {
     //       //userObj.getOnline();
     //       console.log(userObj);
      //      return userObj;
      //  };
       // // @todo log bad password attempt
    //}
    // @todo log bad user name
    return this.findUser(password);
};

/** ---------------------------------------------------------------------------
 * Connect a socket.io connection to the user
 * @param userObj
 * @param socket - the socket.io socket for this connection
 */
PMCore.prototype.connectClientSocket = function(userObj,socket) {
    //console.log(socket);
    userObj.connectSocket(socket);
    for(var i=0;i<userObj.friends.length;i++)
        userObj.friends[i].emit("connectFriend", { friendID: userObj.account.userID });
}

/** ---------------------------------------------------------------------------
 * Disconnect socket.io connection from this user, logout for session destroy
 * @param userObj
 * @param socket
 */
PMCore.prototype.logout = function( userObj, socket ) {
    userObj.disconnectSocket(socket);
}

PMCore.prototype.disconnect = function( userObj, socket ) {
    userObj.disconnectSocket(socket);
    for(var i=0;i<userObj.friends.length;i++)
    userObj.friends[i].emit("disconnectFriend", { friendID: userObj.account.userID });
}

/** ---------------------------------------------------------------------------
 * ping - Test function for async events
 * returns the data.
 * @param userObj
 * @param req { anything }
 */
PMCore.prototype.ping = function( userObj, req ) {
   //i console.log(userObj);
    userObj.emit("ping",req);
}


