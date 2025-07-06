import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleSignIn from './GoogleSignIn';
// AddProductForm.js
import config from '../Config';

const baseUrl = config.BASE_URL;
const SignUpPage = () => {
  const primary = '#a259ff';
  const secondary = '#ff66c4';
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [input, setInput] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    { from: 'bot', text: 'Hello HobbyBuddy! What can I call you?' }
  ]);

  const validateInput = () => {
    if (step === 0) return input.trim().length >= 2;
    if (step === 1) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim());
    if (step === 2) return input.length >= 6;
    if (step === 3) return /^\d{6}$/.test(otp);
    return true;
  };

  const getErrorMessage = () => {
    if (step === 0) return 'Please enter a name with at least 2 characters.';
    if (step === 1) return 'Please enter a valid email address.';
    if (step === 2) return 'Password must be at least 6 characters long.';
    if (step === 3) return 'OTP must be 6 digits.';
    return '';
  };

  const appendMessage = (msg) => {
    setConversation(prev => [...prev, msg]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      appendMessage({ from: 'user', text: input });
      const errorMsg = getErrorMessage();
      appendMessage({ from: 'bot', text: errorMsg });
      toast.error(errorMsg);
      setInput('');
      return;
    }

    appendMessage({ from: 'user', text: input });

    if (step === 0) {
      setFormData(prev => ({ ...prev, name: input }));
      appendMessage({ from: 'bot', text: `Nice to meet you, ${input}! What's your email?` });
      setInput('');
      setStep(1);
    } else if (step === 1) {
      setFormData(prev => ({ ...prev, email: input }));
      appendMessage({ from: 'bot', text: 'Awesome! Now choose a password.' });
      setInput('');
      setStep(2);
    } else if (step === 2) {
      const updatedForm = { ...formData, password: input };
      setLoading(true);

      try {
        const res = await fetch(`${baseUrl}/user/sign-up`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedForm)
        });

        const data = await res.json();

        if (res.status !== 201) {
          appendMessage({ from: 'bot', text: data.error || 'Something went wrong.' });
          toast.error(data.error || 'Something went wrong.');
        } else {
          appendMessage({ from: 'bot', text: `OTP sent to ${updatedForm.email}. Please enter the OTP to verify your account.` });
          toast.success('OTP sent successfully!');
          setFormData(updatedForm);
          setStep(3);
        }
      } catch (error) {
        appendMessage({ from: 'bot', text: 'Server error, please try again later.' });
        toast.error('Server error, please try again later.');
        console.error('Sign-up error:', error);
      }

      setLoading(false);
      setInput('');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      appendMessage({ from: 'user', text: otp });
      const errorMsg = getErrorMessage();
      appendMessage({ from: 'bot', text: errorMsg });
      toast.error(errorMsg);
      setOtp('');
      return;
    }

    appendMessage({ from: 'user', text: otp });
    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp })
      });

      const data = await res.json();
      if (res.status === 200) {
        appendMessage({ from: 'bot', text: `You're all set, ${formData.name}! Welcome to Hobby Buddy ` });
        toast.success(`Welcome ${formData.name}, account verified!`);
        setStep(4);
      } else {
        appendMessage({ from: 'bot', text: data.message || 'Invalid OTP, please try again.' });
        toast.error(data.message || 'Invalid OTP, please try again.');
      }
    } catch (error) {
      appendMessage({ from: 'bot', text: 'Server error while verifying OTP.' });
      toast.error('Server error while verifying OTP.');
      console.error('OTP verify error:', error);
    }

    setLoading(false);
    setOtp('');
  };

  return (
    <>
    <div style={{ backgroundColor: '#f9f4ff', minHeight: '100vh', fontFamily: 'Quicksand, sans-serif' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container className="py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{
          maxWidth: '500px',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)'
        }}>
          <h4 className="text-center mb-4 fw-bold" style={{ color: primary }}>Sign Up</h4>

          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
            {conversation.map((msg, index) => (
              <div key={index} className={`text-${msg.from === 'bot' ? 'start' : 'end'} mb-2`}>
                <span style={{
                  backgroundColor: msg.from === 'bot' ? '#ece4ff' : primary,
                  color: msg.from === 'bot' ? '#000' : '#fff',
                  padding: '10px 15px',
                  borderRadius: '15px',
                  display: 'inline-block',
                  maxWidth: '80%'
                }}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {step < 3 && (
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                type={step === 2 ? 'password' : 'text'}
                placeholder={
                  step === 0
                    ? 'Enter your name'
                    : step === 1
                    ? 'Enter your email'
                    : 'Enter password'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <Button type="submit" style={{ backgroundColor: primary, border: 'none', marginLeft: '10px' }} disabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Send'}
              </Button>
            </Form>
          )}

          {step === 3 && (
            <Form onSubmit={handleOtpSubmit} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button type="submit" style={{ backgroundColor: primary, border: 'none', marginLeft: '10px' }} disabled={loading}>
                {loading ? <Spinner size="sm" /> : 'Verify'}
              </Button>
            </Form>
          )}
          <div className="text-center mt-4">
           <GoogleSignIn/>
            <p className="mt-3">
              Already have an account?{' '}
              <span style={{ color: primary, cursor: 'pointer' }} onClick={() => navigate('/sign-in')}>
                Sign In
              </span>
            </p>
          </div>
        </div>
      </Container>
    </div>
 </> );
};

export default SignUpPage;
