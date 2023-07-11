module.exports = {
  apps: [
    {
      name: "test",
      script: "./src/index.js",
      instances: 1,
      autorestart: true,
      max_restarts: 50,
      watch: false,
      env: {
        PORT: process.env.PORT,
        MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
      },
    },
  ],
};
