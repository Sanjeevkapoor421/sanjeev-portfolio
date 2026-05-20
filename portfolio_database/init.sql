CREATE TABLE IF NOT EXISTS projects (
    id          SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT,
    tags        TEXT[],
    icon        TEXT,
    github_url  TEXT,
    demo_url    TEXT,
    stars       INT DEFAULT 0,
    forks       INT DEFAULT 0,
    language    TEXT,
    featured    BOOLEAN DEFAULT false,
    sort_order  INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    category   TEXT,
    percentage INT,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
    id          SERIAL PRIMARY KEY,
    type        TEXT NOT NULL,
    role        TEXT NOT NULL,
    company     TEXT,
    start_date  TEXT,
    end_date    TEXT,
    description TEXT,
    tags        TEXT[],
    sort_order  INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id         SERIAL PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT NOT NULL,
    subject    TEXT,
    message    TEXT NOT NULL,
    read       BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_config (
    id    SERIAL PRIMARY KEY,
    key   TEXT UNIQUE NOT NULL,
    value TEXT
);

-- ── Seed: Projects ───────────────────────────────────
INSERT INTO projects (title, description, tags, icon, github_url, demo_url, stars, forks, language, featured, sort_order) VALUES
(
    'RAG-based Document QA System',
    'Production-ready Retrieval-Augmented Generation pipeline for querying large document corpora — FAISS vector store, OpenAI embeddings, streaming responses.',
    ARRAY['LLM','RAG','LangChain'], '🧠', 'https://github.com/', NULL, 120, 34, 'Python', true, 1
),
(
    'ML Model Monitoring Platform',
    'End-to-end MLOps platform for tracking experiments, monitoring model drift, and auto-retraining pipelines — deployed on Kubernetes.',
    ARRAY['MLOps','MLflow','Docker'], '📊', 'https://github.com/', NULL, 87, 0, 'Python', false, 2
),
(
    'Sentiment Analysis API',
    'Fine-tuned BERT model for multi-label sentiment classification — served as a REST API with FastAPI, 94% accuracy on benchmark.',
    ARRAY['NLP','BERT','HuggingFace'], '🔍', 'https://github.com/', 'https://huggingface.co/', 65, 0, 'Python', false, 3
),
(
    'Real-Time Data Pipeline',
    'Scalable streaming data pipeline ingesting 1M+ events/hour — Apache Kafka, Spark Streaming, Delta Lake, orchestrated with Airflow.',
    ARRAY['Data Pipeline','Spark','Airflow'], '⚡', 'https://github.com/', NULL, 48, 0, 'Scala / Python', false, 4
);

-- ── Seed: Skills ─────────────────────────────────────
INSERT INTO skills (name, category, percentage, sort_order) VALUES
('Machine Learning',        'Core',          95, 1),
('Deep Learning / NLP',     'Core',          90, 2),
('Data Engineering',        'Core',          88, 3),
('MLOps / Model Deployment','Core',          82, 4),
('LLM / GenAI Applications','Core',          85, 5),
('Python',                  'Languages',   NULL, 6),
('SQL',                     'Languages',   NULL, 7),
('Scala',                   'Languages',   NULL, 8),
('Bash',                    'Languages',   NULL, 9),
('PyTorch',                 'ML / AI',     NULL, 10),
('TensorFlow',              'ML / AI',     NULL, 11),
('Scikit-learn',            'ML / AI',     NULL, 12),
('HuggingFace',             'ML / AI',     NULL, 13),
('LangChain',               'ML / AI',     NULL, 14),
('OpenAI API',              'ML / AI',     NULL, 15),
('Apache Spark',            'Data & MLOps',NULL, 16),
('Airflow',                 'Data & MLOps',NULL, 17),
('MLflow',                  'Data & MLOps',NULL, 18),
('Docker',                  'Data & MLOps',NULL, 19),
('Kubernetes',              'Data & MLOps',NULL, 20),
('AWS / GCP',               'Data & MLOps',NULL, 21);

-- ── Seed: Experience ─────────────────────────────────
INSERT INTO experience (type, role, company, start_date, end_date, description, tags, sort_order) VALUES
('work',      'ML Engineer',              'Your Company / Startup', '2023', NULL,   'Building LLM-powered products — RAG pipelines, fine-tuning workflows, and real-time inference infrastructure.', ARRAY['LLMs','RAG','AWS'],            1),
('work',      'Data Scientist',           'Previous Company',       '2021', '2023', 'Built predictive models for churn, fraud, and recommendation systems serving millions of users.',               ARRAY['XGBoost','Spark','GCP'],        2),
('work',      'Data Analyst / Junior ML', 'First Company',          '2020', '2021', 'Exploratory data analysis, dashboards, and first ML models for business forecasting.',                          ARRAY['Python','SQL','Tableau'],       3),
('education', 'B.E. / B.Tech — CS / IT', 'University Name, India', '2016', '2020', 'Specialization in Data Science and Machine Learning.',                                                          ARRAY[]::TEXT[],                       4);

-- ── Seed: Site Config ────────────────────────────────
INSERT INTO site_config (key, value) VALUES
('stat_models',       '15'),
('stat_years',        '3'),
('stat_repos',        '10'),
('rotating_titles',   'AI / ML Engineer,Data Scientist,LLM Builder,MLOps Practitioner,Open Source Contributor'),
('availability_badge','Open to opportunities'),
('about_lead',        'Data Engineer & ML practitioner passionate about turning raw data into production-grade intelligence.'),
('about_bio_1',       'I design end-to-end ML pipelines — from ingestion and feature engineering to model training, evaluation, and deployment. I work primarily with Python, PyTorch, and cloud-native stacks on AWS and GCP.'),
('about_bio_2',       'My recent focus is on LLM fine-tuning, RAG architectures, and making AI systems reliable in production. I enjoy writing about what I build and contributing back to the open-source community.'),
('github_url',        'https://github.com/'),
('linkedin_url',      'https://linkedin.com/'),
('twitter_url',       'https://twitter.com/'),
('cv_url',            '#');
