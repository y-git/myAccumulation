package BLL.CrawlFileReport;


import BLLInterface.ICrawlFileReport;
import Model.GetByLogName.DALData;
import Model.GetByLogName.EachBLLLogNameData;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import static ch.lambdaj.Lambda.*;
import static ch.lambdaj.collection.LambdaCollections.*;
import static org.hamcrest.Matchers.*;


import config.Configuration;


public class CrawlFileReport implements ICrawlFileReport {
	private static BLL.CrawlFileReport.GetTotalNumByLogName getTotalNumByLogName = null;
	private static BLL.CrawlFileReport.GetTotalNumByAppID getTotalNumByAppID = null;
	private static BLL.CrawlFileReport.GetAllAppIDTotalNum getAllAppIDTotalNum = null;
	private static BLL.CrawlFileReport.GetAllClientipData getAllClientipData = null;
	
	public CrawlFileReport() {
		this.getTotalNumByLogName = new BLL.CrawlFileReport.GetTotalNumByLogName();
		this.getTotalNumByAppID = new BLL.CrawlFileReport.GetTotalNumByAppID();
		this.getAllAppIDTotalNum = new BLL.CrawlFileReport.GetAllAppIDTotalNum();
		this.getAllClientipData = new BLL.CrawlFileReport.GetAllClientipData();
	}
	
	public Model.GetByLogName.BLLData getTotalNumByLogName()
	{
		return this.getTotalNumByLogName.getTotalNum();
	}
	
	public Model.GetByAppID.BLLData getTotalNumByAppID(String appID)
	{
		return this.getTotalNumByAppID.getTotalNum(appID);
	}
	
	public Model.GetAllAppIDTotalNum.BLLData getAllAppIDTotalNum()
	{
		return this.getAllAppIDTotalNum.getTotalNum();
	}
	
	public Model.GetAllClientipData.BLLData getAllClientipData()
	{
		return this.getAllClientipData.getTotalNum();
	}
}
