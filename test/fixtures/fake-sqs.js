'use strict'
const AWS = require('aws-sdk');

class SQS {
	getQueueUrl(opts, cb) {
		if(opts.QueueName !== 'somequeue'){
			cb(undefined, null);
		}
		const accountId = opts.QueueOwnerAWSAccountId || '123456789012';
		cb(undefined, {QueueUrl: `https://sqs.eu-west-1.amazonaws.com/${accountId}/${opts.QueueName}`})
	}
	deleteMessage(opts, cb) {
        if(opts.ReceiptHandle !== `MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljTM8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGYWbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/KSbkJ0=`){
			cb(undefined, null);
		}
        if(opts.QueueUrl !== `https://sqs.eu-west-1.amazonaws.com/123456789012/somequeue`) {
            cb(undefined, null);
        }
        cb(undefined, {data: 'deleted'});
	}
}

const sqs = new SQS()

AWS.SQS = function () {
	return sqs;
};

module.exports = sqs;
