import pino, { type LoggerOptions } from "pino";

const localDevConfig: LoggerOptions["transport"] = {
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:hh:MM:ss.l TT Z",
  },
};

// Prevent pretty pino in builds
const enablePrettyPino = process.env.NODE_ENV === "development";

console.log("enablePrettyPino", enablePrettyPino);

const logger = pino({
  transport: enablePrettyPino ? localDevConfig : undefined,
  browser: {
    asObject: true,
    serialize: true,
    // Hide logs in the browser
    transmit: {
      level: "silent",
      send: () => {},
    },
  },
});

export default logger;
