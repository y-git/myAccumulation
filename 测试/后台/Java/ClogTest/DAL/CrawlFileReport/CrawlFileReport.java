package DAL.CrawlFileReport;

import DALInterface.ICrawlFileReport;
import Help.SQLHelper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



import config.Configuration;

public class CrawlFileReport implements ICrawlFileReport {
	private static DAL.CrawlFileReport.GetTotalNumByLogName getTotalNumByLogName = null;
	private static DAL.CrawlFileReport.GetTotalNumByAppID getTotalNumByAppID = null;
	private static DAL.CrawlFileReport.GetAllAppIDTotalNum getAllAppIDTotalNum = null;
	private static DAL.CrawlFileReport.GetAllClientipData getAllClientipData = null;
	
	public CrawlFileReport() {
		this.getTotalNumByLogName = new DAL.CrawlFileReport.GetTotalNumByLogName();
		this.getTotalNumByAppID = new DAL.CrawlFileReport.GetTotalNumByAppID();
		this.getAllAppIDTotalNum = new DAL.CrawlFileReport.GetAllAppIDTotalNum();
		this.getAllClientipData = new DAL.CrawlFileReport.GetAllClientipData();
	}
	
	public List<Model.GetByLogName.DALData> getTotalNumByLogName()
	{
		return this.getTotalNumByLogName.getTotalNum();
	}
	
	
	public List<Model.GetByAppID.DALData> getTotalNumByAppID(String appID)
	{
		return this.getTotalNumByAppID.getTotalNum(appID);
	}
	
	
	public List<Model.GetAllAppIDTotalNum.DALData> getAllAppIDTotalNum()
	{
		return this.getAllAppIDTotalNum.getTotalNum();
	}
	
	public List<Model.GetAllClientipData.DALData> getAllClientipData()
	{
		return this.getAllClientipData.getTotalNum();
	}
}







/* 使用存储过程、多结果集
 * 
 * 
 * public class CrawlFileReport implements ICrawlFileReport {
	private static SQLHelper sqlHelper = null;
	private int timeInterval = 0;	//时间间隔
	
	public CrawlFileReport() {
		this.sqlHelper = new SQLHelper();
		this.timeInterval = Configuration.timeInterval;
	}
	
	public Model.GetByLogName.DALData getTotalNumByLogName()
	{
		Model.GetByLogName.DALData data = new Model.GetByLogName.DALData();
		CallableStatement cstmt = null;
		boolean bl = false;
		String sql = "call getdatabylogname(?, ?)";
		
		try {
			this.sqlHelper.openConnection();
			
			cstmt = this.prepareProcedure(sql);
	        
	        bl = cstmt.execute(); 
	        
	        data.message = this.getMessage(cstmt);
	        data.dataList = this.getDataList(bl, cstmt);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			this.sqlHelper.closeConnection();
			
			return data;
		}
	}
	
	private CallableStatement prepareProcedure(String sql) throws SQLException
	{
		CallableStatement cstmt = null;
		
		//创建过程执行器 
        cstmt = this.sqlHelper.getConnection().prepareCall(sql); 
        //设置入参
        cstmt.setInt(1, this.timeInterval);
        //注册出参 
//        cstmt.registerOutParameter("message", Types.VARCHAR); 
        cstmt.registerOutParameter(2, Types.VARCHAR); 
        
        return cstmt;
	}
	private String getMessage(CallableStatement cstmt) throws SQLException
	{
		return cstmt.getString(2);
	}
	private List<Model.GetByLogName.EachLogNameData> getDataList(boolean bl, CallableStatement cstmt) throws SQLException
	{
		Model.GetByLogName.EachLogNameData eachLogNameData = null;
		
		List<Model.GetByLogName.EachLogNameData> list = new ArrayList<Model.GetByLogName.EachLogNameData>();
		
		while(bl)
        {
	      	eachLogNameData = new Model.GetByLogName.EachLogNameData();
	      	this.setEachLogNameData(cstmt, eachLogNameData);
        	list.add(eachLogNameData);
        	
        	bl= cstmt.getMoreResults();
        }
		
		return list;
	}
	private void setEachLogNameData(CallableStatement cstmt, Model.GetByLogName.EachLogNameData data) throws SQLException
	{
		ResultSet rs = null;
		Model.GetByLogName.TotalNum totalNum = null;
		List<Integer> arr_correctTotalNum = new ArrayList<Integer>();
		List<Integer> arr_wrongTotalNum = new ArrayList<Integer>();
		
		rs = cstmt.getResultSet();
    	while(rs.next())
    	{
    		arr_correctTotalNum.add(rs.getInt(1));
    		arr_wrongTotalNum.add(rs.getInt(2));
    	}
    	this.closeRs(rs);
    	
    	data.correctTotalNum = arr_correctTotalNum;
    	data.wrongTotalNum = arr_wrongTotalNum;
	}
	private void closeRs(ResultSet rs)
	{
		try {
			if(rs != null)
			{
				rs.close();
			}
		} 
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}*/
