var React=require('react');
var Component=require('./Component.jsx');
//1.事件的触发点------ComponentSearch  通过什么事件 获取什么样的参数  定义什么样的函数
//可以通过依赖 Tool进来 在Tool中定义监听页面上面文本变化的函数

//2.Tool依赖进来以后 如何放在组件中并起作用      mixins:[Tool],属性

//3.需要在Tool里面声明函数




//搜索框 ---开始
var ComponentSearch=React.createClass({
	mixins:[Component],//将mixins放在页面中以后 就可以在事件里面通过  this.函数名称调用声明api
	render:function(){
		return(
			<section>
				<div className="search-box">
					<img  src="img/search-img.gif"/>
					<input onChange={this.listener}  type="text" placeholder="请输入商品名称" />
				</div>    
			</section>
		);
	}
});
//搜索框 ---结束
module.exports=ComponentSearch;