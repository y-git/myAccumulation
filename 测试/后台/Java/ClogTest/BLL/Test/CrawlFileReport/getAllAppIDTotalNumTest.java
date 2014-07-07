package BLL.Test.CrawlFileReport;

import static org.junit.Assert.*;
import BLL.CrawlFileReport.CrawlFileReport;
import BLL.CrawlFileReport.GetAllAppIDTotalNum;
import BLL.CrawlFileReport.GetTotalNumByLogName;

import java.io.BufferedReader;
import java.lang.reflect.Array;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.jws.WebParam.Mode;

//import net.sf.json.JSON;
//import net.sf.json.JSONObject;

import org.apache.catalina.filters.AddDefaultCharsetFilter;
import org.easymock.EasyMock;
import org.easymock.EasyMock.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import Help.SQLHelper;
import Help.ToolHelper;
import Model.GetByLogName.DALData;

public class getAllAppIDTotalNumTest
{
	private GetAllAppIDTotalNum report = null;
	private DALInterface.ICrawlFileReport dALReport = null;
	private Model.GetAllAppIDTotalNum.BLLData data = null;
	
	
	@Before
	public void setUp() throws Exception {
		this.dALReport = EasyMock.createMock(DALInterface.ICrawlFileReport.class);
		this.record();
		
		this.report = new GetAllAppIDTotalNum(this.dALReport);	
		
		this.data = this.report.getTotalNum();
	}
	
	private void record()
	{
//		public long appID;
//		public int correctTotalNum;
//		public int wrongTotalNum;
//		public double correctPercent;
//		public double wrongPercent;
		
		List<Model.GetAllAppIDTotalNum.DALData> fakeData = new ArrayList<Model.GetAllAppIDTotalNum.DALData>(){{
			add(new Model.GetAllAppIDTotalNum.DALData(){{
				appID = "1";
				correctTotalNum = 2;
				wrongTotalNum = 3;
				correctPercent = 45.50;
				wrongPercent = 48.55;
			}});
			add(new Model.GetAllAppIDTotalNum.DALData(){{
				appID = "2";
				correctTotalNum = 1;
				wrongTotalNum = 2;
				correctPercent = 54.50;
				wrongPercent = 51.45;
			}});
		}};
		
		EasyMock.expect(this.dALReport.getAllAppIDTotalNum()).andReturn(fakeData).once();
		EasyMock.replay(this.dALReport);
	}
	
	@After
	public void tearDown() throws Exception {
		this.report = null;
	}
	
	@Test
	public void testReturnDataList()
	{
		Model.GetAllAppIDTotalNum.DALData firstEle = this.data.dataList.get(0);
		
		assertEquals("1", firstEle.appID);
		assertEquals(2, firstEle.correctTotalNum);
		assertEquals(3, firstEle.wrongTotalNum);
		assertTrue(firstEle.correctPercent == 45.50);
		assertTrue(firstEle.wrongPercent == 48.55);
		
		Model.GetAllAppIDTotalNum.DALData secondEle = this.data.dataList.get(1);
		
		assertEquals("2", secondEle.appID);
		assertEquals(1, secondEle.correctTotalNum);
		assertEquals(2, secondEle.wrongTotalNum);
		assertTrue(secondEle.correctPercent == 54.50);
		assertTrue(secondEle.wrongPercent == 51.45);
	}
}
