from app.models import db, Subreddit

def seed_subreddits():
  ProgrammerHumor = Subreddit (
    name = "ProgrammerHumor",
    owner_id = 2,
    description = "Dedicated to humor and jokes relating to programmers and programming.",
    icon_url = "https://styles.redditmedia.com/t5_2tex6/styles/communityIcon_u89jf60zv7p41.png",
    banner_img = "https://styles.redditmedia.com/t5_2tex6/styles/bannerBackgroundImage_z6ejudtdz7p41.png"
  )
  Gaming = Subreddit (
    name = "Gaming",
    owner_id = 3,
    description = "A subreddit for (almost) anything related to games - video games, board games, card games, etc. (but not sports).",
    icon_url = "https://styles.redditmedia.com/t5_2qh03/styles/communityIcon_1isvxgkk7hw51.png?width=256&s=b2c4017083ea0176a3dd4837f6e009bbc8384f15",
    banner_img = "https://styles.redditmedia.com/t5_2qh03/styles/bannerBackgroundImage_j84aqdq3eyd91.png"
  )
  Funny = Subreddit (
    name = "Funny",
    owner_id = 5,
    description = "Welcome to r/Funny, Rayddit's largest humour depository.",
    icon_url = "https://preview.redd.it/az4o9m5qqxl31.png?width=640&crop=smart&auto=webp&s=10bce5e4d64cd684d63600ebebd2cf9a46c41891",
    banner_img = "https://imgur.com/bc745470-5040-4f8b-8786-896c7d7a64d3"
  )
  Food = Subreddit (
    name = "Travel",
    owner_id = 8,
    description = "r/travel is a community about exploring the world. Your pictures, questions, stories, or any good content is welcome.",
    icon_url = "https://styles.redditmedia.com/t5_2qh41/styles/communityIcon_x4pa3xf5z4d11.jpg?width=256&format=pjpg&s=59e0f9a8925784fbc8fe0af30e583a48019bc2a7",
    banner_img = "https://i.imgur.com/VZFdEFb.png.jpg"
  )
  Houseplants = Subreddit (
    name = "Houseplants",
    owner_id = 10,
    description = "A community focused on the discussion, care, and well-being of houseplants!",
    icon_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Animal_Crossing_Leaf.svg/504px-Animal_Crossing_Leaf.svg.png",
    banner_img = "https://i.imgur.com/bS0dufQ.png"
  )

  db.session.add(ProgrammerHumor)
  db.session.add(Gaming)
  db.session.add(Funny)
  db.session.add(Food)
  db.session.add(Houseplants)
  db.session.commit()


def undo_subreddits():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
