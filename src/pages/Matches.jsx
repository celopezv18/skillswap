import { useEffect, useState } from 'react';
import { getMatches } from '../api'; // Llamada a la API
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  const goToChat = (matchId) => {
    navigate('/chat', { state: { matchId: matchId } });
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getMatches(localStorage.getItem('idu')); // Llamada a la API
        setMatches(response.data);
        setFilteredMatches(response.data); // Inicialmente muestra todos los matches
      } catch (err) {
        setError('Error fetching matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Filtra los matches según los términos de búsqueda y filtros seleccionados
  useEffect(() => {
    let filtered = matches;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter((match) =>
        match.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por ubicación
    if (locationFilter) {
      filtered = filtered.filter(
        (match) =>
          match.location &&
          match.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    // Filtrar por estado del match
    if (statusFilter) {
      filtered = filtered.filter(
        (match) => match.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Ordenar los resultados
    if (sortOrder === 'name-asc') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === 'status') {
      filtered = filtered.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredMatches(filtered);
  }, [searchTerm, locationFilter, statusFilter, sortOrder, matches]);

  if (loading) return <div className="text-center my-5">Loading matches...</div>;
  if (error) return <div className="text-danger text-center my-5">{error}</div>;

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Your Matches</h2>

      {/* Buscador, Filtros y Ordenación */}
      <Row className="mb-4">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Filter by status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="status">Status</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Lista de Matches */}
      {filteredMatches.length > 0 ? (
        <Row>
          {filteredMatches.map((match) => (
            <Col md={6} lg={4} className="mb-4" key={match.id}>
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{match.name}</Card.Title>
                  <Card.Text className="text-muted">
                    <strong>Email:</strong> {match.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong>{' '}
                    {match.location || 'Not specified'}
                  </Card.Text>
                  <Card.Text>
                    <strong>Status:</strong> {match.status}
                  </Card.Text>
                  <Button variant="primary" className="w-100" onClick={() => {goToChat(match.id)}}>
                    Start Chat
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-muted">
          No matches found. Adjust your search or filters!
        </p>
      )}
    </Container>
  );
};

export default Matches;