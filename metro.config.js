// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig: getDefaultExpoConfig } = require('expo/metro-config');
const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const expoConfig = getDefaultExpoConfig(__dirname);
const defaultConfig = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = expoConfig.resolver;

const config = {
    transformer: {
        ...expoConfig.transformer,
	babelTransformerPath: require.resolve("react-native-svg-transformer"),
	assetPlugins: ["expo-asset/tools/hashAssetFiles"],
	getTransformOptions: async () => ({
	  transform: {
            experimentalImportSupport: false,
            inlineRequires: false,
      },
    }),
    },
    resolver: {
        ...expoConfig.resolver,
	assetExts: assetExts.filter((ext) => ext !== "svg"),
	sourceExts: [...sourceExts, "json", "svg"],
    }
};

module.exports = mergeConfig(defaultConfig, expoConfig, config);
