using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.Expressions;
namespace Help
{
    public static class PredicateBuilder
    {
        //private static string str_left_body = null;
        //private static string str_right_body = null;
        //private static string new_body = null;

        public static Expression<Func<T, bool>> True<T>() { return f => true; }
        public static Expression<Func<T, bool>> False<T>() { return f => false; }

        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> expression1,
        Expression<Func<T, bool>> expression2)
        {

            var invokedExpression = Expression.Invoke(expression2, expression1.Parameters.Cast<Expression>());

            return Expression.Lambda<Func<T, bool>>

            (Expression.Or(expression1.Body, invokedExpression), expression1.Parameters);
        }



        public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> expression1,
        Expression<Func<T, bool>> expression2)
        {

            var invokedExpression = Expression.Invoke(expression2, expression1.Parameters.Cast<Expression>());

            return Expression.Lambda<Func<T, bool>>

            (Expression.And(expression1.Body, invokedExpression), expression1.Parameters);

        }




        public static Expression<Func<T, bool>> AndAlso<T>(this Expression<Func<T, bool>> left,
                                                            Expression<Func<T, bool>> right)
        {
            //var invokedExpr = Expression.Invoke(right, left.Parameters.Cast<Expression>());
            //return Expression.Lambda<Func<T, bool>>
            //      (Expression.And(left, right), left.Parameters);
            if (left == null)
            {
                return right;
            }
            else if (right == null)
            {
                return left;
            }
            else
            {
                //Expression newBody = AddBody<T, bool>(left.Body, right.Body, left.Parameters[0]);
                //return Expression.Lambda<Func<T, bool>>(Expression.And(left,right));
                //return AddBody<T>(left.Body, right.Body, left.Parameters[0]);
                return left.And<T>(right);
            }
        }

        /*******************有错误！**********************/
        //private static Expression<Func<T, bool>> AddBody<T>(Expression left_body, Expression right_body, ParameterExpression par)
        //{
        //    str_left_body = left_body.ToString();
        //    str_right_body = right_body.ToString();
        //    new_body = str_left_body + " && " + str_right_body;
        //    return System.Linq.Dynamic.DynamicExpression.ParseLambda<T, bool>(new_body, par);
        //}
        /************************************************/
    }
}
