import {Button, Table, Modal, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Ebooks = () => {
  let [ebooks, setEbooks] = useState([]);
  const [show, setShow] = useState(false);

  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [released, setReleased] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAPI = async () => {
    try {
      const response = await axios.get("https://6489db485fa58521cab0607f.mockapi.io/ebook");
      setEbooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAPI();
  }, []);

  const deleteEbook = async (id) => {
    await axios.delete(`https://6489db485fa58521cab0607f.mockapi.io/ebook/${id}`);
    deletedAlert();
    getAPI();
  };

  const deletedAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Berhasil menghapus Ebook!",
    });
  };

  const validationAlert = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Hapus?",
        text: "Yakin ingin menghapus Ebook?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#db3635",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteEbook(id);
        }
      });
  };

  const newBook = {
    title: title,
    cover: cover,
    description: description,
    content: content,
    authorName: author,
    createdAt: released,
    category: category,
    authorAvatar: authorAvatar,
    link: link,
  };

  const addEbook = async () => {
    try {
      await axios.post('https://6489db485fa58521cab0607f.mockapi.io/ebook', newBook);
      addedAlert();
      getAPI();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addedAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Berhasil menambah Ebook!",
    });
  };

  return (
    <div className="mx-2">
      <div className="d-flex justify-content-end">
        <Button variant="dark" onClick={handleShow} className="my-3 fw-semibold">
          + Add Ebook
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ebook</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form name="form">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" autoFocus autoComplete="off" required={true} value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cover</Form.Label>
              <Form.Control type="text" autoComplete="off" required={true} value={cover} onChange={(e) => setCover(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" autoComplete="off" required={true} value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author Avatar</Form.Label>
              <Form.Control type="text" autoComplete="off" required={true} value={authorAvatar} onChange={(e) => setAuthorAvatar(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Created At</Form.Label>
              <Form.Control type="text" autoComplete="off" required={true} value={released} onChange={(e) => setReleased(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" autoComplete="off" required={true} value={category} onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" autoComplete="off" required={true} value={link} onChange={(e) => setLink(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} autoComplete="off" required={true} value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} autoComplete="off" required={true} value={content} onChange={(e) => setContent(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
          <Button variant="success" onClick={addEbook}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      <Table responsive="lg" variant="light">
        <thead>
          <tr className="text-center">
            <th>No</th>
            <th>Cover</th>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ebooks.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td>{index + 1}</td>
              <td>
                <img src={item.cover} alt="cover" className="cover-image w-25" />
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.authorName}</td>
              <td>
                <Button onClick={() => validationAlert(item.id)} className="bg-danger mx-1">
                  <i className="bx bx-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Ebooks;
