// component to compose email
import React, { useState } from 'react';
import { useSessionContext } from '../../../contexts/sessionContext';
import api from '../../../services/api';

import './styles.css';

interface ComposeEmailProps {
  composeEmailIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComposeEmail: React.FC<ComposeEmailProps> = ({ composeEmailIsOpen }) => {
  const { user } = useSessionContext();

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmail = () => {
    if (!user) return;

    api.post('/send', {
      from: user,
      to,
      subject,
      body,
      date: new Date(),
    });

    composeEmailIsOpen(false);
  };

  return (
    <div className="compose-email">
      <div className="compose-email-container">
        <div className="compose-email-container-header">
          <h1 className="compose-email-container-header-title">
            Compose Email
          </h1>
        </div>
        <div className="compose-email-container-content">
          <form
            className="compose-email-container-content-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendEmail();
            }}
          >
            <div className="compose-email-container-content-form-field">
              <label htmlFor="to">To</label>
              <input
                type="email"
                name="to"
                id="to"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="compose-email-container-content-form-field">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="compose-email-container-content-form-field">
              <label htmlFor="body">Body</label>
              <textarea
                name="body"
                id="body"
                cols={30}
                rows={10}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div className="compose-email-container-content-form-field">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;
