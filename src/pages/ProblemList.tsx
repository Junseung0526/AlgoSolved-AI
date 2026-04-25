import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { problems } from '../data/problems';

const ProblemList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '4rem 1rem' }}>
      <header style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '1rem' }}>Problems</h1>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search problems..."
            style={{ 
              width: '100%', 
              padding: '12px 0', 
              border: 'none', 
              borderBottom: '1px solid var(--border-subtle)',
              background: 'transparent',
              fontSize: '1rem',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>ID</th>
            <th>TITLE</th>
            <th>CATEGORY</th>
            <th style={{ width: '100px', textAlign: 'right' }}>DIFFICULTY</th>
          </tr>
        </thead>
        <tbody>
          {filteredProblems.map((p) => (
            <tr key={p.id} className="problem-row">
              <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.id.padStart(3, '0')}</td>
              <td>
                <Link to={`/problems/${p.id}`} style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}>
                  {p.title}
                </Link>
              </td>
              <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{p.category}</td>
              <td style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 800, 
                  color: p.difficulty === 'Easy' ? '#10b981' : '#f59e0b',
                  letterSpacing: '0.05em'
                }}>
                  {p.difficulty.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemList;
