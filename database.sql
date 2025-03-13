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
('images/IMG_3795.jpg', 'Beautiful Moth', 'It rivals butterfly beauty'),
('images/IMG_4118.jpg', 'Red Zinnia', 'Beautiful, grown from seed, 2024'),
('images/IMG_4119.jpg', 'Red Hibiscus', 'Replanted in a large pot outdoors with WNW exposure'),
('images/IMG_4200.jpg', 'Multicolored Zinnias', 'Yellow, orange and salmon'),
('images/IMG_4208.jpg', 'Petals unfurling like tiny scrolls', 'Amazing stage towards full bloom'),
('images/IMG_4222.jpg', 'Contrasting colors', 'Orange-red petals with lighter color on backside'),
('images/IMG_4230.jpg', 'Diverse Varieties', 'Two different yellow varieties, with an orange and pink'),
('images/IMG_4236.jpg', 'Hot Pink Perfection', 'Gorgeous tiny yellow "disk florets" area flower within a flower!'),
('images/IMG_4238.jpg', 'Salmon, hot-pink, yellow trio', 'Imperfect florets poking out here and there'),
('images/IMG_4305.jpg', 'Hot-pink Glory', 'Uncut with petals still unfurling'),
('images/IMG_4333.jpg', 'Carrot-top', 'Large and bold'),
('images/IMG_4362.jpg', 'Incognito', 'Grasshopper hanging out atop a droopy Sunflower'),
('images/IMG_4390.jpg', 'Ladybug Perch', 'Nestled into a misformed sunflower'),
('images/IMG_4398.jpg', 'Bright Yellow Pollination', 'Bees drinking sunflower nectar'),
('images/IMG_4401.jpg', 'Gnarled Red', 'Red sunflower, beautiful stepchild'),
('images/IMG_4532.jpg', 'Drunken Honey Bee', 'Sleeping it off in style'),
('images/IMG_4533.jpg', 'Tight Bud', 'Ready to burst forth!'),
('images/IMG_4534.jpg', 'Peekaboo', 'Graceful opening'),
('images/IMG_4536.jpg', 'Un-scrolling on the stem', 'On its way...'),
('images/IMG_4543.jpg', 'Succulent', 'Thick waxy skin over fleshy leaves')


-- Unknown glitch: Using the Chrome app on an iPhone, in portrait view, 
-- lines 16 and 20 render with image and title 
-- off to the left and description off to the right.
-- Rotating phone to landscape view corrects this issue.