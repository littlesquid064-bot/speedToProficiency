import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import GenieIntroScreen from './components/GenieIntroScreen';
import SelfRatingScreen from './components/SelfRatingScreen';
import KnowledgeTestScreen from './components/KnowledgeTestScreen';
import ValidationScreen from './components/ValidationScreen';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import ModuleChat from './components/ModuleChat';
import Header from './components/Header';
import Footer from './components/Footer';
import ProgrammingFundamentalsChat from './components/ProgrammingFundamentalsChat';
import CompanyCultureChat from './components/CompanyCultureChat';
import CoreCompetenciesB2BChat from './components/CoreCompetenciesB2BChat';
import CloudArchitectureChat from './components/CloudArchitectureChat';
import EnterpriseArchitectureMasteryChat from './components/EnterpriseArchitectureMasteryChat';
import LLMFoundationsChat from './components/LLMFoundationsChat';
import LifeStageFinancialAdvisoryChat from './components/LifeStageFinancialAdvisoryChat';
import SubjectiveTestScreen from './components/SubjectiveTestScreen';
import AssessmentLayout from './components/common/AssessmentLayout';

const App = () => {
    // Re-hydrate state from localStorage on init
    const [currentUserEmail, setCurrentUserEmail] = useState(() => localStorage.getItem('currentUserEmail'));
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('profile');
        return saved ? JSON.parse(saved) : null;
    });
    const [selfRatings, setSelfRatings] = useState(() => {
        const saved = localStorage.getItem('selfRatings');
        return saved ? JSON.parse(saved) : {};
    });
    const [testAnswers, setTestAnswers] = useState(() => {
        const saved = localStorage.getItem('testAnswers');
        return saved ? JSON.parse(saved) : {};
    });
    const [testScores, setTestScores] = useState(() => {
        const saved = localStorage.getItem('testScores');
        return saved ? JSON.parse(saved) : {};
    });
    const [currentRQ, setCurrentRQ] = useState(() => Number(localStorage.getItem('currentRQ')) || 0);
    const [currentTQ, setCurrentTQ] = useState(() => Number(localStorage.getItem('currentTQ')) || 0);
    const [subjectiveScores, setSubjectiveScores] = useState(() => {
        const saved = localStorage.getItem('subjectiveScores');
        return saved ? JSON.parse(saved) : {};
    });
    const [results, setResults] = useState(() => {
        const saved = localStorage.getItem('results');
        return saved ? JSON.parse(saved) : {};
    });
    const [dataSources, setDataSources] = useState(() => {
        const saved = localStorage.getItem('dataSources');
        return saved ? JSON.parse(saved) : [];
    });
    const [sourceBreakdown, setSourceBreakdown] = useState(() => {
        const saved = localStorage.getItem('sourceBreakdown');
        return saved ? JSON.parse(saved) : {};
    });
    const [scenarioData, setScenarioData] = useState(() => {
        const saved = localStorage.getItem('scenarioData');
        return saved ? JSON.parse(saved) : {
            self_q: [],
            test_q: [],
            modules: [],
            careerPath: [],
            replies: {},
            dashMsg: '',
            dataSourcesInfo: {}
        };
    });

    // Persistence Layer: Sync to localStorage whenever state changes
    useEffect(() => {
        if (currentUserEmail) localStorage.setItem('currentUserEmail', currentUserEmail);
        else localStorage.removeItem('currentUserEmail');
    }, [currentUserEmail]);

    useEffect(() => {
        if (profile) localStorage.setItem('profile', JSON.stringify(profile));
        else localStorage.removeItem('profile');
    }, [profile]);

    useEffect(() => { localStorage.setItem('selfRatings', JSON.stringify(selfRatings)); }, [selfRatings]);
    useEffect(() => { localStorage.setItem('testAnswers', JSON.stringify(testAnswers)); }, [testAnswers]);
    useEffect(() => { localStorage.setItem('testScores', JSON.stringify(testScores)); }, [testScores]);
    useEffect(() => { localStorage.setItem('currentRQ', currentRQ.toString()); }, [currentRQ]);
    useEffect(() => { localStorage.setItem('currentTQ', currentTQ.toString()); }, [currentTQ]);
    useEffect(() => { localStorage.setItem('subjectiveScores', JSON.stringify(subjectiveScores)); }, [subjectiveScores]);
    useEffect(() => { localStorage.setItem('results', JSON.stringify(results)); }, [results]);
    useEffect(() => { localStorage.setItem('dataSources', JSON.stringify(dataSources)); }, [dataSources]);
    useEffect(() => { localStorage.setItem('sourceBreakdown', JSON.stringify(sourceBreakdown)); }, [sourceBreakdown]);
    useEffect(() => { localStorage.setItem('scenarioData', JSON.stringify(scenarioData)); }, [scenarioData]);

    const handleLogin = (data, navigate) => {
        // Reset assessment state on login to ensure a fresh session
        setSelfRatings({});
        setTestAnswers({});
        setTestScores({});
        setSubjectiveScores({});
        setCurrentRQ(0);
        setCurrentTQ(0);
        setResults({});
        setSourceBreakdown({});

        setCurrentUserEmail(data.email);
        setProfile(data.profile);
        fetch(`${import.meta.env.VITE_API_URL}questions/self-rating/${data.email}`)
            .then(res => res.json())
            .then(q => setScenarioData(p => ({ ...p, self_q: q })));
        fetch(`${import.meta.env.VITE_API_URL}questions/test/${data.email}`)
            .then(res => res.json())
            .then(q => setScenarioData(p => ({ ...p, test_q: q })));
        fetch(`${import.meta.env.VITE_API_URL}questions/subjective/${data.email}`)
            .then(res => res.json())
            .then(q => setScenarioData(p => ({ ...p, subjective_q: q })));
        fetch(`${import.meta.env.VITE_API_URL}assessment-sources/${data.email}`)
            .then(res => res.json())
            .then(d => setDataSources(d.sources || []));
        navigate('/genie-intro');
    };

    // Just store the rating — don't auto-advance
    const handleRate = (r) => {
        const q = scenarioData.self_q[currentRQ];
        setSelfRatings(p => ({ ...p, [q.id]: r }));
    };

    // Move to next question, or proceed to knowledge test on last
    const handleRatingNext = (navigate) => {
        if (currentRQ < scenarioData.self_q.length - 1) {
            setCurrentRQ(c => c + 1);
        } else {
            setCurrentTQ(0);
            navigate('/knowledge-test');
        }
    };

    // Move back to previous question
    const handleRatingBack = () => {
        if (currentRQ > 0) {
            setCurrentRQ(c => c - 1);
        }
    };

    const handleAnswer = (idx) => {
        const q = scenarioData.test_q[currentTQ];
        const ok = idx === q.a;
        const score = ok ? (q.diff === 'beginner' ? 70 : q.diff === 'intermediate' ? 82 : 95) : 30;
        setTestScores(p => ({ ...p, [q.id]: [...(p[q.id] || []), score] }));
        setTestAnswers(p => ({ ...p, [currentTQ]: { sel: idx, ok } }));
    };

    const handleNextQuestion = (navigate) => {
        if (currentTQ < scenarioData.test_q.length - 1) {
            setCurrentTQ(c => c + 1);
        } else {
            if (scenarioData.subjective_q && scenarioData.subjective_q.length > 0) {
                navigate('/subjective');
            } else {
                submitAssessment(navigate);
            }
        }
    };

    const handleSubjectiveScore = (qid, score) => {
        setSubjectiveScores(p => ({ ...p, [qid]: score }));
    };

    const submitAssessment = (navigate) => {
        fetch(`${import.meta.env.VITE_API_URL}submit-assessment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: currentUserEmail,
                selfRatings,
                testScores,
                subjectiveScores
            })
        })
            .then(res => res.json())
            .then(data => {
                setResults(data.results);
                setSourceBreakdown(data.sourceBreakdown || {});
                fetch(`${import.meta.env.VITE_API_URL}dashboard/${currentUserEmail}`)
                    .then(res => res.json())
                    .then(d => {
                        setScenarioData(p => ({
                            ...p,
                            modules: d.modules,
                            careerPath: d.careerPath,
                            replies: d.replies,
                            dashMsg: d.dashMsg,
                            dataSourcesInfo: d.dataSources || {}
                        }));
                        navigate('/validation');
                    });
            });
    };

    const handleLaunch = (navigate) => {
        setTimeout(() => navigate('/'), 3200);
    };

    const handleLogout = (navigate) => {
        setSelfRatings({}); setTestAnswers({}); setTestScores({});
        setCurrentRQ(0); setCurrentTQ(0); setResults({});
        setDataSources([]); setSourceBreakdown({});
        setCurrentUserEmail(null);
        setProfile(null);
        localStorage.clear();
        navigate('/login');
    };

    // Move HeaderWithNav inside so it has access to scoped variables if needed, 
    // or keep it outside and pass handlers. Moving it inside for simplicity.
    const HeaderWithNav = () => {
        const navigate = useNavigate();
        return <Header user={profile} onLogout={() => handleLogout(navigate)} />;
    };

    // Redirect logged-in users back to the page they were on
    const RedirectBack = () => {
        const navigate = useNavigate();
        useEffect(() => {
            if (window.history.length > 1) {
                navigate(-1);
            } else {
                navigate('/', { replace: true });
            }
        }, [navigate]);
        return null;
    };

    // Custom wrapper to inject navigation into handlers
    const RouteWrappers = () => {
        const navigate = useNavigate();
        if (!profile && window.location.pathname !== '/login') {
            return <Navigate to="/login" replace />;
        }
        return (
            <Routes>
                <Route path="/login" element={profile ? <RedirectBack /> : <LoginScreen onLogin={data => handleLogin(data, navigate)} />} />
                <Route path="/genie-intro" element={<AssessmentLayout currentStep="intro"><GenieIntroScreen onContinue={() => navigate('/self-rating')} user={profile} /></AssessmentLayout>} />
                <Route path="/self-rating" element={
                    scenarioData.self_q.length
                        ? <AssessmentLayout currentStep="self">
                            <SelfRatingScreen
                                ratings={selfRatings}
                                onRate={handleRate}
                                currentQ={currentRQ}
                                questions={scenarioData.self_q}
                                onBack={handleRatingBack}
                                onNext={() => handleRatingNext(navigate)}
                            />
                        </AssessmentLayout>
                        : <LoadingScreen />
                } />
                <Route path="/knowledge-test" element={
                    scenarioData.test_q.length
                        ? <AssessmentLayout currentStep="test">
                            <KnowledgeTestScreen
                                currentQ={currentTQ}
                                onAnswer={handleAnswer}
                                onNext={() => handleNextQuestion(navigate)}
                                answers={testAnswers}
                                questions={scenarioData.test_q}
                            />
                        </AssessmentLayout>
                        : <LoadingScreen />
                } />
                <Route path="/subjective" element={<AssessmentLayout currentStep="subjective"><SubjectiveTestScreen user={profile} onComplete={() => submitAssessment(navigate)} onScoreUpdate={handleSubjectiveScore} /></AssessmentLayout>} />
                <Route path="/validation" element={<AssessmentLayout currentStep="validation"><ValidationScreen results={results} onLaunch={() => handleLaunch(navigate)} modules={scenarioData.modules} user={profile} dataSources={dataSources} sourceBreakdown={sourceBreakdown} /></AssessmentLayout>} />
                <Route path="/module/acme-cs-playbook" element={<ModuleChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/module/programming-fundamentals" element={<ProgrammingFundamentalsChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/module/company-culture" element={<CompanyCultureChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/module/core-competencies-b2b" element={<CoreCompetenciesB2BChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/module/cloud-architecture" element={<CloudArchitectureChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/module/enterprise-architecture" element={<EnterpriseArchitectureMasteryChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/module/llm-foundations" element={<LLMFoundationsChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/module/lifestage-advisory" element={<LifeStageFinancialAdvisoryChat results={results} modules={scenarioData.modules} careerPath={scenarioData.careerPath} user={profile} />} />
                <Route path="/" element={<Dashboard results={results} onLogout={() => handleLogout(navigate)} user={profile} modules={scenarioData.modules} careerPath={scenarioData.careerPath} replies={scenarioData.replies} dashMsg={scenarioData.dashMsg} dataSources={dataSources} dataSourcesInfo={scenarioData.dataSourcesInfo} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        );
    };

    return (
        <Router>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <HeaderWithNav />
                <main style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <RouteWrappers />
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;