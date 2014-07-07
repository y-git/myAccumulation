package DCL.CrawlFileReport;

import java.util.Iterator;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class GetAllClientipData 
{
	private static BLLInterface.ICrawlFileReport report = null;
	
	public GetAllClientipData() {
		this.report = new BLL.CrawlFileReport.CrawlFileReport();
	}
	public GetAllClientipData(BLLInterface.ICrawlFileReport fakeReport) {	
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
		str.append("<thead><tr><th>clientip</th><th>最大时间</th><th>最小时间</th><th>平均时间</th><th>文件总大小</th></tr></thead>");
	}
	private void buildBody(StringBuilder str)
	{
		Model.GetAllClientipData.DALData data = null;
		Iterator<Model.GetAllClientipData.DALData> itr = this.report.getAllClientipData().dataList.iterator();
		
		str.append("<tbody>");
		
		while(itr.hasNext())
		{
			data = itr.next();
			
			str.append("<tr><td>").append(data.clientip).append("</td><td>").append(data.maxCrawlTime).append("</td><td>").append(data.minCrawlTime).append("</td><td>");
			
			str.append(data.avgCrawlTime).append("</td><td>").append(data.totalFileSize).append("</td></tr>");
		}
		
		str.append("</tbody>");
	}
}
