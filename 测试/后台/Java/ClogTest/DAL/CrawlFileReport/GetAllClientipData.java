package DAL.CrawlFileReport;

import Help.SQLHelper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



import config.Configuration;

public class GetAllClientipData {
	private static SQLHelper sqlHelper = null;
	private String tableName = "CrawlFileReport_20130624";	//此处配置数据表名
	
	
	
	public GetAllClientipData() {
		this.sqlHelper = new SQLHelper();
	}
	
	public List<Model.GetAllClientipData.DALData> getTotalNum()
	{
		List<Model.GetAllClientipData.DALData> list = null;
		ResultSet rs = null;
		String sql = "select clientip,  max(crawl_time), min(crawl_time), Round(AVG(crawl_time), 2), sum(filesize) from (select clientip, filesize, crawl_time from " + this.tableName + " group by clientip, filename) as t group by clientip;";
		
		try {
			this.sqlHelper.openConnection();
			
			rs = this.sqlHelper.executeResultSet(sql);
	        
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
	private List<Model.GetAllClientipData.DALData> getList(ResultSet rs) throws SQLException
	{
		Model.GetAllClientipData.DALData data = null;
		List<Model.GetAllClientipData.DALData> list = new ArrayList<Model.GetAllClientipData.DALData>();
		
		while(rs.next())
        {
        	data = new Model.GetAllClientipData.DALData();
        	
        	data.clientip = rs.getLong(1);
        	data.maxCrawlTime = rs.getInt(2);
        	data.minCrawlTime = rs.getInt(3);
        	data.avgCrawlTime = rs.getDouble(4);
        	data.totalFileSize = rs.getLong(5);
        	
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