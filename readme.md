# aws-sqs-deletemessage [![Build Status](https://travis-ci.org/SimonJang/aws-sqs-deletemessage.svg?branch=master)](https://travis-ci.org/SimonJang/aws-sqs-deletemessage)

> Delete messages from AWS SQS


## Install

```
$ npm install --save aws-sqs-deletemessage
```


## Usage

```js
const awsSqsDeletemessage = require('aws-sqs-deletemessage');

awsSqsDeletemessage('somequeue', 'SasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/').then(id => {
	console.log(id);
	//=> 'b5293cb5-d306-4a17-9048-b263635abe4
});

awsSqsDeletemessage('somequeue', 'SasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/', {awsAccountId: '123456789012'}).then(id => {
	console.log(id);
	//=> 'b5293cb5-d306-4a17-9048-b263635abe4
});
```


## API

### awsSqsDeletemessage(queueName, receipt, [options])

Returns a Promise for the request id of the delete action.

#### queueName

Type: `string`

Name of the queue where you want to remove a message

#### receipt

Type: `string`

Receipt handle of the message that you want to delete from the queue.

#### options

##### options.awsAccountId

Type: `string`<br>
Default: caller id

AWS account ID of the account that created the queue.


## License

MIT © [Simon Jang](https://github.com/SimonJang)
