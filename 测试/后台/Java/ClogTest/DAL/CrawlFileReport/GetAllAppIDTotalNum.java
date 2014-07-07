package DAL.CrawlFileReport;

import Help.SQLHelper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



import config.Configuration;

public class GetAllAppIDTotalNum {
	private static SQLHelper sqlHelper = null;
//	private String tableName = "CrawlFileReport_20130624";	//此处配置数据表名
	
	
	
	public GetAllAppIDTotalNum() {
		this.sqlHelper = new SQLHelper();
	}
	
	public List<Model.GetAllAppIDTotalNum.DALData> getTotalNum()
	{
		List<Model.GetAllAppIDTotalNum.DALData> list = null;
		ResultSet rs = null;
		String sql = "call getAllAppIDTotalNum()";
//		String sql = "select appid, sum(correct) as correctTotalNum, sum(wrong) as wrongTotalNum, " +
//				"ROUND(100 * sum(correct) / (select sum(correcTotalNum) + sum(wrongTotalNum) from (select sum(correct) as correcTotalNum,  sum(wrong) as wrongTotalNum from " + this.tableName + " group by appid) as b), 2) as correctPercent, " +
//				"ROUND(100 * sum(wrong) / (select sum(correcTotalNum) + sum(wrongTotalNum) from (select sum(correct) as correcTotalNum,  sum(wrong) as wrongTotalNum from " + this.tableName + " group by appid) as b), 2) as wrongPercent " +
//				"from " + this.tableName + " group by appid order by correctTotalNum desc limit 0, 100;";
		
		try {
			this.sqlHelper.openConnection();
			
	        rs = this.sqlHelper.runProcedure(sql, this.prepareParams());
	        
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
		return new String[0][0];
	}
	private List<Model.GetAllAppIDTotalNum.DALData> getList(ResultSet rs) throws SQLException
	{
		Model.GetAllAppIDTotalNum.DALData data = null;
		List<Model.GetAllAppIDTotalNum.DALData> list = new ArrayList<Model.GetAllAppIDTotalNum.DALData>();
		
		while(rs.next())
        {
        	data = new Model.GetAllAppIDTotalNum.DALData();
        	
        	data.appID = rs.getString("appid");		
        	data.correctTotalNum = rs.getInt("correctTotalNum");
        	data.wrongTotalNum = rs.getInt("wrongTotalNum");
        	data.correctPercent = rs.getDouble("correctPercent");
        	data.wrongPercent = rs.getDouble("wrongPercent");
        	
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