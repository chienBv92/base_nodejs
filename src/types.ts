const TYPES = {
  SERVICES: {
    WelcomeService: Symbol.for('WelcomeService'),
  },

  MIDDLEWARES: {
    WelcomeMiddleware: Symbol.for('WelcomeMiddleware'),
  },

  RESPONDERS: {
    WelcomeResponder: Symbol.for('WelcomeResponder'),
  },

  INFRASTRUCTURE: {
    // database
    DBConnection: Symbol.for('DBConnection'),
  },

  Logger: Symbol.for('Logger'),
};

export { TYPES };
