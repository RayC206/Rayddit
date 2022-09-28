from app.models import db, Post_Type

def seed_post_types():
  text = Post_Type(
    type= "Text"
  )
  image = Post_Type(
    type= "Image"
  )
  link = Post_Type(
    type= "Link"
  )


  db.session.add(text)
  db.session.add(image)
  db.session.add(link)
  db.session.commit()


def undo_post_types():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
