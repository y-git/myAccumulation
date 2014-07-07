package BLL.CrawlFileReport;


import Model.GetByLogName.DALData;
import Model.GetByLogName.EachBLLLogNameData;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;


import static ch.lambdaj.Lambda.*;


import config.Configuration;


public class GetTotalNumByLogName {
	private static DALInterface.ICrawlFileReport report = null;
	private int timeInterval = 0;	
	
	public GetTotalNumByLogName() {
		this.report = new DAL.CrawlFileReport.CrawlFileReport();
		this.timeInterval = Configuration.timeInterval;
	}
	public GetTotalNumByLogName(DALInterface.ICrawlFileReport fakeReport) {
		this.report = fakeReport;
		this.timeInterval = Configuration.timeInterval;
	}
	
	public Model.GetByLogName.BLLData getTotalNum()
	{
		Model.GetByLogName.BLLData bllData = new Model.GetByLogName.BLLData();
		
		try{
			List<Model.GetByLogName.DALData> list = this.report.getTotalNumByLogName();
			bllData.dataList = new ArrayList<EachBLLLogNameData>();
			
			int minTime = this.getMinTime(list);
			
			bllData.beginTime = minTime;
			this.setDataList(bllData, list, minTime);
		} catch(Exception e){
			e.printStackTrace();
		}
		
		return bllData;
	}
	private int getMinTime(List<Model.GetByLogName.DALData> list)
	{
		return min(list, on(Model.GetByLogName.DALData.class).getReportTime());
	}
	private void setDataList(Model.GetByLogName.BLLData bllData, List<Model.GetByLogName.DALData> list, int minTime)
	{
		int maxTime = max(list, on(Model.GetByLogName.DALData.class).getReportTime());
		int pointNum = (int) Math.ceil((maxTime - minTime) / timeInterval) ;
		
		Model.GetByLogName.EachBLLLogNameData eachData = null;
		Model.GetByLogName.DALData dalData = null;
		
		String logName = "";
		Iterator<DALData> i = list.iterator();
		
		 while(i.hasNext())
		 {
			 dalData = i.next();
			 
			 if(this.isAnotherLogName(logName, dalData))
			 {
				 logName = dalData.logName;
				 
				 eachData = this.initEachData(logName, pointNum);
				 
				 bllData.dataList.add(eachData);
			 }
			 
			 this.insertTotalNum(dalData, eachData, minTime);
		 }
	}
	private boolean isAnotherLogName(String logName, Model.GetByLogName.DALData dalData)
	{
		return !logName.equals(dalData.logName);	//判断String的值要用equals！“==”是判断String是否指向同一地址！
	}
	private Model.GetByLogName.EachBLLLogNameData initEachData(String logName, int pointNum)
	{
		 int j = 0;
		 
		 Model.GetByLogName.EachBLLLogNameData eachData = new Model.GetByLogName.EachBLLLogNameData();
		 eachData.logName = logName;
		 
		 eachData.correctTotalNum = new ArrayList<Integer>();
		 eachData.wrongTotalNum = new ArrayList<Integer>();
		 for(j = 0; j <= pointNum; j++)
		 {
			 eachData.correctTotalNum.add(0);
			 eachData.wrongTotalNum.add(0);
		 }
		 
		 return eachData;
	}
	private void insertTotalNum(Model.GetByLogName.DALData dalData, Model.GetByLogName.EachBLLLogNameData eachData, int minTime)
	{
		  int index = (int)Math.ceil((dalData.reportTime - minTime) / config.Configuration.timeInterval);
		  
		  eachData.correctTotalNum.set(index, dalData.correctTotalNum);
		  eachData.wrongTotalNum.set(index, dalData.wrongTotalNum);
	}
}
