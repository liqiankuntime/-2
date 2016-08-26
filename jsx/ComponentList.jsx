var React=require('react');
var Component=require('./Component.jsx');
//列表 ---开始
var ComponentList=React.createClass({
	getDefaultProps:function(){
		return{
			//设置数据源
			url:'http://datainfo.duapp.com/shopdata/getGoods.php'
		}
	},
	getInitialState:function(){
		//设置数据保存的state
		return{
			result:[]
		}
	},
	componentWillMount:function(){
		var _this=this;
		$.ajax({
			type:"get",
			url:this.props.url,
			async:false,
			dataType:'jsonp',
			success:function(data){
				_this.setState({result:data});
			}
		});
	},
	render:function(){
		//console.log(this.state.result);
		var list=[];
		this.state.result.map(function(item){
			list.push(<ComponentListItem name={item}/>)
		});
		
		return(
			<div className="shoplist">
			  {list}
			</div>
		);
	}
});
var ComponentListItem=React.createClass({
	mixins:[Component],
	selectShops:function(event){
		var _this=this;
		//1.验证用户是否合法
		if(_this.checkUser()){
			console.log("用户名存在");
			//2.如果合法更新购物车----把用户想要的商品 的id，数量更新到服务器(与后端交互的过程)
			var url="http://datainfo.duapp.com/shopdata/updatecar.php";
			var _json={};
			_json.userID=window.localStorage.getItem("savedUserID"); //?
			_json.goodsID=event.target.getAttribute("title");//?
			_json.number=1;//默认为1
			//console.log(_json);
			//发送ajax请求 和后端进行交互(backend)
			$.post(url,_json,function(data){
				if(data=="1"){
					alert("添加成功");
				}else{
					alert("添加失败");
				}
			});
			
			
			
		}else{
			//3.不合法提示 登陆或者注册
			console.log("请重新登陆");
		}
		
		
	},
	render:function(){
		//console.log(this.props.name);
		return(
			<div className="shopitem">
						<div className="itemimg">
							<img src={this.props.name.goodsListImg}/>
						</div>
						<div className="itemdesc">
							<div className="goodsName">{this.props.name.goodsName}</div>
							<div className="goodsPrice">￥<span>{this.props.name.price}</span></div>
							<div className="goodsDiscount">{this.props.name.discount}</div>
							<div className="goodsBtn">
							  <img onClick={this.selectShops} className="goodsBtnImg" src="img/shopcar.png" title={this.props.name.goodsID}/>
							</div>
						</div>
			</div>
		);
	}
});
module.exports=ComponentList;