import './App.css';
import { useState, useEffect } from 'react';
import { endSession, checkSession } from './js/services';
import Nav from './Components/Nav';
import errors from './js/errors';
import {ErrorContext, ContentState, WistlistState} from './js/context';
import Login from './Components/Login';
import Home from './Components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Movies from './Components/Movies';
import TvSeries from './Components/TvSeries';
import Search from './Components/Search';
import Wishlist from './Components/Wishlist';
import DisplayError from './Components/DisplayError';
import headerImg from './images/netweb.png';

function App() {
  
  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true });
  const [error,setError] = useState('');
  const [contentState, setContentState] = useState({});
  const [newwishlist, setnewwishlist] = useState('');
  const [color, setColor] = useState("login-container");

  useEffect( () => {
    checkSession()
    .then( userinfo => {
      setUserState({
        isLoggedIn: true,
        isPending: false,
        username: userinfo.username,
      });
      setColor("container");
    })
    .catch( (err) => {
      setError(errors[err.error || err || "DEFAULT"]);
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
      setError(errors[err.error || err || "DEFAULT"]);
    });
  }, [userState.username]); 

  const login = function({username}) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      username,
    });
    setColor("container");
  };

  const logout = function() {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
    .then( () => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    })
    .catch( (err) => {
      setError(errors[err.error || err || "DEFAULT"]);
      setUserState({
        ...userState,
        isPending: false,
      });
    });
  };

  if(userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

  let content;

  if(userState.isLoggedIn)
  {
    content = (
      <ContentState.Provider value={[contentState, setContentState]}>
          <Router>
          <Nav user={userState} logout={logout} />
          <DisplayError error={error} />
          <div>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/Movies' component={Movies} />
              <Route exact path='/TvSeries' component={TvSeries} />
              <Route path='/Wishlist' component={Wishlist} />
              <Route path='/Search' component={Search} />
            </Switch>
          </div>
        </Router>
      </ContentState.Provider>
      
    );
  }
  else{
    content = <Login onLogin={login} />;
  }
  
  return (
    <div className="app">
      <div className={color}>
        <ErrorContext.Provider value={[setError]}>
         <WistlistState.Provider value={[newwishlist, setnewwishlist]}>
            <div className="header-logo"><img src={headerImg} className="image-net" alt="header-logo"/></div>
            {content}
         </WistlistState.Provider>
        </ErrorContext.Provider>
      </div>
      
    </div>
  );
};

export default App;