
# import json
# import boto3
# from botocore.exceptions import ClientError
# from boto3.dynamodb.conditions import Key
# DYNAMODB_TABLE = 'users'


# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table(DYNAMODB_TABLE)


# USER_POOL_ID = 'ap-south-1_lx0p5B3q1'
# APP_CLIENT_ID = '4k42k7o35oe36fjvsiidbqammm'


# def signin(event, context):
#     http_method = event['httpMethod']
#     headers = {
#         'Access-Control-Allow-Origin': 'http://localhost:3000',
#         'Access-Control-Allow-Headers': 'Content-Type',
#         'Access-Control-Allow-Methods': 'POST',
#         'Access-Control-Allow-Credentials': 'true'
#     }

#     if http_method == 'OPTIONS':
#         return {
#             'statusCode': 200,
#             'headers': headers
#         }

#     elif http_method == 'POST':
#         request_body = json.loads(event['body'])
#         email = request_body.get('email')
#         password = request_body.get('password')
#         response = signIn(email, password)
#         return {
#             'statusCode': response['statusCode'],
#             'headers': headers,
#             'body': response['body']
#         }


# def signIn(email, password):


#     client = boto3.client('cognito-idp')

#     try:
#         response = client.initiate_auth(
#             AuthFlow='USER_PASSWORD_AUTH',
#             AuthParameters={
#                 'USERNAME': email,
#                 'PASSWORD': password
#             },
#             ClientId=APP_CLIENT_ID
#         )

#         client.admin_update_user_attributes(
#             UserPoolId=USER_POOL_ID,
#             Username=email,
#             UserAttributes=[
#                 {'Name': 'email_verified', 'Value': 'true'}
#             ]
#         )

#         print("res", response)
#         if response['ChallengeParameters']:
#             if response['ChallengeName'] == 'NEW_PASSWORD_REQUIRED':
#                 response = client.respond_to_auth_challenge(
#                     ClientId=APP_CLIENT_ID,
#                     ChallengeName='NEW_PASSWORD_REQUIRED',
#                     ChallengeResponses={
#                         'USERNAME': email,
#                         'NEW_PASSWORD': password
#                     },
#                     Session=response['Session']
#                 )

#         if 'AuthenticationResult' in response:
#             access_token = response['AuthenticationResult']['AccessToken']
#             id_token = response['AuthenticationResult']['IdToken']
#             custom_expiration_time = 43200
#             expiration_time = custom_expiration_time
            
#             # user_sub = next((attribute['Value'] for attribute in response['User']['Attributes'] if attribute['Name'] == 'sub') , None) 
#             response = table.query(
#                 IndexName='email-index',
#                 KeyConditionExpression=Key('email').eq(email),
#                 Limit=1
#             )
#             items = response.get('Items')

#             if items:
#                 item = items[0]
#                 user = {
#                     'userId': item['userId'],
#                 }
 
#             response_body = {
#                 'message': 'Signin successful',
#                 'email': email,
#                 'access_token': access_token,
#                 'token_id': id_token,
#                 'user': user
#             }
          
#         else:
#             if 'AuthenticationResult' in response:
#                 access_token = response['AuthenticationResult']['AccessToken']
#                 id_token = response['AuthenticationResult']['IdToken']
#                 custom_expiration_time = 43200
#                 expiration_time = custom_expiration_time
                
#                 # user_sub = next((attribute['Value'] for attribute in response['User']
#                         # ['Attributes'] if attribute['Name'] == 'sub'), None) 
                
            
#             response = table.query(
#                 IndexName='email-index',
#                 KeyConditionExpression=Key('email').eq(email),
#                 Limit=1
#             )
#             items = response.get('Items')

#             if items:
#                 item = items[0]
#                 user = {
#                     'userId': item['userId'],
     
#                 }
#         response_body = {
#             'message': 'Signin successful',
#             'email': email,
#             'access_token': access_token,
#             'token_id': id_token,
#             # 'user_sub': user_sub
#             'user': user
#         }
#         # response = table.query(
#         #         IndexName='email-index',
#         #         KeyConditionExpression=Key('email').eq(email),
#         #         Limit=1
#         #     )
#         # items = response.get('Items')

#         # if items:
#         #         item = items[0]
#         #         user = {
#         #             'userId': item['userId'],
#         #             'name': f"{item.get('firstName', '')}"
#         #         }

#         # response_headers = {
#         #     'Set-Cookie': f'access_token={access_token}; HttpOnly; Max-Age={expiration_time}',
#         #     'token_id': f'{id_token}; HttpOnly; Max-Age={expiration_time}'
#         # }

#         return {
#             'statusCode': 200,
#             'body': json.dumps(response_body),
#         }

#     except client.exceptions.NotAuthorizedException:
#         return {
#             'statusCode': 401,
#             'body': json.dumps({'message': 'Invalid credentials'})
#         }
#     except client.exceptions.UserNotFoundException:
#         return {
#             'statusCode': 404,
#             'body': json.dumps({'message': 'User not found'})
#         }
#     except Exception as e:
#         return {
#             'statusCode': 500,
#             'body': json.dumps({'message': str(e)})
#         }

#     return {
#         'statusCode': 500,
#         'body': json.dumps({'message': 'Signin unsuccessful'})
#     }   


# # import json
# # import boto3
# # from botocore.exceptions import ClientError
# # from boto3.dynamodb.conditions import Key, Attr

# # DYNAMODB_TABLE = 'users'
# # USER_POOL_ID = 'ap-south-1_lx0p5B3q1'
# # APP_CLIENT_ID = '4k42k7o35oe36fjvsiidbqammm'

# # dynamodb = boto3.resource('dynamodb')
# # table = dynamodb.Table(DYNAMODB_TABLE)


# # def signin(event, context):
# #     http_method = event['httpMethod']
# #     headers = {
# #         'Access-Control-Allow-Origin': 'http://localhost:3000',
# #         'Access-Control-Allow-Headers': 'Content-Type',
# #         'Access-Control-Allow-Methods': 'POST',
# #         'Access-Control-Allow-Credentials': 'true'
# #     }
# #     if http_method == 'OPTIONS':
# #         return {
# #             'statusCode': 200,
# #             'headers': headers
# #         }

  
# #     elif http_method == 'POST':
# #         request_body = json.loads(event['body'])
# #         email = request_body.get('email')
# #         password = request_body.get('password')
# #         response = signIn(email, password)
# #         return {
# #             'statusCode': response['statusCode'],
# #             'headers': headers,
# #             'body': response['body']
# #         }

# #     def signIn(email, password):
# #         client = boto3.client('cognito-idp')
# #         try:
# #             response = client.initiate_auth(
# #                 AuthFlow='USER_PASSWORD_AUTH',
# #                 AuthParameters={
# #                     'USERNAME': email,
# #                     'PASSWORD': password
# #                 },
# #                 ClientId=APP_CLIENT_ID
# #             )
# #             client.admin_update_user_attributes(
# #                 UserPoolId=USER_POOL_ID,
# #                 Username=email,
# #                 UserAttributes=[
# #                     {'Name': 'email_verified', 'Value': 'true'}
# #                 ]
# #             )
# #             if response['ChallengeParameters']:
# #                 if response['ChallengeName'] == 'NEW_PASSWORD_REQUIRED':
# #                     response = client.respond_to_auth_challenge(
# #                         ClientId=APP_CLIENT_ID,
# #                         ChallengeName='NEW_PASSWORD_REQUIRED',
# #                         ChallengeResponses={
# #                             'USERNAME': email,
# #                             'NEW_PASSWORD': password
# #                         },
# #                         Session=response['Session']
# #                     )
# #                 if 'AuthenticationResult' in response:
# #                     access_token = response['AuthenticationResult']['AccessToken']
# #                     id_token = response['AuthenticationResult']['IdToken']
# #                     custom_expiration_time = 43 * 200
# #                     expiration_time = custom_expiration_time

# #                 response_body = {'message': 'Signin successful',
# #                                  'email': email,
# #                                  'access_token': access_token,
# #                                  'token_id': id_token, }
# #                 response = table.scan(
# #                     FilterExpression=Attr('email').eq(email)
# #                 )
# #                 items = response.get('Items')

# #                 if items:
# #                     item = items[0]
# #                     user = {
# #                         'userId': item['userId'],
# #                         'name': f"{item.get('firstName', '')}"
# #                     }
# #                 response_body['user'] = user
# #             else:
# #                 if 'AuthenticationResult' in response:
# #                     access_token = response['AuthenticationResult']['AccessToken']
# #                     id_token = response['AuthenticationResult']['IdToken']
# #                     custom_expiration_time = 43 * 200
# #                     expiration_time = custom_expiration_time

# #             response_body = {
# #                 'message': 'Signin successful',
# #                 'email': email,
# #                 'access_token': access_token,
# #                 'token_id': id_token,

# #             }
# #         # response = table.query(
# #         #         IndexName='email-index',
# #         #         KeyConditionExpression=Key('email').eq(email),
# #         #         Limit=1
# #         #     )
# #             items = response.get('Items')

# #             if items:
# #                 item = items[0]
# #                 user = {
# #                     'userId': item['userId'],
# #                     'name': f"{item.get('firstName', '')}"
# #                 }

# #             return {
# #                 'statusCode': 200,
# #                 'body': json.dumps(response_body),
# #             }
# #         except client.exceptions.NotAuthorizedException:
# #             return {'statusCode': 401,      'body': json.dumps({'message': 'Invalid credentials'})}
# #         except client.exceptions.UserNotFoundException:
# #             return {'statusCode': 404,      'body': json.dumps({'message': 'User not found'})}
# #         except Exception as e:
# #             return {'statusCode': 500,      'body': json.dumps({'message': str(e)})}
# #             return {'statusCode': 500,    'body': json.dumps({'message': 'Signin unsuccessful'})}


import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
DYNAMODB_TABLE = 'users'


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(DYNAMODB_TABLE)


USER_POOL_ID = 'ap-south-1_lx0p5B3q1'
APP_CLIENT_ID = '4k42k7o35oe36fjvsiidbqammm'


def signin(event, context):
    http_method = event['httpMethod']
    headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
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
        password = request_body.get('password')
        response = signIn(email, password)
        print("this is event :  "  , event)
        return {
            'statusCode': response['statusCode'],
            'body': response['body'],
            'headers' :response['headers']
        }


def signIn(email, password):


    client = boto3.client('cognito-idp')

    try:
        response = client.initiate_auth(
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': email,
                'PASSWORD': password
            },
            ClientId=APP_CLIENT_ID
        )

        client.admin_update_user_attributes(
            UserPoolId=USER_POOL_ID,
            Username=email,
            UserAttributes=[
                {'Name': 'email_verified', 'Value': 'true'}
            ]
        )

        print("res", response)
        if response['ChallengeParameters']:
            if response['ChallengeName'] == 'NEW_PASSWORD_REQUIRED':
                response = client.respond_to_auth_challenge(
                    ClientId=APP_CLIENT_ID,
                    ChallengeName='NEW_PASSWORD_REQUIRED',
                    ChallengeResponses={
                        'USERNAME': email,
                        'NEW_PASSWORD': password
                    },
                    Session=response['Session']
                )

        if 'AuthenticationResult' in response:
            access_token = response['AuthenticationResult']['AccessToken']
            id_token = response['AuthenticationResult']['IdToken']
            custom_expiration_time = 43200
            expiration_time = custom_expiration_time
            
            response_body = {
                'message': 'Signin successful',
                'email': email,
                'access_token': access_token,
                'token_id': id_token,
            }
            response_headers = {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Set-Cookie': f'{access_token}; HttpOnly; Max-Age={expiration_time}',
                'token_id': f'{id_token}; HttpOnly; Max-Age={expiration_time}'
            }



        else:
            if 'AuthenticationResult' in response:
                access_token = response['AuthenticationResult']['AccessToken']
                id_token = response['AuthenticationResult']['IdToken']
                custom_expiration_time = 43200
                expiration_time = custom_expiration_time
                
        
        response_body = {
            'message': 'Signin successful',
            'email': email,
            'access_token': access_token,
            'token_id': id_token,
        }
        response_headers = {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true',
                'Set-Cookie': f'{access_token}; HttpOnly; Max-Age={expiration_time}',
                'token_id': f'{id_token}; HttpOnly; Max-Age={expiration_time}'
            }
            
        return {
            'statusCode': 200,
            'body': json.dumps(response_body),
            'headers' : response_headers
        }

    except client.exceptions.NotAuthorizedException:
        return {
            'statusCode': 401,
            'body': json.dumps({'message': 'Invalid credentials'})
        }
    except client.exceptions.UserNotFoundException:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'User not found'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': str(e)})
        }

    return {
        'statusCode': 500,
        'body': json.dumps({'message': 'Signin unsuccessful'})
    }  