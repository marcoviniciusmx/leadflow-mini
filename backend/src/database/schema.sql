CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(120) NOT NULL,
  contact_name VARCHAR(120),
  phone VARCHAR(30),
  segment VARCHAR(80),
  status VARCHAR(40) NOT NULL DEFAULT 'Novo',
  proposal_value NUMERIC(10, 2) DEFAULT 0,
  next_follow_up_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);