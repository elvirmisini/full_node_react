import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import Login from './pages/Login'
import Registration from './pages/Registration'
import "./App.css"

function App() {
  
    return (   
    <div className="App">
      <Router>
        <Link to="/createpost"> Create a Post</Link>
        <Link to="/"> Home Page</Link>
        <Link to="/login"> Login</Link>
        <Link to="/registration"> Registration</Link>
        <Routes>
        <Route exact path="/" element={<Home/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
