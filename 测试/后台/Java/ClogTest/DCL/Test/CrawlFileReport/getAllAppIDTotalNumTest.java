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

import com.sun.media.sound.ModelAbstractChannelMixer;

import Help.SQLHelper;
import Help.ToolHelper;
import Model.GetByLogName.DALData;
import Model.GetByLogName.EachBLLLogNameData;

public class getAllAppIDTotalNumTest
{
	private DCL.CrawlFileReport.GetAllAppIDTotalNum report = null;
	private BLLInterface.ICrawlFileReport bLLReport = null;
	private String tableStr = null;
	
	@Before
	public void setUp() throws Exception {
		this.bLLReport = EasyMock.createMock(BLLInterface.ICrawlFileReport.class);
		this.record();
		
		this.report = new DCL.CrawlFileReport.GetAllAppIDTotalNum(this.bLLReport);
		
		this.tableStr = this.report.getTotalNum();
	}
	
	private void record()
	{
		Model.GetAllAppIDTotalNum.BLLData fakeData = new Model.GetAllAppIDTotalNum.BLLData(){{
			dataList = new ArrayList<Model.GetAllAppIDTotalNum.DALData>(){{
				add(new Model.GetAllAppIDTotalNum.DALData(){{
					appID = "1";
					correctTotalNum = 2;
					wrongTotalNum = 3;
					correctPercent = 45.50;
					wrongPercent = 48.55;
				}});
//				add(new Model.GetAllAppIDTotalNum.DALData(){{
//					appID = 2;
//					correctTotalNum = 1;
//					wrongTotalNum = 2;
//					correctPercent = 54.50;
//					wrongPercent = 51.45;
//				}});
			}};
		}};
		
		EasyMock.expect(this.bLLReport.getAllAppIDTotalNum()).andReturn(fakeData).once();
		EasyMock.replay(this.bLLReport);
	}
	
	@After
	public void tearDown() throws Exception 
	{
		this.report = null;
	}
	
	@Test
	public void testReturnStr()
	{
		String str = new StringBuffer().append("<table><thead><tr><th>appID</th><th>正确总数</th><th>错误总数</th><th>正确总数百分比</th><th>错误总数百分比</th></tr></thead>").append(
	"<tbody><tr><td>1</td><td>2</td><td>3</td><td>45.5%</td><td>48.55%</td></tr></tbody></table>").toString();
		
		String a = this.tableStr;
		
		assertEquals(str, this.tableStr);
	}
}
