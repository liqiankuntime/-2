var React=require('react');
var Tool=require('./Tool.jsx');
/**页脚组件---开始**/
var ComponentFooter=React.createClass({
	mixins:[Tool],
	render:function(){
		return(
		  <div>	
				<footer>
				
					  <div title="0" onClick={this.dispacher}>首页</div>
					  <div title="1" onClick={this.dispacher}>分类</div>
					  <div title="2" onClick={this.dispacher}>购物车</div>
					  <div title="3" onClick={this.dispacher}>我的秀</div>
					  <div title="4" onClick={this.dispacher}>更多</div>
				  
				</footer>
				<span className="line"></span>
			</div>
		);
	}
});
module.exports=ComponentFooter;