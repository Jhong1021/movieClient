import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isActive, setIsActive] = useState(true);
    
    function authenticate(e) {

        e.preventDefault();
        fetch('https://movieappapi-xi7a.onrender.com/users/login',{

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: email,
                password: password

            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            if(typeof data.access !== "undefined"){

                localStorage.setItem('token', data.access);
                retreiveUserDetails(data.access);

                Swal.fire({
                    title: 'Login Succesful',
                    icon: 'success',
                    text: 'Welcome to Zuitt!'
                })
            
            } else if (data.error === 'No Email Found') {

                // 
                Swal.fire({
                    title: 'No email found',
                    icon: 'error',
                    text: 'Email does not exist.'
                })

            } else if (data.error === 'Email and password do not match') {

                // 
                Swal.fire({
                    title: 'Email and password do not match',
                    icon: 'error'
                })

            } else {

                 Swal.fire({
                    title: 'Login failed',
                    icon: 'error',
                    text: 'Check your login details and try again.'
                })
            }

        })

        setEmail('');
        setPassword('');

        }

        const retreiveUserDetails = (token) => {
            
            fetch('https://movieappapi-xi7a.onrender.com/users/details', {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            })
            .then(res => res.json())
            .then(data => {

                setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
                });

            })

        };

    useEffect(() => {

        if(email !== "" && password !==""){

            setIsActive(true)

        } else {

            setIsActive(false)

        }

    }, [email, password]);

    return (
        (user.id !== null) ?
        <Navigate to="/movies" />

        :

        <div
            style={{
                backgroundImage: "url('https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4} className="p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', borderRadius: '10px' }}>
                        <Form onSubmit={(e) => authenticate(e)}>
                            <h1 className="my-5 text-center">Login</h1>
                            <Form.Group controlId="userEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            { isActive ? 
                                <Button className="mt-3 w-100" variant="primary" type="submit" id="submitBtn">
                                    Submit
                                </Button>
                                : 
                                <Button className="mt-3 w-100" variant="danger" type="submit" id="submitBtn" disabled>
                                    Submit
                                </Button>
                            }
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
