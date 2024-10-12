module.exports = {
  apps: [
    {
      name: "project-management",
      script: "bun",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
