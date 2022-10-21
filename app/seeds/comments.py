from app.models import db, Comment
from datetime import date


def seed_comments():
    comment1 = Comment(
        post_id = 22,
        user_id = 2,
        text = "Lol too accurate"
    )
    comment2 = Comment(
        post_id = 22,
        user_id = 3,
        text = "Just a good tester",
        parent_id = 1
    )
    comment3 = Comment(
        post_id = 22,
        user_id = 10,
        text = "so there is is some superstition about stepping over hoses? i was not aware.",
    )
    comment4 = Comment(
        post_id = 22,
        user_id = 5,
        text = "Some people just won't cross the line",
    )
    comment5 = Comment(
        post_id = 20,
        user_id = 6,
        text = "Cool",
    )
    comment6 = Comment(
        post_id = 14,
        user_id = 9,
        text = "FF7 was better"
    )
    comment7 = Comment(
        post_id = 18,
        user_id = 8,
        text = "Booking my flight now!",
    )
    comment8 = Comment(
        post_id = 23,
        user_id = 9,
        text = "Thats a no from me dawg.",
    )
    comment9 = Comment(
        post_id = 23,
        user_id = 3,
        text = "I. Am. Hyped!",
    )
    comment10 = Comment(
        post_id = 20,
        user_id = 5,
        text = "This.",
        parent_id = 9

    )


    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
