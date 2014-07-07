package BLL.CrawlFileReport;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static ch.lambdaj.Lambda.*;


import config.Configuration;


public class GetTotalNumByAppID {
	private static DALInterface.ICrawlFileReport report = null;
	private int timeInterval = 0;	
	
	public GetTotalNumByAppID() {
		this.report = new DAL.CrawlFileReport.CrawlFileReport();
		this.timeInterval = Configuration.timeInterval;
	}
	public GetTotalNumByAppID(DALInterface.ICrawlFileReport fakeReport) {
		this.report = fakeReport;
		this.timeInterval = Configuration.timeInterval;
	}
	
	public Model.GetByAppID.BLLData getTotalNum(String appID)
	{
		Model.GetByAppID.BLLData bllData = new Model.GetByAppID.BLLData();
		
		try{
			List<Model.GetByAppID.DALData> list = this.report.getTotalNumByAppID(appID);
	//		bllData.dataList = new ArrayList<EachBLLLogNameData>();
			
			int minTime = this.getMinTime(list);
			
			bllData.beginTime = minTime;
			bllData.appID = appID;
			this.setTotalNum(bllData, list, minTime);
		} catch(Exception e){
			e.printStackTrace();
		}
		
		return bllData;
	}
	private int getMinTime(List<Model.GetByAppID.DALData> list)
	{
		return min(list, on(Model.GetByAppID.DALData.class).getReportTime());
	}
	private void setTotalNum(Model.GetByAppID.BLLData bllData, List<Model.GetByAppID.DALData> list, int minTime)
	{
		int maxTime = max(list, on(Model.GetByAppID.DALData.class).getReportTime());
		int pointNum = (int) Math.ceil((maxTime - minTime) / timeInterval) ;
		
		Model.GetByAppID.DALData dalData = null;
		
		Iterator<Model.GetByAppID.DALData> i = list.iterator();
		
		this.initTotalNum(bllData, pointNum);
		
		
		 while(i.hasNext())
		 {
			 dalData = i.next();
			 
			 this.insertTotalNum(dalData, bllData, minTime);
		 }
	}
	private void initTotalNum(Model.GetByAppID.BLLData bllData, int pointNum)
	{
		 int j = 0;
		 
		 bllData.correctTotalNum = new ArrayList<Integer>();
		 bllData.wrongTotalNum = new ArrayList<Integer>();
		 for(j = 0; j <= pointNum; j++)
		 {
			 bllData.correctTotalNum.add(0);
			 bllData.wrongTotalNum.add(0);
		 }
	}
	private void insertTotalNum(Model.GetByAppID.DALData dalData, Model.GetByAppID.BLLData bllData, int minTime)
	{
		  int index = (int)Math.ceil((dalData.reportTime - minTime) / config.Configuration.timeInterval);
		  
		  bllData.correctTotalNum.set(index, dalData.correctTotalNum);
		  bllData.wrongTotalNum.set(index, dalData.wrongTotalNum);
	}
}
