//package DAL.CrawlFileReport.GetTotalNum;
//
//import Help.SQLHelper;
//
//import java.sql.ResultSet;
//import java.sql.SQLException;
//import java.util.List;
//
//public abstract class GetTotalNum {
//	protected static SQLHelper sqlHelper = null;
//	
//	
//	public GetTotalNum() {
//		this.sqlHelper = new SQLHelper();
//	}
//	
//	public List<Model.DALData> getTotalNum(long appID)
//	{
//		List<Model.DALData> list = null;
//		ResultSet rs = null;
//		String sql = this.buildSql();
//		
//		
//		try {
//			this.sqlHelper.openConnection();
//			
//	        rs = this.sqlHelper.executeResultSet(sql, this.prepareParams(String.valueOf(appID)));
//	        
//	        list = this.getList(rs, appID);
//	        
//	        this.closeRs(rs);
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//		}
//		finally
//		{
//			this.sqlHelper.closeConnection();
//			
//	        return list;
//		}
//	}
//	private void closeRs(ResultSet rs)
//	{
//		try {
//			if(rs != null)
//			{
//				rs.close();
//			}
//		} 
//		catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
//	
//	protected abstract String[][] prepareParams(String appID);
//	
//	protected abstract List<Model.DALData> getList(ResultSet rs, long appID) throws SQLException;
//	
//	protected abstract String buildSql();
//}