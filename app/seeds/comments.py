from app.models import db, Comment
from datetime import date


def seed_comments():
    comment1 = Comment(
        post_id = 1,
        user_id = 2,
        text = "Nice",
    )
    comment2 = Comment(
        post_id = 1,
        user_id = 3,
        text = "Agreed",
        parent_id = 1
    )
    comment3 = Comment(
        post_id = 1,
        user_id = 2,
        text = "Nice",
    )
    comment4 = Comment(
        post_id = 1,
        user_id = 2,
        text = "Nice",
        parent_id = 3
    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
