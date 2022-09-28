from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', profile_image='https://static.wikia.nocookie.net/animalcrossing/images/a/ac/Villager_SSBU.png')
    raymond = User(
        username='Raymond', email='raymond@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c446_i.png')
    marshall = User(
        username='marshall', email='marshall@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c324_i.png')
    judy = User(
        username='judy', email='judy@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c450_i.png')
    sherb = User(
        username='sherb', email='sherb@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c445_i.png')
    ankha = User(
        username='ankha', email='ankha@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c317_i.png')
    molly = User(
        username='molly', email='molly@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c80_i.png')
    diana = User(
        username='diana', email='diana@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c8_i.png')
    lucky = User(
        username='lucky', email='lucky@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c377_i.png')
    coco = User(
        username='coco', email='coco@ac.io', password='password', profile_image='https://img.gamewith.net/article_tools/animal-crossing-new-horizons/gacha/c74_i.png')

    db.session.add(demo)
    db.session.add(raymond)
    db.session.add(marshall)
    db.session.add(judy)
    db.session.add(sherb)
    db.session.add(ankha)
    db.session.add(molly)
    db.session.add(diana)
    db.session.add(lucky)
    db.session.add(coco)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
