import {Link} from 'react-router-dom';

const Nav = function({ user, logout })
 {
   
  if(!user.isLoggedIn) {
    return null;
  }


  return (
    <nav>
      <ul className="nav">
        <li><Link to='' >Home</Link></li>
        <li><Link to='/Movies' >Movies</Link></li>
        <li><Link to='/TvSeries' >Tv Series</Link></li>
        <li><Link to='/Wishlist'>Wishlist</Link></li>
        <li><Link to='/Search'>Search</Link></li>
        <li className="logout"><a href="#logout" onClick={logout}>Logout</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
