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

public class getAllClientipData
{
	private DCL.CrawlFileReport.GetAllClientipData report = null;
	private BLLInterface.ICrawlFileReport bLLReport = null;
	private String tableStr = null;
	
	@Before
	public void setUp() throws Exception {
		this.bLLReport = EasyMock.createMock(BLLInterface.ICrawlFileReport.class);
		this.record();
		
		this.report = new DCL.CrawlFileReport.GetAllClientipData(this.bLLReport);
		
		this.tableStr = this.report.getTotalNum();
	}
	
	private void record()
	{
		Model.GetAllClientipData.BLLData fakeData = new Model.GetAllClientipData.BLLData(){{
			dataList = new ArrayList<Model.GetAllClientipData.DALData>(){{
				add(new Model.GetAllClientipData.DALData(){{
					clientip = 1;
					maxCrawlTime = 2;
					minCrawlTime = 1;
					avgCrawlTime = 1.55;
					totalFileSize = 60;
				}});
			}};
		}};
		
		EasyMock.expect(this.bLLReport.getAllClientipData()).andReturn(fakeData).once();
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
		String str = new StringBuffer().append("<table><thead><tr><th>clientip</th><th>最大时间</th><th>最小时间</th><th>平均时间</th><th>文件总大小</th></tr></thead>").append(
	"<tbody><tr><td>1</td><td>2</td><td>1</td><td>1.55</td><td>60</td></tr></tbody></table>").toString();
		
		String a = this.tableStr;
		
		assertEquals(str, this.tableStr);
	}
}
