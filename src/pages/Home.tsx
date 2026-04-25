import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="container animate-in" style={{ textAlign: 'center', padding: '8rem 1.5rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '100px', background: 'var(--ai-bg)', border: '1px solid var(--ai-border)', color: 'var(--ai-purple)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '2rem' }}>
        <Sparkles size={14} /> Powered by Gemini 2.5 Flash
      </div>
      
      <h1 style={{ fontSize: '4.5rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1 }}>
        Master Algorithms <br/>
        <span style={{ color: 'var(--ai-purple)' }}>with Intelligence.</span>
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
        가장 세련된 개발 환경에서 AI 어시스턴트와 함께 문제를 해결하세요. <br/>
        실시간 코드 리뷰와 힌트 기능을 통해 더 빠르게 성장할 수 있습니다.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/problems" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
          Get Started <ArrowRight size={18} />
        </Link>
        <Link to="/settings" className="btn" style={{ padding: '14px 28px', fontSize: '1rem', background: 'transparent' }}>
          API Settings
        </Link>
      </div>

      <div style={{ marginTop: '8rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ color: 'var(--ai-purple)', marginBottom: '1rem' }}><Zap size={24} fill="currentColor" /></div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Instant Feedback</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>작성한 코드에 대해 즉각적인 AI 리뷰를 받고 시간 복잡도를 개선하세요.</p>
        </div>
        <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ color: 'var(--ai-purple)', marginBottom: '1rem' }}><Sparkles size={24} fill="currentColor" /></div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Studio IDE</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>오직 문제 풀이에만 집중할 수 있는 군더더기 없는 최상의 코딩 환경.</p>
        </div>
        <div style={{ textAlign: 'left', padding: '2rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
          <div style={{ color: 'var(--ai-purple)', marginBottom: '1rem' }}><ShieldCheck size={24} fill="currentColor" /></div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '8px' }}>Local Security</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>중요한 API 키는 본인의 브라우저 로컬 저장소에만 안전하게 보관됩니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
