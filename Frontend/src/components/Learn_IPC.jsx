import { useState, useEffect } from "react";
import { Container, Card, Form, Table, Spinner, Badge } from "react-bootstrap";
import "../styles/Components.css";

const IPCSectionsTable = () => {
  const [sections, setSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (query = "") => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error loading IPC sections. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <Container className="mt-5">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">Indian Penal Code</h2>
          <p className="mb-0 text-white-50">Explore and Search IPC Sections</p>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search by section number or offense description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {sections.length === 0 ? (
                <div className="text-center py-5">
                  <svg
                    className="mb-3"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 21a9 9 0 110-18 9 9 0 010 18z"
                    />
                  </svg>
                  <h4>No matching sections found</h4>
                  <p className="text-muted">Try searching with different keywords</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0 table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th style={{ width: "15%" }}>Section</th>
                        <th style={{ width: "45%" }}>Offense</th>
                        <th style={{ width: "40%" }}>Punishment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sections.map((item, index) => (
                        <tr key={index} className="align-middle">
                          <td>
                            <Badge bg="primary" className="fs-6 px-3 py-2">
                              {item.Section}
                            </Badge>
                          </td>
                          <td className="fw-semibold">{item.Offense}</td>
                          <td>
                            <span className="text-danger fw-medium">{item.Punishment}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default IPCSectionsTable;
