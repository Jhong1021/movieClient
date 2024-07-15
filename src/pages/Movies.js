import { useEffect, useState, useContext } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import AddComment from '../components/AddComment'; // Import AddComment component
import UserContext from '../UserContext';

export default function Movies() {
  const { user } = useContext(UserContext);

  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    fetch(`https://movieappapi-xi7a.onrender.com/movies/getMovies`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.table(data);
        if (Array.isArray(data.movies)) {
          setMovies(data.movies);
        } else {
          setMovies([]);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setMovies([]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (user.id !== null) {
    return user.isAdmin ? <AdminView /> : <UserView />;
  }

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white',
        padding: '20px'
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h1 className="text-center my-4">Movies</h1>
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr className="text-center">
                  <th>Title</th>
                  <th>Description</th>
                  <th>Genre</th>
                  <th>Year</th>
                  <th>Director</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(movies) && movies.map(movie => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.description}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.year}</td>
                    <td>{movie.director}</td>
                    <td>
                      {movie.comments && movie.comments.length > 0 ? (
                        <ul>
                          {movie.comments.map(comment => (
                            <li key={comment._id}>{comment.comment}</li>
                          ))}
                        </ul>
                      ) : (
                        'No comments'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
