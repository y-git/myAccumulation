package BLL.CrawlFileReport;

import config.Configuration;


public class GetAllAppIDTotalNum {
	private static DALInterface.ICrawlFileReport report = null;
	private int timeInterval = 0;	
	
	public GetAllAppIDTotalNum() {
		this.report = new DAL.CrawlFileReport.CrawlFileReport();
		this.timeInterval = Configuration.timeInterval;
	}
	public GetAllAppIDTotalNum(DALInterface.ICrawlFileReport fakeReport) {
		this.report = fakeReport;
		this.timeInterval = Configuration.timeInterval;
	}
	
	public Model.GetAllAppIDTotalNum.BLLData getTotalNum()
	{
		Model.GetAllAppIDTotalNum.BLLData bllData = new Model.GetAllAppIDTotalNum.BLLData();
		
		bllData.dataList = this.report.getAllAppIDTotalNum();
		
		return bllData;
	}
}
