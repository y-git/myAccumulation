package Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;



/**
 * 下载文件到客户端
 * @author jackycyang
 *
 */
public class Download extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public Download() {
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
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String filepath = request.getAttribute("filePath").toString();
		String contextType = request.getAttribute("contextType").toString();
		
		if (filepath != null) {
			OutputStream os = null;
			FileInputStream fis = null;
			try {
				if (!(new File(filepath)).exists()) {
				System.out.println("没有文件");
			return;
			}
				String filename = filepath.substring(filepath.lastIndexOf("\\")+1);
				System.out.println("文件名为："+filename);
				os = response.getOutputStream();
				response.setHeader("content-disposition", "attachment;filename=" + new String(filename.getBytes("GBK"), "ISO-8859-1"));
				response.setContentType(contextType);
				
				byte temp[] = new byte[1024];
				fis = new FileInputStream(filepath);
				int n = 0;
				while ((n = fis.read(temp)) != -1) {
					os.write(temp, 0, n);
				}
			} catch (Exception e) {
				System.out.print("出错了");
			} finally {
			if (os != null)
				os.close();
			if (fis != null)
				fis.close();
			}
	//		out.clear();
	//		out = pageContext.pushBody();

		}
		
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