import json
import boto3
from botocore.exceptions import ClientError

USER_POOL_ID = 'ap-south-1_lx0p5B3q1'
DYNAMODB_TABLE = 'users'

client = boto3.client('cognito-idp')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(DYNAMODB_TABLE)

def signup_handler(event, context):
    http_method = event['httpMethod']
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Credentials': 'true'
    }

    if http_method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers
        }
    elif http_method == 'POST':
        request_body = json.loads(event['body'])
        email = request_body.get('email')
        firstName = request_body.get('firstName')
        lastName = request_body.get('lastName')
        response = signUp(email, firstName, lastName)
        return {
            'statusCode': response['statusCode'],
            'headers': headers,
            'body': response['body']
        }
    else:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps('Invalid HTTP method')
        }


def signUp(email, firstName, lastName):
    try:
        response = client.admin_create_user(
            UserPoolId=USER_POOL_ID,
            Username=email,
            DesiredDeliveryMediums=["EMAIL"],
            UserAttributes=[
                {
                    'Name': 'email',
                    'Value': email
                },
                {
                    'Name': "given_name",
                    'Value': firstName
                },
                {
                    'Name': "family_name",
                    'Value': lastName
                }
            ],
            ForceAliasCreation=False
        )

        user_sub = next((attribute['Value'] for attribute in response['User']
                        ['Attributes'] if attribute['Name'] == 'sub'), None)

        table.put_item(
            Item={
                'userId': user_sub,
                'firstName': firstName,
                'lastName': lastName,
                'email': email
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Signup successful'})
        }

    except client.exceptions.UsernameExistsException:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Username already exists'})
        }
    except ClientError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }
