package DCL.CrawlFileReport;

import java.util.Iterator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class GetAllAppIDTotalNum 
{
	private static BLLInterface.ICrawlFileReport report = null;
	
	public GetAllAppIDTotalNum() {
		this.report = new BLL.CrawlFileReport.CrawlFileReport();
	}
	public GetAllAppIDTotalNum(BLLInterface.ICrawlFileReport fakeReport) {	
		this.report = fakeReport;
	}
	
	public String getTotalNum()
	{
		StringBuilder str = new StringBuilder();
		
		str.append("<table>");
		this.buildHead(str);
		this.buildBody(str);
		str.append("</table>");
		
		return str.toString();
	}
	private void buildHead(StringBuilder str)
	{
		str.append("<thead><tr><th>appID</th><th>正确总数</th><th>错误总数</th><th>正确总数百分比</th><th>错误总数百分比</th></tr></thead>");
	}
	private void buildBody(StringBuilder str)
	{
		Model.GetAllAppIDTotalNum.DALData data = null;
		Iterator<Model.GetAllAppIDTotalNum.DALData> itr = this.report.getAllAppIDTotalNum().dataList.iterator();
		
		str.append("<tbody>");
		
		while(itr.hasNext())
		{
			data = itr.next();
			
			str.append("<tr><td>").append(data.appID).append("</td><td>").append(data.correctTotalNum).append("</td><td>").append(data.wrongTotalNum).append("</td><td>");
			
			str.append(data.correctPercent).append("%</td><td>").append(data.wrongPercent).append("%</td></tr>");
		}
		
		str.append("</tbody>");
	}
}
