import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { problems } from '../data/problems';
import type { Problem } from '../data/problems';
import { getGeminiResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft, Play, Send, Sparkles, Wand2, X, RotateCcw } from 'lucide-react';

const ProblemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('# Solution goes here...\n\ndef solution():\n    pass\n');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ status: string; message: string } | null>(null);
  const consoleRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundProblem = problems.find((p) => p.id === id);
    if (foundProblem) setProblem(foundProblem);
  }, [id]);

  // 답변이 오면 자동으로 최하단으로 스크롤
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [aiResponse, submitResult]);

  const handleAskAI = async (type: 'hint' | 'review') => {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) return alert('Settings 페이지에서 Gemini API 키를 먼저 설정해주세요.');

    // 즉시 화면에 콘솔을 표시하고 로딩 상태로 진입
    setIsLoading(true);
    setSubmitResult(null);
    setAiResponse('AI가 당신의 코드를 읽고 있습니다... 잠시만 기다려주세요.');

    const prompt = type === 'hint' 
      ? `문제: ${problem?.title}\n설명: ${problem?.description}\n코드:\n${code}\n위 코드를 분석하여 직접적인 정답 대신 힌트와 알고리즘 접근법을 한국어 마크다운 형식으로 알려주세요.`
      : `문제: ${problem?.title}\n코드:\n${code}\n위 코드를 파이썬 클린 코드 및 효율성 관점에서 리뷰하고, 수정된 전체 코드가 있다면 마크다운 파이썬 코드 블록에 포함해서 한국어로 알려주세요.`;

    try {
      const response = await getGeminiResponse(apiKey, prompt);
      setAiResponse(response);
    } catch (err: any) {
      setAiResponse(`### 오류 발생\n${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRun = async () => {
    setIsSubmitting(true);
    setAiResponse('');
    setSubmitResult({ status: 'Running', message: '파이썬 인터프리터 초기화 중...' });

    try {
      // @ts-ignore
      const pyodide = await window.loadPyodide();
      
      setSubmitResult({ status: 'Running', message: '코드 실행 중...' });
      
      // 파이썬의 print() 출력을 캡처하기 위한 설정
      let output = '';
      pyodide.setStdout({
        batched: (text: string) => {
          output += text + '\n';
        },
      });

      // 사용자 코드 실행
      await pyodide.runPythonAsync(code);
      
      setIsSubmitting(false);
      setSubmitResult({
        status: 'Output',
        message: output || '(출력 결과가 없습니다)'
      });
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitResult({
        status: 'Error',
        message: err.message
      });
    }
  };

  const applySuggestedCode = () => {
    const codeBlockRegex = /```(?:python)?([\s\S]*?)```/g;
    const matches = [...aiResponse.matchAll(codeBlockRegex)];
    if (matches.length > 0) {
      const newCode = matches[matches.length - 1][1].trim();
      if (window.confirm('AI가 제안한 코드를 적용하시겠습니까?')) setCode(newCode);
    }
  };

  if (!problem) return null;

  return (
    <div className="problem-detail-layout animate-in">
      <div className="info-pane">
        <Link to="/problems" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--zinc-400)', textDecoration: 'none' }}>
          <ChevronLeft size={14} /> BACK TO PROBLEMS
        </Link>
        <h1 style={{ marginTop: '1.5rem', fontSize: '1.75rem' }}>{problem.id}. {problem.title}</h1>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', padding: '2px 8px', borderRadius: '4px' }}>{problem.difficulty}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--zinc-400)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '4px' }}>{problem.category}</span>
        </div>

        <section>
          <div className="description-text">{problem.description}</div>
        </section>

        <section>
          <h3>Input</h3>
          <div className="description-text">{problem.inputFormat}</div>
          <h3>Output</h3>
          <div className="description-text">{problem.outputFormat}</div>
        </section>

        <section>
          <h3>Examples</h3>
          {problem.examples.map((ex, i) => (
            <div key={i} className="example-box">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--zinc-500)' }}>INPUT</span>
                  <pre style={{ margin: '4px 0', fontSize: '0.85rem' }}>{ex.input}</pre>
                </div>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--zinc-500)' }}>OUTPUT</span>
                  <pre style={{ margin: '4px 0', fontSize: '0.85rem' }}>{ex.output}</pre>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="editor-container">
        <div className="action-bar">
          <button className="btn btn-ai" onClick={() => handleAskAI('hint')} disabled={isLoading}>
            <Sparkles size={14} /> Hint
          </button>
          <button className="btn btn-ai" onClick={() => handleAskAI('review')} disabled={isLoading}>
            <Wand2 size={14} /> Review
          </button>
          <div style={{ flex: 1 }}></div>
          <button className="btn btn-primary" onClick={handleRun} disabled={isSubmitting}>
            {isSubmitting ? 'Grading...' : <><Play size={14} fill="currentColor" /> Run Code</>}
          </button>
        </div>

        <div className="editor-surface">
          <div className="editor-header">
            <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Send size={12} /> main.py
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <button onClick={() => setCode('# Solution goes here...\n\ndef solution():\n    pass\n')} style={{ background: 'none', border: 'none', color: 'var(--zinc-500)', cursor: 'pointer' }} title="Reset Code">
                 <RotateCcw size={14} />
               </button>
               <span style={{ fontSize: '0.7rem', color: 'var(--zinc-500)' }}>Python 3.10</span>
            </div>
          </div>
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
        </div>

        {(aiResponse || submitResult) && (
          <div className="console-drawer animate-in">
            <div className="console-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {submitResult ? <Play size={12} /> : <Sparkles size={12} />}
                {submitResult ? 'RUN RESULT' : 'AI ASSISTANT'}
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {!isLoading && aiResponse.includes('```') && (
                  <button onClick={applySuggestedCode} className="btn" style={{ padding: '2px 8px', fontSize: '0.65rem', background: 'var(--ai-purple)', color: 'white', border: 'none' }}>
                    Apply Suggested Code
                  </button>
                )}
                <button onClick={() => { setAiResponse(''); setSubmitResult(null); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--zinc-500)' }}><X size={16} /></button>
              </div>
            </div>
            <div className="console-body" ref={consoleRef}>
              {submitResult ? (
                <div style={{ color: submitResult.status === 'Error' ? '#ef4444' : '#10b981' }}>
                  <div style={{ fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {submitResult.status === 'Running' && <div className="loading-dots" style={{ padding: 0, border: 'none', background: 'none' }}></div>}
                    {submitResult.status.toUpperCase()}
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{submitResult.message}</div>
                </div>
              ) : (
                <div className="markdown-content">
                  {isLoading ? (
                    <div className="loading-dots">Gemini AI가 코드를 분석하고 있습니다...</div>
                  ) : (
                    aiResponse && <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemDetail;
