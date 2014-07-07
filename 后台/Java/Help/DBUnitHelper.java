package Help;
import java.io.File;
import java.io.FileOutputStream;
import java.sql.*;

import junit.framework.TestCase;

import org.dbunit.*;
import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.database.QueryDataSet;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSet;
import org.dbunit.ext.mysql.MySqlConnection;


public class DBUnitHelper {
	private IDatabaseConnection connection = null;
	
	public DBUnitHelper(Connection conn) throws Exception {
		this.connection = new DatabaseConnection(conn);
	}
	public DBUnitHelper(IDatabaseConnection conn) throws Exception {
		this.connection = conn;
	}
	
	/**
	 * 导出数据表
	 * @param tableName
	 * @param fileUrl 路径相对于工程目录。
	 * @throws Exception
	 */
	public void exportTable(String tableName, String fileUrl) throws Exception {
	  //QueryDataSet和.net中的数据集的概念类似，它是数据库的一个映像
	  QueryDataSet partial=new QueryDataSet(this.connection);
	  partial.addTable(tableName);
	  //partial.addTable("users","select * from users where id= 1 ");
	  
	 
	  //FileOutputStream(path)的path是相对于当前文件夹。如path为“test.xml”，项目名为“JspProject”，则该xml文件路径为“。。。。。。/JspProject/test.xml”
	  //此处将path转换了一下，这样fileUrl就相对于src目录了。
	  FlatXmlDataSet.write(partial, new FileOutputStream(fileUrl));	 //把数据内容导出到xml文件中		
	}
	/**
	 * 导出数据库中所有的数据
	 * @param tableName
	 * @param fileUrl
	 * @throws Exception
	 */
	public void exportDatabase(String tableName, String fileUrl) throws Exception {
		  IDataSet full =this.connection.createDataSet();
		  FlatXmlDataSet.write(full, new FileOutputStream(fileUrl));	 //把数据内容导出到xml文件中	
		  //导出dtd文件
		  //FlatDtdDataSet.write(full, new FileOutputStream("full.dtd"));
	}
}




//package Help;
//import java.io.File;
//import java.io.FileOutputStream;
//import java.sql.*;
//
//import junit.framework.TestCase;
//
//import org.dbunit.*;
//import org.dbunit.database.DatabaseConnection;
//import org.dbunit.database.IDatabaseConnection;
//import org.dbunit.database.QueryDataSet;
//import org.dbunit.dataset.IDataSet;
//import org.dbunit.dataset.xml.FlatXmlDataSet;
//import org.dbunit.ext.mysql.MySqlConnection;

//
//public class DBUnitHelper {
////	private IDatabaseConnection connection = null;
//	private SQLHelper sqlHelper = null;
//	
//	private String driver = null;
//	private String jdbcUrl = null;
//	private String userName = null;
//	private String password = null;
//	
//	public DBUnitHelper(String driver, String jdbcUrl, String userName, String password)
//	{
//		this.driver = driver;
//		this.jdbcUrl = jdbcUrl;
//		this.userName = userName;
//		this.password = password;
//		
//		this.sqlHelper = new SQLHelper(this.driver, this.jdbcUrl, this.userName, this.password);
//	}
//	public DBUnitHelper(String jdbcUrl, String userName, String password)
//	{
//		this.driver = "com.mysql.jdbc.Driver";
//		this.jdbcUrl = jdbcUrl;
//		this.userName = userName;
//		this.password = password;
//		
//		this.sqlHelper = new SQLHelper(this.driver, this.jdbcUrl, this.userName, this.password);
//	}
//	
////	public DBUnitHelper(Connection conn) throws Exception {
////		this.connection = new DatabaseConnection(conn);
////	}
//	
//	/**
//	 * 导出数据表
//	 * @param tableName
//	 * @param fileUrl 路径相对于src。
//	 * @throws Exception
//	 */
//	public void exportTable(String tableName, String fileUrl) throws Exception {
//		//打开连接
//		this.sqlHelper.openConnection();
//		
//	  //QueryDataSet和.net中的数据集的概念类似，它是数据库的一个映像
//	  QueryDataSet partial=new QueryDataSet((IDatabaseConnection)this.sqlHelper.getConnection());
//	  partial.addTable(tableName);
//	  //partial.addTable("users","select * from users where id= 1 ");
//	  
//	 
//	  //FileOutputStream(path)的path是相对于当前文件夹。如path为“test.xml”，项目名为“JspProject”，则该xml文件路径为“。。。。。。/JspProject/test.xml”
//	  //此处将path转换了一下，这样fileUrl就相对于src目录了。
//	  FlatXmlDataSet.write(partial, new FileOutputStream("src/"+fileUrl));	 //把数据内容导出到xml文件中		
//	  
//	  //将数据库中所有的数据导出
//	//  IDataSet full =connection.createDataSet();
//	//  FlatXmlDataSet.write(full, new FileOutputStream("full.xml"));
//	//  //导出Dtd文件
//	//  FlatDtdDataSet.write(full, new FileOutputStream("full.dtd"));
//	  
//		//关闭连接
//	  this.sqlHelper.closeConnection();
//	}
//}
