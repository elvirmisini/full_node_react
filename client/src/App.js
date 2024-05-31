import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import "./App.css"

function App() {
  
    return (   
    <div className="App">
      <Router>
        <Link to="/createpost"> Create a Post</Link>
        <Link to="/"> Home Page</Link>
        <Routes>
        <Route exact path="/" element={<Home/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<Post/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
