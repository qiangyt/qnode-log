/* eslint no-process-env: 'off' */

const log4js = require('log4js');
const Log4jsDefaultLevels = require('log4js/lib/levels')();
const vsprintf = require("sprintf-js").vsprintf;

module.exports = class Logger {

    constructor(name) {
        this._name = name;
        this._internal = log4js.getLogger(name);
        this.level = Logger.defaultLevelName();
    }

    static defaultLevelName() {
        return process.env.LOG_LEVEL || process.env[global.PROJECT_PREFIX + '_LOG_LEVEL'] || 'INFO';
    }

    debug() {
        this._internal.debug(this._format(arguments));
    }

    error() {
        this._internal.error(this._format(arguments));
    }

    format() {
        return this._format(arguments);
    }

    _format(args) {
        if (args.length <= 1) return args[0];

        const jsonArgs = [];
        for (let arg of Array.from(args).slice(1)) {
            if ('object' === typeof(arg)) {
                const j = arg.loggable ? arg.loggable(arg) : arg;
                jsonArgs.push(JSON.stringify(j, null, 4));
            } else {
                jsonArgs.push(arg);
            }
        }
        return vsprintf(args[0], jsonArgs);
    }

    info() {
        this._internal.info(this._format(arguments));
    }

    isDebugEnabled() {
        return this._internal.isDebugEnabled();
    }

    get level() {
        return this._levelName;
    }

    set level(levelName) {
        this._levelName = levelName;
        this._internal.level = Log4jsDefaultLevels.getLevel(levelName);
    }

    warn() {
        this._internal.warn(this._format(arguments));
    }

}
