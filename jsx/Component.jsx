var React=require('react');
var ReactDOM=require('react-dom');
var ComponentSearchList=require('./ComponentSearchList.jsx');
var Component={
	//监听文本框变化值
	listener:function(event){
		var that=this;
		var _text=event.target.value;
		//console.log(_text);
		//1.通过ajax获取查询的值
		var url="http://datainfo.duapp.com/shopdata/selectGoodes.php?selectText="+_text;
		this.getJson(url,function(data){
			//console.log(data);
			//将旧组件卸载
			ReactDOM.unmountComponentAtNode(document.getElementById("list-comp"));
			//新组件载入-------是ComponentSearchList
			ReactDOM.render(<ComponentSearchList name={data}/>,document.getElementById("list-comp"));
		})
		//3.放在新的列表组件中，在将新的模板组件渲染到页面中
	},
	getJson:function(url,callback){
		$.ajax({
			type:"get",
			url:url,
			async:false,
			dataType:"jsonp",
			success:function(data){
				callback(data);
			}
		});
	},
	//存储本地信息----是在Component.jsx中去实现的
	saveUserAtLocal:function(_user){
		var obj=window.localStorage;//创建本地存储的变量
		obj.setItem("savedUserID",_user);
		console.log("test get user is****"+obj.getItem("savedUserID"));
	},
	//检测用户是否合法
	checkUser:function(){
		var _obj=window.localStorage;
		var _name=_obj.getItem("savedUserID");
		if(_name==""||_name==null||typeof(_name)=="undefined"){
			return false;
		}else{
			return true;
		}
	}
}
module.exports=Component;