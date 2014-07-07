describe("ShowAllAppIDTotalNum.js", function(){
		
		describe("showData", function(){
			var showData = null,
			fakeData = null;
		
			function insertDom(){
				$("body").after($("<div id='container_allAppID'></div>"));
			};
			function removeDom(){
				$("#container_allAppID").remove();
			};
			
		beforeEach(function(){
			showData = new ShowAllAppIDTotalNum();
			
			insertDom();
		});
		afterEach(function(){
			removeDom();
		});
		
		
    	it("直接在指定位置显示table", function(){
    		var fakeData = "<table></table>";
    		
    		showData.showData(fakeData);
    		
    		expect($("#container_allAppID").html()).toEqual(fakeData);
    	});
	});
});
