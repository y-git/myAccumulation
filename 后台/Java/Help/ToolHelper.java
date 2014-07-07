package Help;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.FilterRegistration.Dynamic;
import javax.servlet.http.HttpServletResponse;

import junit.framework.TestCase;

import org.dbunit.*;
import org.dbunit.database.DatabaseConnection;
import org.dbunit.database.IDatabaseConnection;
import org.dbunit.database.QueryDataSet;
import org.dbunit.dataset.IDataSet;
import org.dbunit.dataset.xml.FlatXmlDataSet;
import org.dbunit.ext.mysql.MySqlConnection;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;


public class ToolHelper {
	//*类型转换
	
//	intToString: String.valueOf(i);
//	stringToInt:Integer.parseInt(s); 
	
	
	
	//*文件操作
	
	
	public static void writeFile(String filePath, String sets) throws IOException {
	    FileWriter fw = new FileWriter(filePath);
	    PrintWriter out = new PrintWriter(fw);
	    out.write(sets);
	    out.println();
	    fw.close();
	    out.close();
	}
	

public static String readerFile(File f, String encoding) {

		String str = "";

		String line = "";

		FileInputStream fis = null;

		InputStreamReader isr = null;

		BufferedReader br = null;
		
//		String encoding = System.getProperty("file.encoding");  

		try {

			fis = new FileInputStream(f);

			isr = new InputStreamReader(fis, encoding);

			br = new BufferedReader(isr);

			while ((line = br.readLine()) != null) {

				str = str + line;

			}
			
			

		} catch (Exception e) {

			e.printStackTrace();

		} finally {

			try {

				fis.close();

			} catch (Exception e) {

				e.printStackTrace();

			}

		}
		
		return str;

	}


public static String getImgStreamData(HttpServletResponse response, String imgpath) throws IOException
{
//	String filepath = request.getParameter("filePath").toString();
//	String contextType = request.getParameter("contextType").toString();
	
	OutputStream os = null;
	ByteArrayOutputStream bos = new ByteArrayOutputStream();  
	FileInputStream fis = null;
	byte temp[] = new byte[1024];
	
	if (imgpath != null) {
		
		try {
			if (!(new File(imgpath)).exists()) {
			System.out.println("没有文件");
		}
			String filename = imgpath.substring(imgpath.lastIndexOf("\\")+1);
			System.out.println("文件名为："+filename);
//			os = response.getOutputStream();
//			os = new outp;
//			response.setHeader("content-disposition", "attachment;filename=" + new String(filename.getBytes("GBK"), "ISO-8859-1"));
//		response.setContentType("application/octet-stream");
//			response.setContentType(contextType);
//			response.setCharacterEncoding("UTF-8");
			
			fis = new FileInputStream(imgpath);
			
			int n = 0;
			while ((n = fis.read(temp)) != -1) {
//				URLEncoder.encode(s)
				
//				System.out.write(temp, 0, n);
				
//				os.write(temp, 0, n);
				bos.write(temp, 0, n);
			}
			
			
		} catch (Exception e) {
			System.out.print("出错了");
		} finally {
//		if (os != null)
//		{
//			os.flush();
//			os.close();
//		}
		if (bos != null)
		{
			bos.flush();
			bos.close();
		}
		if (fis != null)
			fis.close();
		}
	}
	
//	String aaa = System.out.toString();
//	String t = Arrays.toString(temp);
	
	
//	StringBuffer sb = new StringBuffer();
//	for(byte s : temp)
//	{
//	sb = sb.append(s);
//	}
//	
//	String m = sb.toString();
	
	
//	return Arrays.toString(temp);
	return Base64.encode(bos.toByteArray());
}




/*

java中多种方式读文件
一、多种方式读文件内容。
1、按字节读取文件内容
2、按字符读取文件内容
3、按行读取文件内容
4、随机读取文件内容

import java.io.BufferedReader;  
import java.io.File;  
import java.io.FileInputStream;  
import java.io.FileReader;  
import java.io.IOException;  
import java.io.InputStream;  
import java.io.InputStreamReader;  
import java.io.RandomAccessFile;  
import java.io.Reader;  
public class ReadFromFile {  
*//** 
* 以字节为单位读取文件，常用于读二进制文件，如图片、声音、影像等文件。 
* @param fileName 文件的名 
*//*  
public static void readFileByBytes(String fileName){  
File file = new File(fileName);  
InputStream in = null;  
try {  
System.out.println("以字节为单位读取文件内容，一次读一个字节：");  
// 一次读一个字节  
in = new FileInputStream(file);  
int tempbyte;  
while((tempbyte=in.read()) != -1){  
System.out.write(tempbyte);  
}  
in.close();  
} catch (IOException e) {  
e.printStackTrace();  
return;  
}  
try {  
System.out.println("以字节为单位读取文件内容，一次读多个字节：");  
//一次读多个字节  
byte[] tempbytes = new byte[100];  
int byteread = 0;  
in = new FileInputStream(fileName);  
ReadFromFile.showAvailableBytes(in);  
//读入多个字节到字节数组中，byteread为一次读入的字节数  
while ((byteread = in.read(tempbytes)) != -1){  
System.out.write(tempbytes, 0, byteread);  
}  
} catch (Exception e1) {  
e1.printStackTrace();  
} finally {  
if (in != null){  
try {  
in.close();  
} catch (IOException e1) {  
}  
}  
}  
}  
*//** 
* 以字符为单位读取文件，常用于读文本，数字等类型的文件 
* @param fileName 文件名 
*//*  
public static void readFileByChars(String fileName){  
File file = new File(fileName);  
Reader reader = null;  
try {  
System.out.println("以字符为单位读取文件内容，一次读一个字节：");  
// 一次读一个字符  
reader = new InputStreamReader(new FileInputStream(file));  
int tempchar;  
while ((tempchar = reader.read()) != -1){  
//对于windows下，rn这两个字符在一起时，表示一个换行。  
//但如果这两个字符分开显示时，会换两次行。  
//因此，屏蔽掉r，或者屏蔽n。否则，将会多出很多空行。  
if (((char)tempchar) != 'r'){  
System.out.print((char)tempchar);  
}  
}  
reader.close();  
} catch (Exception e) {  
e.printStackTrace();  
}  
try {  
System.out.println("以字符为单位读取文件内容，一次读多个字节：");  
//一次读多个字符  
char[] tempchars = new char[30];  
int charread = 0;  
reader = new InputStreamReader(new FileInputStream(fileName));  
//读入多个字符到字符数组中，charread为一次读取字符数  
while ((charread = reader.read(tempchars))!=-1){  
//同样屏蔽掉r不显示  
if ((charread == tempchars.length)&&(tempchars[tempchars.length-1] != 'r')){  
System.out.print(tempchars);  
}else{  
for (int i=0; i<charread; i++){  
if(tempchars[i] == 'r'){  
continue;  
}else{  
System.out.print(tempchars[i]);  
}  
}  
}  
}  
} catch (Exception e1) {  
e1.printStackTrace();  
}finally {  
if (reader != null){  
try {  
reader.close();  
} catch (IOException e1) {  
}  
}  
}  
}  
*//** 
* 以行为单位读取文件，常用于读面向行的格式化文件 
* @param fileName 文件名 
*//*  
public static void readFileByLines(String fileName){  
File file = new File(fileName);  
BufferedReader reader = null;  
try {  
System.out.println("以行为单位读取文件内容，一次读一整行：");  
reader = new BufferedReader(new FileReader(file));  
String tempString = null;  
int line = 1;  
//一次读入一行，直到读入null为文件结束  
while ((tempString = reader.readLine()) != null){  
//显示行号  
System.out.println("line " + line + ": " + tempString);  
line++;  
}  
reader.close();  
} catch (IOException e) {  
e.printStackTrace();  
} finally {  
if (reader != null){  
try {  
reader.close();  
} catch (IOException e1) {  
}  
}  
}  
}  
*//** 
* 随机读取文件内容 
* @param fileName 文件名 
*//*  
public static void readFileByRandomAccess(String fileName){  
RandomAccessFile randomFile = null;  
try {  
System.out.println("随机读取一段文件内容：");  
// 打开一个随机访问文件流，按只读方式  
randomFile = new RandomAccessFile(fileName, "r");  
// 文件长度，字节数  
long fileLength = randomFile.length();  
// 读文件的起始位置  
int beginIndex = (fileLength > 4) ? 4 : 0;  
//将读文件的开始位置移到beginIndex位置。  
randomFile.seek(beginIndex);  
byte[] bytes = new byte[10];  
int byteread = 0;  
//一次读10个字节，如果文件内容不足10个字节，则读剩下的字节。  
//将一次读取的字节数赋给byteread  
while ((byteread = randomFile.read(bytes)) != -1){  
System.out.write(bytes, 0, byteread);  
}  
} catch (IOException e){  
e.printStackTrace();  
} finally {  
if (randomFile != null){  
try {  
randomFile.close();  
} catch (IOException e1) {  
}  
}  
}  
}  
*//** 
* 显示输入流中还剩的字节数 
* @param in 
*//*  
private static void showAvailableBytes(InputStream in){  
try {  
System.out.println("当前字节输入流中的字节数为:" + in.available());  
} catch (IOException e) {  
e.printStackTrace();  
}  
}  
public static void main(String[] args) {  
String fileName = "C:/temp/newTemp.txt";  
ReadFromFile.readFileByBytes(fileName);  
ReadFromFile.readFileByChars(fileName);  
ReadFromFile.readFileByLines(fileName);  
ReadFromFile.readFileByRandomAccess(fileName);  
}  
}  
二、将内容追加到文件尾部  
import java.io.FileWriter;  
import java.io.IOException;  
import java.io.RandomAccessFile;  
*//** 
* 将内容追加到文件尾部 
*//*  
public class AppendToFile {  
*//** 
* A方法追加文件：使用RandomAccessFile 
* @param fileName 文件名 
* @param content 追加的内容 
*//*  
public static void appendMethodA(String fileName,  
  
String content){  
try {  
// 打开一个随机访问文件流，按读写方式  
RandomAccessFile randomFile = new RandomAccessFile(fileName, "rw");  
// 文件长度，字节数  
long fileLength = randomFile.length();  
//将写文件指针移到文件尾。  
randomFile.seek(fileLength);  
randomFile.writeBytes(content);  
randomFile.close();  
} catch (IOException e){  
e.printStackTrace();  
}  
}  
*//** 
* B方法追加文件：使用FileWriter 
* @param fileName 
* @param content 
*//*  
public static void appendMethodB(String fileName, String content){  
try {  
//打开一个写文件器，构造函数中的第二个参数true表示以追加形式写文件  
FileWriter writer = new FileWriter(fileName, true);  
writer.write(content);  
writer.close();  
} catch (IOException e) {  
e.printStackTrace();  
}  
}  
public static void main(String[] args) {  
String fileName = "C:/temp/newTemp.txt";  
String content = "new append!";  
//按方法A追加文件  
AppendToFile.appendMethodA(fileName, content);  
AppendToFile.appendMethodA(fileName, "append end. n");  
//显示文件内容  
ReadFromFile.readFileByLines(fileName);  
//按方法B追加文件  
AppendToFile.appendMethodB(fileName, content);  
AppendToFile.appendMethodB(fileName, "append end. n");  
//显示文件内容  
ReadFromFile.readFileByLines(fileName);  
}  
}  */


	
	
	
	
	
	
	
	
//	D:\\phantomjs-1.9.1-windows\\phantomjs D:\\highcharts-convert.js -jsonData { xAxis: { categories: ['Jan'] }, series: [{ data: [29.9] }]} -outfile D:\\Y.png -width 1000 -constr Chart
	/**
	 * 执行命令
	 * 
	 * Java可以直接调用Linux命令，形式如下： 
		 Runtime.getRuntime().exec(command) 
		
		 举例：运行ls,top命令可以这样： 
		 Runtime.getRuntime().exec("ls"); 
		
		 但是这样执行时没有任何输出，原因： 
		   调用Runtime.exec方法将产生一个本地的进程,并返回一个Process子类的实例， 
		（注意：Runtime.getRuntime().exec（command）返回的是一个Process类的实例）, 
		该 实例可用于控制进程或取得进程的相关信息. 由于调用Runtime.exec方法所创建的子进程没有自己的终端或控制台,
		因此该子进程的标准IO(如stdin,stdou,stderr)都通过 Process.getOutputStream(),Process.getInputStream(), Process.getErrorStream()方法重定向给它的父进程了.
		用户需要用这些stream来向 子进程输入数据或获取子进程的输出 
	 * 
	 * 
	 * @param command	命令字符串。如："D:\\phantomjs-1.9.1-windows\\phantomjs D:\\highcharts-convert.js -infile D:\\test.txt -outfile D:\\Y.png -width 1000 -constr Chart"
	 * @throws IOException
	 */
	public static String execCommand(String command) throws IOException
	{
		Process process = Runtime.getRuntime().exec(command);  

		 InputStreamReader ir=new InputStreamReader(process.getInputStream()); 
		 LineNumberReader input = new LineNumberReader (ir); 

		 String line; 
		 if((line = input.readLine ()) != null){ 
		   return line;
		 }
		 
		 return "";
	}
	
	
	
	
	/**
	 * 获得标准路径
	 * @param path	相对于当前目录。
	 * 如果在src中中调用时，则当前目录为项目的路径（如path为“test.xml”，项目名为“JspProject”，则该xml文件路径为“。。。。。。/JspProject/test.xml”）
	 * 如果在jsp中调用，则当前目录为tomcat的bin目录。如：D:\Server\apache-tomcat-7.0.41\bin\
	 * @return
	 * @throws IOException
	 */
	public static String getCanonicalPath(String path) throws IOException 
	{
		return new File(path).getCanonicalPath();
	}
	/**
	 * 获得InputStream
	 * @param classObject	使用getClass()传入当前类。
	 * @param path	相对于src目录
	 * @return
	 */
	public static InputStream getInputStream(Class classObject,  String path) 
	{
		return classObject.getClassLoader().getResourceAsStream(path);
	}
	/**
	 * 获得FileReader
	 * @param path	相对于当前目录
	 * @return
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static FileReader getFileReader(String path) throws FileNotFoundException, IOException 
	{
//		Object q = Class.class.getClass();
//		Object tObject = Class.class.getClass().getResource("/");
//		String a = Class.class.getClass().getResource("/").getPath() + path;
		return new FileReader(ToolHelper.getCanonicalPath(path));
	}
	
	
	
	
	
	/**
	 * UTC时间转换为本地时间（未测试）。
	 * @param utcTime
	 * @param utcTimePatten
	 * @param localTimePatten
	 * @return
	 */
	public static String utc2Local(String utcTime, String utcTimePatten, String localTimePatten) 
	{ 
			SimpleDateFormat utcFormater = new SimpleDateFormat(utcTimePatten); 
			utcFormater.setTimeZone(TimeZone.getTimeZone("UTC")); 
			Date gpsUTCDate = null; 
			try { 
			gpsUTCDate = utcFormater.parse(utcTime); 
			} catch (ParseException e) { 
			e.printStackTrace(); 
			} 
			SimpleDateFormat localFormater = new SimpleDateFormat(localTimePatten); 
			localFormater.setTimeZone(TimeZone.getDefault()); 
			String localTime = localFormater.format(gpsUTCDate.getTime()); 
			return localTime; 
	}
	/**
	 * 将今天00:00转换为utc时间并返回
	 * @return
	 * @throws ParseException
	 */
	public static long getNowDayStartUTC()
	{ 
		DateFormat format = null;
		String now = "";
		long utc = 0;
		
		try {
//			DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			format = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
			now = format.format(new Date());
			utc = format.parse(now).getTime()/1000;
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			 //转换为UTC时间
	        return utc;
		}
		
	}
}
