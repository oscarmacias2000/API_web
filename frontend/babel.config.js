module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Si tienes otros plugins, agrégalos aquí
    ],
  };
};