import test from 'ava';
import './fixtures/fake-sqs'; // eslint-disable-line import/no-unassigned-import
import m from '../';

test('Testing queueName', async t => {
	await t.throws(m(), 'Expected `queueName` to be of type `string`, got `undefined`');
});

test('Testing message receipt', async t => {
	await t.throws(m('someQueue', 1), 'Expected `receipt` to be of type `string`, got `number`');
});

test('Testing AWS Account ID', async t => {
	await t.throws(m('someQueue', '1344fgh', {awsAccountId: '12345'}), 'Invalid AWS Account Id: 12345');
});

test('Testing unknown queue not found', async t => {
	await t.throws(m('noqueue', '1344fgh', {awsAccountId: '123456789012'}), 'Queue `noqueue` not found');
});

test('Testing unknown message', async t => {
	await t.throws(m('somequeue', '1344fgh', {awsAccountId: '123456789012'}), 'No message found in queue somequeue to delete');
});

test('Testing deleting message', async t => {
	const result = await m('somequeue', 'MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljTM8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGYWbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/KSbkJ0=', {awsAccountId: '123456789012'});
	t.deepEqual(result, {data: 'deleted'});
});

test('Testing deleting message without AWS account id', async t => {
	const result = await m('somequeue', 'MbZj6wDWli+JvwwJaBV+3dcjk2YW2vA3+STFFljTM8tJJg6HRG6PYSasuWXPJB+CwLj1FjgXUv1uSj1gUPAWV66FU/WeR4mq2OKpEGYWbnLmpRCJVAyeMjeU5ZBdtcQ+QEauMZc8ZRv37sIW2iJKq3M9MFx1YvV11A2x/KSbkJ0=');
	t.deepEqual(result, {data: 'deleted'});
});
