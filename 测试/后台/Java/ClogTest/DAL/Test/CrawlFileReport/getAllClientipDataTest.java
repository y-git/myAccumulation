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

public class getAllClientipDataTest
{
	private CrawlFileReport report = null;
	private List<Model.GetAllClientipData.DALData> data = null;
	
	private static String testData = "testData/CrawlFileReportTestData.xml";
	
	private static String backupXmlString = "src/testData/backup_Test_CrawlFileReport_20130624.xml";
	private static String backupTableName = "Test_CrawlFileReport_20130624";
	
	@Before
	public void setUp() throws Exception {
		IDataSet dataSet = new FlatXmlDataSet(ToolHelper.getInputStream(getAllClientipDataTest.class, getAllClientipDataTest.testData));
		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
		
		this.report = new CrawlFileReport();
		this.data = this.report.getAllClientipData();
	}
	@After
	public void tearDown() throws Exception {
		this.report = null;
	}
	
	@BeforeClass
	public static void backup() throws Exception
	{
		DBUnitHelper helper = new DBUnitHelper(getConnection());
		helper.exportTable(getAllClientipDataTest.backupTableName, getAllClientipDataTest.backupXmlString);
	}
	
	
	@AfterClass
	public static void restore() throws DatabaseUnitException, SQLException, Exception
	{
		IDataSet dataSet = new FlatXmlDataSet(new FileInputStream(getAllClientipDataTest.backupXmlString));
		DatabaseOperation.CLEAN_INSERT.execute(getConnection(), dataSet);
	}
	
	
	private static IDatabaseConnection getConnection() throws Exception {
	  SQLHelper SqlHelper = new SQLHelper(); 
	  SqlHelper.openConnection();
      
	  return new MySqlConnection(SqlHelper.getConnection(), null);
	}

	@Test
	public void testReturnListSize() throws Exception{
		assertEquals(2, this.data.size());
	}
	@Test
	public void testReturnMaxCrawlTime() throws Exception{
		assertEquals(1, this.data.get(0).maxCrawlTime);
		assertEquals(10, this.data.get(1).maxCrawlTime);
	}
	@Test
	public void testReturnMinCrawlTime() throws Exception{
		assertEquals(1, this.data.get(0).minCrawlTime);
		assertEquals(0, this.data.get(1).minCrawlTime);
	}
	@Test
	public void testReturnAvgCrawlTime() throws Exception{
		assertTrue(this.data.get(0).avgCrawlTime == 1);
		assertTrue(this.data.get(1).avgCrawlTime == 3.33);
	}
	@Test
	public void testReturnTotalFileSize() throws Exception{
		assertEquals(10, this.data.get(0).totalFileSize);
		assertEquals(140, this.data.get(1).totalFileSize);
	}
}

