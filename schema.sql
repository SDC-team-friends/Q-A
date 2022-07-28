DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;
\c qa;

DROP TABLE IF EXISTS questions, answers, photos CASCADE;

CREATE TABLE IF NOT EXISTS questions(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  date_written BIGINT,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(50) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER
);

CREATE TABLE IF NOT EXISTS answers(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  body TEXT NOT NULL,
  date_written BIGINT,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  reported BOOLEAN,
  helpful INTEGER
);

CREATE TABLE IF NOT EXISTS photos(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  answer_id INTEGER REFERENCES answers(id),
  url TEXT
);

CREATE INDEX product_id_idx ON questions (product_id);
CREATE INDEX question_id_idx ON answers (question_id);
CREATE INDEX answer_id_idx ON photos (answer_id);

\COPY questions FROM 'csv/questions.csv' delimiter ',' CSV HEADER;
\COPY answers FROM 'csv/answers.csv' delimiter ',' CSV HEADER;
\COPY photos FROM 'csv/answers_photos.csv' delimiter ',' CSV HEADER;