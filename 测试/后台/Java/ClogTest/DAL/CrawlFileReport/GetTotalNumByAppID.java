package DAL.CrawlFileReport;

import Help.SQLHelper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



import config.Configuration;

public class GetTotalNumByAppID {
	private static SQLHelper sqlHelper = null;
	private int timeInterval = 0;	//时间间隔
	private String nowDay = "1372003200";	//测试数据，实际使用时要改成：String nowDay = String.valueOf(Help.ToolHelper.getNowDayStartUTC());
	private String tableName = "CrawlFileReport_20130624";	//此处配置数据表名
	
	
	
	public GetTotalNumByAppID() {
		this.sqlHelper = new SQLHelper();
		this.timeInterval = Configuration.timeInterval;
	}
	
	public List<Model.GetByAppID.DALData> getTotalNum(String appID)
	{
		List<Model.GetByAppID.DALData> list = null;
		ResultSet rs = null;
		String sql = "select sum(correct) as correctTotalNum, sum(wrong) as wrongTotalNum, floor((report_time-?)/?) * ? + ? + ? as time_point from " + this.tableName + " where appid = ? group by floor((report_time-?)/?)";
		
		
		try {
			this.sqlHelper.openConnection();
			
	        rs = this.sqlHelper.executeResultSet(sql, this.prepareParams(String.valueOf(appID)));
	        
	        list = this.getList(rs, appID);
	        
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
	private String[][] prepareParams(String appID)
	{
		String timeInterval = String.valueOf(config.Configuration.timeInterval);
		
		String[][] params ={{this.nowDay, "int"}, {timeInterval, "int"}, {timeInterval, "int"}, {this.nowDay, "int"}, {timeInterval, "int"}, { appID, "String"}, {this.nowDay, "int"}, {timeInterval, "int"}};
		
		return params;
	}
	private List<Model.GetByAppID.DALData> getList(ResultSet rs, String appID) throws SQLException
	{
		Model.GetByAppID.DALData data = null;
		List<Model.GetByAppID.DALData> list = new ArrayList<Model.GetByAppID.DALData>();
		
		while(rs.next())
        {
        	data = new Model.GetByAppID.DALData();
        	
        	data.appID = appID;		//此处有重复。但为了保持代码的一致性，也为了给可能的变化留出缓冲余地，减少代码的复杂度，所以此处有点重复也值得！
        	data.correctTotalNum = rs.getInt(1);
        	data.wrongTotalNum = rs.getInt(2);
        	data.reportTime = rs.getInt(3);
        	
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