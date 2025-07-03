import React, { useState } from 'react';
import axios from 'axios';
import Navbarpage from "./Navbarpage";
import FooterPage from "./FooterPage";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HobbyAI = () => {
  const [hobby, setHobby] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const primary = '#a259ff';
  const secondary = '#ff66c4';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/ai/ask', { hobby, question });
      if (res.data.success) {
        setAnswer(res.data.answer);
        toast.success('Answer received successfully!');
      } else {
        toast.error('Failed to get an answer.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbarpage />
      <ToastContainer />

      <div
        className="d-flex justify-content-center align-items-start"
        style={{
          backgroundColor: '#f4f1fb',
          minHeight: '100vh',
          fontFamily: 'Quicksand, sans-serif',
          padding: '40px 20px',
        }}
      >
        <div
          className="shadow-lg p-5 rounded-4"
          style={{
            maxWidth: 700,
            width: '100%',
            backgroundColor: 'white',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold" style={{ color: primary }}>Ask Something About Your Hobby!</h3>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => navigate(-1)}
              style={{
                borderRadius: '20px',
                color: primary,
                border: `1px solid ${primary}`,
              }}
            >
              ← Back
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label className="form-label fw-semibold">Your Hobby</label>
              <input
                type="text"
                className="form-control p-3 rounded-3"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                placeholder="e.g., Painting, Dancing, etc."
                required
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label fw-semibold">Your Question</label>
              <textarea
                className="form-control p-3 rounded-3"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your question related to your hobby..."
                required
                rows="4"
                style={{ resize: 'none' }}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn px-5 py-2 rounded-pill fw-bold"
                style={{
                  backgroundColor: secondary,
                  border: 'none',
                  color: 'white',
                }}
                disabled={loading}
              >
                {loading ? 'Getting Answer...' : 'Ask'}
              </button>
            </div>
          </form>

          {answer && (
            <div
              className="alert alert-success mt-4"
              style={{
                backgroundColor: '#e6ffe6',
                borderLeft: `5px solid ${primary}`
              }}
            >
              <h5 className="fw-semibold">Answer:</h5>
              <p className="mb-0">{answer}</p>
            </div>
          )}
        </div>
      </div>

      <FooterPage />
    </>
  );
};

export default HobbyAI;
