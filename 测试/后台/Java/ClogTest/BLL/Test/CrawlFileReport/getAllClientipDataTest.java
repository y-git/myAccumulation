package BLL.Test.CrawlFileReport;

import static org.junit.Assert.*;
import BLL.CrawlFileReport.CrawlFileReport;
import BLL.CrawlFileReport.GetAllAppIDTotalNum;
import BLL.CrawlFileReport.GetAllClientipData;
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

public class getAllClientipDataTest
{
	private GetAllClientipData report = null;
	private DALInterface.ICrawlFileReport dALReport = null;
	private Model.GetAllClientipData.BLLData data = null;
	
	
	@Before
	public void setUp() throws Exception {
		this.dALReport = EasyMock.createMock(DALInterface.ICrawlFileReport.class);
		this.record();
		
		this.report = new GetAllClientipData(this.dALReport);	
		
		this.data = this.report.getTotalNum();
	}
	
	private void record()
	{
//		public long appID;
//		public int correctTotalNum;
//		public int wrongTotalNum;
//		public double correctPercent;
//		public double wrongPercent;
		
		List<Model.GetAllClientipData.DALData> fakeData = new ArrayList<Model.GetAllClientipData.DALData>(){{
			add(new Model.GetAllClientipData.DALData(){{
				clientip = 1;
				maxCrawlTime = 2;
				minCrawlTime = 1;
				avgCrawlTime = 1.55;
				totalFileSize = 60;
			}});
		}};
		
		EasyMock.expect(this.dALReport.getAllClientipData()).andReturn(fakeData).once();
		EasyMock.replay(this.dALReport);
	}
	
	@After
	public void tearDown() throws Exception {
		this.report = null;
	}
	
	@Test
	public void testReturnDataList()
	{
		Model.GetAllClientipData.DALData firstEle = this.data.dataList.get(0);
		
		assertEquals(1, firstEle.clientip);
		assertEquals(2, firstEle.maxCrawlTime);
		assertEquals(1, firstEle.minCrawlTime);
		assertTrue(firstEle.avgCrawlTime == 1.55);
		assertEquals(60, firstEle.totalFileSize);
	}
}
