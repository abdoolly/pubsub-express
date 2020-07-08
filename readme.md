# Pub Sub Express

This is a small pubsub system which is made in express and typescript

### Prerequisites

- make sure you have node and npm installed
- make sure you have docker and docker-compose installed

**NOTE: scripts assume you are using a linux/unix environment**

### Installation

to install simply run the below command while standing on the project root

```
npm run install
```
this command do the normal steps of npm install and getting up the mongo db container 
that is required by the system to work properly.

### Running the server

Then to run the server run this command

```
npm run build:run
```

This command first builds the typescript files then normally run the node server 
on production mode.

### Testing the system

There is a script included to ease the test of the system you can run it and see the logs
and check the db to be sure that everything is working as expected.

to run the test request run this command 
```
npm run test:request
```

#### This command do two things

first it makes a request to the server for subscription
request details below
```
method: POST
url   : http://localhost:3000/subscribe/topic1
body  : {
            url: 'http://localhost:3000/event'
        }
```
this will subscribe the url above to the topic1 topic.

then the second thing it makes another request to publish on the subscribed topic above
request details below
```
method: POST
url   : http://localhost:3000/publish/topic1
body  : {
            msg: 'hello'
        }
```

This request will calls the publish url on the server and publishes the event body above
to all the urls subscribed on topic1 including the url we subscribed above.

Now go to the server logs and see the log it should look something like this
```
##############################################
SUBSCRIBING
Sending request to http://localhost:3000/subscribe/topic1
----------------------------------------
with body {
  "url": "http://localhost:3000/event"
}
----------------------------------------
response is: {
  "message": "You have subscribed on topic: 'topic1' with url http://localhost:3000/event"
}
----------------------------------------
##############################################
PUBLISHING
Sending request to http://localhost:3000/publish/topic1
----------------------------------------
with body {"msg":"hello"}
----------------------------------------
response is: {"message":"Published event to subscribers successfully"}
----------------------------------------
```

**NOTE: .env file is included in the project files just for ease of test purposes only.**