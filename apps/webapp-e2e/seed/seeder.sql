USE portfolio_test;

DELETE FROM image_metadata;
DELETE FROM user_certification;
DELETE FROM user_experience;
DELETE FROM user_skill;
DELETE FROM user;

INSERT INTO user (`id`, `username`, `first_name`, `last_name`, `isActive`, `password`, `current_role`, `current_company`, `greetings`, `social_handlers`)
  VALUES(1, 'carlo', 'Carlo Gino', 'Catapang', 1,
  'password',
  'Fullstack Developer',
  'DBS',
  'Hi! How are you?,This is Carlo Gino.,Welcome to my page!',
  '[{
    "url": "https://www.facebook.com/codegino",
    "name": "facebook",
    "icon": "facebook",
    "description": "description_facebook"
  },
  {
    "url": "https://twitter.com/carlomaginoo",
    "name": "twitter",
    "icon": "twitter",
    "description": "description_twitter"
  },
  {
    "url": "https://github.com/carlogino",
    "name": "github",
    "icon": "github",
    "description": "Github Description"
  }
]');

INSERT INTO image_metadata (`id`, `image_name`, `description`, `url`, `user_id`, `category`, `title`, `image_tags`)
  VALUES(1, "test1231321.png", "description", "http://localhost/test", 1, "MEME", "title", "");

INSERT INTO user_skill (`id`, `user_id`, `name`, `category`, `is_current`, `link`)
  VALUES(1, 1, "React", "Frontend", 1, "");
INSERT INTO user_skill (`id`, `user_id`, `name`, `category`, `is_current`, `link`)
  VALUES(2, 1, "Angular", "Frontend", 1, "");
INSERT INTO user_skill (`id`, `user_id`, `name`, `category`, `is_current`, `link`)
  VALUES(3, 1, "Vue", "Frontend", 1, "");
INSERT INTO user_skill (`id`, `user_id`, `name`, `category`, `is_current`, `link`)
  VALUES(4, 1, "JavaScript", "General Programming", 1, "");
INSERT INTO user_skill (`id`, `user_id`, `name`, `category`, `is_current`, `link`)
  VALUES(5, 1, "NodeJS", "Backend", 1, "");

INSERT INTO user_experience (`id`, `user_id`, `name`, `role`, `is_active`, `start_date`, `end_date`, `events`)
  VALUES(1, 1, "Name 1", "Role 1", 1, "2020-08-09", "2020-08-10",
  "The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog, event3, event4"
  );
INSERT INTO user_experience (`id`, `user_id`, `name`, `role`, `is_active`, `start_date`, `end_date`, `events`)
  VALUES(2, 1, "Name 2", "Role 2", 1, "2020-08-09", "2020-08-10",
  "The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog, event3, event4"
  );
INSERT INTO user_experience (`id`, `user_id`, `name`, `role`, `is_active`, `start_date`, `end_date`, `events`)
  VALUES(3, 1, "Name 3", "Role 3", 1, "2020-08-09", "2020-08-10",
  "The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog, event3, event4"
  );
INSERT INTO user_experience (`id`, `user_id`, `name`, `role`, `is_active`, `start_date`, `end_date`, `events`)
  VALUES(4, 1, "Name 4", "Role 4", 1, "2020-08-09", "2020-08-10",
  "The quick brown fox jumps over the lazy dog, The quick brown fox jumps over the lazy dog, event3, event4"
  );

INSERT INTO user_certification (`id`, `user_id`, `name`, `description`, `provider`, `date_acquired`, `url`)
  VALUES(1, 1, "certification 1", "description 1", "provider 1", "2020-08-10", "");
INSERT INTO user_certification (`id`, `user_id`, `name`, `description`, `provider`, `date_acquired`, `url`)
  VALUES(2, 1, "certification 2", "description 2", "provider 2", "2020-08-10", "");
INSERT INTO user_certification (`id`, `user_id`, `name`, `description`, `provider`, `date_acquired`, `url`)
  VALUES(3, 1, "certification 3", "description 3", "provider 3", "2020-08-10", "");
INSERT INTO user_certification (`id`, `user_id`, `name`, `description`, `provider`, `date_acquired`, `url`)
  VALUES(4, 1, "certification 4", "description 4", "provider 4", "2020-08-10", "");
