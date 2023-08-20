import React, { useState } from 'react';
import './style.css'; 

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userAnswer, setUserAnswer] = useState('');
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return `${num1} + ${num2}`;
  }

  const calculateCaptchaResult = () => {
    const [operand1, operand2] = captcha.split('+').map(part => parseInt(part.trim()));
    return operand1 + operand2;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (name && email && message && isCaptchaCorrect) {
      console.log('Form submitted successfully!');
      setShowSuccessMessage(true);
      setCaptcha(generateCaptcha()); 
      setUserAnswer('');
    } else {
        console.log('Please fill out all fields and solve the CAPTCHA correctly.');
    }
  };

  const handleCaptchaChange = (event) => {
    setUserAnswer(event.target.value);
    setIsCaptchaCorrect(parseInt(event.target.value) === calculateCaptchaResult());
  };

  return (
    <div className='container'> 
      <h1>Contact Us</h1>
      {showSuccessMessage ? (
        <p className="success-message">Thank you for your message! We'll be in touch soon.</p>
      ) : (
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />

        <label htmlFor="message">Message:</label><br />
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" required></textarea><br /><br />

        <label id='captcha-label' htmlFor="captcha">{captcha} = </label>
        <input type="text" id="captcha" value={userAnswer} onChange={handleCaptchaChange} required />

        <br /><br />
        <button type="submit">Submit</button>
      </form>
      )}
    </div>
  );
};

export default ContactForm;