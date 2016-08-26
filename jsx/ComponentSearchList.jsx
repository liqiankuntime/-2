var React=require('react');
//列表 ---开始
var ComponentSearchList=React.createClass({
	render:function(){
		console.log("get result is&&&&");
		console.log(this.props.name);
		var list=[];
		this.props.name.map(function(item){
			list.push(<ComponentSearchListItem name={item}/>);
		});
		return(
			<div className="shoplist">
			   {list}
			</div>
		);
	}
});
var ComponentSearchListItem=React.createClass({
	render:function(){
		return(
			<div className="shopitem">
						<div className="itemimg">
							<img src={this.props.name.goodsListImg}/>
						</div>
						<div className="itemdesc">
							<div className="goodsName">{this.props.name.goodsName}</div>
							<div className="goodsPrice">￥<span>{this.props.name.price}</span></div>
							<div className="goodsDiscount">{this.props.name.discount}</div>
						</div>
			</div>
		);
	}
});
module.exports=ComponentSearchList;