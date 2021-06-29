const path = require("path");

module.exports = {
	entry: path.resolve(__dirname, "./src/index.js"),
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "bundle.js",
	},
	devServer: {
		contentBase: path.resolve(__dirname, "./dist"),
	},
	module: {
		rules: [
			{
				test: /\.wav$/,
				loader: "file-loader",
				options: {
					name: "[path][name].[ext]",
				},
			},
		],
	},
	target: "web",
};
