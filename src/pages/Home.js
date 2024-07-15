import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
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
            <Row className="w-100 m-0">
                <Col className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
                    <h1>Welcome to our Website</h1>
                    <p>Create, Update, Delete and View Our Fitness Activities</p>
                    <Link className="btn btn-primary" to={'/movies'}>Check Our Movies</Link>
                </Col>
            </Row>
        </div>
    );
}
