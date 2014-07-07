describe("ShowTotalNumByAppID.js", function(){
		
		describe("showData", function(){
			var showData = null,
			fakeData = null;
		
		beforeEach(function(){
			fakeData = [{"beginTime":10000, "appID": 1}, {"correctTotalNum":[3,6],"wrongTotalNum":[3,4]}];
			showData = new ShowTotalNumByAppIDData();
		});
			
	    	describe("测试Highcharts.Chart的参数", function(){
	    		beforeEach(function(){
	    			spyOn(Highcharts, "Chart");
	    		});
	    		
	    	     it("测试参数xAxis", function(){
	    	    	 showData.showData(fakeData);
	    	    	 
	//    	    	 expect(Highcharts.Chart.calls[0].args[0].xAxis.categories.length).toEqual(600);
	//    	    	 expect(Highcharts.Chart.calls[0].args[0].xAxis.categories[0]).toEqual("10:46");
	    	    	 expect(Highcharts.Chart.calls[0].args[0].xAxis.categories[0]).toEqual("00:00");
	    	     });
	    	     it("测试参数series", function(){
	    	    	 showData.showData(fakeData);
	    	    	 
	    	    	 expect(Highcharts.Chart.calls[0].args[0].series.length).toEqual(2);
	    	    	 expect(Highcharts.Chart.calls[0].args[0].series[0].name).toEqual("1.correctTotalNum");
	    	    	 expect(Highcharts.Chart.calls[0].args[0].series[0].data).toEqual([0, 3, 6]);
	    	     });
	    	     it("测试参数exporting", function(){
	    	    	 showData.showData(fakeData);
	    	    	 
	    	    	 expect(Highcharts.Chart.calls[0].args[0].exporting.filename).toEqual("showByAppID");
	    	    	 expect(Highcharts.Chart.calls[0].args[0].exporting.url).toEqual("SaveAsImage");
	    	     });
	    	});
		});
		
		describe("exportImg", function(){
			
		});
});
