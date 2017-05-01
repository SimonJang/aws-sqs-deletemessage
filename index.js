'use strict';
const AWS = require('aws-sdk');
const pify = require('pify');
const isAwsAccountId = require('is-aws-account-id');
const getSQSUrl = require('aws-sqs-geturl');

const sqs = new AWS.SQS();
const deleteMessage = pify(sqs.deleteMessage.bind(sqs));

module.exports = (queueName, receipt, options) => {
	options = options || {};

	if (typeof queueName !== 'string') {
		return Promise.reject(new TypeError(`Expected \`queueName\` to be of type \`string\`, got \`${typeof queueName}\``));
	}
	if (typeof receipt !== 'string') {
		return Promise.reject(new TypeError(`Expected \`receipt\` to be of type \`string\`, got \`${typeof receipt}\``));
	}
	if (receipt.length > 1024) {
		return Promise.reject(new Error(`Maximum length of \`receipt\` is \`1024\`, got a length of \`${receipt.length}\``));
	}
	if (options.awsAccountId && !isAwsAccountId(options.awsAccountId)) {
		return Promise.reject(new TypeError(`Invalid AWS Account Id: ${options.awsAccountId}`));
	}

	return getSQSUrl(queueName, options)
		.then(url => deleteMessage({
			QueueUrl: url,
			ReceiptHandle: receipt
		}))
		.then(data => {
			if (!data) {
				throw new TypeError(`No message found in queue ${queueName} to delete`);
			}
			return data;
		});
};
