const SCENARIOS = {
  // SCENARIO A: Forward Deployment Engineer (Aditya Verma)
  'aditya.verma@acme.com': {
    profile: { name: 'Aditya Verma', initials: 'AV', role: 'Forward Deployment Engineer', dept: 'Enterprise Tech', joined: 'February 1, 2026', daysIn: 24, mentor: 'Sarah Chen', email: 'aditya.verma@acme.com' },
    self_q: [
      { id: 'env_diag', icon: '🔍', cat: 'Tech & Strategy', q: 'Enterprise Environment Diagnosis', hint: 'Rapidly understand client technical stack, architecture constraints, and data flows.' },
      { id: 'risk_mod', icon: '⚠️', cat: 'Reliability', q: 'Deployment Risk Modeling & Production Readiness', hint: 'Proactively identify risks and design monitoring, rollback, and performance validation frameworks.' },
      { id: 'stake_trans', icon: '🗣️', cat: 'Leadership', q: 'Cross-Functional Leadership & Stakeholder Translation', hint: 'Coordinate teams and explain architectural trade-offs to non-technical executives.' },
    ],
    test_q: [
      { id: 'env_diag', cat: 'Strategy', q: 'During an enterprise deployment, the client requests a custom integration that conflicts with the product\'s core architecture principles. What is the most strategic response?', opts: ['Build the custom integration to secure client satisfaction', 'Reject the request outright', 'Evaluate long-term scalability impact and propose an alternative aligned with core architecture', 'Escalate immediately to leadership'], a: 2, diff: 'intermediate' },
      { id: 'risk_mod', cat: 'Reliability', q: 'A production deployment is delayed because client-side data quality issues were underestimated. What does this most strongly indicate?', opts: ['Weak engineering capability', 'Insufficient pre-deployment discovery and risk modeling', 'Poor product performance', 'Client IT inefficiency'], a: 1, diff: 'intermediate' },
    ],
    teams_data: {
      meetings_attended: 42,
      messages_sent: 215,
      collaboration_score: 88,
      avg_response_time: '9 min',
      channels_active: 12,
      scores: { env_diag: 75, risk_mod: 65, stake_trans: 88 }
    },
    mentor_feedback: {
      mentor: 'Sarah Chen',
      last_review: '2026-02-20',
      overall: 76,
      scores: { env_diag: 80, risk_mod: 70, stake_trans: 82 },
      notes: 'Strong technical leadership. Needs to focus more on reliability planning and pre-deployment discovery.'
    },
    crm_data: {
      pipeline_updates: 58,
      deals_logged: 0,
      activity_score: 82,
      login_frequency: 'Daily',
      data_quality: 90,
      scores: { env_diag: 82, risk_mod: 68, stake_trans: 80 }
    },
    modules: [
      { id: 1, icon: '🏢', title: 'Enterprise Architecture Mastery', cat: 'Foundational', tags: ['Diagnosis', 'Infrastructure', 'Security'], status: 'available', progress: 45, desc: 'Mastering the art of diagnosing complex client environments.', genie: 'Your diagnosis skills are strong — let\'s bridge the gap to reliability planning.', skipNote: null },
      { id: 2, icon: '⚒️', title: 'Solution Design & Adaptation', cat: 'Role-Specific', tags: ['Customization', 'Integrity', 'Scalability'], status: 'recommended', progress: 15, desc: 'Tailoring solutions without compromising the core product.', genie: 'Crucial for long-term scalability. You\'re doing well here.', skipNote: null },
      { id: 3, icon: '📐', title: 'Scalable Deployment Frameworks', cat: 'Strategy', tags: ['Patterns', 'Repeatability', 'Automation'], status: 'next', progress: 0, desc: 'Turning custom work into repeatable, automated patterns.', genie: 'This is where you move from tactical to strategic engineering.', skipNote: null },
    ],
    careerPath: [
      { role: 'Forward Deployment Engineer', current: true, time: 'Now · Day 24', skills: ['Env Diagnosis', 'Tech Leadership'], note: null },
      { role: 'Senior FDE', current: false, time: '6–12 months', skills: ['Pattern Design', 'Strategic Influence'], note: '🎯 Targeting mid-year promotion.', cta: true },
      { role: 'Principal Deployment Lead', current: false, time: '18–24 months', skills: ['Org-wide Strategy', 'GTM Alignment'], note: null },
    ],
    replies: {
      intro: `Welcome Aditya! You're making great strides in enterprise diagnosis. Your next major milestone is mastering **Scalable Deployment Frameworks** to move beyond manual overrides.`,
      progress: `Proficiency Snapshot:\n• Env Diagnosis: 78% ✅\n• Risk Modeling: 68%\n• Tech Leadership: 84% ✅\n\nYou're 15% ahead of your peer cohort!`
    },
    dashMsg: `Aditya, focus on the "Reliability Planning" micro-module this week. Secure those go-lives with confidence!`,
    subjective_q: [
      {
        id: "fde1",
        scenario: "High-Risk Go-Live Under Executive Pressure",
        context: "CTO wants to go live end-of-quarter despite performance instability under peak load. Assess risk, communicate trade-offs, and propose the path forward.",
        q: "How do you protect technical credibility while maintaining the commercial relationship?",
        expected: ["Assessment of risk impact", "Explicit trade-off communication to CTO", "Proposed phased release or mitigation", "Maintaining professional integrity"],
        why: "Evaluates judgment under pressure and executive communication."
      },
      {
        id: "fde2",
        scenario: "Customization vs Product Integrity",
        context: "Sales pushes for a workflow customization that increases complexity and maintenance overhead for a large deal.",
        q: "How do you evaluate the impact, push back constructively, and influence internal stakeholders?",
        expected: ["Evaluation of long-term maintenance", "Constructive alternative proposal", "Stakeholder alignment strategy", "Revenue-safe framing"],
        why: "Tests architectural integrity vs revenue alignment."
      }
    ]
  },

  // SCENARIO B: Context Engineer (Sanya Iyer)
  'sanya.iyer@acme.com': {
    profile: { name: 'Sanya Iyer', initials: 'SI', role: 'Context Engineer', dept: 'AI Systems', joined: 'March 1, 2026', daysIn: 3, mentor: 'Rohit Sinha', email: 'sanya.iyer@acme.com' },
    self_q: [
      { id: 'context_arch', icon: '🏗️', cat: 'AI Core', q: 'Context Window & Retrieval Architecture (RAG Systems)', hint: 'Design token allocation, embedding, chunking, and ranking strategies for LLM systems.' },
      { id: 'failure_mode', icon: '🚨', cat: 'Reliability', q: 'Failure Mode Identification & Evaluation Frameworks', hint: 'Diagnose hallucination and grounding errors; build measurable evaluation loops.' },
      { id: 'lat_acc', icon: '⚖️', cat: 'Efficiency', q: 'Latency vs Accuracy Trade-off & Context Personalization', hint: 'Optimize for speed and accuracy while adapting context injection to user intent.' },
    ],
    test_q: [
      { id: 'context_arch', cat: 'Prompting', q: 'An enterprise LLM application is producing accurate but overly verbose outputs that exceed downstream system limits. What is the most strategic first intervention?', opts: ['Switch to a smaller model', 'Reduce temperature', 'Introduce structured output constraints and response formatting control in the prompt layer', 'Reduce retrieval depth'], a: 2, diff: 'intermediate' },
      { id: 'failure_mode', cat: 'Reliability', q: 'Users report occasional hallucinated policy references despite correct retrieval documents being present. What is the most likely root cause?', opts: ['Embedding model is too small', 'Context ordering or instruction hierarchy conflict within the prompt structure', 'Model temperature is too low', 'Vector database latency'], a: 1, diff: 'advanced' },
    ],
    teams_data: {
      meetings_attended: 5,
      messages_sent: 22,
      collaboration_score: 55,
      avg_response_time: '18 min',
      channels_active: 4,
      scores: { context_arch: 40, failure_mode: 30, lat_acc: 35 }
    },
    mentor_feedback: {
      mentor: 'Rohit Sinha',
      last_review: '2026-03-03',
      overall: 42,
      scores: { context_arch: 45, failure_mode: 35, lat_acc: 38 },
      notes: 'Day 3 — showing promise in prompt orchestration. Needs to build deeper understanding of evaluation loops and RAG chunking logic.'
    },
    crm_data: {
      pipeline_updates: 3,
      deals_logged: 0,
      activity_score: 35,
      login_frequency: 'Daily',
      data_quality: 50,
      scores: { context_arch: 38, failure_mode: 32, lat_acc: 36 }
    },
    modules: [
      { id: 1, icon: '🧠', title: 'LLM Foundations & Context', cat: 'Foundational', tags: ['Tokens', 'Windows', 'Attention'], status: 'available', progress: 0, desc: 'Understanding the limits and possibilities of model context.', genie: 'Get started — this is the bedrock of your role.', skipNote: null },
      { id: 2, icon: '🔍', title: 'RAG & Retrieval Excellence', cat: 'Role-Specific', tags: ['Embeddings', 'Chunking', 'Ranking'], status: 'next', progress: 0, desc: 'Designing high-precision retrieval systems.', genie: 'Your first major technical deep-dive.', skipNote: null },
      { id: 3, icon: '🚨', title: 'Reliability & Eval Loops', cat: 'Reliability', tags: ['Hallucination', 'Grounding', 'Evals'], status: 'locked', progress: 0, desc: 'Measuring and ensuring output quality at scale.', genie: 'Unlocks after RAG Excellence.', skipNote: null },
    ],
    careerPath: [
      { role: 'Context Engineer', current: true, time: 'Now · Day 3', skills: ['Prompt Engineering', 'RAG Basics'], note: null },
      { role: 'AI Systems Architect', current: false, time: '12–18 months', skills: ['System Orchestration', 'Eval Frameworks'], note: '🎯 Focusing on scaling context intelligence.', cta: true },
      { role: 'Principal AI Engineer', current: false, time: '3 years', skills: ['Model Finetuning', 'Latent Space Research'], note: null },
    ],
    replies: {
      intro: `Welcome Sanya! Excited to have you in AI Systems. Your journey starts with mastering **Context Windows** and **RAG Architectures**.`,
      progress: `Proficiency Snapshot:\n• Context Architecture: 40%\n• Failure Mode Analysis: 32%\n• Latency Trade-off: 36% 🎯\n\nYou're just starting, but the trajectory looks solid.`
    },
    dashMsg: `Sanya, complete the "RAG Chunking Strategies" module by Friday. Precision is priority #1!`,
    subjective_q: [
      {
        id: "ce1",
        scenario: "Context Drift in Long Sessions",
        context: "AI assistant begins deviating from instructions in 20+ turn sessions despite high retrieval accuracy.",
        q: "What technical causes would you investigate and how would you redesign the memory injection or summarization strategy?",
        expected: ["Identify context dilution root cause", "Improved memory pruning/injection design", "Instruction anchoring techniques", "Drift testing and validation protocol"],
        why: "Tests understanding of context window management over long horizons."
      },
      {
        id: "ce2",
        scenario: "Hallucination Risk in Regulated Industry",
        context: "Financial services client; system must never fabricate compliance info. Even a 2% hallucination rate is unacceptable.",
        q: "How would you redesign the system with guardrails, implement an evaluation pipeline, and communicate residual risk?",
        expected: ["Hallucination-proof architecture (e.g. grounded prompting)", "Validation and guardrail layers", "High-confidence eval pipeline design", "Transparent residual risk communication"],
        why: "Evaluates ability to design for extreme reliability."
      }
    ]
  },

  // SCENARIO C: B2B Frontline Sales (Shantanu Singh)
  'shantanu.singh@acme.com': {
    profile: { name: 'Shantanu Singh', initials: 'SS', role: 'B2B Frontline Sales', dept: 'Enterprise Sales', joined: 'March 1, 2026', daysIn: 5, mentor: 'Vikram Rao', email: 'shantanu.singh@acme.com' },
    self_q: [
      { id: 'consult', icon: '🔍', cat: 'Consultative Selling & Discovery', q: 'Ability to uncover explicit and latent business needs, quantify impact, and position solutions strategically.', hint: 'Move beyond surface pain points and quantify business impact' },
      { id: 'acumen', icon: '💡', cat: 'B2B Commercial Acumen', q: 'Understanding of revenue models, ROI, buying cycles, budgeting processes, and business drivers.', hint: 'Confidently discuss ROI, cost implications, and business trade-offs' },
      { id: 'stake', icon: '👥', cat: 'Stakeholder Management', q: 'Ability to navigate multiple decision-makers, influencers, gatekeepers, and champions.', hint: 'Map and manage multiple stakeholders effectively' },
    ],
    test_q: [
      { id: 'consult', cat: 'Prospecting', q: 'What is the MAIN goal of prospecting in B2B sales?', opts: ['Build a large email list', 'Generate qualified meetings with decision-makers', 'Send unlimited cold calls', 'Collect business cards'], a: 1, diff: 'beginner' },
      { id: 'consult', cat: 'Objection Handling', q: 'When a prospect says "We are not interested," the BEST first response is:', opts: ['Immediately follow up next month', 'Ask a follow-up question to understand why', 'Send more information via email', 'Move to next prospect'], a: 1, diff: 'beginner' },
    ],
    teams_data: {
      meetings_attended: 8,
      messages_sent: 34,
      collaboration_score: 45,
      avg_response_time: '25 min',
      channels_active: 3,
      scores: { consult: 40, acumen: 35, stake: 50 }
    },
    mentor_feedback: {
      mentor: 'Vikram Rao',
      last_review: '2026-03-04',
      overall: 38,
      scores: { consult: 35, acumen: 30, stake: 45 },
      notes: 'Day 5 — early stage. Shows good attitude and willingness to learn. Needs structured sales training.'
    },
    crm_data: {
      pipeline_updates: 5,
      deals_logged: 1,
      activity_score: 30,
      login_frequency: '3x/week',
      data_quality: 45,
      scores: { consult: 25, acumen: 20, stake: 30 }
    },
    modules: [
      { id: 1, icon: '🏛️', title: 'Core Competencies: B2B Sales', cat: 'Foundational', tags: ['Consultative Selling', 'Commercial Acumen', 'Stakeholder Mgmt'], status: 'available', progress: 0, desc: 'Master the core skills for B2B frontline sales success.', genie: 'Start here to build a strong foundation for strategic selling.', skipNote: null },
      { id: 2, icon: '🔍', title: 'Consultative Selling Deep Dive', cat: 'Role-Specific', tags: ['Discovery', 'Needs Analysis', 'Solution Mapping'], status: 'next', progress: 0, desc: 'Go deeper into discovery and solution positioning.', genie: 'This module will help you move from transactional to strategic selling.', skipNote: null },
      { id: 3, icon: '💡', title: 'Commercial Acumen Accelerator', cat: 'Competency Dev', tags: ['ROI', 'Budgeting', 'Business Drivers'], status: 'locked', progress: 0, desc: 'Sharpen your commercial intelligence and business impact skills.', genie: 'Unlocks after Consultative Selling Deep Dive.', skipNote: null },
    ],
    careerPath: [
      { role: 'B2B Frontline Sales', current: true, time: 'Now · Day 5', skills: ['Consultative Selling', 'Commercial Acumen'], note: null },
      { role: 'Account Executive', current: false, time: '6–12 months', skills: ['Strategic Accounts', 'Multi-threaded Deals'], note: '🎯 Target: Move to AE in 1 year', cta: true },
      { role: 'Sales Manager', current: false, time: '2–3 years', skills: ['Team Leadership', 'Forecasting'], note: null },
    ],
    replies: {
      intro: `Welcome Shantanu! Your focus is on mastering consultative selling and pipeline discipline. Let's start with the Core Competencies module.`,
      progress: `Proficiency Snapshot:\n• Consultative Selling: 35%\n• Commercial Acumen: 30%\n• Stakeholder Management: 45%\n\nYou're just starting, let's build that momentum!`
    },
    dashMsg: `Shantanu, your priority is to complete the Core Competencies module this week. Let's set a strong pace!`,
    subjective_q: [
      {
        id: "ss1",
        scenario: "Superficial Discovery",
        context: "You are speaking to an HR Head who says, \"We need sales training for our team.\"",
        q: "How would you structure your discovery conversation to uncover deeper business needs?",
        expected: ["Ask about business goals", "Quantify problem impact", "Stakeholder mapping", "Budget & timeline validation"],
        why: "Shows ability to move from solution request to business diagnosis."
      },
      {
        id: "ss2",
        scenario: "Multi-Stakeholder Deal",
        context: "Strong alignment with a Sales Manager, but Finance is pushing back on cost.",
        q: "How do you handle this and build the ROI case?",
        expected: ["Identify economic buyer", "Build ROI case", "Tailor messaging to Finance", "Avoid early discounting"],
        why: "Demonstrates understanding of complex B2B buying cycles."
      }
    ]
  },

  // SCENARIO D: Relationship Manager – B2C (Rahul Nair)
  'rahul.nair@acme.com': {
    profile: { name: 'Rahul Nair', initials: 'RN', role: 'Relationship Manager – B2C', dept: 'Retail Banking', joined: 'February 15, 2026', daysIn: 10, mentor: 'Amit Vyas', email: 'rahul.nair@acme.com' },
    self_q: [
      { id: 'trust', icon: '🤝', cat: 'Relationship & Sales', q: 'Customer Relationship, Trust Building & Cross-Sell Effectiveness', hint: 'Customers proactively seek advice, and I consistently convert cross-sell opportunities.' },
      { id: 'advisory', icon: '💡', cat: 'Advisory', q: 'Customer Need Analysis & Advisory Skills', hint: 'Recommend solutions aligned to customer life goals (marriage, child, retirement).' },
      { id: 'compliance', icon: '🛡️', cat: 'Process & Ethics', q: 'Process Discipline, Compliance & Ethical Selling', hint: 'Error-free documentation, adherence to regulations, and no mis-selling.' },
    ],
    test_q: [
      { id: 'trust', cat: 'Fundamentals', q: 'The primary objective of a B2C Relationship Manager is:', opts: ['Provide customer service only', 'Handle complaints', 'Grow customer revenue while maintaining satisfaction', 'Reduce operational cost'], a: 2, diff: 'beginner' },
      { id: 'advisory', cat: 'Strategy', q: 'When a long-term customer says, "I\'m happy with what I have," the BEST approach is:', opts: ['Push aggressively for new product', 'Offer heavy discount', 'Explore future goals or life changes to identify latent needs', 'End conversation politely'], a: 2, diff: 'intermediate' },
    ],
    teams_data: {
      meetings_attended: 15,
      messages_sent: 85,
      collaboration_score: 68,
      avg_response_time: '12 min',
      channels_active: 5,
      scores: { trust: 65, advisory: 58, compliance: 72 }
    },
    mentor_feedback: {
      mentor: 'Amit Vyas',
      last_review: '2026-02-22',
      overall: 62,
      scores: { trust: 68, advisory: 55, compliance: 75 },
      notes: 'Good relationship builder and ethics awareness. Needs to improve data-driven advisory and commercial urgency for monthly targets.'
    },
    crm_data: {
      pipeline_updates: 45,
      deals_logged: 8,
      activity_score: 72,
      login_frequency: 'Daily',
      data_quality: 78,
      scores: { trust: 70, advisory: 58, compliance: 80 }
    },
    modules: [
      { id: 1, icon: '🏠', title: 'Life-Stage Financial Advisory', cat: 'Foundational', tags: ['Investment', 'Retirement', 'Life Cycle'], status: 'available', progress: 30, desc: 'Aligning products to customer life goals.', genie: 'Your trust building is good — let\'s upgrade the advisory depth.', skipNote: null },
      { id: 2, icon: '📈', title: 'Cross-Sell Dynamics & Revenue', cat: 'Role-Specific', tags: ['Portfolio', 'Need Mapping', 'Conversion'], status: 'next', progress: 0, desc: 'Identifying and converting latent opportunities.', genie: 'This is your revenue engine. Focus here!', skipNote: null },
      { id: 3, icon: '🛡️', title: 'Compliance & Ethical Selling', cat: 'Compliance', tags: ['Regulation', 'KYC', 'Integrity'], status: 'locked', progress: 0, desc: 'Protecting the customer and the institution.', genie: 'Safeguard your career and the brand reputation.', skipNote: null },
    ],
    careerPath: [
      { role: 'Relationship Manager', current: true, time: 'Now · Day 10', skills: ['Basic Service', 'Lead Handling'], note: null },
      { role: 'Senior RM', current: false, time: '6–12 months', skills: ['Portfolio Optimization', 'Advanced Advisory'], note: '🎯 Targeting higher ticket sizes.', cta: true },
      { role: 'Wealth Lead', current: false, time: '2–3 years', skills: ['Team Leadership', 'Market Analysis'], note: null },
    ],
    replies: {
      intro: `Welcome Rahul! Your focus is on mastering **Life-Stage Advisory** and **Revenue Retention**. Let's build that high-value portfolio!`,
      progress: `Proficiency Snapshot:\n• Relationship Building: 70% ✅\n• Need Analysis: 58%\n• Compliance: 76% ✅\n\nYou're on the right track — let's accelerate those targets!`
    },
    dashMsg: `Rahul, complete the "Portfolio Growth" micro-module. You're 10 days from month-end — let's hit those targets!`,
    subjective_q: [
      {
        id: "rm1",
        scenario: "High-Net-Worth Customer Concern",
        context: "Premium customer is considering moving their portfolio due to better returns offered by a competitor.",
        q: "How do you handle this to retain them without being defensive or discounting?",
        expected: ["Listen without defensiveness", "Understand comparison metrics", "Re-anchor on long-term goals", "Highlight differentiated value", "Offer portfolio review session"],
        why: "Demonstrates advisory maturity and retention strategy."
      },
      {
        id: "rm2",
        scenario: "Ethical Dilemma — Target Pressure",
        context: "You are behind on your revenue target with 10 days left. A product helps you meet the target but may not be fully suitable for the customer.",
        q: "What do you do to balance commercial urgency with ethical standards?",
        expected: ["Do not mis-sell", "Recommend suitable alternative", "Prioritize high-potential leads instead", "Protect long-term relationship and trust"],
        why: "Evaluates integrity and long-term customer protection under pressure."
      }
    ]
  },
};

module.exports = SCENARIOS;
