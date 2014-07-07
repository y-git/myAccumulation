package DCL.CrawlFileReport;

import Model.GetByLogName.EachBLLLogNameData;
//import DALInterface.ICrawlFileReport;
import java.util.List;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class GetTotalNumByLogName 
{
	private static BLLInterface.ICrawlFileReport report = null;
	
	public GetTotalNumByLogName() {
		this.report = new BLL.CrawlFileReport.CrawlFileReport();
	}
	public GetTotalNumByLogName(BLLInterface.ICrawlFileReport fakeReport) {	
		this.report = fakeReport;
	}
	
	public JSONArray getTotalNum()
	{
		JSONArray tree = new JSONArray();
		
		Model.GetByLogName.BLLData data = this.report.getTotalNumByLogName();
		List<Model.GetByLogName.EachBLLLogNameData> list = data.dataList;
		
		this.addFirst(tree, data);
		
		this.addEachLogName(tree, list);
		
		return tree;
	}
	private void addFirst(JSONArray tree, Model.GetByLogName.BLLData data)
	{
		JSONObject json = new JSONObject();
		json.put("beginTime", data.beginTime);
		
		tree.add(json);
	}
	private void addEachLogName(JSONArray tree, List<Model.GetByLogName.EachBLLLogNameData> list)
	{
		JSONObject json = null;
		int size = list.size();
		int i = 0;
		EachBLLLogNameData eachData = null;
		
		for(i=0;    i<size;    i++)    {   
			   json = new JSONObject();
			   eachData = list.get(i);
			   
			   json.put("logName", eachData.logName);
			   json.put("correctTotalNum", eachData.correctTotalNum);
			   json.put("wrongTotalNum", eachData.wrongTotalNum);
			   tree.add(json);
		}
	}
}
