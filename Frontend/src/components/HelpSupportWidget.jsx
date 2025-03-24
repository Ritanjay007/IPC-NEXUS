import { useState, useRef, useEffect } from 'react';
import { Card, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import { FaQuestionCircle, FaTimes, FaSearch, FaPaperPlane } from 'react-icons/fa';
import '../styles/Components.css';

const HelpSupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const widgetRef = useRef(null);

  // Sample FAQ data - you can replace this with your actual FAQ data
  const faqData = [
    {
      question: "What is IPC Nexus?",
      answer: "IPC Nexus is a comprehensive platform for exploring and understanding the Indian Penal Code sections, filing complaints, and accessing legal information."
    },
    {
      question: "How do I search for IPC sections?",
      answer: "You can search for IPC sections using the search bar in the Learn IPC section. You can search by section number or keywords related to the offense."
    },
    {
      question: "How do I file a complaint?",
      answer: "You can file a complaint by navigating to the File Complaint section and filling out the complaint form with the required details."
    },
    {
      question: "Can I track my complaint status?",
      answer: "Yes, you can track your complaint status in the Complaint History section after filing a complaint."
    }
  ];

  useEffect(() => {
    setFilteredQuestions(faqData);
  }, []);

  useEffect(() => {
    const filtered = faqData.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(filtered);
  }, [searchQuery]);

  const handleSubmitQuestion = () => {
    // Here you would typically send the new question to your backend
    console.log('New question submitted:', newQuestion);
    setNewQuestion('');
    setShowNewQuestionModal(false);
  };

  return (
    <>
      <div 
        ref={widgetRef}
        className="help-support-widget"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000
        }}
      >
        <Button
          variant="primary"
          className="rounded-circle p-3 shadow-sm"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <FaQuestionCircle size={24} />
        </Button>
      </div>

      {isOpen && (
        <Card 
          className="help-support-card shadow-lg"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            maxHeight: '500px',
            zIndex: 1000
          }}
        >
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Help & Support</h5>
            <Button 
              variant="link" 
              className="text-white p-0"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes />
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="p-3 border-bottom">
              <Form.Control
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-2"
              />
              <Button 
                variant="outline-primary" 
                className="w-100"
                onClick={() => setShowNewQuestionModal(true)}
              >
                Ask a New Question
              </Button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {filteredQuestions.map((faq, index) => (
                  <ListGroup.Item key={index} className="border-bottom">
                    <div className="fw-semibold mb-1">{faq.question}</div>
                    <div className="text-muted small">{faq.answer}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Card.Body>
        </Card>
      )}

      <Modal show={showNewQuestionModal} onHide={() => setShowNewQuestionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ask a New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Type your question here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewQuestionModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmitQuestion}
            disabled={!newQuestion.trim()}
          >
            <FaPaperPlane className="me-2" />
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HelpSupportWidget; 