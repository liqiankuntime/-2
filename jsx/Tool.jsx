var React=require('react');
var ReactDOM=require('react-dom');
//使用reactjs 和模块化实现一个路由

//1.首先将页面中需要的模块/js都给他依赖进来
var ComponentRegister =require('./ComponentRegister.jsx');

var ComponentSearch=require('./ComponentSearch.jsx');
				
var ComponentBanner=require('./ComponentBanner.jsx');
				
var ComponentList=require('./ComponentList.jsx');

var ComponentSearchList=require('./ComponentSearchList.jsx');

var ComponentShopCar=require('./ComponentShopCar.jsx');


//2.依赖进来的模块都变成了变量然后通过一套js控制变量在页面中的加载和卸载 
//就实现了页面的切换

/**公共的功能模块**/
var Tool={
	dispacher:function(event){
		console.log("this is mixins api");
		var _title=event.target.getAttribute("title");
		var _style=document.getElementsByClassName("line")[0].style;
		console.log(_title);
		//具体的值 if-else
		switch(_title){
			case "0":
			  _style.left="0%";
			  //将页面组件清除掉
			  var id=["search-comp","banner-comp","list-comp"];
              this.unmountComponentById(id);
              //将其他子组件渲染到页面
              var _comp=[{ComponentSearch:"search-comp"},
			              {ComponentBanner:"banner-comp"},
			              {ComponentList:"list-comp"}];
              this.mountComponentById(_comp);
              
			 break;
			
			case "1":
			  _style.left="20%";
			break;
			case "2":
			  _style.left="40%";
			  //购物车----1.卸载banner里面的内容，search里面的内容,list里面内容
			  var id=["search-comp","banner-comp","list-comp"];
              this.unmountComponentById(id);
                var _comp=[{ComponentShopCar:"list-comp"}];
              this.mountComponentById(_comp);
			break;
			
			case "3":
			  _style.left="60%";
			  //要将已经有的部分卸载掉
			  ReactDOM.unmountComponentAtNode(document.getElementById("search-comp"));
			  ReactDOM.unmountComponentAtNode(document.getElementById("banner-comp"));
			  ReactDOM.unmountComponentAtNode(document.getElementById("list-comp"));
			  //卸载组件---将已经存在的组件渲染到页面中覆盖之前的组件
			  ReactDOM.render(<ComponentRegister/>,document.getElementById("list-comp"));
			 
			break;
			
			case "4":
			  _style.left="80%";
			break;
		}
	},
	//根据用户传入的id删除组件
	unmountComponentById:function(_id){
		console.log(_id);
		//判断id类型 如果传入的是字符串的时候，说明用户希望删除某一个组件
		if(typeof(_id)=="string"){
			//将组件卸载掉
			ReactDOM.unmountComponentAtNode(document.getElementById(_id));
		}else if(typeof(_id)=="object"){//用户希望删除多个
			for(var i=0;i<_id.length;i++){
				ReactDOM.unmountComponentAtNode(document.getElementById(_id[i]));
				console.log("delete"+_id[i]+"下面的组件");
			}
		}else{
			console.log("*****please enter true parameters******");
		}
		
	},
	//根据用户传入的组件 载入组件 mountComponentById([{"ComponentSearch":"search-comp"},{"ComponentBanner":"banner-comp"}]);
	mountComponentById:function(_comp){//规定方法只能传入object
		if(typeof(_comp)=="object"){
			console.log(_comp.length);
			if(typeof(_comp)=="undefined"){
				console.log("please enter array");
			}else{
				//解析过程
				console.log("***begin render");
				//解析传入的json key作为渲染的组件名称  value作为渲染的位置
				for(var i=0;i<_comp.length;i++){
					for(var key in _comp[i]){
						console.log(key);
						//jsx <input/>   <div></div>
						//React.createElement('div',{style,class,title},React.createElement('span',null,null))
						//原生js去写jsx dom结构 React.createElement(元素名称)
						//eval()理解  eval将目前一个字符串指向和当前这个字符串同名的函数或者变量上面
						ReactDOM.render(React.createElement(eval(key)),
						   document.getElementById(_comp[i][key]));
						 }
				}
					
				
			}
		}else{
			console.log("*****please enter true parameters******");
		}
	}
	
}
module.exports=Tool;
