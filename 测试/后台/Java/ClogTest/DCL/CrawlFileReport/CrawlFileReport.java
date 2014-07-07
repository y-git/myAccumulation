package DCL.CrawlFileReport;


import DCLInterface.ICrawlFileReport;
import Model.GetByLogName.EachBLLLogNameData;
//import DALInterface.ICrawlFileReport;
import java.util.List;

import org.apache.tomcat.util.modeler.modules.ModelerSource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;



public class CrawlFileReport implements ICrawlFileReport 
{
	private static DCL.CrawlFileReport.GetTotalNumByLogName getTotalNumByLogName = null;
	private static DCL.CrawlFileReport.GetTotalNumByAppID getTotalNumByAppID = null;
	private static DCL.CrawlFileReport.GetAllAppIDTotalNum getAllAppIDTotalNum = null;
	private static DCL.CrawlFileReport.GetAllClientipData getAllClientipData = null;
	
	public CrawlFileReport() {
		this.getTotalNumByLogName = new DCL.CrawlFileReport.GetTotalNumByLogName();
		this.getTotalNumByAppID = new DCL.CrawlFileReport.GetTotalNumByAppID();
		this.getAllAppIDTotalNum = new DCL.CrawlFileReport.GetAllAppIDTotalNum();
		this.getAllClientipData = new DCL.CrawlFileReport.GetAllClientipData();
	}
	
	public JSONArray getTotalNumByLogName()
	{
		return this.getTotalNumByLogName.getTotalNum();
	}
	public JSONArray getTotalNumByAppID(String appID)
	{
		return this.getTotalNumByAppID.getTotalNum(appID);
	}
	public String getAllAppIDTotalNum()
	{
		return this.getAllAppIDTotalNum.getTotalNum();
	}
	
	public String getAllClientipData()
	{
		return this.getAllClientipData.getTotalNum();
	}
}
