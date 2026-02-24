require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const SCENARIOS = require('./data/scenarios');
const pagesRouter = require('./routes/pages');
// Page routes for each screen


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
app.use('/pages', pagesRouter);
// API Endpoints

// Login
app.post('/api/login', (req, res) => {
    const { email } = req.body;
    const userScenario = SCENARIOS[email];

    if (userScenario) {
        // Return profile and initial layout data
        res.json({
            success: true,
            profile: userScenario.profile,
            email: email
        });
    } else {
        res.status(404).json({ success: false, message: 'User not found in demo config.' });
    }
});

// Get Self Rating Questions - return without answers (though in this case self rating has no answers)
app.get('/api/questions/self-rating/:email', (req, res) => {
    const { email } = req.params;
    const userScenario = SCENARIOS[email];
    if (!userScenario) return res.status(404).json({ error: 'User not found' });

    res.json(userScenario.self_q);
});

// Get Knowledge Test Questions - careful not to expose answers too easily if we care, 
// but for this demo we might send everything or strip answers.
// The original app checked answers on client side, so sending 'a' (answer index) is fine for now 
// OR we can strip it and validate on backend. 
// Let's stripping 'a' for better security practice, though checking is done on submit for final score 
// OR immediate feedback. The original app gave immediate feedback ("Correct! Advancing...").
// So we probably need to validate answer by answer or send the answer index.
// Let's send the whole question object including 'a' to keep it simple and match original potentially,
// BUT better practice: validate on backend. 
// However, the original UI gives immediate feedback: 
/* 
   const handleAnswer = (idx) => { ... const ok = idx === q.a; ... }
   {answered.ok ? '✅ Correct! ...' : '❌ Not quite ...' }
*/
// To support this immediate feedback without a roundtrip for every click (though roundtrip is fine),
// we can expose an endpoint to validate a specific answer.
// OR just send the answer index for now to replicate behavior exactly and quickly.
// Let's send it for now to match exactly the client-side logic ease of porting.
app.get('/api/questions/test/:email', (req, res) => {
    const { email } = req.params;
    const userScenario = SCENARIOS[email];
    if (!userScenario) return res.status(404).json({ error: 'User not found' });

    res.json(userScenario.test_q);
});

// Get Subjective Questions
app.get('/api/questions/subjective/:email', (req, res) => {
    const { email } = req.params;
    const userScenario = SCENARIOS[email];
    if (!userScenario) return res.status(404).json({ error: 'User not found' });

    res.json(userScenario.subjective_q || []);
});

// Submit Assessment & Calculate Results (4-source model)
app.post('/api/submit-assessment', (req, res) => {
    const { email, selfRatings, testScores, subjectiveScores } = req.body;
    const userScenario = SCENARIOS[email];

    if (!userScenario) return res.status(404).json({ error: 'User not found' });

    // 5-source proficiency calculation (20% each):
    // 1. Self-Assessment (self-rating + knowledge test)
    // 2. Microsoft Teams signals
    // 3. Mentor Feedback
    // 4. CRM Data
    // 5. Scenario Mastery (AI-evaluated)

    const r = {};
    const sourceBreakdown = {};

    // Average subjective score
    const subjVals = Object.values(subjectiveScores || {});
    const avgSubj = subjVals.length ? subjVals.reduce((a, b) => a + b, 0) / subjVals.length : 65;

    userScenario.self_q.forEach(sq => {
        const sr = selfRatings[sq.id] || 3;
        const sc = testScores[sq.id] || [];
        const avgSc = sc.length ? sc.reduce((a, b) => a + b, 0) / sc.length : 60;

        const selfScore = Math.round((sr / 5) * 100 * 0.4 + avgSc * 0.6);
        const teamsScore = (userScenario.teams_data && userScenario.teams_data.scores[sq.id]) || 50;
        const mentorScore = (userScenario.mentor_feedback && userScenario.mentor_feedback.scores[sq.id]) || 50;
        const crmScore = (userScenario.crm_data && userScenario.crm_data.scores[sq.id]) || 50;
        const subjScore = Math.round(avgSubj); // Simple mapping for now

        // Equal 20% weighting
        r[sq.id] = Math.round(selfScore * 0.2 + teamsScore * 0.2 + mentorScore * 0.2 + crmScore * 0.2 + subjScore * 0.2);
        sourceBreakdown[sq.id] = { self: selfScore, teams: teamsScore, mentor: mentorScore, crm: crmScore, subjective: subjScore };
    });

    res.json({ results: r, sourceBreakdown });
});

// Get Assessment Sources data
app.get('/api/assessment-sources/:email', (req, res) => {
    const { email } = req.params;
    const userScenario = SCENARIOS[email];
    if (!userScenario) return res.status(404).json({ error: 'User not found' });

    const sources = [
        {
            id: 'self',
            icon: '📝',
            name: 'Self-Assessment',
            desc: 'Self-rating & knowledge test',
            score: null, // calculated at submit time
            status: 'pending'
        },
        {
            id: 'teams',
            icon: '💬',
            name: 'Microsoft Teams',
            desc: `${userScenario.teams_data.meetings_attended} meetings · ${userScenario.teams_data.messages_sent} messages`,
            score: userScenario.teams_data.collaboration_score,
            status: 'synced'
        },
        {
            id: 'mentor',
            icon: '🧑‍🏫',
            name: 'Mentor Feedback',
            desc: `${userScenario.mentor_feedback.mentor} · Last: ${userScenario.mentor_feedback.last_review}`,
            score: userScenario.mentor_feedback.overall,
            status: 'received'
        },
        {
            id: 'crm',
            icon: '📊',
            name: 'CRM Data',
            desc: `${userScenario.crm_data.pipeline_updates} updates · ${userScenario.crm_data.login_frequency} logins`,
            score: userScenario.crm_data.activity_score,
            status: 'synced'
        },
        {
            id: 'subjective',
            icon: '🧞',
            name: 'Scenario Analysis',
            desc: 'AI-evaluated business scenarios',
            score: null,
            status: 'synced'
        }
    ];

    res.json({ sources });
});

// Get Dashboard Data
app.get('/api/dashboard/:email', (req, res) => {
    const { email } = req.params;
    const userScenario = SCENARIOS[email];
    if (!userScenario) return res.status(404).json({ error: 'User not found' });

    res.json({
        modules: userScenario.modules,
        careerPath: userScenario.careerPath,
        replies: userScenario.replies,
        dashMsg: userScenario.dashMsg,
        dataSources: {
            teams: userScenario.teams_data,
            mentor: userScenario.mentor_feedback,
            crm: userScenario.crm_data
        }
    });
});

// Subjective Assessment Evaluation (AI)
app.post('/api/evaluate-subjective', async (req, res) => {
    const { email, questionId, answer } = req.body;
    const userScenario = SCENARIOS[email];

    if (!userScenario) return res.status(404).json({ error: 'User not found' });
    const q = userScenario.subjective_q.find(sq => sq.id === questionId);
    if (!q) return res.status(404).json({ error: 'Question not found' });

    const role = userScenario.profile.role;
    let roleTitle = 'Technical Lead';
    if (role.includes('Sales') || role.includes('Manager')) roleTitle = 'Director of Sales & Customer Success';
    if (role.includes('Context') || role.includes('Deployment')) roleTitle = 'Principal Engineering Architect';

    const prompt = `
        Evaluate the following ${userScenario.profile.role} scenario response.
        
        Scenario: ${q.scenario}
        Context: ${q.context}
        Question: ${q.q}
        User Answer: "${answer}"
        
        Expected Answer Elements:
        ${q.expected.map(e => `- ${e}`).join('\n')}
        
        Provide a concise evaluation including:
        1. A proficiency score (0-100) based on how many expected elements were covered and the depth of the answer.
        2. A brief analysis of what was good and what was missing.
        3. A "Genie Insight" — a one-liner on the business impact of this skill.
        
        Return the result in JSON format ONLY:
        {
            "score": number,
            "analysis": "string",
            "insight": "string"
        }
    `;

    try {
        const response = await axios.post('https://litellm.niit.com/v1/chat/completions', {
            model: 'meta-llama-4-maverick',
            messages: [
                { role: 'system', content: `You are an expert ${roleTitle} and Learning Genie. Evaluate the user answer against professional standards.` },
                { role: 'user', content: prompt }
            ],
            response_format: { type: "json_object" }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LITELLM_API_KEY || ''}`
            }
        });

        const result = JSON.parse(response.data.choices[0].message.content);
        res.json(result);
    } catch (err) {
        console.error('AI Evaluation Error:', err.response?.data || err.message);
        res.status(500).json({ error: 'AI Evaluation failed. Please try again.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
