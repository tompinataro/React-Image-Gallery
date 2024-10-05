CREATE TABLE "gallery" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR,
  "title" VARCHAR,
  "description" TEXT,
  "likes" INTEGER DEFAULT 0
);

INSERT INTO "gallery" 
("url", "title", "description")
VALUES
('images/IMG_3795.jpg', 'abc', 'xyz.'),
('images/IMG_4118.HEIC', 'abc', 'xyz.'),
('images/IMG_4119.HEIC', 'abc', 'xyz.'),
('images/IMG_4200.HEIC', 'abc', 'xyz.'),
('images/IMG_4208.HEIC', 'abc', 'xyz.'),
('images/IMG_4222.HEIC', 'abc', 'xyz.'),
('images/IMG_4230.HEIC', 'abc', 'xyz.'),
('images/IMG_4236.HEIC', 'abc', 'xyz.'),
('images/IMG_4238.HEIC', 'abc', 'xyz.'),
('images/IMG_4305.HEIC', 'abc', 'xyz.'),
('images/IMG_4333.HEIC', 'abc', 'xyz.'),
('images/IMG_4362.HEIC', 'abc', 'xyz.'),
('images/IMG_4390.HEIC', 'abc', 'xyz.'),
('images/IMG_4398.HEIC', 'abc', 'xyz.'),
('images/IMG_4401.HEIC', 'abc', 'xyz.'),
('images/IMG_4532.HEIC', 'abc', 'xyz.'),
('images/IMG_4533.HEIC', 'abc', 'xyz.'),
('images/IMG_4534.HEIC', 'abc', 'xyz.'),
('images/IMG_4536.HEIC', 'abc', 'xyz.'),
('images/IMG_4543.HEIC', 'abc', 'xyz.')