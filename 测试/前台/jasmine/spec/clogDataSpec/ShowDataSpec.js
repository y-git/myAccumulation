describe("showData.js", function () {
//	var fakeData = null;
	var showData = null;
	
      function spyOn_post(result) {
            spyOn($, "getJSON").andCallFake(function (url, value, func) {
                func(result);
            });
      };
        
     beforeEach(function(){
    	 fakeData = {
    			 getTotalNumByLogNameData: [{}],
    			 getTotalNumByAppIDData: [{}],
    			 getAllAppIDTotalNum: [{}],
    			 getAllClientipData: [{}]
    	 };
    	 
    	 showData = new ShowData();
     });
     
     describe("Init", function(){
    	 
    	 it("创建内部类实例", function(){
    		 var show = new ShowData();
	    	 
	    	 expect(show._showTotalNumByLogNameData).toBeInstanceOf(ShowTotalNumByLogNameData);
	    	 expect(show._showTotalNumByAppIDData).toBeInstanceOf(ShowTotalNumByAppIDData);
	    	 expect(show._showAllAppIDTotalNum).toBeInstanceOf(ShowAllAppIDTotalNum);
	    	 expect(show._showAllClientipData).toBeInstanceOf(ShowAllClientipData);
    	 });
     });
     
     describe("showData", function(){
    	 it("调用ajax的getJSON方法，测试参数", function(){
 			spyOn($, "getJSON");
 			
 			showData.showData();
 			
 			expect($.getJSON).toHaveBeenCalled();
 			expect($.getJSON.calls[0].args[0]).toEqual("ShowData");
 			expect($.getJSON.calls[0].args[1]).toEqual({appID: jasmine.any(Number)});
 		});
    	 it("在回调函数中调用实例的showData", function(){
    		 spyOn(showData._showTotalNumByLogNameData, "showData");
    		 spyOn(showData._showTotalNumByAppIDData, "showData");
    		 spyOn(showData._showAllAppIDTotalNum, "showData");
    		 spyOn(showData._showAllClientipData, "showData");
    		 spyOn_post(fakeData);
    		 
    		 showData.showData();
    		 
    		 expect(showData._showTotalNumByLogNameData.showData).toHaveBeenCalledWith(fakeData.getTotalNumByLogNameData);
    		 expect(showData._showTotalNumByAppIDData.showData).toHaveBeenCalledWith(fakeData.getTotalNumByAppIDData);
    		 expect(showData._showAllAppIDTotalNum.showData).toHaveBeenCalledWith(fakeData.getAllAppIDTotalNum);
    		 expect(showData._showAllClientipData.showData).toHaveBeenCalledWith(fakeData.getAllClientipData);
    	 });
    	 it("如果出错，会调用处理函数", function(){
    		 spyOn(showData, "_errorHandler");
    		 spyOn($, "getJSON").andCallFake(function(){
    			 throw new Error("");
    		 });
    		 
    		 showData.showData();
    		 
    		 expect(showData._errorHandler).toHaveBeenCalled();
    	 });

    	 describe("导出图片", function(){
    		 beforeEach(function(){
    			 spyOn_post(fakeData); 
    		 });
    		 
    		 it("导出showByLogName图片", function(){
    			 spyOn(showData._showTotalNumByLogNameData, "exportImg");
    			 
    			 showData._exportImg();
    			 
    			 expect(showData._showTotalNumByLogNameData.exportImg).toHaveBeenCalled();
    		 });
    		 it("延迟1s后导出showByAppID图片", function(){
//    			 spyOn(showData._showTotalNumByAppIDData, "exportImg");
//    			 jasmine.Clock.useMock();
//    			 
//    			 showData.showData();
//    			 
//    			 expect(showData._showTotalNumByAppIDData.exportImg).not.toHaveBeenCalled();
//    			 
//    			 jasmine.Clock.tick(999);
//    			 
//    			 expect(showData._showTotalNumByAppIDData.exportImg).not.toHaveBeenCalled();
//    			 
//    			 jasmine.Clock.tick(1);
//    			 
//    			 expect(showData._showTotalNumByAppIDData.exportImg).toHaveBeenCalled();
    		 });
    	 });
     });
});