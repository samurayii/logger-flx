import { Logger } from "../src/index";

console.log("testing");

const full_logger = new Logger({
    enable: true,
    timestamp: "full",
    type: true,
    mode: "debug"
});

full_logger.once( "message", (message, type, mode) => {
    console.log(message, type, mode);
});

full_logger.log("log prod");
full_logger.info("info prod");
full_logger.warn("warn prod");
full_logger.error("error prod");

full_logger.log("log dev", "dev");
full_logger.info("info dev", "dev");
full_logger.warn("warn dev", "dev");
full_logger.error("error dev", "dev");

full_logger.log("log debug", "debug");
full_logger.info("info debug", "debug");
full_logger.warn("warn debug", "debug");
full_logger.error("error debug", "debug");

const dev_logger = new Logger({
    enable: true,
    timestamp: "full",
    type: true,
    mode: "dev"
});

dev_logger.once( "message", (message, type, mode) => {
    console.log(message, type, mode);
});

dev_logger.log("log prod");
dev_logger.info("info prod");
dev_logger.error("error prod");
dev_logger.warn("warn prod");

dev_logger.log("log dev", "dev");
dev_logger.info("info dev", "dev");
dev_logger.warn("warn dev", "dev");
dev_logger.error("error dev", "dev");

dev_logger.log("log debug", "debug");
dev_logger.info("info debug", "debug");
dev_logger.warn("warn debug", "debug");
dev_logger.error("error debug", "debug");

const nottype_logger = new Logger({
    enable: true,
    timestamp: "none",
    type: false,
    mode: "prod"
});

nottype_logger.once( "message", (message, type, mode) => {
    console.log(message, type, mode);
});

nottype_logger.log("log prod");
nottype_logger.info("info prod");
nottype_logger.error("error prod");
nottype_logger.warn("warn prod");

nottype_logger.log("log dev", "dev");
nottype_logger.info("info dev", "dev");
nottype_logger.warn("warn dev", "dev");
nottype_logger.error("error dev", "dev");

nottype_logger.log("log debug", "debug");
nottype_logger.info("info debug", "debug");
nottype_logger.warn("warn debug", "debug");
nottype_logger.error("error debug", "debug");