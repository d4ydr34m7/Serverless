import json
import boto3
import pprint
import re
import logging
from boto3.dynamodb.conditions import Key, Attr
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def create_response(status, message, data):
    return {
        "status": status,
        "message": message,
        "data": data
    }

def lambda_handler(event, context):
    
    try:
        dynamo_db = boto3.resource('dynamodb')
        table = dynamo_db.Table('recipe_key_ingredients')
    
        extracted_recipes = []
        
        body = event['body']
        body_json = json.loads(body)
        restaurant_id = body_json['restaurantId']
        
        # logger.info(restaurant_id)

        res = table.scan(FilterExpression=Attr('restaurant_id').eq(restaurant_id))
        logger.info(res)
        if res['Count'] == 0:
            response = create_response(True,"No recipe present.", None)
        else:
            logger.info(res)
            for i in range(res['Count']):
                dictionary = {}
    
                recipe_name = res['Items'][i]['recipe_name']
                recipe_ingredients = res['Items'][i]['ingredients']
                
                dictionary['RecipeName'] = recipe_name
                dictionary['RecipeIngredients'] = recipe_ingredients
                
                extracted_recipes.append(dictionary)
          
            response = create_response(True, "Recipes found successfully", extracted_recipes)

    except Exception as e:
        response = create_response(False, str(e), None)
        raise e
        
    return response