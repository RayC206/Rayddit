from app.models import db, Subscription

def seed_subscriptions():
  subscription1 = Subscription(
    subreddit_id = 1,
    user_id = 1,
  )
  subscription2 = Subscription(
    subreddit_id = 1,
    user_id = 2,

  )
  subscription3 = Subscription(
    subreddit_id = 2,
    user_id = 3,

  )
  subscription4 = Subscription(
    subreddit_id = 2,
    user_id = 4,

  )
  subscription5 = Subscription(
    subreddit_id = 3,
    user_id = 5,

  )
  subscription6 = Subscription(
    subreddit_id = 3,
    user_id = 6,

  )
  subscription7 = Subscription(
    subreddit_id = 4,
    user_id = 7,

  )
  subscription8 = Subscription(
    subreddit_id = 4,
    user_id = 8,

  )
  subscription9 = Subscription(
    subreddit_id = 5,
    user_id = 9,

  )
  subscription10 = Subscription(
    subreddit_id = 5,
    user_id = 10,

  )

  db.session.add(subscription1)
  db.session.add(subscription2)
  db.session.add(subscription3)
  db.session.add(subscription4)
  db.session.add(subscription5)
  db.session.add(subscription6)
  db.session.add(subscription7)
  db.session.add(subscription8)
  db.session.add(subscription9)
  db.session.add(subscription10)
  db.session.commit()


def undo_subscriptions():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
