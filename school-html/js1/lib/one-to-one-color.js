 /*
  * Author:liaohs
  * Date:2016.3.24
  * Name:boomgame
  */

// dataport.headimg
var myClassInfo=JSON.parse(sessionStorage.getItem("myClassInfo"))
var myBaseInfo=JSON.parse(sessionStorage.getItem("myBaseInfo"))
var myAchievement=JSON.parse(sessionStorage.getItem("myAchievement"))

var applyStatues={
	apply:[true,false,false,false],
	wait:[false,true,false,false],
	teached:[false,false,true,false],
	end:[false,false,false,true]
}



mainApp.controller('color',["$scope","$http", 'ajax',function($scope, $http,ajax) {

/* --------------------- 获取基础信息 --------------------  */
	$scope.student=myBaseInfo
      /* --------------------- 获取申请状态 --------------------  */
  	$http.get(dataport.applyStatue+"?studentNum="+myBaseInfo.studentNum)
        .success(function(data){
        	
            if(!data.error){
                var applyStatue=data.data.statue
                $scope.applyStatue=applyStatues[applyStatue]
                console.log(data)
                setTimeout(function(){
                	$(".applyparts").removeClass("hidden")
                },100)

				switch (data.data.statue) {
				    case "apply":

				        break;
				    case "wait":
				        var waitapplyDetail=data.data.data.applyDetail

				        var waitTotal=(waitapplyDetail.teachTime-waitapplyDetail.applyTime)/(24*60*60*1000); //总共等待天数
				        var waitNeed=data.data.data.waitDays; //还需等待天数
				        var waitAlready=waitTotal-waitNeed; //以等待天数
				        var barwidth=(waitAlready*100/waitTotal).toFixed(2)

				        waitapplyDetail.barwidth=Number(barwidth)
				        waitapplyDetail.waitNeed=waitNeed
				        waitapplyDetail.YMD=Timehandle1(waitapplyDetail.teachTime)
				        waitapplyDetail.hm=Timehandle2(waitapplyDetail.teachTime)

				        if(waitapplyDetail.teacherId==null){
				        	waitapplyDetail.teacherShow=false
				        }
				        if(waitapplyDetail.teacherId!=null){
				        	waitapplyDetail.teacherShow=true
				        	waitapplyDetail.teacherName=teachers[waitapplyDetail.teacherId].name;
				        }
				        if(waitapplyDetail.teachModeType==0){
				        	waitapplyDetail.heroShow=true
				        }
				        if(waitapplyDetail.teachModeType==1){
				        	waitapplyDetail.heroShow=false
				        }
                waitapplyDetail.teachMode1=waitapplyDetail.teachMode.replace(/&/gi,' ')
				        console.log(waitapplyDetail)

				        $scope.waitInfo=waitapplyDetail;
						
				        
				        break;
				    case "teached":


				        break;
				    case "end":

				    	$scope.waitDays=data.data.data.waitDays

				        break;
				}

            }
        })
        .error(function(e){
        	console.log(e)
        }); 
  /* --------------------- 获取申请状态 --------------------  */



 /* --------------------- mybaseInfo --------------------  */

// dataport.teachersComments
/* --------------------- allteachers --------------------  */

$scope.teachers=[]
for(var i in teachers){
  teachers[i].headimg=localPath.teacherimg+teachers[i].img
  $scope.teachers.push(teachers[i])
}

  $http.get(dataport.onetooneAllteachers)
  .success(function(data){
  	for(var i=0;i<data.data.length;i++){
  		var a=data.data[i]
  			  a.well=(a.wellPrecent>0)?a.wellPrecent:100;
          var a1=a.teacherId
  			for(var i1 in $scope.teachers){
          var b1=$scope.teachers[i1].teacherId
          if(a1==b1){
            $scope.teachers[i1].well=a.well
          }
        }
  	}

  	$scope.$watch('teachers',function(n,v){

  	  $("#teacher-list").slide({
  	    titCell: "",
  	    mainCell: "#teacher-list-ul",

  	    effect: "leftLoop",
  	    autoPlay: true,
  	    vis: 3,
  	    scroll:1,
  	    delayTime:1000,
  	    interTime:5000,
  	    nextCell:".star-cycle",
  	    mouseOverStop:true,
  	    //returnDefault:true,
  	    easing:"swing",
  	    pnLoop:true
  	  });
    	})

  })
  .error(function(e){
  	console.log(e)
  })
/* --------------------- allteachers --------------------  */


/* --------------------- allteacherscomments --------------------  */




  $http.post(dataport.teachersComments,{page:0,size:10})
  .success(function(data){
      console.log(data)
     $scope.pagesArr={
      now:data.nowPage,
    }
    $scope.pagesArr.prev=(function(){
      return (data.nowPage-1>0)?data.nowPage-1:0
    })()
    $scope.pagesArr.next=(function(){
      return (data.nowPage+1<data.totalPage-1)?data.nowPage+1:data.totalPage-1
    })()

  		CommentFunc(data)

  })
  .error(function(e){
  	console.log(e)
  })


  $scope.pagesShow=false
  $scope.pagesShow1=false
  $scope.pagesShowTottle1=function(){
    $scope.pagesShow1=!$scope.pagesShow1
  }
  $scope.pagesShowTottle=function(){
    $scope.pagesShow=!$scope.pagesShow
  }




  $scope.commentChange=function(a){
    $scope.pagesShow=false
    $scope.pagesShow1=false
	  $http.post(dataport.teachersComments,{page:a,size:10})
	  .success(function(data){
     $scope.pagesArr={
      now:data.nowPage,
    }
    $scope.pagesArr.prev=(function(){
      return (data.nowPage-1>0)?data.nowPage-1:0
    })()
    $scope.pagesArr.next=(function(){
      return (data.nowPage+1<data.totalPage-1)?data.nowPage+1:data.totalPage-1
    })()

	  		CommentFunc(data)

	  })
	  .error(function(e){
	  	console.log(e)
	  })
  }


/* --------------------- allteacherscomments --------------------  */



// dataport.serviceIsOpen
/* --------------------- serviceIsOpen --------------------  */
 $http.get(dataport.serviceIsOpen)
  .success(function(data){
  })
  .error(function(e){
  	console.log(e)
  })

 /* --------------------- serviceIsOpen --------------------  */

// dataport.applyPraise=publicport+"boot/oneToOne/applyPraise" //评论点赞 studentNum,applyId//点赞
 /* --------------------- 点赞 --------------------  */
 $scope.applyPraise=function(a,b,c){

    $http.get(dataport.applyPraise+"?studentNum="+a+"&applyId="+b)
    .success(function(data){
      if(data.data==null){ //已点赞

      }else{  //未点赞
        for(var i in $scope.listsData){
          if($scope.listsData[i].$$hashKey==c){
            $scope.listsData[i].praise+=1
          }
        }
      }
    })
    .error(function(e){
      console.log(e)
    })
 }
  /* --------------------- 点赞 --------------------  */

function CommentFunc(data){
	if(!data.error){
  			data.nowpage=data.nowPage+1
  			
  			data.pageList=(function(){
  				var arr=[]
  				for(var i=0;i<data.totalPage;i++){
  					var b={}
  						b.num=i
  					arr.push(b)
  				}

  				return arr
  			})()

        try{
          data.pageList[data.nowPage].css="active"
        }catch(e){}
  			
  			$scope.teachersComments=data
  			$scope.teachersComments.nowlists=(function(){
  				
  				var a=$scope.teachersComments.nowPage*$scope.teachersComments.size+1
  				var b=($scope.teachersComments.nowPage+1)*$scope.teachersComments.size
  				if(b>$scope.teachersComments.totalElement){
  					b=$scope.teachersComments.totalElement
  				}
  				return a+"-"+b
  			})()

  			for(var i=0;i<data.data.length;i++){
  				 data.data[i].teacherName=teachers[data.data[i].teacherId].name
  				
  			}
  			
  			
  			$scope.listsData=data.data
  			for(var i=0; i<$scope.listsData.length;i++){
  				var header=$scope.listsData[i].header

  				if(header==null){
  					$scope.listsData[i].headimg=localPath.defaultimg+"defaultIco.png"
  				}else{
  					$scope.listsData[i].headimg=dataport.headimg+header
  				}

  				var timeDiffermm=Math.floor(($scope.listsData[i].now-$scope.listsData[i].closeTime)/(1000*60))
  				var timeDifferhh=Math.floor(timeDiffermm/60)
  				var timeDifferdd=Math.floor(timeDifferhh/24)
  				
  				if(timeDifferdd>0){
  					$scope.listsData[i].timeBefore=timeDifferdd+"天前"
  				}else{
  					if(timeDifferhh>0){
  						$scope.listsData[i].timeBefore=timeDifferhh+"小时前"
  					}else{
  						if(timeDiffermm>0){
  							$scope.listsData[i].timeBefore=timeDiffermm+"分钟前"
  						}else{
  							$scope.listsData[i].timeBefore="刚刚"
  						}
  					}
  				}
  			}
  			// console.log($scope.listsData)
  		}
}

}]) 


