import json
import gspread
import boto3
from boto3.dynamodb.conditions import Key, Attr

def lambda_handler(event, context):
    dynamo_db = boto3.resource('dynamodb')
    table = dynamo_db.Table('customer_feedback')
    
    body = event['body']
    body_json = json.loads(body)
    restaurant_id = body_json['restaurantId']
    
    res = table.scan(FilterExpression=Attr('restaurant_id').eq(restaurant_id))
    
    write_data_to_spread_sheet(event)
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

def write_data_to_spread_sheet(event):
    gc = gspread.service_account(filename='credentials.json')
    gsheet = gc.open("Customer_feedback_analytics")
    gsheet.sheet1.insert_row(['sfdf','ewdwedf','dfegefer'], index=2)
    