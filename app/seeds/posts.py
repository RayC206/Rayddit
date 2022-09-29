from app.models import db, Post
from datetime import date

def seed_posts():
    post1 = Post(
        user_id=1,
        subreddit_id = 1,
        post_type_id = 2,
        title = "This website doesn't use cookies",
        img_url = "https://i.imgur.com/05wcwhq.png",
        created_at = date.fromisoformat('2022-09-28')
    )
    post2 = Post(
        user_id=3,
        subreddit_id = 2,
        post_type_id = 2,
        title = "Hot take: Cyberpunk 2077 is one of the best games I’ve ever played",
        img_url = "https://preview.redd.it/4lsy5r8fg7o91.jpg?width=960&crop=smart&auto=webp&s=9c6b52497c138f01f56adeab767ac256dc425608",
        created_at = date.fromisoformat('2022-09-27')
    )
    post3 = Post(
        user_id=10,
        subreddit_id = 5,
        post_type_id = 1,
        title = 'House plant recommendation for low light rooms?',
        text = "Question in the title.",
        created_at = date.fromisoformat('2022-09-26')
    )
    post4 = Post(
        user_id=8,
        subreddit_id = 4,
        post_type_id = 3,
        title = 'This site is perfect for searching for a beach vacation spot!!!',
        link_url = "https://ray-airbnb-clone.herokuapp.com/",
        created_at = date.fromisoformat('2022-09-25')
    )
    post5 = Post(
        user_id=4,
        subreddit_id = 2,
        post_type_id = 2,
        title = 'Everytime...',
        img_url = "https://i.redd.it/1fpaatrzw0p91.jpg",
        created_at = date.fromisoformat('2022-09-24')
    )
    post6 = Post(
        user_id=2,
        subreddit_id = 1,
        post_type_id = 2,
        title = ':(',
        img_url = "https://preview.redd.it/x4xsrmg4bad91.jpg?width=960&crop=smart&auto=webp&s=8ca81ae90bf4f55c89ad597c56bc6a12f5a6b220",
        created_at = date.fromisoformat('2022-09-23')
    )
    post7 = Post(
        user_id=10,
        subreddit_id = 4,
        post_type_id = 2,
        title = 'Thailand is beautiful',
        img_url = "https://preview.redd.it/3a04lnoxkvn91.jpg?width=640&crop=smart&auto=webp&s=a9f8b8957184014fddadb56b9da6dd325b281e14",
        created_at = date.fromisoformat('2022-09-22')
    )
    post8 = Post(
        user_id=4,
        subreddit_id = 5,
        post_type_id = 2,
        title = 'The new leaf on my Philodendron "White Princess"!',
        img_url = "https://preview.redd.it/athj2ntfs2i81.jpg?width=640&crop=smart&auto=webp&s=13ddd5680377abb35d8c16a3d3087cdaf1cc11c2",
        created_at = date.fromisoformat('2022-09-21')
    )
    post9 = Post(
        user_id= 1,
        subreddit_id = 4,
        post_type_id = 1,
        title = 'Why did the programmer quit his job?',
        text = "Because he didn't get arrays.",
        created_at = date.fromisoformat('2022-09-20')
    )
    post10 = Post(
        user_id=5,
        subreddit_id = 3,
        post_type_id = 2,
        title = 'Sign up to see content',
        img_url = "https://i.redd.it/mhasuo9z0gq91.png",
        created_at = date.fromisoformat('2022-09-19')
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
