import json
import boto3

USER_POOL_ID = 'ap-south-1_lx0p5B3q1'
APP_CLIENT_ID = '4k42k7o35oe36fjvsiidbqammm'

client = boto3.client('cognito-idp')


def signout_handler(event, context):
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

    if http_method == 'POST':
        headers = event.get('headers', {})
        access_token = headers.get('access_token')
        id_token = headers.get('id_token')
        response = signOut(access_token, id_token, headers)
        return {
            'statusCode': response['statusCode'],
            'headers': response['headers'],
            'body': response['body']
        }

    headers = event.get('headers', {})
    access_token = headers.get('access_token')
    id_token = headers.get('id_token')

    if not access_token or not id_token:
        return {
            'statusCode': 400,
            'body': json.dumps({'message': 'Access token or ID token not provided'})
        }


def signOut(access_token, id_token, headers):
    try:
        client.global_sign_out(
            AccessToken=access_token
        )
        response_headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          
        }
        response_headers = {
            'Content-Type': 'application/json',
            **headers
        }

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Signout successful'}),
            'headers': response_headers
        }

    except client.exceptions.NotAuthorizedException:
        return {
            'statusCode': 401,
            'body': json.dumps({'message': 'Invalid access token'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }