describe("ShowAllClientipData.js", function(){
		
		describe("showData", function(){
			var showData = null,
			fakeData = null;
		
			function insertDom(){
				$("body").after($("<div id='container_allClientip'></div>"));
			};
			function removeDom(){
				$("#container_allClientip").remove();
			};
			
		beforeEach(function(){
			showData = new ShowAllClientipData();
			
			insertDom();
		});
		afterEach(function(){
			removeDom();
		});
		
		
    	it("直接在指定位置显示table", function(){
    		var fakeData = "<table></table>";
    		
    		showData.showData(fakeData);
    		
    		expect($("#container_allClientip").html()).toEqual(fakeData);
    	});
	});
});
