package DCL.Test.CrawlFileReport;

import static org.junit.Assert.*;
import DCL.CrawlFileReport.CrawlFileReport;

import java.util.ArrayList;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.easymock.EasyMock;
import org.easymock.EasyMock.*;
import org.hamcrest.core.Is;
import org.hamcrest.core.IsInstanceOf;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import Help.SQLHelper;
import Help.ToolHelper;
import Model.GetByLogName.DALData;
import Model.GetByLogName.EachBLLLogNameData;

public class getTotalNumByLogNameTest
{
	private DCL.CrawlFileReport.GetTotalNumByLogName report = null;
	private BLLInterface.ICrawlFileReport bLLReport = null;
	private JSONArray tree = null;
	
	@Before
	public void setUp() throws Exception {
		this.bLLReport = EasyMock.createMock(BLLInterface.ICrawlFileReport.class);
		this.record();
		
		this.report = new DCL.CrawlFileReport.GetTotalNumByLogName(this.bLLReport);
		
		this.tree = this.report.getTotalNum();
	}
	
	private void record()
	{
		Model.GetByLogName.BLLData fakeData = new Model.GetByLogName.BLLData(){{
			beginTime = 100;
			dataList = new ArrayList<EachBLLLogNameData>(){{
				add(new EachBLLLogNameData(){{
					logName = "a";
					correctTotalNum = new ArrayList<Integer>(){{
						add(1);
						add(2);
					}};
					wrongTotalNum = new ArrayList<Integer>(){{
						add(11);
						add(12);
					}};
				}});
//				
				add(new EachBLLLogNameData(){{
					logName = "b";
					correctTotalNum = new ArrayList<Integer>(){{
						add(2);
						add(0);
					}};
					wrongTotalNum = new ArrayList<Integer>(){{
						add(21);
						add(0);
					}};
				}});
			}};
		}};
		
		EasyMock.expect(this.bLLReport.getTotalNumByLogName()).andReturn(fakeData).once();
		EasyMock.replay(this.bLLReport);
	}
	
	@After
	public void tearDown() throws Exception 
	{
		this.report = null;
	}
	
	//*娴��杩����
	
//	@Test
//	public void testReturnIsJsonArray()
//	{
//		assertTrue(this.report.getTotalNumByLogName() instanceof JSONArray);
//	}
	@Test
	public void testReturnElementIsJSONObject()
	{
		assertTrue(tree.get(0).getClass().getName().contains("JSONObject"));
		
		EasyMock.verify();
	}
	@Test
	public void testReturnSize()
	{
		assertEquals(3, tree.size());
		
		EasyMock.verify();
	}
	@Test
	public void testReturnBeginTime()
	{
		assertEquals(100, tree.getJSONObject(0).get("beginTime"));
//		assertEquals(200, tree.getJSONObject(1).get("beginTime"));
		
		EasyMock.verify();
	}
	@Test
	public void testReturnLogName()
	{
		assertEquals("a", tree.getJSONObject(1).get("logName"));
		assertEquals("b", tree.getJSONObject(2).get("logName"));
		
		EasyMock.verify();
	}
	@Test
	public void testReturnCorrectTotalNum()
	{
		assertEquals(new ArrayList<Integer>(){{
			add(1);
			add(2);
		}}, tree.getJSONObject(1).get("correctTotalNum"));
		assertEquals(new ArrayList<Integer>(){{
			add(2);
			add(0);
		}}, tree.getJSONObject(2).get("correctTotalNum"));
		
		EasyMock.verify();
	}
	@Test
	public void testReturnWrongTotalNum()
	{
		assertEquals(new ArrayList<Integer>(){{
			add(11);
			add(12);
		}}, tree.getJSONObject(1).get("wrongTotalNum"));
		assertEquals(new ArrayList<Integer>(){{
			add(21);
			add(0);
		}}, tree.getJSONObject(2).get("wrongTotalNum"));
		
		EasyMock.verify();
	}
}
