package BLL.Test.CrawlFileReport;

import static org.junit.Assert.*;
import BLL.CrawlFileReport.CrawlFileReport;
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

public class getTotalNumByLogNameTest
{
	private GetTotalNumByLogName report = null;
	private DALInterface.ICrawlFileReport dALReport = null;
	private Model.GetByLogName.BLLData data = null;
	
	
	@Before
	public void setUp() throws Exception {
		this.dALReport = EasyMock.createMock(DALInterface.ICrawlFileReport.class);
		this.record();
		
		this.report = new GetTotalNumByLogName(this.dALReport);	
		
		this.data = this.report.getTotalNum();
	}
	
	private void record()
	{
		final int timeInterval = config.Configuration.timeInterval;
		final int beginTime = 300;
		
		List<Model.GetByLogName.DALData> fakeData = new ArrayList<DALData>(){{
			//* a
			
			add(new DALData(){{
				logName = "a";
				reportTime = beginTime;
				correctTotalNum = 1;
				wrongTotalNum = 1;
			}});
			add(new DALData(){{
				logName = "a";
				reportTime = (beginTime + timeInterval);
				correctTotalNum = 2;
				wrongTotalNum = 3;
			}});
			add(new DALData(){{
				logName = "a";
				reportTime = (beginTime + timeInterval * 2);
				correctTotalNum = 5;
				wrongTotalNum = 1;
			}});
			add(new DALData(){{
				logName = "a";
				reportTime = (beginTime + timeInterval * 3);
				correctTotalNum = 2;
				wrongTotalNum = 5;
			}});
			add(new DALData(){{
				logName = "a";
				reportTime = (beginTime + timeInterval * 4);
				correctTotalNum = 1;
				wrongTotalNum = 1;
			}});
			add(new DALData(){{
				logName = "a";
				reportTime = (beginTime + timeInterval * 5);
				correctTotalNum = 3;
				wrongTotalNum = 10;
			}});
			add(new DALData(){{
				logName = "a";
				reportTime = (beginTime + timeInterval * 7);
				correctTotalNum = 2;
				wrongTotalNum = 1;
			}});
			
			//* b
			
			add(new DALData(){{
				logName = "b";
				reportTime = (beginTime + timeInterval);
				correctTotalNum = 2;
				wrongTotalNum = 2;
			}});
			add(new DALData(){{
				logName = "b";
				reportTime = (beginTime + timeInterval * 4);
				correctTotalNum = 1;
				wrongTotalNum = 1;
			}});
			add(new DALData(){{
				logName = "b";
				reportTime = (beginTime + timeInterval * 5);
				correctTotalNum = 3;
				wrongTotalNum = 5;
			}});
			
			//* c
			
			add(new DALData(){{
				logName = "c";
				reportTime = (beginTime + timeInterval * 8);
				correctTotalNum = 3;
				wrongTotalNum = 5;
			}});
		}};
		
		EasyMock.expect(this.dALReport.getTotalNumByLogName()).andReturn(fakeData).once();
		EasyMock.replay(this.dALReport);
	}
	
	@After
	public void tearDown() throws Exception {
		this.report = null;
	}
	
	@Test
	public void testReturnSize() throws ParseException
	{
		assertEquals(3, this.data.dataList.size());
		
		EasyMock.verify(this.dALReport);
	}
	@Test
	public void testReturnLogName()
	{
		assertEquals("a", this.data.dataList.get(0).logName);
		assertEquals("b", this.data.dataList.get(1).logName);
		assertEquals("c", this.data.dataList.get(2).logName);
		
		EasyMock.verify(this.dALReport);
	}
	@Test
	public void testReturnBeginTime()
	{
		assertEquals(300, this.data.beginTime);
		
		EasyMock.verify(this.dALReport);
	}
	@Test
	public void testReturnCorrectTotalNumList() throws Exception{
		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_1 = this.data.dataList.get(0);
		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_2 = this.data.dataList.get(1);
		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_3 = this.data.dataList.get(2);
		
		List<Integer> list_totalNum_1 = eachLogNameDataList_1.correctTotalNum;
		List<Integer> list_totalNum_2 = eachLogNameDataList_2.correctTotalNum;
		List<Integer> list_totalNum_3 = eachLogNameDataList_3.correctTotalNum;
		
		assertEquals(9, list_totalNum_1.size());
		
		assertEquals(1, list_totalNum_1.get(0).intValue());
		assertEquals(2, list_totalNum_1.get(1).intValue());
		assertEquals(5, list_totalNum_1.get(2).intValue());
		assertEquals(2, list_totalNum_1.get(3).intValue());
		assertEquals(1, list_totalNum_1.get(4).intValue());
		assertEquals(3, list_totalNum_1.get(5).intValue());
		assertEquals(0, list_totalNum_1.get(6).intValue());
		assertEquals(2, list_totalNum_1.get(7).intValue());
		assertEquals(0, list_totalNum_1.get(8).intValue());
		
		
		assertEquals(9, list_totalNum_2.size());
		
		assertEquals(0, list_totalNum_2.get(0).intValue());
		assertEquals(2, list_totalNum_2.get(1).intValue());
		assertEquals(0, list_totalNum_2.get(2).intValue());
		assertEquals(0, list_totalNum_2.get(3).intValue());
		assertEquals(1, list_totalNum_2.get(4).intValue());
		assertEquals(3, list_totalNum_2.get(5).intValue());
		assertEquals(0, list_totalNum_2.get(6).intValue());
		assertEquals(0, list_totalNum_2.get(7).intValue());
		assertEquals(0, list_totalNum_2.get(8).intValue());
		
		assertEquals(9, list_totalNum_3.size());
		
		assertEquals(0, list_totalNum_3.get(0).intValue());
		assertEquals(0, list_totalNum_3.get(1).intValue());
		assertEquals(0, list_totalNum_3.get(2).intValue());
		assertEquals(0, list_totalNum_3.get(3).intValue());
		assertEquals(0, list_totalNum_3.get(4).intValue());
		assertEquals(0, list_totalNum_3.get(5).intValue());
		assertEquals(0, list_totalNum_3.get(6).intValue());
		assertEquals(0, list_totalNum_3.get(7).intValue());
		assertEquals(3, list_totalNum_3.get(8).intValue());
		
		EasyMock.verify(this.dALReport);
	}
	@Test
	public void testReturnWrongTotalNumList() throws Exception{
		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_1 = this.data.dataList.get(0);
		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_2 = this.data.dataList.get(1);
		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_3 = this.data.dataList.get(2);
		
		List<Integer> list_totalNum_1 = eachLogNameDataList_1.wrongTotalNum;
		List<Integer> list_totalNum_2 = eachLogNameDataList_2.wrongTotalNum;
		List<Integer> list_totalNum_3 = eachLogNameDataList_3.wrongTotalNum;
		
		assertEquals(9, list_totalNum_1.size());
		
		assertEquals(1, list_totalNum_1.get(0).intValue());
		assertEquals(3, list_totalNum_1.get(1).intValue());
		assertEquals(1, list_totalNum_1.get(2).intValue());
		assertEquals(5, list_totalNum_1.get(3).intValue());
		assertEquals(1, list_totalNum_1.get(4).intValue());
		assertEquals(10, list_totalNum_1.get(5).intValue());
		assertEquals(0, list_totalNum_1.get(6).intValue());
		assertEquals(1, list_totalNum_1.get(7).intValue());
		assertEquals(0, list_totalNum_1.get(8).intValue());
		
		
		assertEquals(9, list_totalNum_2.size());
		
		assertEquals(0, list_totalNum_2.get(0).intValue());
		assertEquals(2, list_totalNum_2.get(1).intValue());
		assertEquals(0, list_totalNum_2.get(2).intValue());
		assertEquals(0, list_totalNum_2.get(3).intValue());
		assertEquals(1, list_totalNum_2.get(4).intValue());
		assertEquals(5, list_totalNum_2.get(5).intValue());
		assertEquals(0, list_totalNum_2.get(6).intValue());
		assertEquals(0, list_totalNum_2.get(7).intValue());
		assertEquals(0, list_totalNum_2.get(8).intValue());
		
		assertEquals(9, list_totalNum_3.size());
		
		assertEquals(0, list_totalNum_3.get(0).intValue());
		assertEquals(0, list_totalNum_3.get(1).intValue());
		assertEquals(0, list_totalNum_3.get(2).intValue());
		assertEquals(0, list_totalNum_3.get(3).intValue());
		assertEquals(0, list_totalNum_3.get(4).intValue());
		assertEquals(0, list_totalNum_3.get(5).intValue());
		assertEquals(0, list_totalNum_3.get(6).intValue());
		assertEquals(0, list_totalNum_3.get(7).intValue());
		assertEquals(5, list_totalNum_3.get(8).intValue());
		
		EasyMock.verify(this.dALReport);
	}
//	@Test
//	public void testReturnWrongTotalNumList() throws Exception{
//		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_1 = this.data.dataList.get(0);
//		Model.GetByLogName.EachBLLLogNameData eachLogNameDataList_2 = this.data.dataList.get(1);
//		
//		List<Integer> list_totalNum_1 = eachLogNameDataList_1.wrongTotalNum;
//		List<Integer> list_totalNum_2 = eachLogNameDataList_2.wrongTotalNum;
//		
//		assertEquals(2, list_totalNum_1.size());
//		
//		assertEquals(11, list_totalNum_1.get(0).intValue());
//		assertEquals(12, list_totalNum_1.get(1).intValue());
//		
//		
//		assertEquals(2, list_totalNum_2.size());
//		
//		assertEquals(15, list_totalNum_2.get(0).intValue());
//		assertEquals(16, list_totalNum_2.get(1).intValue());
//		
//		EasyMock.verify(this.dALReport);
//	}
	@Test
	public void testReturnTotalNumListReferToDAL() throws Exception{
	}
//	@Test
//	public void testListIsReferType() throws Exception
//	{
//		List<Integer> list_1 = new ArrayList<Integer>();
//		list_1.add(1);
//		list_1.add(2);
//		
//		List<Integer> list_2 = null;
//		list_2 = list_1;
//		
//		assertEquals(1, (int)list_2.get(0));
//		assertEquals(2, (int)list_2.get(1));
//		
//		list_1.set(0, 10);
//		
//		assertEquals(10, (int)list_2.get(0));	//true
//	}
	
	
	
	
	
//	@Test
//	public void testListIsReferType() throws Exception
//	{
//		Object[] arr = this.returnList();
//		
//		((ArrayList<Integer>)arr[0]).set(0, 10);
//		
//		assertEquals(10, (int)((ArrayList<Integer>)arr[1]).get(0));
//	}
//	
//	private Object[] returnList()
//	{		
//		Object[] arr = new Object[2];
//		
//		List<Integer> list_1 = new ArrayList<Integer>();
//		list_1.add(1);
//		list_1.add(2);
//		
//		List<Integer> list_2 = null;
//		list_2 = list_1;
//		
//		arr[0] = list_1;
//		arr[1] = list_2;
//		
//		return arr;
//	}
}
