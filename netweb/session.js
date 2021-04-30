const uuid = require('uuid').v4;
const users = require('./user-data');

const sessions = {};

const isValidUsername = function( username ) {
  if(!username) {
    return false;
  }
  if(username.toLowerCase()==='dog')
  {
    return false;
  }
  const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
  if(username !== cleanUsername) {
    return false;
  }
  return true;
};

const create = function({ username }) {
  if(!username) {
    return { error: 'USERNAME_REQUIRED' };
  }
  if(!isValidUsername(username)) {
    return { error: 'USERNAME_INVALID' };
  }
  const sid = uuid();
  users.createOrCheckUser(username);

  sessions[sid] = {
    sid,
    username,
    startTime: Date.now(),
    info: users.users[username],
  };
  return { sid };
};

const addtId = (id, sid, media) => 
{
  const returnedValue = users.addToWhsihlist(id, sessions[sid].username, media);
  if(returnedValue==="duplicate")
  {
    return false;
  }
  return true;

}

const removeId = (id, sid, media) =>
{
  const returnVal  = users.deletewishlist(id, sessions[sid].username, media);
  if(returnVal===true)
  {
    return true;
  }
  else
  {
    return false;
  }
}

const remove = function(sid) {
  delete sessions[sid];
};

const isValid = function(sid) {
  return !!sessions[sid];
};

module.exports = {
  details: sessions,
  create,
  remove,
  isValid,
  addtId,
  removeId
};
