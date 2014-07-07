package DCL.CrawlFileReport;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class GetTotalNumByAppID 
{
	private static BLLInterface.ICrawlFileReport report = null;
	
	public GetTotalNumByAppID() {
		this.report = new BLL.CrawlFileReport.CrawlFileReport();
	}
	public GetTotalNumByAppID(BLLInterface.ICrawlFileReport fakeReport) {	
		this.report = fakeReport;
	}
	
	public JSONArray getTotalNum(String appID)
	{
		JSONArray tree = new JSONArray();
		
		Model.GetByAppID.BLLData data = this.report.getTotalNumByAppID(appID);
		
		this.addFirst(tree, data);
		this.addTotalNum(tree, data);
		
		return tree;
	}
	private void addFirst(JSONArray tree, Model.GetByAppID.BLLData data)
	{
		JSONObject json = new JSONObject();
		json.put("beginTime", data.beginTime);
		json.put("appID", data.appID);
		
		tree.add(json);
	}
	private void addTotalNum(JSONArray tree, Model.GetByAppID.BLLData data)
	{
		JSONObject json = new JSONObject();
		   
		   json.put("correctTotalNum", data.correctTotalNum);
		   json.put("wrongTotalNum", data.wrongTotalNum);
		   
		   tree.add(json);
	}
}
