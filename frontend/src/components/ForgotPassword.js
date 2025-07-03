import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const primary = '#a259ff';
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    { from: 'bot', text: 'Forgot your password? No worries! Enter your email.' }
  ]);

  const appendMessage = (msg) => {
    setConversation((prev) => [...prev, msg]);
  };

  const handleNext = async (e) => {
  e.preventDefault();
  if (step === 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast.error("Enter valid email");
    return;
  }
  if (step === 1 && !/^\d{6}$/.test(otp)) {
    toast.error("Enter valid 6-digit OTP");
    return;
  }
  if (step === 2 && newPassword.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }
  if (step === 2 && newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    if (step === 0) {
      appendMessage({ from: 'user', text: email });

      const res = await fetch('http://localhost:3000/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        appendMessage({ from: 'bot', text: `OTP sent to ${email}. Please enter it.` });
        setStep(1);
      } else {
        appendMessage({ from: 'bot', text: data.error });
        toast.error(data.error);
      }
    }

    if (step === 1) {
      appendMessage({ from: 'user', text: otp });

      const res = await fetch('http://localhost:3000/user/verify-forgot-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();

      if (res.ok) {
        appendMessage({ from: 'bot', text: 'OTP verified! Set your new password.' });
        sessionStorage.setItem("otpVerified", "true");
        setStep(2);
      } else {
        appendMessage({ from: 'bot', text: data.message });
        toast.error(data.message);
      }
    }

    if (step === 2) {
      appendMessage({ from: 'user', text: '[Entered new password]' });

      const otpVerified = sessionStorage.getItem("otpVerified");
      if (otpVerified !== "true") {
        toast.error("Please verify OTP first.");
        return;
      }

      const res = await fetch('http://localhost:3000/user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });
      const data = await res.json();

      if (res.ok) {
        appendMessage({ from: 'bot', text: 'Password changed successfully! You can now login.' });
        toast.success("Password changed!");
        sessionStorage.removeItem("otpVerified"); // Clear after success
        setTimeout(() => navigate('/sign-in'), 2000);
      } else {
        appendMessage({ from: 'bot', text: data.message });
        toast.error(data.message);
      }
    }
  } catch (err) {
    toast.error("Server error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ backgroundColor: '#f9f4ff', minHeight: '100vh' }}>
      <ToastContainer />
      <Container className="py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="w-100" style={{
          maxWidth: '500px',
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 0 15px rgba(0,0,0,0.1)'
        }}>
          <h4 className="text-center mb-4 fw-bold" style={{ color: primary }}>Reset Password</h4>

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

          <Form onSubmit={handleNext} className="d-flex flex-column gap-3">
            {step === 0 && (
              <Form.Control
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            )}
            {step === 1 && (
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}
            {step === 2 && (
              <>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </>
            )}

            <Button type="submit" disabled={loading} style={{ backgroundColor: primary, border: 'none' }}>
              {loading ? <Spinner size="sm" /> : 'Next'}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
