from app.models import db, Recipe
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
  recipe6 = Recipe(
    user_id=1,
    title="SoMaek(소맥)",
    ingredients=
    '''
    1 part soju,
    3 parts beer (preferably lager)
    ''',
    preparation="Pour contents into glass, mix vigorously. Throw in back in one go or sip",
    recipe_image="https://assets3.thrillist.com/v1/image/2726250/1200x600/scale;"
  )
  recipe7 = Recipe(
    user_id=1,
    title="Lychee Oolang-hai",
    ingredients=
    '''
    4 parts shochu,
    6 parts oolang tea,
    Garnish: Lychee
    ''',
    preparation="Fill highball glass with ice to brim. Add lychee. Pour shochu. Add oolang tea. Stir",
    recipe_image="https://3.bp.blogspot.com/-i9kQKqg-50I/WXn_2095-kI/AAAAAAAAArk/s9t9aifIK_gPrNZ8Q2sUdlhtQIBHnz9BACLcBGAs/w1200-h630-p-k-no-nu/Oolong-hai%2Bchinh-le-duc-276670.jpg"
  )
  recipe8 = Recipe(
    user_id=1,
    title="Espresso Martini",
    ingredients=
    '''
    2oz vodka,
    1/2oz Kahlua,
    1oz espresso,
    1/2 oz simple syrup,
    Garnish: coffee beans
    ''',
    preparation="Add vodka, coffee liqueur, espresso and simple syrup to a shaker filled with ice and shake until well-chilled. Strain into a chilled cocktail glass. Garnish",
    recipe_image="https://theeducatedbarfly.com/wp-content/uploads/2021/04/Espresso-Martini.jpg"
  )
  recipe9 = Recipe(
    user_id=1,
    title="Milkis Shot",
    ingredients=
    '''
    1 part soju,
    1.5 parts lager beer,
    1.5 parts Sprite
    ''',
    preparation="Pour all ingrediants in glass, cover, shake, take it as shot while CO2 active",
    recipe_image="https://cdn.shopify.com/s/files/1/0509/0541/5846/products/Untitleddesign-2021-11-29T193837.341_1.jpg"
  )
  recipe10 = Recipe(
    user_id=1,
    title="Penicillin",
    ingredients=
    '''
    2oz Blended Scotch,
    3/4oz Honey Ginger Syrup,
    3/4oz Lemon Juice
    1/4oz Scotch
    ''',
    preparation="Combine blended Scotch, honey-ginger syrup, and lemon juice in a cocktail shaker with ice and shake. Strain over ice into glass. Float scotch on top with spoon.",
    recipe_image="https://www.themanual.com/wp-content/uploads/sites/9/2021/01/peniccilin.jpg"
  )
  all_recipes = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8, recipe9, recipe10]
  saved_recipe = [db.session.add(recipe) for recipe in all_recipes]
  db.session.commit()

def undo_recipes():
    db.session.execute('DELETE FROM recipes')
    db.session.commit()