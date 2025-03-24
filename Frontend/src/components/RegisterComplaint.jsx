import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../styles/Components.css';

const RegisterComplaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    incidentDate: '',
    location: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      setMessage('Complaint registered successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        incidentDate: '',
        location: '',
        description: '',
      });
    } catch (error) {
      setMessage('Error submitting complaint. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-page">
      <Container className="mt-5 d-flex justify-content-center">
        <Card style={{ width: "40rem", padding: "2rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
          <h2 className="text-center text-bold text-primary mb-4">Register Complaint</h2>
          {message && (
            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'} mb-4`}>
              {message}
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="incidentDate">
              <Form.Label>Incident Date</Form.Label>
              <Form.Control type="date" name="incidentDate" value={formData.incidentDate} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Location of Incident</Form.Label>
              <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description of the Incident</Form.Label>
              <Form.Control as="textarea" rows={4} name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 py-2" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default RegisterComplaint;