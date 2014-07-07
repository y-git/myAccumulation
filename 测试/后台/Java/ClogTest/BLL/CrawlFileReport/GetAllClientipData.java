package BLL.CrawlFileReport;

import config.Configuration;


public class GetAllClientipData {
	private static DALInterface.ICrawlFileReport report = null;
	private int timeInterval = 0;	
	
	public GetAllClientipData() {
		this.report = new DAL.CrawlFileReport.CrawlFileReport();
		this.timeInterval = Configuration.timeInterval;
	}
	public GetAllClientipData(DALInterface.ICrawlFileReport fakeReport) {
		this.report = fakeReport;
		this.timeInterval = Configuration.timeInterval;
	}
	
	public Model.GetAllClientipData.BLLData getTotalNum()
	{
		Model.GetAllClientipData.BLLData bllData = new Model.GetAllClientipData.BLLData();
		
		bllData.dataList = this.report.getAllClientipData();
		
		return bllData;
	}
}
