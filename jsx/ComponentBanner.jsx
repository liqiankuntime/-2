var React=require('react');
//轮播图 ---开始
var ComponentBanner=React.createClass({
	//设定属性
	getDefaultProps:function(){
		return{//设置一个数据源的属性
			url:'http://datainfo.duapp.com/shopdata/getBanner.php',
		}
	},
	//设定state
	getInitialState:function(){
		return{//result的作用是提供出来让我们去将ajax获取的数据存起来
			result:''
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
				//console.log(data);//得到数据以后
				//将得到的数据放在设定state中
				_this.setState({result:data});
			}
		});
	},
	render:function(){
		var template=[];//存储遍历叠加后的子组件的集合
		//思想-----主要是在负组件中遍历叠加子组建
		for(var i=0;i<this.state.result.length;i++){
			template.push(<ComponentBannerItem name={this.state.result[i]} />);
		}
		
		return(
			<div className="play">
			<div className="swiper-container">
			  <div className="swiper-wrapper">
			     {/**将得到的数据放到自组建中 让自组建进行解析**/}
			       {template}
			  </div>
			</div>
		</div>
		);
    },
    componentDidUpdate:function(){
    	//console.log("did");
    	var swiper=new Swiper('.swiper-container',{autoplay:1000});
    }
});
var ComponentBannerItem=React.createClass({
	render:function(){
		//console.log(this.props.name);
		var img=JSON.parse(this.props.name.goodsBenUrl)[0];
		//console.log(img);
		return(
			<div className="swiper-slide">
			    	<img className="swiper-img" src={img}/>
			</div>
		);
	}
});
module.exports=ComponentBanner;