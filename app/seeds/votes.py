from app.models import db, Vote

def seed_votes():
  vote1 = Vote(
    user_id = 1,
    post_id = 1,
    value = 1
  )
  vote2 = Vote(
    user_id = 2,
    post_id = 1,
    value = 1
  )
  vote3 = Vote(
    user_id = 1,
    post_id = 3,
    value = 1
  )
  vote4 = Vote(
    user_id = 1,
    post_id = 4,
    value = 1
  )
  vote5 = Vote(
    user_id = 1,
    post_id = 5,
    value = 1
  )
  vote6 = Vote(
    user_id = 1,
    post_id = 6,
    value = 1
  )
  vote7 = Vote(
    user_id = 1,
    post_id = 7,
    value = 1
  )
  vote8 = Vote(
    user_id = 1,
    post_id = 8,
    value = 1
  )
  vote9 = Vote(
    user_id = 1,
    post_id = 9,
    value = 1
  )
  vote10 = Vote(
    user_id = 1,
    post_id = 10,
    value = 1
  )

  db.session.add(vote1)
  db.session.add(vote2)
  db.session.add(vote3)
  db.session.add(vote4)
  db.session.add(vote5)
  db.session.add(vote6)
  db.session.add(vote7)
  db.session.add(vote8)
  db.session.add(vote9)
  db.session.add(vote10)
  db.session.commit()

def undo_votes():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
