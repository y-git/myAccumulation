describe("ShowTotalNumByLogName.js", function(){
		
		describe("showData", function(){
			var showData = null,
				fakeData = null;
			
			beforeEach(function(){
				fakeData = [{"beginTime":10000},{"logName":"a","correctTotalNum":[3,6],"wrongTotalNum":[3,4]},{"logName":"b","correctTotalNum":[2,10],"wrongTotalNum":[4,7]}];
				showData = new ShowTotalNumByLogNameData();
			});
			
	    	describe("测试Highcharts.Chart的参数", function(){
	    		beforeEach(function(){
	    			spyOn(Highcharts, "Chart");
	    		});
	    		
	    	     it("测试参数xAxis", function(){
	    	    	 showData.showData(fakeData);
	    	    	 
	    	    	 expect(Highcharts.Chart.calls[0].args[0].xAxis.categories[0]).toEqual("00:00");
	    	     });
	    	     it("测试参数series", function(){
	    	    	 showData.showData(fakeData);
	    	    	 
	    	    	 expect(Highcharts.Chart.calls[0].args[0].series.length).toEqual(4);
	    	    	 expect(Highcharts.Chart.calls[0].args[0].series[0].name).toEqual("a.correctTotalNum");
	    	    	 expect(Highcharts.Chart.calls[0].args[0].series[0].data).toEqual([0, 3, 6]);
	    	     });
	    	     it("测试参数exporting", function(){
	    	    	 showData.showData(fakeData);
	    	    	 
	    	    	 expect(Highcharts.Chart.calls[0].args[0].exporting.filename).toEqual("showByLogName");
	    	    	 expect(Highcharts.Chart.calls[0].args[0].exporting.url).toEqual("SaveAsImage");
	    	     });
	    	});
		});
		
		describe("exportImg", function(){
			
		});
	});