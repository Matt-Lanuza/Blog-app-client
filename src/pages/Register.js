import { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

export default function Register() {

    const [email,setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [isActive, setIsActive] = useState(false);
    const notyf = new Notyf();
    const navigate = useNavigate();


    useEffect(() => {
      if (
        email !== "" &&
        username !== "" &&
        password !== "" &&
        verifyPassword !== "" &&
        password === verifyPassword
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }, [email, username, password, verifyPassword]);


    function registerUser(e) {
        e.preventDefault();

        fetch('https://blog-post-server.onrender.com/users/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password:password
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Data", data)

            if(data.message === 'Registered successfully') {
                setEmail('');
                setUsername('');
                setPassword('');
                setVerifyPassword('');

                notyf.success("You are now registered! Please log in.");

                /*after register, it will route to /login*/
                navigate('/login');
            } else if (data.error === 'Invalid email address') {
                notyf.error("Please double-check your email and make sure it follows the format (e.g., juandelacruz@mail.com).");
            } else if (data.error === 'Password must be at least 8 characters long') {
                notyf.error("Your password must be at least 8 characters long. Please try again.");
            } else {
                notyf.error("Please try again!");
            }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          notyf.error("There was a problem with the registration. Please try again later.");
        });
    }

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Registration</h2>
            <Form onSubmit={registerUser} className="mx-auto" style={{ maxWidth: '500px' }}>
                <Form.Group controlId="formEmail" className="mt-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formUsername" className="mt-3">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formVerifyPassword" className="mt-3">
                    <Form.Label>Verify Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Verify your password"
                        name="verifyPassword"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button
                    variant={isActive ? "primary" : "danger"}
                    type="submit"
                    id="submitBtn"
                    className="my-5 w-100"
                    disabled={!isActive}
                >
                    {isActive ? "Submit" : "Please fill in all required fields to register"}
                </Button>
            </Form>

            <div className="mt-3 text-center">
                <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </div>
        </Container>
    );
}