package BLL.CrawlFileReport;

import BLL.Test.CrawlFileReport.*;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;




	@RunWith(value=Suite.class)
	@SuiteClasses(value={getTotalNumByLogNameTest.class, getAllAppIDTotalNumTest.class, getAllClientipDataTest.class})
	public class CrawlFileReportTest {
	}

