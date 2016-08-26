var React=require('react');
var ReactDOM=require('react-dom');
var Component=require('./Component.jsx');
/**注册页面 开始  当点击我的秀模块的时候 卸载掉原先页面中的组件  将新的注册组件载入到页面中**/
var ComponentRegister=React.createClass({
	register:function(){
		console.log("register");
		//得到用户名和密码
		var _name=document.getElementById("username").value;
		var _pass=document.getElementById("password").value;
		//往后端去提交----参考接口文档中定义的数据格式
		//{status:"register",userID:"",password:""}
		var _json={status:"register",userID:_name,password:_pass}
		console.log(_json);
		$.post('http://datainfo.duapp.com/shopdata/userinfo.php',_json,function(data){
			if(data=="1"){
				alert("注册成功!请登录");
				//打开登陆界面
				ReactDOM.unmountComponentAtNode(document.getElementById("list-comp"));
				ReactDOM.render(<ComponentLogin/>,document.getElementById("list-comp"));
				
			}else{
				alert("注册失败");
			}
		});
		
	},
	render:function(){
		var _css=this.CSS;
		return(
			<div className="register">
		       <div className="username" style={_css.margin}>
		          <label>用户名:</label><input id="username" type="text"/>
		       </div>
		       <div className="password" style={_css.pass}>
		          <label>密码:</label><input id="password" type="password"/>
		       </div>
		       <div className="repassword" style={_css.pass}>
		           <label>重复密码:</label><input id="repassword" type="password"/>
		       </div>
		       <div className="userbtn" style={_css.pass}>
		           <img onClick={this.register} style={_css.img} src="img/regs.png"/>
		       </div>
		    </div>
		);
	}
});
ComponentRegister.prototype.CSS={
	margin:{
		marginTop:"0.6rem"
	},
	pass:{
		marginTop:"0.4rem"
	},
	img:{
		display:"block",
		width:"100%",
		height:"100%"
	}
}
var ComponentLogin=React.createClass({
	mixins:[Component],
	//当该组建被渲染到页面中以后 登陆就是在当前组建中执行
	login:function(){//实现登陆方法 登陆成功以后 将用户信息存储在本地
		var _this=this;
		var _userName=document.getElementById("username").value;
		var _passWord=document.getElementById("password").value;
		var _status="login";
		var jsons={};
		jsons.status=_status;
		jsons.userID=_userName;
		jsons.password=_passWord;
		$.post('http://datainfo.duapp.com/shopdata/userinfo.php',jsons,function(data){
			var userInfo=JSON.parse(data);
			//得到用户登录成功的返回信息
			//将用户名存储到本地 
			var userID=userInfo.userID;
			//console.log(userID);
			//调用本地存储的方法 进行用户信息存储
			_this.saveUserAtLocal(userID);
			//存储成功以后 用户在再首页点击购物车的时候 ，
			//就可以通过读取本地存储的用户信息进行校验了
		});
		
	},
	render:function(){
		var _css=this.CSS;
		return(
			<div className="register">
		       <div className="username" style={_css.margin}>
		          <label>用户名:</label><input placeholder="用户登录" id="username" type="text"/>
		       </div>
		       <div className="password" style={_css.pass}>
		          <label>密码:</label><input id="password" type="password"/>
		       </div>
		       <div className="userbtn" style={_css.pass}>
		           <img onClick={this.login} style={_css.img} src="img/regs.png"/>
		       </div>
		    </div>
		);
	}
});
ComponentLogin.prototype.CSS={
	margin:{
		marginTop:"0.6rem"
	},
	pass:{
		marginTop:"0.4rem"
	},
	img:{
		display:"block",
		width:"100%",
		height:"100%"
	}
}

module.exports=ComponentRegister;
/**注册页面 结束**/