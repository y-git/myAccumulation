package Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Help.ToolHelper;


import net.sf.json.JSONObject;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;



/**
 * 使用freemarker生成静态html页面，并下载到客户端
 *
 */
public class CreateHtmlPage extends HttpServlet {
	private String callback = null;
    private JSONObject data = null;
    private String imgName1 = null;
    private String imgName2 = null;
	
    private String path = null;
    private String encoding = null;
    private String templetePathName  = null;

	/**
	 * Constructor of the object.
	 */
	public CreateHtmlPage() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		this.callback = request.getAttribute("callback").toString();
		this.data = (JSONObject)request.getAttribute("data");
		this.imgName1 = request.getAttribute("imgName1").toString();
		this.imgName2 = request.getAttribute("imgName2").toString();
		
		this.path = getServletContext().getRealPath("/") + config.Phantomjs.htmlPagePath;
		this.encoding = "UTF-8";
		this.templetePathName = config.Phantomjs.templetePathName;
      
		this.createPage();
        this.clearData();
        this.downloadHtmlPage();
        this.returnData(response);
	}
	
	private void createPage() throws IOException
	{
		Configuration cfg = new Configuration();
//		cfg.setDefaultEncoding("gbk");
		
        cfg.setServletContextForTemplateLoading(getServletContext(), "WEB-INF/templates");
        cfg.setEncoding(Locale.CHINA, "UTF-8");
        
        //定义并设置数据  
        Map<String, String> serverData = new HashMap<String, String>();  
        serverData.put("getAllAppIDTotalNum", data.getString("getAllAppIDTotalNum"));  
        serverData.put("getAllClientipData", data.getString("getAllClientipData"));  
        serverData.put("imgName1", imgName1);
        serverData.put("imgName2", imgName2);

        
        Template t = cfg.getTemplate(templetePathName);
//        t.setEncoding("UTF-8");
        
        File file = new File(this.path);
        
        if (!file.exists())
        {
            file.createNewFile();
        }
        Writer out = new OutputStreamWriter(new FileOutputStream(file),"UTF-8"); 
        
        try {
            t.process(serverData, out);
        } catch (TemplateException e) {
        	e.printStackTrace();
        }
	}
	private void clearData()
	{
		 this.data.remove("getAllAppIDTotalNum");  
		 this.data.remove("getAllClientipData");  
	}
	private void downloadHtmlPage()
	{
		this.data.put("htmlPageStr", ToolHelper.readerFile(new File(this.path), this.encoding));
	}
	private void returnData(HttpServletResponse response) throws IOException
	{
		response.setCharacterEncoding(this.encoding);
		
		PrintWriter out = response.getWriter();
		 
		out.print(this.callback + "(" + this.data.toString() + ")");
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
