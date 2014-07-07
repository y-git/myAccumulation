//using System;
//using System.Collections;
//using System.Collections.Specialized;
//using System.Data;
//using System.Data.SqlClient;
//using System.Configuration;
//using System.Text;
//using System.Text.RegularExpressions;

//namespace One.DBUtility
//{
//    /// <summary>
//    /// 数据访问抽象基础类
//    /// Copyright (C) 2004-2010
//    /// All rights reserved
//    /// </summary>
//    public abstract class DbHelperSQL
//    {
//        #region 连接属性
//        //数据库连接字符串(web.config来配置)
//        //public static string connectionString = ConfigurationManager.AppSettings["ConnectionString"];
//        private static string connectionString
//        {
//            get
//            {
//                return ConnectionString;
//            }
//        }

//        public static string ConnectionString
//        {
//            get
//            {
//                string s = ConfigurationManager.AppSettings["ConnectionString"];
//                string Encrypt = ConfigurationManager.AppSettings["Encrypt"];
//                //连接字符串是加密配置
//                if ((!string.IsNullOrEmpty(s)) && (!string.IsNullOrEmpty(Encrypt)) && (Encrypt == "Y"))
//                {
//                    s = DESEncrypt.Decrypt(s);
//                }
//                if (string.IsNullOrEmpty(s))
//                {
//                    s = @"Data Source=10.0.12.39;Initial Catalog=SupplyChain;Persist Security Info=True;uid=sa;pwd=123456";
//                    //server=192.168.0.100;database=SupplyChain;uid=sa;pwd=123456
//                }
//                return s;
//            }
//        }

//        public static string Proess(string AClass)
//        {
//            //Regex regString = new Regex(@"\w+=(?<server>\w+);\w+=(?<database>\w+);\w+=(?<uid>\w+);\w+=(?<pwd>\w+);");
//            //Match m = regString.Match(ConnectionString);
//            string[] MapFields = ConnectionString.Split(';');
//            foreach (string FieldMapName in MapFields)
//            {
//                string[] Fields = FieldMapName.Split('=');
//                if (Fields.Length < 2)
//                {
//                    continue;
//                }
//                if (AClass == Fields[0])
//                    return Fields[1];
//            }
//            return string.Empty;
//        }
//        /// <summary>
//        /// 服务器名称
//        /// </summary>
//        public static string Server
//        {
//            get
//            {
//                return Proess("server");
//            }
//        }
//        /// <summary>
//        /// 数据库名称
//        /// </summary>
//        public static string Database
//        {
//            get
//            {
//                return Proess("database");
//            }
//        }
//        /// <summary>
//        /// 登录用户名称
//        /// </summary>
//        public static string User
//        {
//            get
//            {
//                return Proess("uid");
//            }
//        }
//        /// <summary>
//        /// 登录密码
//        /// </summary>
//        public static string Password
//        {
//            get
//            {
//                return Proess("pwd");
//            }
//        }
//        #endregion
//        private static Hashtable myCache = Hashtable.Synchronized(new Hashtable());
//        public DbHelperSQL()
//        {
//        }

//        #region 公用方法

//        public static int GetMaxID(string FieldName, string TableName)
//        {
//            string strsql = "select max(" + FieldName + ")+1 from " + TableName;
//            object obj = DbHelperSQL.GetSingle(strsql);
//            if (obj == null)
//            {
//                return 1;
//            }
//            else
//            {
//                return int.Parse(obj.ToString());
//            }
//        }
//        public static bool Exists(string strSql)
//        {
//            object obj = DbHelperSQL.GetSingle(strSql);
//            int cmdresult;
//            if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
//            {
//                cmdresult = 0;
//            }
//            else
//            {
//                cmdresult = int.Parse(obj.ToString());
//            }
//            if (cmdresult == 0)
//            {
//                return false;
//            }
//            else
//            {
//                return true;
//            }
//        }
//        public static bool Exists(string strSql, params SqlParameter[] cmdParms)
//        {
//            object obj = DbHelperSQL.GetSingle(strSql, cmdParms);
//            int cmdresult;
//            if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
//            {
//                cmdresult = 0;
//            }
//            else
//            {
//                cmdresult = int.Parse(obj.ToString());
//            }
//            if (cmdresult == 0)
//            {
//                return false;
//            }
//            else
//            {
//                return true;
//            }
//        }
//        #endregion

//        #region  执行简单SQL语句

//        /// <summary>
//        /// 执行SQL语句，返回影响的记录数
//        /// </summary>
//        /// <param name="SQLString">SQL语句</param>
//        /// <returns>影响的记录数</returns>
//        public static int ExecuteSql(string SQLString)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                using (SqlCommand cmd = new SqlCommand(SQLString, connection))
//                {
//                    try
//                    {
//                        connection.Open();
//                        int rows = cmd.ExecuteNonQuery();
//                        return rows;
//                    }
//                    catch (System.Data.SqlClient.SqlException E)
//                    {
//                        connection.Close();
//                        throw new Exception(E.Message);
//                    }
//                }
//            }
//        }

//        /// <summary>
//        /// 执行SQL语句，设置命令的执行等待时间
//        /// </summary>
//        /// <param name="SQLString"></param>
//        /// <param name="Times"></param>
//        /// <returns></returns>
//        public static int ExecuteSqlByTime(string SQLString, int Times)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                using (SqlCommand cmd = new SqlCommand(SQLString, connection))
//                {
//                    try
//                    {
//                        connection.Open();
//                        cmd.CommandTimeout = Times;
//                        int rows = cmd.ExecuteNonQuery();
//                        return rows;
//                    }
//                    catch (System.Data.SqlClient.SqlException E)
//                    {
//                        connection.Close();
//                        throw new Exception(E.Message);
//                    }
//                }
//            }
//        }

//        /// <summary>
//        /// 执行多条SQL语句，实现数据库事务。
//        /// </summary>
//        /// <param name="SQLStringList">多条SQL语句</param>		
//        public static void ExecuteSqlTran(ArrayList SQLStringList)      //已修改
//        {
//            using (SqlConnection conn = new SqlConnection(connectionString))
//            {
//                conn.Open();
//                SqlCommand cmd = new SqlCommand();
//                cmd.Connection = conn;
//                using (SqlTransaction tx = conn.BeginTransaction())
//                {
//                    cmd.Transaction = tx;
//                    try
//                    {
//                        for (int n = 0; n < SQLStringList.Count; n++)
//                        {
//                            string strsql = SQLStringList[n].ToString();
//                            if (strsql.Trim().Length > 1)
//                            {
//                                cmd.CommandText = strsql;
//                                cmd.ExecuteNonQuery();
//                            }
//                        }
//                        tx.Commit();
//                    }
//                    catch (System.Data.SqlClient.SqlException E)
//                    {
//                        tx.Rollback();
//                        throw new Exception(E.Message);
//                    }
//                    finally
//                    {
//                        conn.Close();
//                    }
//                }
//            }
//        }
//        /// <summary>
//        /// 执行带一个存储过程参数的的SQL语句。
//        /// </summary>
//        /// <param name="SQLString">SQL语句</param>
//        /// <param name="content">参数内容,比如一个字段是格式复杂的文章，有特殊符号，可以通过这个方式添加</param>
//        /// <returns>影响的记录数</returns>
//        public static int ExecuteSql(string SQLString, string content)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                SqlCommand cmd = new SqlCommand(SQLString, connection);
//                System.Data.SqlClient.SqlParameter myParameter = new System.Data.SqlClient.SqlParameter("@content", SqlDbType.NText);
//                myParameter.Value = content;
//                cmd.Parameters.Add(myParameter);
//                try
//                {
//                    connection.Open();
//                    int rows = cmd.ExecuteNonQuery();
//                    return rows;
//                }
//                catch (System.Data.SqlClient.SqlException E)
//                {
//                    throw new Exception(E.Message);
//                }
//                finally
//                {
//                    cmd.Dispose();
//                    connection.Close();
//                }
//            }
//        }
//        /// <summary>
//        /// 执行带一个存储过程参数的的SQL语句。
//        /// </summary>
//        /// <param name="SQLString">SQL语句</param>
//        /// <param name="content">参数内容,比如一个字段是格式复杂的文章，有特殊符号，可以通过这个方式添加</param>
//        /// <returns>影响的记录数</returns>
//        public static object ExecuteSqlGet(string SQLString, string content)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                SqlCommand cmd = new SqlCommand(SQLString, connection);
//                System.Data.SqlClient.SqlParameter myParameter = new System.Data.SqlClient.SqlParameter("@content", SqlDbType.NText);
//                myParameter.Value = content;
//                cmd.Parameters.Add(myParameter);
//                try
//                {
//                    connection.Open();
//                    object obj = cmd.ExecuteScalar();
//                    if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
//                    {
//                        return null;
//                    }
//                    else
//                    {
//                        return obj;
//                    }
//                }
//                catch (System.Data.SqlClient.SqlException E)
//                {
//                    throw new Exception(E.Message);
//                }
//                finally
//                {
//                    cmd.Dispose();
//                    connection.Close();
//                }
//            }
//        }
//        /// <summary>
//        /// 向数据库里插入图像格式的字段(和上面情况类似的另一种实例)
//        /// </summary>
//        /// <param name="strSQL">SQL语句</param>
//        /// <param name="fs">图像字节,数据库的字段类型为image的情况</param>
//        /// <returns>影响的记录数</returns>
//        public static int ExecuteSqlInsertImg(string strSQL, byte[] fs)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                SqlCommand cmd = new SqlCommand(strSQL, connection);
//                System.Data.SqlClient.SqlParameter myParameter = new System.Data.SqlClient.SqlParameter("@fs", SqlDbType.Image);
//                myParameter.Value = fs;
//                cmd.Parameters.Add(myParameter);
//                try
//                {
//                    connection.Open();
//                    int rows = cmd.ExecuteNonQuery();
//                    return rows;
//                }
//                catch (System.Data.SqlClient.SqlException E)
//                {
//                    throw new Exception(E.Message);
//                }
//                finally
//                {
//                    cmd.Dispose();
//                    connection.Close();
//                }
//            }
//        }

//        /// <summary>
//        /// 执行一条计算查询结果语句，返回查询结果（object）。
//        /// </summary>
//        /// <param name="SQLString">计算查询结果语句</param>
//        /// <returns>查询结果（object）</returns>
//        public static object GetSingle(string SQLString)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                using (SqlCommand cmd = new SqlCommand(SQLString, connection))
//                {
//                    try
//                    {
//                        connection.Open();
//                        object obj = cmd.ExecuteScalar();
//                        if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
//                        {
//                            return null;
//                        }
//                        else
//                        {
//                            return obj;
//                        }
//                    }
//                    catch (System.Data.SqlClient.SqlException e)
//                    {
//                        connection.Close();
//                        throw new Exception(e.Message);
//                    }
//                }
//            }
//        }

//        /// <summary>
//        /// 获得数据库现在的时间
//        /// </summary>
//        /// <returns></returns>
//        public static DateTime GetDBNow()
//        {
//            object o = GetSingle("select getdate()");

//            DateTime dt = DateTime.Parse(o.ToString());
//            return DateTime.Now;
//        }

//        /// <summary>
//        /// 执行查询语句，返回SqlDataReader(使用该方法切记要手工关闭SqlDataReader和连接)
//        /// </summary>
//        /// <param name="strSQL">查询语句</param>
//        /// <returns>SqlDataReader</returns>
//        public static SqlDataReader ExecuteReader(string strSQL)
//        {
//            SqlConnection connection = new SqlConnection(connectionString);
//            SqlCommand cmd = new SqlCommand(strSQL, connection);
//            try
//            {
//                connection.Open();
//                SqlDataReader myReader = cmd.ExecuteReader();
//                return myReader;
//            }
//            catch (System.Data.SqlClient.SqlException e)
//            {
//                throw new Exception(e.Message);
//            }
//            //finally //不能在此关闭，否则，返回的对象将无法使用
//            //{
//            //	cmd.Dispose();
//            //	connection.Close();
//            //}	


//        }
//        /// <summary>
//        /// 执行查询语句，返回DataSet
//        /// </summary>
//        /// <param name="SQLString">查询语句</param>
//        /// <returns>DataSet</returns>
//        public static DataSet Query(string SQLString)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                DataSet ds = new DataSet();
//                try
//                {
//                    connection.Open();
//                    SqlDataAdapter command = new SqlDataAdapter(SQLString, connection);
//                    command.Fill(ds, "ds");
//                }
//                catch (System.Data.SqlClient.SqlException ex)
//                {
//                    throw new Exception(ex.Message);
//                }
//                return ds;
//            }
//        }

//        public static DataSet Query(Hashtable SQLStringList)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                DataSet ds = new DataSet();
//                try
//                {
//                    connection.Open();
//                    foreach (var item in SQLStringList.Keys)
//                    {
//                        string SQLString = (string)SQLStringList[item];
//                        SqlDataAdapter command = new SqlDataAdapter(SQLString, connection);
//                        string Key = (string)item;
//                        command.Fill(ds, Key);
//                    }
//                }
//                catch (System.Data.SqlClient.SqlException ex)
//                {
//                    throw new Exception(ex.Message);
//                }
//                return ds;
//            }
//        }
//        /// <summary>
//        /// 执行查询语句，返回DataSet,设置命令的执行等待时间
//        /// </summary>
//        /// <param name="SQLString"></param>
//        /// <param name="Times"></param>
//        /// <returns></returns>
//        public static DataSet Query(string SQLString, int Times)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                DataSet ds = new DataSet();
//                try
//                {
//                    connection.Open();
//                    SqlDataAdapter command = new SqlDataAdapter(SQLString, connection);
//                    command.SelectCommand.CommandTimeout = Times;
//                    command.Fill(ds, "ds");
//                }
//                catch (System.Data.SqlClient.SqlException ex)
//                {
//                    throw new Exception(ex.Message);
//                }
//                return ds;
//            }
//        }



//        #endregion

//        #region 执行带参数的SQL语句

//        /// <summary>
//        /// 执行SQL语句，返回影响的记录数
//        /// </summary>
//        /// <param name="SQLString">SQL语句</param>
//        /// <returns>影响的记录数</returns>
//        public static int ExecuteSql(string SQLString, params SqlParameter[] cmdParms)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                using (SqlCommand cmd = new SqlCommand())
//                {
//                    try
//                    {
//                        PrepareCommand(cmd, connection, null, SQLString, cmdParms);
//                        int rows = cmd.ExecuteNonQuery();
//                        cmd.Parameters.Clear();
//                        return rows;
//                    }
//                    catch (System.Data.SqlClient.SqlException E)
//                    {
//                        throw new Exception(E.Message);
//                    }
//                }
//            }
//        }


//        /// <summary>
//        /// 执行多条SQL语句，实现数据库事务。
//        /// </summary>
//        /// <param name="SQLStringList">SQL语句的哈希表（key为sql语句，value是该语句的SqlParameter[]）</param>
//        public static void ExecuteSqlTran(Hashtable SQLStringList)
//        {
//            using (SqlConnection conn = new SqlConnection(connectionString))
//            {
//                conn.Open();
//                using (SqlTransaction trans = conn.BeginTransaction())
//                {
//                    SqlCommand cmd = new SqlCommand();
//                    try
//                    {
//                        //循环
//                        foreach (DictionaryEntry myDE in SQLStringList)
//                        {
//                            string cmdText = myDE.Key.ToString();
//                            SqlParameter[] cmdParms = (SqlParameter[])myDE.Value;
//                            PrepareCommand(cmd, conn, trans, cmdText, cmdParms);
//                            int val = cmd.ExecuteNonQuery();
//                            cmd.Parameters.Clear();

//                            trans.Commit();
//                        }
//                    }
//                    catch
//                    {
//                        trans.Rollback();
//                        throw;
//                    }
//                }
//            }
//        }


//        /// <summary>
//        /// 执行一条计算查询结果语句，返回查询结果（object）。
//        /// </summary>
//        /// <param name="SQLString">计算查询结果语句</param>
//        /// <returns>查询结果（object）</returns>
//        public static object GetSingle(string SQLString, params SqlParameter[] cmdParms)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                using (SqlCommand cmd = new SqlCommand())
//                {
//                    try
//                    {
//                        PrepareCommand(cmd, connection, null, SQLString, cmdParms);
//                        object obj = cmd.ExecuteScalar();
//                        cmd.Parameters.Clear();
//                        if ((Object.Equals(obj, null)) || (Object.Equals(obj, System.DBNull.Value)))
//                        {
//                            return null;
//                        }
//                        else
//                        {
//                            return obj;
//                        }
//                    }
//                    catch (System.Data.SqlClient.SqlException e)
//                    {
//                        throw new Exception(e.Message);
//                    }
//                }
//            }
//        }

//        /// <summary>
//        /// 执行查询语句，返回SqlDataReader (使用该方法切记要手工关闭SqlDataReader和连接)
//        /// </summary>
//        /// <param name="strSQL">查询语句</param>
//        /// <returns>SqlDataReader</returns>
//        public static SqlDataReader ExecuteReader(string SQLString, params SqlParameter[] cmdParms)
//        {
//            SqlConnection connection = new SqlConnection(connectionString);
//            SqlCommand cmd = new SqlCommand();
//            try
//            {
//                PrepareCommand(cmd, connection, null, SQLString, cmdParms);
//                SqlDataReader myReader = cmd.ExecuteReader();
//                cmd.Parameters.Clear();
//                return myReader;
//            }
//            catch (System.Data.SqlClient.SqlException e)
//            {
//                throw new Exception(e.Message);
//            }
//            //finally //不能在此关闭，否则，返回的对象将无法使用
//            //{
//            //	cmd.Dispose();
//            //	connection.Close();
//            //}	

//        }

//        /// <summary>
//        /// 执行查询语句，返回DataSet
//        /// </summary>
//        /// <param name="SQLString">查询语句</param>
//        /// <returns>DataSet</returns>
//        public static DataSet Query(string SQLString, params SqlParameter[] cmdParms)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                SqlCommand cmd = new SqlCommand();
//                PrepareCommand(cmd, connection, null, SQLString, cmdParms);
//                using (SqlDataAdapter da = new SqlDataAdapter(cmd))
//                {
//                    DataSet ds = new DataSet();
//                    try
//                    {
//                        da.Fill(ds, "ds");
//                        cmd.Parameters.Clear();
//                    }
//                    catch (System.Data.SqlClient.SqlException ex)
//                    {
//                        throw new Exception(ex.Message);
//                    }
//                    return ds;
//                }
//            }
//        }


//        private static void PrepareCommand(SqlCommand cmd, SqlConnection conn, SqlTransaction trans, string cmdText, SqlParameter[] cmdParms)
//        {
//            if (conn.State != ConnectionState.Open)
//                conn.Open();
//            cmd.Connection = conn;
//            cmd.CommandText = cmdText;
//            if (trans != null)
//                cmd.Transaction = trans;
//            cmd.CommandType = CommandType.Text;//cmdType;
//            if (cmdParms != null)
//            {


//                foreach (SqlParameter parameter in cmdParms)
//                {
//                    if ((parameter.Direction == ParameterDirection.InputOutput || parameter.Direction == ParameterDirection.Input) &&
//                        (parameter.Value == null))
//                    {
//                        parameter.Value = DBNull.Value;
//                    }
//                    cmd.Parameters.Add(parameter);
//                }
//            }
//        }

//        #endregion

//        #region 存储过程操作

//        /// <summary>
//        /// 执行存储过程  (使用该方法切记要手工关闭SqlDataReader和连接)
//        /// </summary>
//        /// <param name="storedProcName">存储过程名</param>
//        /// <param name="parameters">存储过程参数</param>
//        /// <returns>SqlDataReader</returns>
//        public static SqlDataReader RunProcedure(string storedProcName, IDataParameter[] parameters)
//        {
//            SqlConnection connection = new SqlConnection(connectionString);
//            SqlDataReader returnReader;
//            connection.Open();
//            SqlCommand command = BuildQueryCommand(connection, storedProcName, parameters);
//            command.CommandType = CommandType.StoredProcedure;
//            returnReader = command.ExecuteReader();
//            //Connection.Close(); 不能在此关闭，否则，返回的对象将无法使用            
//            return returnReader;
//        }


//        /// <summary>
//        /// 执行存储过程
//        /// </summary>
//        /// <param name="storedProcName">存储过程名</param>
//        /// <param name="parameters">存储过程参数</param>
//        /// <param name="tableName">DataSet结果中的表名</param>
//        /// <returns>DataSet</returns>
//        public static DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                DataSet dataSet = new DataSet();
//                connection.Open();
//                SqlDataAdapter sqlDA = new SqlDataAdapter();
//                sqlDA.SelectCommand = BuildQueryCommand(connection, storedProcName, parameters);
//                sqlDA.Fill(dataSet, tableName);
//                connection.Close();
//                return dataSet;
//            }
//        }
//        public static DataSet RunProcedure(string storedProcName, IDataParameter[] parameters, string tableName, int Times)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                DataSet dataSet = new DataSet();
//                connection.Open();
//                SqlDataAdapter sqlDA = new SqlDataAdapter();
//                sqlDA.SelectCommand = BuildQueryCommand(connection, storedProcName, parameters);
//                sqlDA.SelectCommand.CommandTimeout = Times;
//                sqlDA.Fill(dataSet, tableName);
//                connection.Close();
//                return dataSet;
//            }
//        }


//        /// <summary>
//        /// 构建 SqlCommand 对象(用来返回一个结果集，而不是一个整数值)
//        /// </summary>
//        /// <param name="connection">数据库连接</param>
//        /// <param name="storedProcName">存储过程名</param>
//        /// <param name="parameters">存储过程参数</param>
//        /// <returns>SqlCommand</returns>
//        private static SqlCommand BuildQueryCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters)
//        {
//            SqlCommand command = new SqlCommand(storedProcName, connection);
//            command.CommandType = CommandType.StoredProcedure;
//            if (null != parameters)
//            {
//                foreach (SqlParameter parameter in parameters)
//                {
//                    if (parameter != null)
//                    {
//                        // 检查未分配值的输出参数,将其分配以DBNull.Value.
//                        if ((parameter.Direction == ParameterDirection.InputOutput || parameter.Direction == ParameterDirection.Input) &&
//                            (parameter.Value == null))
//                        {
//                            parameter.Value = DBNull.Value;
//                        }
//                        command.Parameters.Add(parameter);
//                    }
//                }
//            }
//            return command;
//        }

//        /// <summary>
//        /// 执行存储过程，返回影响的行数		
//        /// </summary>
//        /// <param name="storedProcName">存储过程名</param>
//        /// <param name="parameters">存储过程参数</param>
//        /// <param name="rowsAffected">影响的行数</param>
//        /// <returns></returns>
//        public static int RunProcedure(string storedProcName, IDataParameter[] parameters, out int rowsAffected)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                int result;
//                connection.Open();
//                SqlCommand command = BuildIntCommand(connection, storedProcName, parameters);
//                command.CommandTimeout = 0;
//                rowsAffected = command.ExecuteNonQuery();
//                //result = (int)command.Parameters["ReturnValue"].Value;
//                result = (int)command.Parameters["@RETURN_VALUE"].Value;
//                //Connection.Close();
//                return result;
//            }
//        }
//        /// <summary>
//        /// 得到系统唯一号码；		
//        /// </summary>
//        /// <param name="storedProcName">存储过程名</param>
//        /// <param name="parameters">存储过程参数</param>
//        /// <param name="rowsAffected">影响的行数</param>
//        /// <returns></returns>
//        public static string NewBillNo(string BillType)
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                string result;

//                connection.Open();//sp_Pub_NewBillNo
//                //获取存储过程参数
//                SqlParameter[] commandParameters = GetSpParameters("sp_bill_no", true);
//                //command.Parameters[0].Value = null;
//                commandParameters[1].Value = BillType;
//                SqlCommand command = BuildIntCommand(connection, "sp_bill_no", commandParameters);


//                int rowsAffected = command.ExecuteNonQuery();
//                int iRlt = (int)command.Parameters["@RETURN_VALUE"].Value;
//                result = (string)command.Parameters["@sBillNo"].Value;
//                if (iRlt != 0)
//                {
//                    new Exception("获取单据号失败:" + iRlt.ToString());
//                }
//                //Connection.Close();
//                return result;
//            }
//        }
//        /// <summary>
//        /// 得到系统唯一号码；		
//        /// </summary>
//        /// <param name="storedProcName">存储过程名</param>
//        /// <param name="parameters">存储过程参数</param>
//        /// <param name="rowsAffected">影响的行数</param>
//        /// <returns></returns>
//        public static string NewLogNo()
//        {
//            using (SqlConnection connection = new SqlConnection(connectionString))
//            {
//                string result;

//                connection.Open();
//                //获取存储过程参数
//                SqlParameter[] commandParameters = GetSpParameters("sp_Sys_NewBillNo", true);
//                commandParameters[1].Value = "Sys_Log";
//                commandParameters[2].Value = "";
//                commandParameters[3].Value = "Y";
//                commandParameters[4].Value = "";
//                SqlCommand command = BuildIntCommand(connection, "sp_Sys_NewBillNo", commandParameters);
//                int rowsAffected = command.ExecuteNonQuery();
//                int iRlt = (int)command.Parameters["@RETURN_VALUE"].Value;
//                result = (string)command.Parameters["@sBillNo"].Value;
//                if (iRlt != 0)
//                {
//                    //exception
//                }
//                //Connection.Close();
//                return result;
//            }
//        }
//        /// <summary>
//        /// 创建 SqlCommand 对象实例(用来返回一个整数值)	
//        /// </summary>
//        /// <param name="storedProcName">存储过程名</param>
//        /// <param name="parameters">存储过程参数</param>
//        /// <returns>SqlCommand 对象实例</returns>
//        private static SqlCommand BuildIntCommand(SqlConnection connection, string storedProcName, IDataParameter[] parameters)
//        {
//            SqlCommand command = BuildQueryCommand(connection, storedProcName, parameters);
//            command.Parameters.Add(new SqlParameter("ReturnValue",
//                SqlDbType.Int, 4, ParameterDirection.ReturnValue,
//                false, 0, 0, string.Empty, DataRowVersion.Default, null));
//            return command;
//        }
//        #endregion

//        #region 获取存储过程参数
//        /// <summary>
//        /// 获取存储过程参数数组
//        /// </summary>
//        /// <param name="spName">存储过程名</param>
//        /// <param name="hasReturn">是否包含返回类型的参数</param>
//        /// <returns>参数数组</returns>
//        private static SqlParameter[] GetSpParameterSet(string spName, bool hasReturn)
//        {
//            using (SqlConnection _connection = new SqlConnection(connectionString))
//            {
//                using (SqlCommand cmd = new SqlCommand())
//                {
//                    //为命令指定连接
//                    cmd.Connection = _connection;

//                    //如果数据连接未开启，打开它
//                    if (_connection.State != ConnectionState.Open)
//                    {
//                        _connection.Open();
//                    }
//                    //指定CommandText为存储过程名
//                    cmd.CommandText = spName;
//                    cmd.CommandType = CommandType.StoredProcedure;
//                    //从存储过程中检索参数，填充到Parameters集
//                    try
//                    {
//                        SqlCommandBuilder.DeriveParameters(cmd);
//                    }
//                    catch (Exception e)
//                    {
//                        //执行失败
//                        //从异常中获取失败信息
//                        string msg = e.Message;
//                        //调用写日志方法
//                        //Trace.Write("DeriveParameters", "Error", spName + "|" + msg);
//                    }

//                    //如果有返回值
//                    if (!hasReturn)
//                    {
//                        cmd.Parameters.RemoveAt(0);
//                    }

//                    //将Parameters集中的参数复制到参数数组
//                    SqlParameter[] para = new SqlParameter[cmd.Parameters.Count];
//                    cmd.Parameters.CopyTo(para, 0);

//                    return para;
//                }
//            }
//        }

//        /// <summary>
//        /// 深拷贝缓存中的参数序列
//        /// </summary>
//        /// <param name="originalParameters">源参数序列</param>
//        /// <returns>拷贝后的参数序列</returns>
//        private static SqlParameter[] CloneParameters(SqlParameter[] originalParameters)
//        {
//            //深拷贝缓存中的参数序列
//            SqlParameter[] clonedParameters = new SqlParameter[originalParameters.Length];

//            for (int i = 0, j = originalParameters.Length; i < j; i++)
//            {
//                clonedParameters[i] = (SqlParameter)((ICloneable)originalParameters[i]).Clone();
//            }

//            return clonedParameters;
//        }

//        /// <summary>
//        /// 获取存储过程参数
//        /// </summary>
//        /// <param name="spName">存储过程名</param>
//        /// <param name="hasReturn">是否包含返回值</param>
//        /// <returns>返回参数序列</returns>
//        public static SqlParameter[] GetSpParameters(string spName, bool hasReturn)
//        {
//            //缓存HashTable的主键
//            string cacheKey = spName + (hasReturn ? ":hasReturn" : "");
//            //从Hachtable中获取参数
//            SqlParameter[] cachedParameters = (SqlParameter[])myCache[cacheKey];
//            if (cachedParameters == null)
//            {
//                //如果Hachtable中没有，调用获取存储过程参数数组方法
//                cachedParameters = (SqlParameter[])(myCache[cacheKey] = GetSpParameterSet(spName, hasReturn));
//            }

//            return CloneParameters(cachedParameters);
//        }
//        #endregion

//        #region 更新表
//        /// <summary>
//        /// 保存单表数据
//        /// </summary>
//        /// <param name="ADataTable">内存表</param>
//        public static void SaveTable(DataTable ADataTable)
//        {
//            if (ADataTable == null)
//            {
//                throw new Exception("DataTable不存在!");
//            }
//            SaveTable(ADataTable, ADataTable.TableName);
//        }
//        /// <summary>
//        /// 保存带表名的单表
//        /// </summary>
//        /// <param name="ADataTable"></param>
//        /// <param name="ATableName"></param>
//        public static void SaveTable(DataTable ADataTable, string ATableName)
//        {
//            string strSelect = BuilderSelect(ADataTable, ATableName);

//            SaveTable(ADataTable, ATableName, strSelect);
//        }
//        /// <summary>
//        /// 保存自定制查询SQL的单表
//        /// </summary>
//        /// <param name="ADataTable"></param>
//        /// <param name="ATableName"></param>
//        /// <param name="AUpdateSQL"></param>
//        public static void SaveTable(DataTable ADataTable, string ATableName, string AUpdateSQL)
//        {
//            if (ADataTable == null)
//            {
//                throw new Exception("DataTable不存在!");
//            }
//            //下面是初始化数据库连接自己设置吧 
//            SqlConnection sconnGlobal = new SqlConnection(ConnectionString);
//            sconnGlobal.Open();
//            SqlTransaction stracGlobal = sconnGlobal.BeginTransaction();      //可以添加事物处理 
//            SqlDataAdapter sdaGlobal;

//            string strSelect = AUpdateSQL;

//            sdaGlobal = new SqlDataAdapter();
//            sdaGlobal.SelectCommand = new SqlCommand(strSelect, sconnGlobal);
//            sdaGlobal.SelectCommand.Transaction = stracGlobal;

//            //重要的地方来了 
//            SqlCommandBuilder scombuilder = new SqlCommandBuilder(sdaGlobal);
//            scombuilder.ConflictOption = ConflictOption.OverwriteChanges;
//            scombuilder.SetAllValues = false;
//            scombuilder.RefreshSchema();
//            //该生成可供执行的数据库操作命令 
//            sdaGlobal.UpdateCommand = scombuilder.GetUpdateCommand();
//            sdaGlobal.InsertCommand = scombuilder.GetInsertCommand();
//            sdaGlobal.DeleteCommand = scombuilder.GetDeleteCommand();

//            //可以设置一把TimeOut,随便设置 
//            sdaGlobal.UpdateCommand.CommandTimeout = 1000;
//            sdaGlobal.InsertCommand.CommandTimeout = 1000;
//            sdaGlobal.DeleteCommand.CommandTimeout = 1000;

//            //可以加上你们事物 
//            sdaGlobal.UpdateCommand.Transaction = stracGlobal;
//            sdaGlobal.DeleteCommand.Transaction = stracGlobal;
//            sdaGlobal.InsertCommand.Transaction = stracGlobal;
//            try
//            {
//                //可以进行更新了 
//                sdaGlobal.AcceptChangesDuringUpdate = false;
//                sdaGlobal.Update(ADataTable);
//                ADataTable.AcceptChanges();
//                //关闭数据连接什么的,我也不写了,偷懒 
//                stracGlobal.Commit();
//            }
//            catch (Exception ex)
//            {
//                //异常处理自己写 
//                stracGlobal.Rollback();
//                throw new Exception(ex.Message);
//            }
//        }

//        /// <summary>
//        /// 为单表建立更新语句
//        /// </summary>
//        /// <param name="ADataTable"></param>
//        /// <param name="ATableName"></param>
//        public static string BuilderSelect(DataTable ADataTable, string ATableName)
//        {
//            if (ADataTable == null)
//            {
//                throw new Exception("DataTable不存在!");
//            }
//            //做一个DataTable,取数据库中表名和主键用的 
//            DataTable dtColStat;
//            DataTable dtCols;

//            //取得对象的标示种子 
//            string ssqlcolsstat = "select distinct objs.name as tblname,cols.name as colname,cols.colstat as colstat"
//                + " from sysobjects objs join syscolumns cols on (objs.id=cols.id) "
//                + " where colstat='1' and objs.name ='{0}'";

//            string ssqlcols = "select distinct objs.name as tblname,cols.name as colname,cols.colstat as colstat"
//                + " from sysobjects objs join syscolumns cols on (objs.id=cols.id) "
//                + " where objs.name ='{0}'";

//            ssqlcolsstat = string.Format(ssqlcolsstat, ATableName);
//            ssqlcols = string.Format(ssqlcols, ATableName);
//            try
//            {
//                DataSet ds = Query(ssqlcolsstat);
//                dtColStat = ds.Tables[0];
//                ds = Query(ssqlcols);
//                dtCols = ds.Tables[0];
//            }
//            catch (System.Exception ex)
//            {
//                throw new Exception(ex.Message);
//            }
//            string strSelect;         //准备用SelectCommand 

//            //string strStatColName = string.Empty;   //准备得到的Column名称    
//            string strColName = string.Empty;
//            StringBuilder sbCols = new StringBuilder(128);
//            //下面拼装Select语句,取出主键和要更新的所有Column 
//            sbCols.Append("select ");
//            foreach (DataColumn dc in ADataTable.Columns)
//            {
//                strColName = dc.ColumnName;
//                DataRow[] drs = dtColStat.Select("colname='" + strColName + "'");
//                DataRow[] drcols = dtCols.Select("colname='" + strColName + "'");
//                if ((drs.Length <= 0) && (drcols.Length > 0)) //非标示种子列和有效的数据库列；
//                {
//                    sbCols.Append(strColName);
//                    sbCols.Append(",");
//                }
//            }
//            if (sbCols.Length > 7)
//                sbCols.Remove(sbCols.Length - 1, 1);
//            sbCols.Append(" from ");
//            sbCols.Append(ATableName);
//            strSelect = sbCols.ToString();

//            return strSelect;
//        }
//        /// <summary>
//        /// 更新多表
//        /// </summary>
//        /// <param name="ADataTable"></param>
//        public static void SaveTables(DataTable[] ADataTable)
//        {
//            if (ADataTable == null)
//            {
//                throw new Exception("ADataTable不存在!");
//            }
//            string[] UpdateSQL;
//            StringBuilder strBuilder = new StringBuilder();
//            ArrayList sqlList = new ArrayList();
//            foreach (DataTable dt in ADataTable)
//            {
//                string s = BuilderSelect(dt, dt.TableName);
//                sqlList.Add(s);
//            }
//            UpdateSQL = (string[])sqlList.ToArray(typeof(string));
//            SaveTables(ADataTable, UpdateSQL);
//        }
//        /// <summary>
//        /// 
//        /// </summary>
//        /// <param name="ADataTable"></param>
//        /// <param name="AUpdateSQL"></param>
//        public static void SaveTables(DataTable[] ADataTable, string[] AUpdateSQL)
//        {
//            if ((ADataTable == null) && (AUpdateSQL == null))
//            {
//                throw new Exception("DataTable不存在!");
//            }
//            if (ADataTable.Length != AUpdateSQL.Length)
//            {
//                throw new Exception("长度不一致!");
//            }
//            //下面是初始化数据库连接自己设置吧 
//            SqlConnection sconnGlobal = new SqlConnection(ConnectionString);
//            sconnGlobal.Open();
//            SqlTransaction stracGlobal = sconnGlobal.BeginTransaction();      //可以添加事物处理 
//            SqlDataAdapter sdaGlobal;

//            string strSelect = "";

//            sdaGlobal = new SqlDataAdapter();
//            sdaGlobal.SelectCommand = new SqlCommand(strSelect, sconnGlobal);
//            sdaGlobal.SelectCommand.Transaction = stracGlobal;
//            try
//            {
//                for (int i = 0; i < ADataTable.Length; i++)
//                {
//                    DataTable dt = ADataTable[i];
//                    strSelect = AUpdateSQL[i];
//                    sdaGlobal.SelectCommand.CommandText = strSelect;
//                    sdaGlobal.AcceptChangesDuringUpdate = true;
//                    //重要的地方来了 
//                    SqlCommandBuilder scombuilder = new SqlCommandBuilder(sdaGlobal);
//                    scombuilder.ConflictOption = ConflictOption.OverwriteChanges;
//                    scombuilder.SetAllValues = false;
//                    scombuilder.RefreshSchema();
//                    //该生成可供执行的数据库操作命令 
//                    sdaGlobal.UpdateCommand = scombuilder.GetUpdateCommand();
//                    sdaGlobal.InsertCommand = scombuilder.GetInsertCommand();
//                    sdaGlobal.DeleteCommand = scombuilder.GetDeleteCommand();

//                    //可以设置一把TimeOut,随便设置 
//                    sdaGlobal.UpdateCommand.CommandTimeout = 1000;
//                    sdaGlobal.InsertCommand.CommandTimeout = 1000;
//                    sdaGlobal.DeleteCommand.CommandTimeout = 1000;

//                    //可以加上你们事物 
//                    sdaGlobal.UpdateCommand.Transaction = stracGlobal;
//                    sdaGlobal.DeleteCommand.Transaction = stracGlobal;
//                    sdaGlobal.InsertCommand.Transaction = stracGlobal;

//                    //可以进行更新了 
//                    sdaGlobal.AcceptChangesDuringUpdate = false;
//                    sdaGlobal.Update(dt);
//                    //dt.AcceptChanges();
//                }
//                //关闭数据连接什么的,我也不写了,偷懒 
//                stracGlobal.Commit();
//                for (int i = 0; i < ADataTable.Length; i++)
//                {
//                    DataTable dt = ADataTable[i];
//                    dt.AcceptChanges();
//                }
//            }
//            catch (Exception ex)
//            {
//                //异常处理自己写 
//                stracGlobal.Rollback();
//                throw new Exception(ex.Message);
//            }
//        }
//        #endregion


//        #region 转换 数据库字段类型 为 c#类型

//        /// <summary>
//        /// 转换数据库字段类型为c#类型
//        /// </summary>
//        /// <param name="dbtype">数据库字段类型</param>
//        /// <returns>c#类型</returns>		
//        public static string DbTypeToCS(string dbtype)
//        {
//            string CSType = "string";
//            switch (dbtype.ToLower().Trim())
//            {
//                case "varchar":
//                case "varchar2":
//                case "nvarchar":
//                case "nvarchar2":
//                case "char":
//                case "nchar":
//                case "text":
//                case "ntext":
//                case "string":
//                    CSType = "string";
//                    break;
//                case "date":
//                case "datetime":
//                case "smalldatetime":
//                case "DateTime":
//                    CSType = "DateTime";
//                    break;
//                case "smallint":
//                case "int":
//                case "number":
//                case "bigint":
//                case "tinyint":
//                    CSType = "int";
//                    break;
//                case "float":
//                case "numeric":
//                case "decimal":
//                case "money":
//                case "smallmoney":
//                case "real":
//                    CSType = "decimal";
//                    break;
//                case "bit":
//                case "bool":
//                    CSType = "bool";
//                    break;
//                case "binary":
//                case "varbinary":
//                case "image":
//                case "raw":
//                case "long":
//                case "long raw":
//                case "blob":
//                case "bfile":
//                case "byte[]":
//                    CSType = "byte[]";
//                    break;
//                case "uniqueidentifier":
//                case "Guid":
//                    CSType = "Guid";
//                    break;
//                default:
//                    CSType = "string";
//                    break;
//            }
//            return CSType;
//        }
//        #endregion
//    }

//}
