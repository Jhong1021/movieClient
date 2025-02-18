import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditMovie({movie, fetchData}) {

	const [ title, setTitle ] = useState("");
	const [ director, setDirector ] = useState("");
	const [ year, setYear ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ genre, setGenre ] = useState("");
	const [showEdit, setShowEdit] = useState(false);

	const openEdit = () => {

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);

		setTitle("");
		setDirector("");
		setYear("");
		setDescription("");
		setGenre("");
	}

	const editMovie = (e, movie) => {

		e.preventDefault();

		fetch(`https://movieappapi-xi7a.onrender.com/movies/updateMovie/${movie}`, {
			method : "PATCH",
			headers : {
				'Content-Type' : 'application/json',
				Authorization : `Bearer ${localStorage.getItem('token')}`
			},
			body : JSON.stringify({
				title: title,
				director: director,
				year: year,
				description: description,
				genre: genre
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === 'Movie updated successfully') {

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Movie updated successfully'
				})

				closeEdit();
				fetchData();

			} else {

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})

				closeEdit();
				fetchData();
			}
		})
	}

	return (
		<>
		<Button className="mx-1" variant="primary" size="sm" onClick={() => openEdit()}>Edit</Button>

		<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editMovie(e, movie)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Movie</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Genre</Form.Label>
							<Form.Control type="text" value={genre} onChange={e => setGenre(e.target.value)} required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Year</Form.Label>
							<Form.Control type="text" value={year} onChange={e => setYear(e.target.value)} required />
						</Form.Group>

						<Form.Group>
							<Form.Label>Director</Form.Label>
							<Form.Control type="text" value={director} onChange={e => setDirector(e.target.value)} required />
						</Form.Group>

					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => closeEdit()}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
		)
}