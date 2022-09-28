from app.models import db, Post


def seed_posts():
    post1 = Post(
        user_id=1,
        subreddit_id = 1,
        post_type_id = 1,
        title = 'test'
    )
    post2 = Post(
        user_id=1,
        subreddit_id = 2,
        post_type_id = 1,
        title = 'test'

    )
    post3 = Post(
        user_id=2,
        subreddit_id = 1,
        post_type_id = 1,
        title = 'test'

    )
    post4 = Post(
        user_id=2,
        subreddit_id = 2,
        post_type_id = 2,
        title = 'test'
    )
    post5 = Post(
        user_id=3,
        subreddit_id = 3,
        post_type_id = 2,
        title = 'test'
    )
    post6 = Post(
        user_id=3,
        subreddit_id = 4,
        post_type_id = 2,
        title = 'test'
    )
    post7 = Post(
        user_id=4,
        subreddit_id = 3,
        post_type_id = 3,
        title = 'test'
    )
    post8 = Post(
        user_id=4,
        subreddit_id = 5,
        post_type_id = 3,
        title = 'test'
    )
    post9 = Post(
        user_id=5,
        subreddit_id = 4,
        post_type_id = 3,
        title = 'test'
    )
    post10 = Post(
        user_id=5,
        subreddit_id = 5,
        post_type_id = 1,
        title = 'test'
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
