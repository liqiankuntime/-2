var React=require('react');
var ReactDOM=require('react-dom');

//依赖的子组件
var  ComponentHeader=require('./ComponentHeader.jsx');

var  ComponentSearch=require('./ComponentSearch.jsx');

var  ComponentBanner=require('./ComponentBanner.jsx');

var  ComponentList=require('./ComponentList.jsx');

var  ComponentFooter=require('./ComponentFooter.jsx');



//页面的布局 用于存放每个子组件的容器 ---开始
var ComponentLayout=React.createClass({
	render:function(){
		return(
		  <div>	
			<div id="header-comp"></div>
			<div id="search-comp"></div>
			<div id="banner-comp"></div>
			<div id="list-comp"></div>
			<div id="footer-comp"></div>
		 </div>
		);
	}
});
//渲染到页面的body中
ReactDOM.render(<ComponentLayout/>,document.body);

//分次数将组件渲染到页面的容器中，
//目的主要是为了能使用React.unmountComponentAtNode()在制定位置将组件卸载和切换

ReactDOM.render(<ComponentHeader/>,document.getElementById("header-comp"));
ReactDOM.render(<ComponentSearch/>,document.getElementById("search-comp"));
ReactDOM.render(<ComponentBanner/>,document.getElementById("banner-comp"));
ReactDOM.render(<ComponentList/>,document.getElementById("list-comp"));
ReactDOM.render(<ComponentFooter/>,document.getElementById("footer-comp"));


				

setTimeout(function(){
   // var flg=ReactDOM.unmountComponentAtNode(document.getElementById("cxt"));
   // console.log(flg);
},2000);




