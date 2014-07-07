package Help;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.*;
import java.util.Iterator;
import java.util.List;

import org.dbunit.dataset.common.handlers.Helper;

import config.Configuration;


public class SQLHelper {
	private String driver = null;
	private String jdbcUrl = null;
	private String userName = null;
	private String password = null;
	
	private Connection conn = null;
	private PreparedStatement ps = null;
	private CallableStatement cs = null;
	private ResultSet rs = null;
	
	public SQLHelper() {
//			BufferedReader br=new BufferedReader(Help.ToolHelper.getFileReader("database.ini"));
//			this.driver = br.readLine().trim();
//			this.jdbcUrl = "jdbc:mysql://"+br.readLine().trim()+":"+br.readLine().trim()+"/"+br.readLine().trim();
//			this.userName = br.readLine().trim();
//			this.password = br.readLine().trim();
			this.driver = Configuration.driver;
			this.jdbcUrl = "jdbc:mysql://"+Configuration.ip+":"+Configuration.port+"/"+Configuration.database;
			this.userName = Configuration.userName;
			this.password = Configuration.password;
	}
	public SQLHelper(String driver, String jdbcUrl, String userName, String password)
	{
		this.driver = driver;
		this.jdbcUrl = jdbcUrl;
		this.userName = userName;
		this.password = password;
	}
	public SQLHelper(String jdbcUrl, String userName, String password)
	{
		this.driver = "com.mysql.jdbc.Driver";
		this.jdbcUrl = jdbcUrl;
		this.userName = userName;
		this.password = password;
	}
	
	public void openConnection()
	{
		try {
			Class.forName(this.driver).newInstance();
			this.conn = DriverManager.getConnection(jdbcUrl, userName, password);
		}  
		catch (SQLException e) {
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	public Connection getConnection() {
		return this.conn;
	}
	
	
	
	
	//#查询
	
	public ResultSet executeResultSet(String sqlStr) {
		try {
			this.openConnection();
			this.ps = this.conn.prepareStatement(sqlStr);
			this.rs = this.ps.executeQuery();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return this.rs;
	}
	
	
	//#带参数查询
	
	public ResultSet executeResultSet(String sqlStr, String[][] params) {
		try {
			this.openConnection();
			this.ps = this.conn.prepareStatement(sqlStr);
			this.setParam(params, this.ps);
			this.rs = this.ps.executeQuery();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return this.rs;
	}
	
	private void setParam(String[][] params, PreparedStatement ps) throws Exception
	{
		for(int i = 0, len = params.length; i < len; i++)
		{
			if(params[i][1] == "int")
			{
				ps.setInt(i + 1, Integer.parseInt(params[i][0]));
			}
			else if(params[i][1] == "long")
			{
				ps.setLong(i + 1, Long.parseLong(params[i][0]));
			}
			else if(params[i][1] == "String")
			{
				ps.setString(i + 1, params[i][0]);
			}
			else {
				throw new Exception("未知的类型");
			}
			 
			/* switch 不能判断String！
			switch (params[i][1]) {
			case "int":
				ps.setInt(i + 1, Integer.parseInt(params[i][1]));
				break;

			default:
				break;
			}
			*/
		}
	}
	
	
	//#存储过程
	
	public ResultSet runProcedure(String sqlStr, String[][] params) {
		try {
			this.openConnection();
			
			//创建过程执行器 
	        this.cs = this.conn.prepareCall(sqlStr); 
	        
	        this.setParam(params, this.cs);
	        
			this.rs = this.cs.executeQuery();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return this.rs;
	}
	private void setParam(String[][] params, CallableStatement cs) throws Exception
	{
		for(int i = 0, len = params.length; i < len; i++)
		{
			if(params[i][2] == "in")
			{
				if(params[i][1] == "int")
				{
					cs.setInt(i + 1, Integer.parseInt(params[i][0]));
				}
				else if(params[i][1] == "long")
				{
					cs.setLong(i + 1, Long.parseLong(params[i][0]));
				}
				else if(params[i][1] == "String")
				{
					cs.setString(i + 1, params[i][0]);
				}
				else {
					throw new Exception("未知的类型");
				}
			}
			else if(params[i][2] == "out")
			{
				if(params[i][1] == "int")
				{
					cs.registerOutParameter(i + 1, Types.INTEGER);
				}
				else if(params[i][1] == "long")
				{
					cs.registerOutParameter(i + 1, Types.BIGINT);
				}
				else if(params[i][1] == "String")
				{
					cs.registerOutParameter(i + 1, Types.VARCHAR);
				}
				else {
					throw new Exception("未知的类型");
				}
			}
			else {
				throw new Exception("参数错误！");
			}
		}
	}
	
	
	
	
	
	public void closeConnection() {
		try{
			if (this.conn != null){
				this.conn.close();
			}
		}
		catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public void closeAll(){
		try{
			if (this.rs != null){
				this.rs.close();
			}
			if (this.ps != null){
				this.ps.close();
			}
			if (this.cs != null){
				this.cs.close();
			}
			if (this.conn != null){
				this.conn.close();
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
}