from app.models import db, Comment
from datetime import date


def seed_comments():
    comment1 = Comment(
        post_id = 1,
        user_id = 2,
        text = "outerComment",
    )
    comment2 = Comment(
        post_id = 1,
        user_id = 3,
        text = "innerComment",
        parent_id = 1
    )
    comment3 = Comment(
        post_id = 1,
        user_id = 2,
        text = "outerComment",
    )
    comment4 = Comment(
        post_id = 1,
        user_id = 5,
        text = "InnerComment",
        parent_id = 3
    )
    comment5 = Comment(
        post_id = 1,
        user_id = 6,
        text = "Cool",

    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
