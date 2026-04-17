// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);



// Ejemplo: Agregar más extensiones de assets (si es necesario)
config.resolver.assetExts.push('db');

// Ejemplo: Configurar alias (si es necesario)
const ALIASES = {
  '~': './src',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (ALIASES[moduleName]) {
    return context.resolveRequest(context, ALIASES[moduleName], platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
module.exports = config;
