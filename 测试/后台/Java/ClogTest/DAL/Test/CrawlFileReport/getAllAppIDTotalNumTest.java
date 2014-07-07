package DAL.Test.CrawlFileReport;

import static org.junit.Assert.*;
import DAL.CrawlFileReport.*;

import java.io.Console;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.dbunit.DatabaseTestCase;
import org.dbunit.DatabaseUnitException;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.dataset.DataSetException;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSet;
import org.dbunit.dataset.xml.FlatXmlProducer;
import org.dbunit.ext.mysql.MySqlConnection;
import org.dbunit.operation.DatabaseOperation;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import Help.DBUnitHelper;
import Help.SQLHelper;
import Help.ToolHelper;

/**
// * 没有直接测试CrawlFileReport_20130624，因为该表数据过多（100万条），备份时会导致超出内存错误（DBUnitHelper -> exportTable -> 使用"QueryDataSet"来备份表	QueryDataSet可能是将表数据加载到内存中），
// * 所以测试Test_CrawlFileReport_20130624
 * 
 * @author jackycyang
 *
 */
public class getAllAppIDTotalNumTest
{
	private CrawlFileReport report = null;
	private List<Model.GetAllAppIDTotalNum.DALData> data = null;
	
	private static String testData = "testData/CrawlFileReportTestData.xml";
	
	private static String backupXmlString = "src/testData/backup_Test_CrawlFileReport_20130624.xml";
	private static String backupTableName = "Test_CrawlFileReport_20130624";
	
	@Before
	public void setUp() throws Exception {
		IDataSet dataSet = new FlatXmlDataSet(ToolHelper.getInputStream(getAllAppIDTotalNumTest.class, getAllAppIDTotalNumTest.testData));
		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
		
		this.report = new CrawlFileReport();
		this.data = this.report.getAllAppIDTotalNum();
	}
	@After
	public void tearDown() throws Exception {
		this.report = null;
	}
	
	@BeforeClass
	public static void backup() throws Exception
	{
		DBUnitHelper helper = new DBUnitHelper(getConnection());
		helper.exportTable(getAllAppIDTotalNumTest.backupTableName, getAllAppIDTotalNumTest.backupXmlString);
	}
	
	
	@AfterClass
	public static void restore() throws DatabaseUnitException, SQLException, Exception
	{
		IDataSet dataSet = new FlatXmlDataSet(new FileInputStream(getAllAppIDTotalNumTest.backupXmlString));
		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
	}
	
	
	
	private static IDatabaseConnection getConnection() throws Exception {
	  SQLHelper SqlHelper = new SQLHelper(); 
	  SqlHelper.openConnection();
      
	  return new MySqlConnection(SqlHelper.getConnection(), null);
	}

	@Test
	public void testReturnListSize() throws Exception{
		assertEquals(4, this.data.size());
	}
	@Test
	public void testReturnAppIDList() throws Exception{
		assertEquals("1", this.data.get(0).appID);
		assertEquals("4", this.data.get(1).appID);
		assertEquals("3", this.data.get(2).appID);
		assertEquals("2", this.data.get(3).appID);
	}
	@Test
	public void testReturnCorrectTotalNumList() throws Exception{
		assertEquals(8, this.data.get(0).correctTotalNum);
		assertEquals(6, this.data.get(1).correctTotalNum);
		assertEquals(3, this.data.get(2).correctTotalNum);
		assertEquals(3, this.data.get(3).correctTotalNum);
	}
	@Test
	public void testReturnWrongTotalNumList() throws Exception{
		assertEquals(5, this.data.get(0).wrongTotalNum);
		assertEquals(4, this.data.get(1).wrongTotalNum);
		assertEquals(6, this.data.get(2).wrongTotalNum);
		assertEquals(0, this.data.get(3).wrongTotalNum);
	}
	@Test
	public void testReturnCorrectPercent() throws Exception{
		assertTrue(this.data.get(0).correctPercent == 22.86);
		assertTrue(this.data.get(1).correctPercent == 17.14);
		assertTrue(this.data.get(2).correctPercent == 8.57);
		assertTrue(this.data.get(3).correctPercent == 8.57);
	}
	@Test
	public void testReturnWrongPercent() throws Exception{
		assertTrue(this.data.get(0).wrongPercent == 14.29);
		assertTrue(this.data.get(1).wrongPercent == 11.43);
		assertTrue(this.data.get(2).wrongPercent == 17.14);
		assertTrue(this.data.get(3).wrongPercent == 0);
	}
}






//public class getTotalNumByLogNameTest
//{
//	private CrawlFileReport report = null;
//	private Model.GetByLogName.DALData data = null;
//	
//	private static String testData = "testData/CrawlFileReportTestData.xml";
//	
//	private static String backupXmlString = "src/testData/backup_Test_CrawlFileReport_20130624.xml";
//	private static String backupTableName = "Test_CrawlFileReport_20130624";
//	
//	@Before
//	public void setUp() throws Exception {
//		IDataSet dataSet = new FlatXmlDataSet(ToolHelper.getInputStream(getTotalNumByLogNameTest.class, getTotalNumByLogNameTest.testData));
//		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
//		
//		this.report = new CrawlFileReport();
//		this.data = this.report.getTotalNumByLogName();
//	}
//	@After
//	public void tearDown() throws Exception {
//		this.report = null;
//	}
//	
//	@BeforeClass
//	public static void backup() throws Exception
//	{
//		DBUnitHelper helper = new DBUnitHelper(getConnection());
//		helper.exportTable(getTotalNumByLogNameTest.backupTableName, getTotalNumByLogNameTest.backupXmlString);
//	}
//	
//	
//	@AfterClass
//	public static void restore() throws DatabaseUnitException, SQLException, Exception
//	{
//		IDataSet dataSet = new FlatXmlDataSet(new FileInputStream(getTotalNumByLogNameTest.backupXmlString));
//		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
//	}
//	
//	
//	
//	private static IDatabaseConnection getConnection() throws Exception {
//	  SQLHelper SqlHelper = new SQLHelper(); 
//	  SqlHelper.openConnection();
//      
//	  return new MySqlConnection(SqlHelper.getConnection(), null);
//	}
//
//	
////	@Override
////	protected DatabaseOperation getTearDownOperation() throws Exception
////	{
////	    return DatabaseOperation.NONE;
////	}
//	
//	
//	@Test
//	public void testReturnMessage() throws Exception{
//		assertEquals("1372050300@a@b", data.message);
//	}
//	@Test
//	public void testReturnEachLogNameDataListSize() throws Exception{
//		List<Model.GetByLogName.EachLogNameData> list = data.dataList;
//		
//		assertEquals(2, list.size());
//	}
//	@Test
//	public void testReturnCorrectTotalNumList() throws Exception{
//		List<Model.GetByLogName.EachLogNameData> list = data.dataList;
//		
//		Model.GetByLogName.EachLogNameData eachLogNameDataList_1 = list.get(0);
//		Model.GetByLogName.EachLogNameData eachLogNameDataList_2 = list.get(1);
//		
//		List<Integer> list_totalNum_1 = eachLogNameDataList_1.correctTotalNum;
//		List<Integer> list_totalNum_2 = eachLogNameDataList_2.correctTotalNum;
//		
//		assertEquals(4, list_totalNum_1.size());
//		
//		assertEquals(3, list_totalNum_1.get(0).intValue());
//		assertEquals(7, list_totalNum_1.get(1).intValue());
//		assertEquals(4, list_totalNum_1.get(2).intValue());
//		assertEquals(11, list_totalNum_1.get(3).intValue());
//		
//		assertEquals(4, list_totalNum_2.size());
//		
//		assertEquals(0, list_totalNum_2.get(0).intValue());
//		assertEquals(2, list_totalNum_2.get(1).intValue());
//		assertEquals(1, list_totalNum_2.get(2).intValue());
//		assertEquals(0, list_totalNum_2.get(3).intValue());
//	}
//	@Test
//	public void testReturnWrongTotalNumList() throws Exception{
//		List<Model.GetByLogName.EachLogNameData> list = data.dataList;
//		
//		Model.GetByLogName.EachLogNameData eachLogNameDataList_1 = list.get(0);
//		Model.GetByLogName.EachLogNameData eachLogNameDataList_2 = list.get(1);
//		
//		List<Integer> list_totalNum_1 = eachLogNameDataList_1.wrongTotalNum;
//		List<Integer> list_totalNum_2 = eachLogNameDataList_2.wrongTotalNum;
//		
//		assertEquals(4, list_totalNum_1.size());
//		
//		assertEquals(4, list_totalNum_1.get(0).intValue());
//		assertEquals(6, list_totalNum_1.get(1).intValue());
//		assertEquals(11, list_totalNum_1.get(2).intValue());
//		assertEquals(1, list_totalNum_1.get(3).intValue());
//		
//		assertEquals(4, list_totalNum_2.size());
//		
//		assertEquals(0, list_totalNum_2.get(0).intValue());
//		assertEquals(2, list_totalNum_2.get(1).intValue());
//		assertEquals(1, list_totalNum_2.get(2).intValue());
//		assertEquals(0, list_totalNum_2.get(3).intValue());
//	}
//}

//
//package DAL.Test.CrawlFileReport;
//
//import DAL.CrawlFileReport;
//
//import java.sql.Connection;
//import java.util.List;
//
//import org.apache.catalina.core.ApplicationContext;
//import org.dbunit.DBTestCase;
//import org.dbunit.DatabaseTestCase;
//import org.dbunit.IDatabaseTester;
//import org.dbunit.IOperationListener;
//import org.dbunit.database.IDatabaseConnection;
//import org.dbunit.dataset.CachedDataSet;
//import org.dbunit.dataset.IDataSet;
//import org.dbunit.dataset.xml.FlatXmlDataSet;
//import org.dbunit.dataset.xml.FlatXmlDataSetBuilder;
//import org.dbunit.ext.mysql.MySqlConnection;
//import org.dbunit.operation.DatabaseOperation;
//import org.junit.AfterClass;
//import org.junit.BeforeClass;
//import org.junit.Test;
//
//import Help.DBUnitHelper;
//import Help.SQLHelper;
//import Help.ToolHelper;
//
//public class getTotalNumByLogNameTest
//{
//	private CrawlFileReport report = null;
//	private Model.GetByLogName.DALData data = null;
//	
////	private IDataSet dataBackup = null;
////	private  static final String[] TABLE_NAMES = new String[]{"CrawlFileReport_20130624"};
//	private String backupXmlString = "testData/backup_CrawlFileReport_20130624.xml";
//	private String backupTableName = "CrawlFileReport_20130624";
//	
////	@BeforeClass
////	public void backup() throws Exception
////	{
////		this.dataBackup = new CachedDataSet(getConnection().createDataSet(this.TABLE_NAMES));
////	}
////	@AfterClass
////	public void restore() throws Exception
////	{
////		final IDatabaseTester databaseTester = getDatabaseTester();          
////		assertNotNull( "DatabaseTester is not set", databaseTester );
////		databaseTester.setTearDownOperation( DatabaseOperation.DELETE_ALL);          
////		databaseTester.setDataSet( this.dataBackup ); // 这里不使用getDataSet()，而是使用备份的数据库中数据        
////		databaseTester.setOperationListener(getOperationListener());         
////		databaseTester.onTearDown();
////	}
//	
////	private static Connection connection;
////	private static IDatabaseConnection dbUnitConn;
////	
////	@BeforeClass
////	public void backup() throws Exception
////	{
////
////	}
////	
////	@AfterClass
////	public void restore() throws Exception
////	{
////
////	}
//	
//	
////	protected void setUp() throws Exception {
////		this.report = new CrawlFileReport();
////		this.data = this.report.getTotalNumByLogName();
////		
////		
//////		this.dataBackup = new CachedDataSet(getConnection().createDataSet(this.TABLE_NAMES));
////
////		
////		super.setUp();
////		
////		
////		DBUnitHelper helper = new DBUnitHelper(this.getConnection());
////		helper.exportTable(this.backupTableName, this.backupXmlString);
////
////		IDataSet dataSet = new FlatXmlDataSet(ToolHelper.getInputStream(getClass(), this.backupXmlString));
////		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
////
////	}
////
////	protected void tearDown() throws Exception {
//////		final IDatabaseTester databaseTester = getDatabaseTester();        
////////		databaseTester.setOperationListener(IOperationListener.NO_OP_OPERATION_LISTENER);
//////		
//////		assertNotNull( "DatabaseTester is not set", databaseTester );
////////		databaseTester.setTearDownOperation( DatabaseOperation.DELETE_ALL);          
//////		databaseTester.setDataSet( new FlatXmlDataSet(ToolHelper.getInputStream(getClass(), this.backupXmlString)) ); // 这里不使用getDataSet()，而是使用备份的数据库中数据        
//////		databaseTester.setOperationListener(getOperationListener());         
//////		databaseTester.onTearDown();
////		
////		
////		
//////		IDataSet dataSet = new FlatXmlDataSet(ToolHelper.getInputStream(getClass(), this.backupXmlString));
//////		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
////
////
////		
////		super.tearDown();
////		this.report = null;
////		
////
////	}
////	@Override
////	protected IDatabaseConnection getConnection() throws Exception {
////	  SQLHelper SqlHelper = new SQLHelper(); 
////	  SqlHelper.openConnection();
////      
////		return new MySqlConnection(SqlHelper.getConnection(), null);
////	}
////	@Override
////	protected IDataSet getDataSet() throws Exception {
////		return new FlatXmlDataSet(ToolHelper.getInputStream(getClass(), "testData/CrawlFileReportTestData.xml"));
////	}
////	@Override
////	protected DatabaseOperation getSetUpOperation() throws Exception
////	{
////	    return DatabaseOperation.CLEAN_INSERT;
//////		 return DatabaseOperation.DELETE_ALL;
////	}
////	@Override
////	protected DatabaseOperation getTearDownOperation() throws Exception
////	{
////	    return DatabaseOperation.DELETE_ALL;
////	}
//	
//	
//	@Test
//	public void testReturnMessage() throws Exception{
//		DBUnitHelper helper = new DBUnitHelper(getConnection());
//		helper.exportTable(this.backupTableName, this.backupXmlString);
////		
////		
////		IDataSet dataSet = new FlatXmlDataSet(ToolHelper.getInputStream(getClass(), "testData/CrawlFileReportTestData.xml"));
////		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
//		
//		IDataSet dataSet = new FlatXmlDataSet(ToolHelper.getInputStream(getClass(), this.backupXmlString));
//		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
//	}
//	
//	private IDatabaseConnection getConnection() throws Exception {
//	  SQLHelper SqlHelper = new SQLHelper(); 
//	  SqlHelper.openConnection();
//    
//		return new MySqlConnection(SqlHelper.getConnection(), null);
//	}
//}
