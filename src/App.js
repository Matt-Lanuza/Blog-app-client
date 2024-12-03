import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { UserProvider } from './context/UserContext';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';

function App() {
    // const [user, setUser] = useState(() => {
    //   const savedUser = localStorage.getItem('user');
    //   return savedUser ? JSON.parse(savedUser) : { id: null, isAdmin: null };
    // });

    // useEffect(() => {
    //   const token = localStorage.getItem('token');

    //   if (!token) {
    //     console.error('No token found in localStorage');
    //     return;
    //   }

    //   fetch('https://blog-post-server.onrender.com/users/details', {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log("A user is logged in", data);

    //       if (data !== undefined) {
    //         setUser({
    //           id: data.user.id,
    //           isAdmin: data.user.isAdmin,
    //         });
    //         localStorage.setItem('user', JSON.stringify({
    //           id: data.user.id,
    //           isAdmin: data.user.isAdmin
    //         }));
    //       } else {
    //         setUser({
    //           id: null,
    //           isAdmin: null
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.error('Error fetching user details:', err);
    //       setUser({
    //         id: null,
    //         isAdmin: null
    //       });
    //     });
    // }, []);

    // function unsetUser() {
    //   localStorage.clear();
    //   setUser({ id: null, isAdmin: null });
    // }


    return (
    // <UserProvider value={{ user, setUser, unsetUser }}>
      <Router>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
{/*          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />*/}
        </Routes>
      </Router>
    // </UserProvider>
  );
}

export default App;