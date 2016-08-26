var React=require('react');
var ReactDOM=require('react-dom');
var Component=require('./Component.jsx');
var ComponentShopCar=React.createClass({
	mixins:[Component],
	//1.组建被载入到页面中时候，设置基本属性 ajax数据源 和state
	getDefaultProps:function(){
		return{
			source:'http://datainfo.duapp.com/shopdata/getCar.php'
		}
	},
	getInitialState:function(){
		return{
			result:[]
		}
	},
	//2.发起ajax请求 得到数据 
	componentWillMount:function(){
		var _this=this;//this保存起来
		var _userid=localStorage.getItem("savedUserID");
		this.getJson(this.props.source+"?userID="+_userid,function(data){
			_this.setState({result:data});
		});
	},
	//3.解析遍历
	render:function(){
		console.log(this.state.result);//测试现有数据长度
		//1.在父组件中循环遍历子组建
		var list=[];
		this.state.result.map(function(item){
			//2.让子组建叠加（子组建内部只负责解析数据）
	 	    list.push(<ComponentShopCarItem name={item}/>);
	 	});
		return(
			<div>
			    <div className="shopbar"></div>
			    <div className="shoplist">
			      {/** 3.将叠加的结果放在父组建中 ----列表出现**/}
			      {list}
			    </div>
			</div>
		);
	}
});
var total=1;
var ComponentShopCarItem=React.createClass({
	getUserAtLocal:function(){
		var name=window.localStorage.getItem("savedUserID");
		return name;
	},
	addGoods:function(event){
		var httpurl="http://datainfo.duapp.com/shopdata/updatecar.php";//更新数据接口
		var input=event.target.previousSibling;
		var _number=parseInt(input.value);
		total=_number+1;
		console.log('总数量'+total);//获取点击新增以后累加的次数
		var goodsId=this.props.name.goodsID;
		var user=this.getUserAtLocal;
		var _jsons={userID:user,goodsID:goodsId,number:total};
		$.post(httpurl,_jsons,function(data){
			if(data=='1'){
				input.value=total;
			}else{
				alert('更新失败');
			}
		});
		
	},
	removeGoods:function(event){
		var httpurl="http://datainfo.duapp.com/shopdata/updatecar.php";//更新数据接口
		var input=event.target.nextSibling;
		var _number=parseInt(input.value);
		var _total=_number-1;//减少后的数量
		//将得到的最新的total更新到服务器里面
		var goodsId=this.props.name.goodsID;
		var user=this.getUserAtLocal;
		var _jsons={userID:user,goodsID:goodsId,number:_total};
		$.post(httpurl,_jsons,function(data){
			//获取数据库和前端的握手值--将减少后的_total更新到组件的input里面
			if(data=='1'){
				if(_total==0){
					ReactDOM.unmountComponentAtNode(document.getElementById('list-comp'));
					ReactDOM.render(<ComponentShopCar/>,document.getElementById('list-comp'))
				}else{
					input.value=_total;//把服务器中更新后的数据放到页面中
				}
			}else{
				alert('更新购物车失败');
			}
		});
	},
	render:function(){
		var css=this.CSS;
		return(
			 <div className="shopitem">
				<div className="itemimg">
					<img src={this.props.name.goodsListImg}/>
				</div>
				<div className="itemdesc" style={css.item}>
					<div className="goodsName">{this.props.name.goodsName}</div>
					<div className="goodsPrice">￥<span>{this.props.name.price}</span></div>
					<div className="goodsDiscount"></div>
					<div className="goodsOperate">
					    <button onClick={this.removeGoods}>-</button>
					    <input  value={this.props.name.number} type="text" title={this.props.name.goodsID} id="currentNumber"/>
					    <button onClick={this.addGoods}>+</button>
					</div>
				</div>
			 </div>
		);
	}
});
ComponentShopCarItem.prototype.CSS={
	item:{
		position:"relative"
	}
}
module.exports=ComponentShopCar;