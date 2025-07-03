import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {
  const primary = '#a259ff';
  const secondary = '#ff66c4';
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([
    { from: 'bot', text: 'Welcome back! Please enter your email.' }
  ]);
  const [loading, setLoading] = useState(false);

  const validateInput = () => {
    if (step === 0) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
    if (step === 1) return input.length >= 6;
    return true;
  };

  const getErrorMessage = () => {
    if (step === 0) return 'Please enter a valid email address.';
    if (step === 1) return 'Password must be at least 6 characters long.';
    return '';
  };

  const appendToConversation = (from, text) => {
    setConversation(prev => [...prev, { from, text }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      appendToConversation('user', input);
      const errorMsg = getErrorMessage();
      appendToConversation('bot', errorMsg);
      toast.error(errorMsg);
      setInput('');
      return;
    }

    appendToConversation('user', input);

    if (step === 0) {
      setFormData(prev => ({ ...prev, email: input }));
      appendToConversation('bot', 'Thanks! Now enter your password.');
      setStep(1);
      setInput('');
    } else if (step === 1) {
      const updatedForm = { ...formData, password: input };
      setLoading(true);

      try {
        const res = await fetch('http://localhost:3000/user/sign-in', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(updatedForm)
        });

        const data = await res.json();

        if (data.message === 'Sign In Success') {
          toast.success(`Welcome back, ${data.user.name}! 🎉`);
          appendToConversation('bot', `Welcome back, ${data.user.name}! 🎉`);
          localStorage.setItem('userId', data.user._id);
          setStep(2);
        } else if (data.error) {
          appendToConversation('bot', data.error);
          toast.error(data.error);
        } else {
          const errorMsg = 'Invalid credentials. Please try again.';
          appendToConversation('bot', errorMsg);
          toast.error(errorMsg);
        }
      } catch (error) {
        const serverError = 'Server error. Please try again later.';
        appendToConversation('bot', serverError);
        toast.error(serverError);
      } finally {
        setInput('');
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#f9f4ff', minHeight: '100vh', fontFamily: 'Quicksand, sans-serif' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{ maxWidth: '500px', backgroundColor: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
          <h4 className="text-center mb-4 fw-bold" style={{ color: primary }}>Sign In</h4>

          {/* Chat Conversation */}
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
            {conversation.map((msg, index) => (
              <div key={index} className={`text-${msg.from === 'bot' ? 'start' : 'end'} mb-2`}>
                <span
                  style={{
                    backgroundColor: msg.from === 'bot' ? '#ece4ff' : primary,
                    color: msg.from === 'bot' ? '#000' : '#fff',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    display: 'inline-block',
                    maxWidth: '80%',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Form */}
          {/* {step < 2 && (
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                type={step === 1 ? 'password' : 'text'}
                placeholder={step === 0 ? 'Enter your email' : 'Enter your password'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <Button
                type="submit"
                style={{ backgroundColor: primary, border: 'none', marginLeft: '10px' }}
                disabled={loading}
              >
                {loading ? '...' : 'Send'}
              </Button>
            </Form>
          )} */}
          {step < 2 && (
  <>
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type={step === 1 ? 'password' : 'text'}
        placeholder={step === 0 ? 'Enter your email' : 'Enter your password'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <Button
        type="submit"
        style={{ backgroundColor: primary, border: 'none', marginLeft: '10px' }}
        disabled={loading}
      >
        {loading ? '...' : 'Send'}
      </Button>
    </Form>

    {/* Forgot Password Link */}
    {/* <p className="mt-2 text-center">
      Forgot password?{' '}
      <span onClick={() => navigate('/forgot-password')} style={{ color: primary, cursor: 'pointer' }}>
        Reset here
      </span>
    </p> */}
  </>
)}


          {/* Success Redirect Button */}
          {step === 2 && (
            <div className="text-center mt-4">
              <Button
                onClick={() => navigate('/dashboard')}
                style={{
                  backgroundColor: secondary,
                  border: 'none',
                  padding: '10px 25px',
                  borderRadius: '30px',
                  fontWeight: 'bold'
                }}
              >
                Go to Dashboard
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-4">
            <span>
              New user?{' '}
              <Link to="/sign-up" style={{ color: primary, fontWeight: 'bold', textDecoration: 'none' }}>
                Sign-Up
              </Link>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
