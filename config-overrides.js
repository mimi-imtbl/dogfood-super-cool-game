module.exports = function override(config, env) {
  // Add a fallback for the crypto module
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
  };
  return config;
};
