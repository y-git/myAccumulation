using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

namespace Help
{
    public class MySQLHelper : SQLHelper
    {
        //private static readonly Help.XmlRoleOperation xml = new Help.XmlRoleOperation();

        /*此处不用静态connectionString，因为这样的话，MySQLHelper的实例就会全局共享该connectionString！！！
         * 并且后创建的MySQLHelper的实例的connectionString会覆盖之前的connectionString！！！
         */
        //private static string connectionString = string.Empty;
        private string connectionString = string.Empty;


        /* 不使用享元模式，否则要出问题！
         * 如SQLHelper.cs  RunProcedure:
         * cmd.Parameters.Add(item)后，不能清除cmd，否则取不到参数。
         * 然而这样在下一次调用SQLHelper.cs  RunProcedure并运行到cmd.Parameters.Add(item)时，由于该cmd
         * 是上一次的cmd，如果这次item中与上一次的添加的参数(item)有相同的参数，则会报错：不能添加相同的参数！
         */


        ///* 应用享元模式，共享实例。

        // * 9-21
        // */
        //private static MySqlConnection connection = null;
        //private static MySqlCommand command = null;

        public string ConnectionString   //只读
        {
            get
            {
                return connectionString;
            }
        }
        public MySQLHelper(string type)
        {
            //初始化连接字符串
            switch (type)
            {
                case "Contact_Database":
                    connectionString = ConfigurationManager.AppSettings["Contact_Database"];
                    //connectionString = "Server=192.168.6.106;Database=Contact_Database;User ID=yyc;Password=111111;";
                    //connectionString = xml.GetValue("Connection", "Contact_Database");
                    break;
                case "General_Database":
                    connectionString = ConfigurationManager.AppSettings["General_Database"];
                    //connectionString = "Server=192.168.6.106;Database=General_Database;User ID=yyc;Password=111111;";
                    //connectionString = xml.GetValue("Connection", "General_Database");
                    break;
                case "Secure_Database":
                    connectionString = ConfigurationManager.AppSettings["Secure_Database"];
                    //connectionString = xml.GetValue("Connection", "Secure_Database");
                    break;
                default:
                    connectionString = string.Empty;
                    break;
            }
            //connectionString = "Server=192.168.6.106;Database=Secure_Database;UserID=yyc;Password=111111;";
        }





        #region 扩展方法
        //private IList<T> PrepareParam<T>(string[ , ] _param) where T : class, new ()
        //{
        //    T u;
        //    IList<T> list;
        //    foreach (var array in _param) //不用foreach
        //    {

        //        u = new T("userID", MySqlDbType.VarChar, 50);   //只能无参构造函数，所以此处要报错
        //        u.tt = 1;
        //        u.Value = userID;
        //        p = new MySqlParameter("?password", MySqlDbType.VarChar, 20);
        //        p.Value = password;
        //    }
        //}

        /// <summary>
        /// 转化为特定数据库的类型（MySQL）
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public MySqlDbType GetType(string type)
        {
            MySqlDbType mysql_type;

            switch (type)
            {
                case "varchar":
                    mysql_type = MySqlDbType.VarChar;
                    break;
                case "int":
                    mysql_type = MySqlDbType.Int32;
                    break;
                case "long":
                    mysql_type = MySqlDbType.Int64;
                    break;
                default :
                    mysql_type = MySqlDbType.VarChar;
                    break;
            }
            return mysql_type;
        }
        #endregion
        #region 模版方法的实现     
        //不用享元模式
        protected override dynamic CreateConnection(string connection)     //返回类型要与抽象类定义的一致（即dynamic，而不能是MySqlConnection）
        {
            return new MySqlConnection(connection);
        }

        protected override dynamic CreateCommand()
        {
            return new MySqlCommand();
        }

        protected override string GetConnection()
        {
            return connectionString;
        }
        /// <summary>
        /// 将数组的元素转化为MySqlParameter对象，然后装入List集合并返回。
        /// 
        /// 该方法用于参数化查询。
        /// </summary>
        /// <param name="_param">_param为二维数组，行数代表有参数个数。
        /// 列数为固定的4列，依次参数名称、参数类型、参数大小、参数的值。
        /// </param>
        /// <returns></returns>
        public override dynamic PrepareParam(string[,] _param)  //返回类型也要为dynamic类型，与抽象类中的类型一致
        {
            MySqlParameter u = null;
            IList<MySqlParameter> list = new List<MySqlParameter>();    
            string name = string.Empty;
            MySqlDbType type;
            int param_length = 0;
            object value = null;
            bool exist_direction = _param.GetLength(1) == 5 ? true : false; //参数是否有方向属性（用于存储过程）

            for (int i = 0, _length = _param.GetLength(0); i < _length; i++)
            {
                name = string.Format("?{0}", _param[i, 0]);
                type = GetType(_param[i, 1]);

                if (_param[i, 2] == "") //不设置size,可用于int等类型
                {
                    u = new MySqlParameter(name, type);
                }
                else
                {
                    param_length = Convert.ToInt32(_param[i, 2]);

                    u = new MySqlParameter(name, type, param_length);
                }

                if (_param[i, 3] != "")
                {
                    switch (type)
                    {
                        case MySqlDbType.Int16:
                        case MySqlDbType.Int24:
                            value = Convert.ToInt16(_param[i, 3]);
                            break;
                        case MySqlDbType.Int32:
                            value = Convert.ToInt32(_param[i, 3]);
                            break;
                        case MySqlDbType.Int64:
                            value = Convert.ToInt64(_param[i, 3]);
                            break;
                        default :
                            value = _param[i, 3];
                            break;
                    }
                    u.Value = value;
                }
                //value = _param[i, 3];
                //u.Value = value;

                if (exist_direction)    //如果是存储过程的参数（有方向属性）
                {
                    //转换为枚举类型
                    switch (_param[i, 4])
                    {
                        case "Output":
                            u.Direction = System.Data.ParameterDirection.Output;
                            break;
                        case "Input":
                            u.Direction = System.Data.ParameterDirection.Input;
                            break;
                        case "InputOutput":
                            u.Direction = System.Data.ParameterDirection.InputOutput;
                            break;
                        default:    //""，为空，表示不设置参数方向
                            break;
                    }
                    //u.Direction = (System.Data.ParameterDirection)Enum.Parse(typeof(System.Data.ParameterDirection), _param[i, 4]);   //这句不行，换用上面的switch来判断
                }

                list.Add(u);
            }
            return list;
            //foreach (string array in _param)
            //{
            //    name = string.Format("?{0}", array[0]);
            //    type = GetType(array[1]);
            //    u = new MySqlParameter(name, array[1]);
            //    u.tt = 1;
            //    u.Value = userID;
            //    p = new MySqlParameter("?password", MySqlDbType.VarChar, 20);
            //    p.Value = password;
            //}
        }

        /// <summary>
        /// 重载PrepareParam
        /// </summary>
        /// <param name="p"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public override dynamic PrepareParam(int p, int pageSize, string total, string query)
        {
            string[,] _param = new string[,] { { "total", "int", "", "", "Output" }, 
                                                { "total_pageNum", "int", "", "", "Output"},
                                                { "currentPage", "int", "", p.ToString(), "Input" }, 
                                                { "pageSize", "int", "", pageSize.ToString(), "Input" },    //Model.
                                                { "sqlStr_total", "varchar", "500", total, "Input" },   
                                                { "sqlStr_query", "varchar", "500", query, "Input" } }; //字段大小要改为500，200太小了！
            MySqlParameter u = null;
            IList<MySqlParameter> list = new List<MySqlParameter>();
            string name = string.Empty;
            MySqlDbType type;
            int param_length = 0;
            object value = null;
            bool exist_direction = _param.GetLength(1) == 5 ? true : false; //参数是否有方向属性（用于存储过程）

            for (int i = 0, _length = _param.GetLength(0); i < _length; i++)
            {
                name = string.Format("?{0}", _param[i, 0]);
                type = GetType(_param[i, 1]);

                if (_param[i, 2] == "") //不设置size,可用于int等类型
                {
                    u = new MySqlParameter(name, type);
                }
                else
                {
                    param_length = Convert.ToInt32(_param[i, 2]);

                    u = new MySqlParameter(name, type, param_length);
                }

                if (_param[i, 3] != "")
                {
                    value = _param[i, 3];
                    u.Value = value;
                }
                //value = _param[i, 3];
                //u.Value = value;

                if (exist_direction)    //如果是存储过程的参数（有方向属性）
                {
                    //转换为枚举类型
                    switch (_param[i, 4])
                    {
                        case "Output":
                            u.Direction = System.Data.ParameterDirection.Output;
                            break;
                        case "Input":
                            u.Direction = System.Data.ParameterDirection.Input;
                            break;
                        case "InputOutput":
                            u.Direction = System.Data.ParameterDirection.InputOutput;
                            break;
                        default:    //""，为空，表示不设置参数方向
                            break;
                    }
                    //u.Direction = (System.Data.ParameterDirection)Enum.Parse(typeof(System.Data.ParameterDirection), _param[i, 4]);   //这句不行，换用上面的switch来判断
                }

                list.Add(u);
            }
            return list;
            //foreach (string array in _param)
            //{
            //    name = string.Format("?{0}", array[0]);
            //    type = GetType(array[1]);
            //    u = new MySqlParameter(name, array[1]);
            //    u.tt = 1;
            //    u.Value = userID;
            //    p = new MySqlParameter("?password", MySqlDbType.VarChar, 20);
            //    p.Value = password;
            //}
        }
        #endregion
        #region 简单查询
        #region 普通查询
        /// <summary>
        /// 执行返回单值的查询
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <returns></returns>
        public override object ExecuteScalar(string sqlStr)
        {
            object result = null;
            using (MySqlConnection cn = new MySqlConnection(connectionString))
            {
                using (MySqlCommand cmd = new MySqlCommand(sqlStr, cn))
                {
                    try
                    {
                        cn.Open();
                        result = cmd.ExecuteScalar();
                    }
                    catch (MySqlException e)
                    {
                        cn.Close();
                        throw new Exception(e.Message);
                    }
                }
                cn.Close(); //可以不用显示关闭连接，因为using代码段结束后，会隐式关闭。
                return result;
            }
        }
        #endregion
        #region 带参数查询
        /// <summary>
        /// 执行带参数的返回单值的查询
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <returns></returns>
        //public override object ExecuteScalar(string sqlStr, string[, ] _param)
        //{
        //    object result = null;
        //    using (MySqlConnection cn = new MySqlConnection(connectionString))
        //    {
        //        using (MySqlCommand cmd = new MySqlCommand(sqlStr, cn))
        //        {
        //            try
        //            {
                        
        //                //Param_ExecuteScalar<MySqlConnection, MySqlCommand, MySqlParameter>(cn, cmd, PrepareParam(_param));

        //                //调用父类方法。
        //                //注意此处result为地址传递。当然也可以不加ref，但使该函数返回修改后的result
        //                Param_ExecuteScalar(cn, cmd, PrepareParam(_param), ref result); 

        //                //cn.Open();
        //                //IList<MySqlParameter> list = PrepareParam(_param);
        //                //foreach (var item in list)
        //                //{
        //                //    cmd.Parameters.Add(item);
        //                //}
        //                //result = cmd.ExecuteScalar();
        //                //cmd.Parameters.Clear();
        //            }
        //            catch (MySqlException e)
        //            {
        //                cn.Close();
        //                throw new Exception(e.Message);
        //            }
        //        }
        //        cn.Close(); //可以不用显示关闭连接，因为using代码段结束后，会隐式关闭。
        //        return result;
        //    }
        //}
        #endregion
        #endregion
        #region 插入、编辑、删除
        #endregion
        #region 存储过程操作
        /// <summary>
        /// 执行存储过程 (返回DataReader，一定要记住关闭DataReader)
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        //public override IDataReader RunProcedure(string storedProcName, string[,] _param)
        //{
        //    MySqlDataReader returnReader = null;
        //    /* IDbDataParameter 和 IDataParameter 的区别：
        //     * IDbDataParameter接口 是用于 Visual Basic .NET 数据设计器使用，它继承了IDataParameter接口。
        //     * IDataParameter */
        //    IList<IDataParameter> list = null;
        //    MySqlConnection cn = new MySqlConnection(connectionString);
        //    cn.Open();
        //    using (MySqlCommand cmd = new MySqlCommand(storedProcName, cn))
        //    {
        //        cmd.CommandType = System.Data.CommandType.StoredProcedure;
        //        list = PrepareParam(_param);
        //        foreach (var item in list)
        //        {
        //            cmd.Parameters.Add(item);
        //        }
        //        //result = cmd.ExecuteScalar();
        //        cmd.Parameters.Clear();
        //        returnReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  //关闭DataReader时默认关闭cn
        //    }
        //    return returnReader;
        //    //SqlCommand command = BuildQueryCommand(connection, storedProcName, parameters);
        //    //command.CommandType = CommandType.StoredProcedure;
        //    //returnReader = command.ExecuteReader();
        //    ////Connection.Close(); 不能在此关闭，否则，返回的对象将无法使用            
        //    //return returnReader;


        //    //MySqlDataReader reader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
        //    //result = reader.FieldCount;
        //    //hasRows = reader.HasRows;
        //    //while (reader.Read())
        //    //{
        //    //    str = reader.GetString(0);
        //    //}
        //    //reader.Close();
        //}
        #endregion
    }
}
