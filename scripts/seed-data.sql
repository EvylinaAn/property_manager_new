-- SQL script to create tables for a production database
-- This is for reference when you move to a real database

CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    property_type VARCHAR(100),
    location VARCHAR(255),
    message TEXT,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Insert some sample data
INSERT INTO contact_submissions (name, email, phone, property_type, location, message) VALUES
('John Smith', 'john@example.com', '+44 7700 900123', 'house', 'London, SW1', 'I have a 3-bedroom house in central London that I would like to discuss.'),
('Sarah Johnson', 'sarah@example.com', '+44 7700 900456', 'flat', 'Manchester, M1', 'Looking for a reliable rent-to-rent partner for my 2-bed apartment.'),
('Mike Wilson', 'mike@example.com', NULL, 'studio', 'Birmingham, B1', 'I own several studio apartments and would like to explore your services.');
