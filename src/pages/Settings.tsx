import React, { useState, useEffect } from 'react';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', apiKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '6rem 1rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Settings</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
          Gemini API Key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Paste your API key here..."
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'var(--bg-card)', 
            border: '1px solid var(--border-bright)', 
            borderRadius: '8px',
            color: 'var(--text-primary)',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px', lineHeight: '1.5' }}>
          Your API key is stored locally and used only for requests to Google Generative AI.
        </p>
      </div>

      <button onClick={handleSave} className="btn btn-primary" style={{ width: '100%' }}>
        {saved ? 'Saved successfully' : 'Save Settings'}
      </button>
    </div>
  );
};

export default Settings;
