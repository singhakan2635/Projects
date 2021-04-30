const express = require('express');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;
const session = require('./session');


app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'SESSION_REQUIRED' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.clearCookie("sid");
    res.status(403).json({ error: 'SESSION_INVALID' });
    return;
  }
  res.json(session.details[sid]);
});

app.post('/api/session', (req, res) => {
  const username = req.body.username;
  const { sid, error } = session.create({ username });
  if(error) {
    res.status(400).json(error);
    return;
  }
  res.cookie('sid', sid);
  res.json(session.details[sid]);
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  session.remove(sid);
  res.clearCookie('sid');
  res.json({ sid, status: 'removed' });
});

app.get(`/movie/popular` , (req, res) => {
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=253c778f75d660463c07dc4ea9c5c681&language=en-US&page=1')
  .then((response) => 
  {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((err) => Promise.reject(err));
  })
  .then( (data) => 
  {
    res.status(200).json(data);
  })
  .catch( err =>
    {
      res.status(400).json(err);
    });

});

app.get(`/tvseries/popular` , (req, res) => {
  fetch('https://api.themoviedb.org/3/tv/popular?api_key=253c778f75d660463c07dc4ea9c5c681&language=en-US&page=1')
  .then((response) => 
  {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((err) => Promise.reject(err));
  })
  .then( (data) => 
  {
    res.status(200).json(data);
  })
  .catch( err =>
    {
      res.status(400).json(err);
    });

});

app.get(`/trending/week`, (req, res) => {
  fetch('https://api.themoviedb.org/3/trending/all/week?api_key=253c778f75d660463c07dc4ea9c5c681')
  .then((response) => 
  {
    if (response.ok) {
      return response.json();
    }
    return response.json().then((err) => Promise.reject(err));
  })
  .then( (data) => 
  {
    res.status(200).json(data);
  })
  .catch( err =>
    {
      res.status(400).json(err);
    });

});


app.post('/wishlist' , (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'SESSION_REQUIRED' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.clearCookie('sid');
    res.status(403).json({ error: 'SESSION_INVALID' });
    return;
  }
  const id = req.body.id;
  const media= req.body.media;
  if(!id)
  {
    res.status(404).json({error: 'ID_MISSING'});
    return;
  }
  if(!session.addtId(id, sid, media))
  {
    res.status(400).json({ error: 'DUPLICATE_ID'});
    return;
  }
  res.status(200).json(session.details[sid].info);
});

app.get('/wishlist', (req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'SESSION_REQUIRED' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.clearCookie('sid');
    res.status(403).json({ error: 'SESSION_INVALID' });
    return;
  }
  res.status(200).json(session.details[sid].info);
});

app.delete('/wishlist', express.json(),(req, res) => {
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'SESSION_REQUIRED' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.clearCookie('sid');
    res.status(403).json({ error: 'SESSION_INVALID' });
    return;
  }
  const id = req.body.id;
  if(!id)
  {
    res.status(404).json({error: 'ID_MISSING'});
    return;
  }
  const media = req.body.media;
  
  if(!media)
  {
    res.status(404).json({error: 'DATA_LOAD'})
  }
  if(!session.removeId(id, sid, media))
  {
    res.status(400).json({ error: 'REMOVE-FAIL'});
    return;
  }
  res.status(200).json({ok:'SUCCESSFUL'});
});

app.get('/username', (req, res) => 
{
  const sid = req.cookies.sid;
  if( !sid) {
    res.status(401).json({ error: 'SESSION_REQUIRED' });
    return;
  }
  if( !session.isValid(sid) ) {
    res.clearCookie('sid');
    res.status(403).json({ error: 'SESSION_INVALID' });
    return;
  }
  res.status(200).json(session.details[sid].username);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
