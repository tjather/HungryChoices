CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS user_profiles CASCADE;
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID NOT NULL,
  first_name VARCHAR NOT NULL,      /* The user's name */
  last_name VARCHAR NOT NULL,      /* The user's name */
  email_address VARCHAR NOT NULL,       /* The user's email address */
  account_password VARCHAR NOT NULL,    /* The user's password */
  img_src VARCHAR(200),        /* The file path of the user's profile image */
  likes VARCHAR(200)[],        /* Array of liked recipes */
 CONSTRAINT users_pkey PRIMARY KEY(id)
)WITH (oids = false);


DROP TABLE IF EXISTS foods CASCADE;
CREATE TABLE IF NOT EXISTS foods(
  id SERIAL PRIMARY KEY,       /* Unique identifier for each food*/
  name VARCHAR NOT NULL,     /* The name of the food */
  cuisine VARCHAR(50) NOT NULL,   /* The food's cusine */
  img_src VARCHAR,         /* This is a file path (absolute or relative), that locates the image of the food */
  img_type VARCHAR(10)        /* This is the type of the image, valid types are "Square", "Landscape", and "Portrait" */
);

INSERT INTO user_profiles(id, first_name, last_name, email_address, account_password, img_src)
VALUES(uuid_generate_v4(), 'Test' , 'User', 'test@gmail.com', 'Abcd1234!', '../resources/img/pfpSample.jpg')
;

INSERT INTO foods(name, cuisine, img_src, img_type)
VALUES
('Mac n Cheese', 'Italian', 'https://bigoven-res.cloudinary.com/image/upload/t_recipe-1280/four-cheese-baked-macaroni-and-57cddd.jpg', 'Square'),
('Fried Chicken', 'American', 'https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Fried_Chicken-1024x536.png', 'Landscape'),
('Jello', 'American', 'https://flouronmyfingers.com/wp-content/uploads/2020/01/How-to-Make-Jello-picture.jpg', 'Portrait'),
('Peking Roasted Duck', 'Chinese', '../resources/img/food/peking-roasted-duck.png', 'Square'),
('Sweet and Sour Pork', 'Chinese', '../resources/img/food/sweet-and-sour-pork.png', 'Square'),
('Ma Po Tofu', 'Chinese', '../resources/img/food/ma-po-tofu.png', 'Square'),
('Chow Mein', 'Chinese', '../resources/img/food/chow-mein.png', 'Square'),
('Biryani', 'Indian', '../resources/img/food/biryani.png', 'Square'),
('Dosa', 'Indian', '../resources/img/food/dosa.png', 'Square'),
('Saag Paneer', 'Indian', '../resources/img/food/saag-paneer.png', 'Square'),
('Korma', 'Indian', '../resources/img/food/korma.png', 'Square'),
('Tandoori Chicken', 'Indian', '../resources/img/food/tandoori-chicken.png', 'Square'),
('Quenelles', 'French', '../resources/img/food/quenelles.png', 'Square'),
('Coq au Vin', 'French', '../resources/img/food/coq-au-vin.png', 'Square'),
('Bouillabaisse', 'French', '../resources/img/food/bouillabaisse.png', 'Square'),
('Ratatouille', 'French', '../resources/img/food/ratatouille.png', 'Square'),
('Foie Gras', 'French', '../resources/img/food/foie-gras.png', 'Square'),
('Kare-Raisu', 'Japanese', '../resources/img/food/kare-raisu.png', 'Square'),
('Okonomiyaki', 'Japanese', '../resources/img/food/okonomiyaki.png', 'Square'),
('Yakitori', 'Japanese', '../resources/img/food/yakitori.png', 'Square'),
('Karaage', 'Japanese', '../resources/img/food/karaage.png', 'Square'),
('Yakisoba', 'Japanese', '../resources/img/food/yakisoba.png', 'Square');
