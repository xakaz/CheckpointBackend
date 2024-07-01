CREATE TABLE country 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(100) NOT NULL,
	code VARCHAR(10) NOT NULL,
	emoji VARCHAR(100) NOT NULL,
);


INSERT INTO country (name, code, emoji) VALUES 
    ('France', 'FR', 'fr'),
    ('Espagne', 'ES', 'es');


SELECT * FROM country; 

SELECT * FROM country WHERE code = 'FR';

ALTER TABLE country
ADD continent VARCHAR(100);

UPDATE country
SET continent = 'EUR'
WHERE continent = 'Europe';

SELECT * FROM country WHERE continent = 'EUR';
