webpackConfig = require('./webpack.config.js')
webpack = require('webpack')

webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())

docpadConfig = {
	outPath: 'dist'
	srcPath: 'src/html'
	plugins:
		webpack: webpackConfig
		nodesass:
			outputStyle: 'compressed'
	collections:
		pages: ->
			@getCollection("html").findAllLive({isPage:true}).on "add", (model) ->
				model.setMetaDefaults({layout:"default"})
		posts: ->
			@getCollection("html").findAllLive({relativeOutDirPath: 'posts'}).on "add", (model) ->
				model.setMetaDefaults({layout:"default"})
}

module.exports = docpadConfig