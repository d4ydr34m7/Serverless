import json
import boto3
import gspread
import pprint
import re
import logging
from boto3.dynamodb.conditions import Key, Attr
logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

gc = gspread.service_account(filename='credentials.json')

gsheet = gc.open("Customer_feedback_analytics")

sheet1 = gsheet.sheet1

def create_response(status, message, data):
    return {
        "status": status,
        "message": message,
        "data": data
    }

def lambda_handler(event, context):
    
    try:
        dynamo_db = boto3.resource('dynamodb')
        table = dynamo_db.Table('customer_feedback')
    
        users_feedback_polarity = []
        
        body = event['body']
        logger.info(body)

        body_json = json.loads(body)
        restaurant_id = body_json['restaurantId']
        
        logger.info("Helloooooooooooooooooo")
        res = table.scan(FilterExpression=Attr('restaurant_id').eq(restaurant_id))
        logger.info("Helloooooooooooooooooo")
        
        if res['Count'] == 0:
            response = create_response(True,"No feedback present.", None)
        else:
            logger.info("Helloooooooooooooooooo")
            comprehend = boto3.client("comprehend")
            for i in range(res['Count']):
                
                dictionary = {}
    
                user_id = res['Items'][i]['user_id']
                feedback = res['Items'][i]['feedback']
                response = comprehend.detect_sentiment(Text = feedback, LanguageCode = "en")
                polarity = response['Sentiment']
                
                dictionary['Feedback'] = feedback
                dictionary['Polarity'] = polarity
                dictionary['UserID'] = user_id
                logger.info("BEFORE.")
                logger.info(user_id)
                logger.info(feedback)
                logger.info(polarity)
                row= [user_id, feedback, polarity]
                sheet1.insert_row(row, index=2)

                logger.info("DATA ADDED.")

                users_feedback_polarity.append(dictionary)
          
            logger.info(users_feedback_polarity)
            response = create_response(True, "Feedback fetched successfully", users_feedback_polarity)

    except Exception as e:
        logger.info(str(e))
        response = create_response(False, str(e), None)
        raise e
        
    return response

# def write_data_to_spread_sheet(user_id, feedback, polarity):
#     row = [user_id, feedback, polarity]
#     logger.info(row)

#     gc = gspread.service_account(filename='credentials.json')
#     logger.info(row)

#     gsheet = gc.open('Customer_feedback_analytics')
#     logger.info(row)

#     gsheet.sheet1.insert_row(row, index=2)