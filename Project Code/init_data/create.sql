DROP TABLE IF EXISTS user_profiles CASCADE;
CREATE TABLE IF NOT EXISTS user_profiles (
  account_name VARCHAR NOT NULL,      /* The user's name */
  email_address VARCHAR NOT NULL,       /* The user's email address */
  account_password VARCHAR NOT NULL,    /* The user's password */
  country VARCHAR NOT NULL,           /* The user's country */
  img_src VARCHAR(200),        /* The file path of the user's profile image */
  PRIMARY KEY(account_name, email_address)
);

DROP TABLE IF EXISTS food_recipes CASCADE;
CREATE TABLE IF NOT EXISTS food_recipes(
  id SERIAL PRIMARY KEY,       /* Unique identifier for each recipe*/
  name VARCHAR NOT NULL,     /* The name of the food */
  cuisine VARCHAR(50) NOT NULL,   /* The food's cusine */
  ingredients VARCHAR[] NOT NULL,
  img_src VARCHAR,         /* This is a file path (absolute or relative), that locates the image of the food */
  img_type VARCHAR(10)        /* This is the type of the image, valid types are "Square", "Landscape", and "Portrait" */
);

INSERT INTO user_profiles(account_name, email_address, account_password, country, img_src)
VALUES('Test User', 'test@gmail.com', 'Abcd1234!', 'Africa', '../resources/img/pfpSample.jpg')
;

INSERT INTO food_recipes(name, cuisine, ingredients, img_src, img_type)
VALUES
('Mac n Cheese', 'Italian', ARRAY ['1 1/2 cups Dry Elbow Macaroni', '3 tablespoons Butter', '3 tablespoons All-Purpose Flour', '2 cups Milk', '1/2 teaspoon each Salt And Pepper', '2 cups Cheese'], 'https://bigoven-res.cloudinary.com/image/upload/t_recipe-1280/four-cheese-baked-macaroni-and-57cddd.jpg', 'Square'),
('Fried Chicken', 'American', ARRAY ['3 pounds Chicken', '4 cups Buttermilk', '3 tablespoons Kosher Salt', '2 teaspoons Black Pepper', '1 1/2 cups All-Purpose Flour', '3 cups Peanut Oil'], 'https://insanelygoodrecipes.com/wp-content/uploads/2020/04/Fried_Chicken-1024x536.png', 'Landscape'),
('Jello', 'American', ARRAY ['Gelatin', 'Water', 'Flavoring'], 'https://flouronmyfingers.com/wp-content/uploads/2020/01/How-to-Make-Jello-picture.jpg', 'Portrait')
;
