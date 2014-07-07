using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;
using System.Data;

namespace Help
{
    //public interface CreateFactory
    //{
    //    dynamic CreateConnection(string connection);
    //    dynamic CreateCommand();
    //}

    //使用工厂模式、模版模式

    public abstract class SQLHelper
    {
        #region 公用方法    将子类的共同点提取出来，放在父类中共用。
        //protected void Param_ExecuteScalar<T, U, K>( T cn, U cmd, IList<K> list) 
        //    where T : class
        //    where U : class
        //    where K : class

        //protected void Param_ExecuteScalar(dynamic cn, dynamic cmd, dynamic list, ref object result)

        /*使用接口类型，这样对所有数据库都通用。
         * 不用接口类型，因为如MySqlParameter不仅仅是实现了IDataParameter接口，
         * 还实现了其它接口和类：
         * DbParameter, IDbDataParameter, IDataParameter, ICloneable
         * 所以不能用接口类型，这样的话就不能调用其它接口的方法和属性了。
        protected virtual void Param_ExecuteScalar(IDbConnection cn, IDbCommand cmd, IList<IDataParameter> list, ref object result)
         */

        //protected void Param_ExecuteScalar(dynamic cn, dynamic cmd, dynamic list, ref object result)
        //{
        //    cn.Open();
        //    foreach (var item in list)
        //    {
        //        cmd.Parameters.Add(item);
        //    }
        //    result = cmd.ExecuteScalar();
        //    cmd.Parameters.Clear();
        //}







        ///// <summary>
        ///// 将数组的元素转化为MySqlParameter对象，然后装入List集合并返回。
        ///// 
        ///// 该方法用于参数化查询。
        ///// </summary>
        ///// <param name="_param">_param为二维数组，行数代表有参数个数。
        ///// 列数为固定的4列，依次参数名称、参数类型、参数大小、参数的值。
        ///// </param>
        ///// <returns></returns>
        //public IList<IDataParameter> PrepareParam(string[,] _param)
        //{
        //    //MySqlParameter u = null;
        //    IList<IDataParameter> list = new List<IDataParameter>();    //此处也要改用接口类型，否则调用Param_ExecuteScalar时会出错。
        //    //string name = string.Empty;
        //    MySqlDbType type;
        //    int param_length = 0;
        //    object value = null;
        //    bool exist_direction = _param.GetLength(1) == 5 ? true : false; //参数是否有方向属性（用于存储过程）

        //    for (int i = 0, _length = _param.GetLength(0); i < _length; i++)
        //    {
        //        //name = string.Format("?{0}", _param[i, 0]);
        //        var name = BuildParamName(_param[i, 0]);
        //        type = GetType(_param[i, 1]);
        //        param_length = Convert.ToInt32(_param[i, 2]);
        //        value = _param[i, 3];

        //        var u = new MySqlParameter(name, type, param_length);
        //        u.Value = value;

        //        if (exist_direction)    //如果是存储过程的参数（有方向属性）
        //        {
        //            //转换为枚举类型
        //            u.Direction = (System.Data.ParameterDirection)Enum.Parse(typeof(System.Data.ParameterDirection), _param[i, 4]);
        //        }
        //        list.Add(u);
        //    }
        //    return list;
        //}
        ///// <summary>
        ///// 模版方法
        ///// </summary>
        ///// <param name="type"></param>
        ///// <returns></returns>
        //protected abstract dynamic GetType(string type);

        //protected abstract dynamic BuildParamName(string name);

        #endregion
        #region 模版方法    使用dynamic可以使其在运行时解析。

        //只可以在子类中重写，外部调用者不能调用这些内部方法
        protected abstract dynamic CreateConnection(string connection);

        protected abstract dynamic CreateCommand();

        protected abstract string GetConnection();


        #endregion
        #region 子类实现的方法

        public abstract dynamic PrepareParam(string[,] _param);

        /// <summary>
        /// 重载PrepareParam
        /// </summary>
        /// <param name="p"></param>
        /// <param name="pageSize"></param>
        /// <param name="total"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public abstract dynamic PrepareParam(int p, int pageSize, string total, string query);
        #endregion
        #region 简单查询
        #region 普通查询
        /// <summary>
        /// 执行返回单值的查询
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <returns></returns>
        public abstract object ExecuteScalar(string sqlStr);    //这个函数比较简单，就在子类中实现就好了
        #endregion
        #region 带参数查询
        /// <summary>
        /// 执行带参数的返回DataReader的查询
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <param name="_param"></param>
        /// <returns></returns>
        public dynamic ExecuteReader(string sqlStr, string[,] _param)
        {
            //object returnReader = null;
            var cn = CreateConnection(GetConnection());  //工厂方法获得实例
            {
                using (var cmd = CreateCommand())
                {
                    cmd.CommandText = sqlStr;
                    cmd.Connection = cn;
                    //Param_ExecuteScalar<MySqlConnection, MySqlCommand, MySqlParameter>(cn, cmd, PrepareParam(_param));

                    cn.Open();
                    var list = PrepareParam(_param);    //调用模版方法
                    foreach (var item in list)
                    {
                        cmd.Parameters.Add(item);
                    }
                    var returnReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  //关闭DataReader时默认关闭cn
                    return returnReader;
                }
            }
        }


        /// <summary>
        /// 执行带参数的返回单值的查询
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <returns></returns>
        //public abstract object ExecuteScalar(string sqlStr, string[, ] _param);


        /// <summary>
        /// 执行带参数的返回单值的查询。
        /// 运用了模版模式、工厂模式。
        /// </summary>
        /// <param name="sqlStr"></param>
        /// <param name="_param"></param>
        /// <returns></returns>
        public object ExecuteScalar(string sqlStr, string[,] _param)
        {
            object result = null;
            using (var cn = CreateConnection(GetConnection()))  //工厂方法获得实例
            {
                using (var cmd = CreateCommand())
                {
                    try
                    {
                        cmd.CommandText = sqlStr;
                        cmd.Connection = cn;
                        //Param_ExecuteScalar<MySqlConnection, MySqlCommand, MySqlParameter>(cn, cmd, PrepareParam(_param));

                        cn.Open();
                        var list = PrepareParam(_param);    //调用模版方法
                        foreach (var item in list)
                        {
                            cmd.Parameters.Add(item);
                        }
                        result = cmd.ExecuteScalar();
                        cmd.Parameters.Clear();

                    }
                    catch (MySqlException e)
                    {
                        cn.Close();
                        throw new Exception(e.Message);
                    }
                    //finally
                    //{
                    //    cn.Close();
                    //}
                }
                cn.Close(); //可以不用显示关闭连接，因为using代码段结束后，会隐式关闭。
                return result;
            }
        }

        /// <summary>
        /// 执行ExecuteNonQuery，使用数据库事务。
        /// </summary>
        /// <param name="SQLStringList">多条SQL语句</param>		
        public int ExecuteSqlTran(string sqlStr, string[,] _param)     
        {
            int count = 0;
            using (var cn = CreateConnection(GetConnection()))  
            {
                cn.Open();
                using (var cmd = CreateCommand())
                {
                    cmd.Connection = cn;
                    using (var tx = cn.BeginTransaction())
                    {
                        cmd.Transaction = tx;
                        try
                        {
                            //for (int n = 0; n < SQLStringList.Count; n++)
                            //{
                            //    string strsql = SQLStringList[n].ToString();
                            //    if (strsql.Trim().Length > 1)
                            //    {
                            cmd.CommandText = sqlStr;
                            var list = PrepareParam(_param);    //调用模版方法
                            foreach (var item in list)
                            {
                                cmd.Parameters.Add(item);
                            }
                            count = cmd.ExecuteNonQuery();
                                //}
                            //}
                            tx.Commit();
                            return count;
                        }
                        catch (System.Data.SqlClient.SqlException E)
                        {
                            tx.Rollback();
                            cn.Close();
                            throw new Exception(E.Message);
                        }
                        finally
                        {
                            cn.Close();
                        }
                    }
                }
            }
        }
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
        public dynamic RunProcedure(string storedProcName, string[,] _param)
        {
            //dynamic returnReader = null;

            /* IDbDataParameter 和 IDataParameter 的区别：
             * IDbDataParameter接口 是用于 Visual Basic .NET 数据设计器使用，它继承了IDataParameter接口。
             * IDataParameter 是最顶端的接口。
             * 
             * 此处不用接口类型，因为子类对接口进行了扩展，因此接口类型不能使用子类扩展的方法。
             */
            var cn = CreateConnection(GetConnection());
            cn.Open();
            using (var cmd = CreateCommand())
            {
                cmd.CommandText = storedProcName;
                cmd.Connection = cn;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                var list = PrepareParam(_param);
                foreach (var item in list)
                {
                    cmd.Parameters.Add(item);
                }
                //result = cmd.ExecuteScalar();
                var returnReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  //关闭DataReader时默认关闭cn
                //cmd.Parameters.Clear();   //不能要这句，否则取不到参数。
                return returnReader;
            }
        }


        public dynamic RunProcedure(string storedProcName, dynamic list)
        {
            //dynamic returnReader = null;

            /* IDbDataParameter 和 IDataParameter 的区别：
             * IDbDataParameter接口 是用于 Visual Basic .NET 数据设计器使用，它继承了IDataParameter接口。
             * IDataParameter 是最顶端的接口。
             * 
             * 此处不用接口类型。
             */
            var cn = CreateConnection(GetConnection());
            cn.Open();
            using (var cmd = CreateCommand())
            {
                cmd.CommandText = storedProcName;
                cmd.Connection = cn;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                //var list = PrepareParam(_param);
                foreach (var item in list)
                {
                    cmd.Parameters.Add(item);
                }
                //result = cmd.ExecuteScalar();
                var returnReader = cmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);  //关闭DataReader时默认关闭cn
                //cmd.Parameters.Clear();   //不能要这句，否则取不到参数。
                return returnReader;
            }
        }



        public dynamic RunNonQueryProcedure(string storedProcName, string[,] _param)
        {
            //dynamic returnReader = null;

            /* IDbDataParameter 和 IDataParameter 的区别：
             * IDbDataParameter接口 是用于 Visual Basic .NET 数据设计器使用，它继承了IDataParameter接口。
             * IDataParameter 是最顶端的接口。
             * 
             * 此处不用接口类型。
             */
            var cn = CreateConnection(GetConnection());
            cn.Open();
            using (var cmd = CreateCommand())
            {
                cmd.CommandText = storedProcName;
                cmd.Connection = cn;
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                var list = PrepareParam(_param);
                foreach (var item in list)
                {
                    cmd.Parameters.Add(item);
                }
                //result = cmd.ExecuteScalar();
                cmd.ExecuteNonQuery();

                return list;    //返回参数，里面可取到Output的参数

                ////cmd.Parameters.Clear();   //不能要这句，否则取不到参数。
                //return returnReader;
            }
        }
        #endregion
    }
}
