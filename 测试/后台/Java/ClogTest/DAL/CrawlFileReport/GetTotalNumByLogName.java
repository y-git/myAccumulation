package DAL.CrawlFileReport;

import Help.SQLHelper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



import config.Configuration;

public class GetTotalNumByLogName {
	private static SQLHelper sqlHelper = null;
	private int timeInterval = 0;	//时间间隔
	private String nowDay = "1372003200";	//测试数据，实际使用时要改成：String nowDay = String.valueOf(Help.ToolHelper.getNowDayStartUTC());
	private String tableName = "CrawlFileReport_20130624";	//此处配置数据表名
	
	
	public GetTotalNumByLogName() {
		this.sqlHelper = new SQLHelper();
		this.timeInterval = Configuration.timeInterval;
	}
	
	public List<Model.GetByLogName.DALData> getTotalNum()
	{
		List<Model.GetByLogName.DALData> list = null;
		ResultSet rs = null;
//		String sql = "select logname, sum(correct), sum(wrong), from_unixtime(floor((report_time-1372003200)/300) * 300 + 1372003200) as time_point from CrawlFileReport_20130624 group by logname, floor((report_time-1372003200)/300)";
		String sql = "select logname, sum(correct) as correctTotalNum, sum(wrong) as wrongTotalNum, floor((report_time-?)/?) * ? + ? + ? as time_point from " + this.tableName + " group by logname, floor((report_time-?)/?)";
		
		
		try {
			this.sqlHelper.openConnection();
			
	        rs = this.sqlHelper.executeResultSet(sql, this.prepareParams());
	        
	        list = this.getList(rs);
	        
			this.closeRs(rs);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			this.sqlHelper.closeAll();
			
	        return list;
		}
	}
	private String[][] prepareParams()
	{
		String timeInterval = String.valueOf(config.Configuration.timeInterval);
		
		String[][] params ={{this.nowDay, "int"}, {timeInterval, "int"}, {timeInterval, "int"}, {this.nowDay, "int"},{timeInterval, "int"}, {this.nowDay, "int"}, {timeInterval, "int"}};
		
		return params;
	}
	private List<Model.GetByLogName.DALData> getList(ResultSet rs) throws SQLException
	{
		Model.GetByLogName.DALData data = null;
		List<Model.GetByLogName.DALData> list = new ArrayList<Model.GetByLogName.DALData>();
		
		while(rs.next())
        {
        	data = new Model.GetByLogName.DALData();
        	
        	data.logName = rs.getString(1);
        	data.correctTotalNum = rs.getInt(2);
        	data.wrongTotalNum = rs.getInt(3);
        	data.reportTime = rs.getInt(4);
        	
        	list.add(data);
        }
		
		return list;
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
}



/*
package DAL.CrawlFileReport.GetTotalNum;

import Help.SQLHelper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



import config.Configuration;

public class GetTotalNumByLogName extends GetTotalNum {
	private int timeInterval = 0;	//时间间隔
	private String nowDay = "1372003200";	//测试数据，实际使用时要改成：String nowDay = String.valueOf(Help.ToolHelper.getNowDayStartUTC());
	private String tableName = "Test_CrawlFileReport_20130624";	//此处配置数据表名
	
	
	public GetTotalNumByLogName() {
		this.timeInterval = Configuration.timeInterval;
	}
	
	@Override
	protected String[][] prepareParams(String appID)
	{
		String timeInterval = String.valueOf(config.Configuration.timeInterval);
		
		String[][] params ={{this.nowDay, "int"}, {timeInterval, "int"}, {timeInterval, "int"}, {this.nowDay, "int"},{timeInterval, "int"}, {this.nowDay, "int"}, {timeInterval, "int"}};
		
		return params;
	}
	@Override
	protected List<Model.DALData> getList(ResultSet rs, long appID) throws SQLException
	{
		Model.GetByLogName.DALData data = null;
		List<Model.DALData> list = new ArrayList<Model.DALData>();
		
		while(rs.next())
        {
        	data = new Model.GetByLogName.DALData();
        	
        	data.logName = rs.getString(1);
        	data.correctTotalNum = rs.getInt(2);
        	data.wrongTotalNum = rs.getInt(3);
        	data.reportTime = rs.getInt(4);
        	
        	list.add(data);
        }
		
		return list;
	}
	
	@Override
	protected String buildSql()
	{
		return "select logname, sum(correct) as correctTotalNum, sum(wrong) as wrongTotalNum, floor((report_time-?)/?) * ? + ? + ? as time_point from " + this.tableName + " group by logname, floor((report_time-?)/?)";
	}
}
*/
