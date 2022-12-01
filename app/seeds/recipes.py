from app.models import db, Recipe, environment, SCHEMA
# from faker import Faker
# import random
# fake=Faker()

# authors = list(range(1,5))

def seed_recipes():
  recipe1 = Recipe(
    user_id=1,
    title="queen mary",
    ingredients=
    '''
    Glass of beer,
    Grenadine (to taste)
    ''',
    preparation="Pour grenadine into glass, followed by beer, leaving pink-hued beer head on top",
    recipe_image="https://www.pccmarkets.com/wp-content/uploads/2019/02/pcc-cocktail-queen-mary-recipe-1200.jpg"
  )
  recipe2 = Recipe(
    user_id=2,
    title="martini cocktail",
    ingredients=
    '''
    60 ml gin,
    10 ml dry vermouth
    ''',
    preparation="Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled martini cocktail glass.",
    recipe_image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dirty-martini-3e964eb.jpg"
  )
  recipe3 = Recipe(
    user_id=1,
    title="brandy alexander",
    ingredients=
    '''
    3 cl (1 part) Cognac,
    3 cl (1 part) Creme de cacao (brown),
    3 cl (1 part) cream
    ''',
    preparation="Shake and strain into a chilled cocktail glass. Sprinkle with fresh ground nutmeg.",
    recipe_image="https://www.lemontreedwelling.com/wp-content/uploads/2020/10/brandy-alexander-featured-1.jpg"
  )
  recipe4 = Recipe(
    user_id=1,
    title="sake bomb",
    ingredients=
    '''
    1 pint (~16 parts) beer,
    1 shot (1.5 parts) sake
    ''',
    preparation="The shot of sake is dropped into the beer, causing it to fizz violently.  The drink should then be consumed immediately.",
    recipe_image="https://assets3.thrillist.com/v1/image/1859151/1000x666/flatten;crop;webp=auto;jpeg_quality=60.jpg"
  )
  recipe5 = Recipe(
    user_id=1,
    title="brandy daisy",
    ingredients=
    '''
    1 1/2  ounces brandy,
    3/4  ounce yellow Chartreuse,
    3/4  ounce lemon juice
    ''',
    preparation="Shake with ice in a cocktail shaker, then strain into a chilled Coupe glass and top with a splash of chilled club soda or seltzer.",
    recipe_image="https://assets-global.website-files.com/60071cce9e7d3adbac838263/619702e87bc6e1a6e3838f36_iStock-1186411490.jpg"
  )
  all_recipes = [recipe1, recipe2, recipe3, recipe4, recipe5]
  saved_recipe = [db.session.add(recipe) for recipe in all_recipes]
  db.session.commit()

def undo_recipes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.recipes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM recipes;")
    db.session.commit()