"use strict";
exports.__esModule = true;
exports.Logger = void 0;
var player_1 = require("./player");
var LogOptions = /** @class */ (function () {
    function LogOptions(positioning) {
        if (positioning === void 0) { positioning = false; }
        this.positioning = positioning;
    }
    return LogOptions;
}());
/**
 * Logger that logs lol.
 */
var Logger = /** @class */ (function () {
    /**
     *
     * @param {string} name Logger name
     * @param {string} outputFile log file location
     * @param {object} options additional logging options
     */
    function Logger(name, outputFile, options) {
        if (outputFile === void 0) { outputFile = ""; }
        if (options === void 0) { options = new LogOptions(); }
        this.LOG_FOLDER = 'E:\\MultiMc\\instances\\1.18.2\\.minecraft\\config\\jsMacros\\Macros\\typescript\\logs\\';
        this.SERVER_FOLDER = World.getCurrentServerAddress().split("/")[0] + "\\";
        this.name = name;
        if (!FS.exists(this.LOG_FOLDER + this.SERVER_FOLDER))
            FS.makeDir(this.LOG_FOLDER + this.SERVER_FOLDER);
        this.output_filename = this.LOG_FOLDER + this.SERVER_FOLDER + outputFile;
        this.options = options;
    }
    /**
     * Only logs message if level doesn't exceed the level of the logger.
     * @param {string} arg what to log
     * @param {number} level priority of what to log
     */
    Logger.prototype.log = function (arg, level, display) {
        if (level === void 0) { level = Logger.level.debug; }
        if (display === void 0) { display = false; }
        if (display)
            Chat.log(arg);
        if (this.output_filename) {
            // prefixes 
            var d = new Date();
            var date_prefix = "[".concat(d.toLocaleDateString(), " ").concat(d.toLocaleTimeString(), "]");
            var log_level_prefix = "[".concat(level, "]");
            var logger_name = "[".concat(this.name, "]");
            var prefix = "".concat(date_prefix, " ").concat(logger_name);
            // optionals
            var position = this.options.positioning ? "".concat((0, player_1.playerPos)(), " ") : '';
            var optionals = "".concat(position);
            var message = "".concat(prefix, ": ").concat(optionals, " ").concat(arg, "\n");
            FS.open(this.output_filename).append(message);
        }
    };
    Logger.prototype.Info = function (arg, display) {
        if (display === void 0) { display = false; }
        this.log(arg, Logger.level.info, display);
    };
    Logger.prototype.Warn = function (arg, display) {
        if (display === void 0) { display = false; }
        this.log(arg, Logger.level.warning, display);
    };
    Logger.prototype.Debug = function (arg, display) {
        if (display === void 0) { display = false; }
        this.log(arg, Logger.level.debug, display);
    };
    Logger.prototype.Error = function (arg, display) {
        if (display === void 0) { display = true; }
        this.log(arg, Logger.level.error, display);
    };
    Logger.prototype.Prod = function (arg, display) {
        if (display === void 0) { display = true; }
        this.log(arg, Logger.level.prod, display);
    };
    Logger.prototype.Log = function (arg, level, display) {
        if (display === void 0) { display = false; }
        this.log(arg, level, display);
    };
    /**
     * Format:
     *
     * @returns
     */
    Logger.prototype.toString = function () {
        return "Logger '".concat(this.name, "' ").concat(this.output_filename ? this.output_filename : "");
    };
    Logger.level = {
        none: -1,
        prod: 0,
        info: 1,
        warning: 2,
        debug: 3,
        error: 4
    };
    return Logger;
}());
exports.Logger = Logger;
