module.exports={
	entry:'./jsx/ReactComponent.jsx',
	output:{
		path:'./js',
		filename:'app.js'
	},
	module:{
		loaders:[{
			test:/\.jsx$/,
			loader:'jsx-loader'	
		}]
	}
	
}
