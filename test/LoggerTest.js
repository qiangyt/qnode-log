/* eslint no-undef: "off" */

const SRC = '../src';
const Logger = require(`${SRC}/Logger`);

describe("Logger test suite: ", function() {

    it("format(): no need to format", function() {
        const msg = new Logger('test').format('xxx');
        expect(msg).toBe('xxx');
    });

    it("format(): happy", function() {
        const me = { name: 'qnode-log', language: 'node.js' };
        const msg = new Logger('test').format('%s: %s', 'me', me);
        expect(msg).toBe(`me: ${JSON.stringify(me, null, 4)}`);
    });

    it("isDebugEnabled()", function() {
        const log = new Logger('test');

        expect(log.isDebugEnabled()).toBeFalsy();

        log.level = 'DEBUG';
        expect(log.isDebugEnabled()).toBeTruthy();

        log.level = 'ERROR';
        expect(log.isDebugEnabled()).toBeFalsy();
    });

    it("just for coverage", function() {
        const log = new Logger('dummy');
        expect(log.level).toBe('INFO');
        log.warn('dummy');
        log.error('dummy');
        log.debug('dummy');
        log.info('dummy');
    });

});
