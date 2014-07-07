describe("phantomjs -> getTotalNumByAppID.js", function () {
	var getTotalNum = null;
	
    describe("dispose", function(){});
    
     describe("getHighChartsData", function(){
    	 var fakeDate = null,
    	 	backUpDate = null,
    	 	fakeXData = null,
    	 	fakeJsonArr = null,
    	 	fakeAppID = "";
    	 
    	 function buildFakeData(){
    		 fakeXData = ["00:00", "00:10"];
    		 fakeAppID = "1";
        	 fakeDate = {
        			 buildTimeArr: function(){
        				 return testTool.clone(fakeXData);
        			 }
        	 	};
        	 fakeJsonArr = [
                			{"beginTime":1372003800, "appID": fakeAppID},
                			{
                				"correctTotalNum": [1],
                				"wrongTotalNum": [11]
                			}
                	 ];
    	 };
    	 
    	 
    	 
         beforeEach(function(){
        	 buildFakeData();
        	 
        	 backUpDate = testTool.extendDeep(window.date);
        	 window.date = fakeDate;
        	 
        	 //getTotalNum.setArgs(fakeJsonArr, fakeAppID, fakeDate);
        	 
        	 getTotalNum = new GetTotalNumByAppID(fakeJsonArr, fakeAppID);
         });
         afterEach(function(){
        	 getTotalNum.dispose();
        	 
        	 window.date = backUpDate;
         });
    	 
         it("方法存在", function(){
        	 expect(getTotalNum.getHighChartsData).toBeDefined();
         });
    	 
    	 describe("返回highcharts的json数据", function(){
    		 it("测试结构", function(){
    			 var highchartsData = {
						chart: {
							type: ''
						},
						title: {
						    text: ''
						 },
						xAxis: {
							title: {
								text: ''
							},
							labels: {
								style: {
				                     font: ''
				                },
								step: 0
							},
						   categories: []
						},
						yAxis: {
						    title: {
						       text: ''
						    }
						 },
						 series: []
				};
    			 
    			 var result = getTotalNum.getHighChartsData();
    			 
    			 expect(result).toTypeEqual(highchartsData);
    		 });
    		 it("测试x轴数据", function(){
    			 var result = getTotalNum.getHighChartsData();
    			 
    			 expect(result.xAxis.categories).toEqual(fakeXData);
    		 });
    		 it("测试y轴数据（开头补充0）", function(){
    			 var result = getTotalNum.getHighChartsData();
    			 var data = [ { name : '1.correctTotalNum', data : [ 0, 1 ] }, 
    			              { name : '1.wrongTotalNum', data : [ 0, 11 ] }, 
    			            ];
    			 
    			 expect(result.series).toEqual(data);
    		 });
    	 });
     });
     
     
     
});