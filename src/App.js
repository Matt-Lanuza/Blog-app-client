import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Posts from './pages/Posts';
import PostDetails from './pages/PostDetails';
import MyPosts from './pages/MyPosts';

function App() {
    const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : { id: null, username: null, isAdmin: null };
    });

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      fetch('https://blog-post-server.onrender.com/users/details', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("A user is logged in", data);

          if (data !== undefined) {
            setUser({
              id: data.user.id,
              username: data.user.username,
              isAdmin: data.user.isAdmin,
            });
            localStorage.setItem('user', JSON.stringify({
              id: data.user.id,
              username: data.user.username,
              isAdmin: data.user.isAdmin
            }));
          } else {
            setUser({
              id: null,
              username: null,
              isAdmin: null
            });
          }
        })
        .catch((err) => {
          console.error('Error fetching user details:', err);
          setUser({
            id: null,
            username: null,
            isAdmin: null
          });
        });
    }, []);

    function unsetUser() {
      localStorage.clear();
      setUser({ id: null, username: null, isAdmin: null });
    }


    return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/my-posts" element={<MyPosts />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;