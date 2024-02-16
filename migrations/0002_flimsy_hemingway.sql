ALTER TABLE omikuji ADD `probability` integer NOT NULL;

INSERT INTO omikuji (id, grade, probability) VALUES ('1', '大吉', 5);
INSERT INTO omikuji (id, grade, probability) VALUES ('2', '中吉', 15);
INSERT INTO omikuji (id, grade, probability) VALUES ('3', '小吉', 25);
INSERT INTO omikuji (id, grade, probability) VALUES ('4', '吉', 35);
INSERT INTO omikuji (id, grade, probability) VALUES ('5', '凶', 15);
INSERT INTO omikuji (id, grade, probability) VALUES ('6', '大凶', 5);