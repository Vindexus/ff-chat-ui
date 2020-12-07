const path = require('path')
module.exports = {
	lintOnSave: false,
	runtimeCompiler: true,
	configureWebpack: {
		resolve: {
			symlinks: false,
			alias: {
				"~": path.resolve(__dirname, 'src/'),
				"@": path.resolve(__dirname, 'src/')

			}
		}
	},
	devServer: {
		disableHostCheck: true
	}
}
