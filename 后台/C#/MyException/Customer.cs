using System;

namespace Help
{
    public class NoObjectException : Exception
    {
        private string mymessage;
        public NoObjectException()
            : base()
        {
        }
        public NoObjectException(string message)
            : base()
        {
            mymessage = message;
        }
        public override string Message
        {
            get
            {
                return mymessage;
            }
        }
    }
    public class CanNotCreatException : Exception
    {
        private string mymessage;
        public CanNotCreatException()
            : base()
        {
        }
        public CanNotCreatException(string message)
            : base()
        {
            mymessage = message;
        }
        public override string Message
        {
            get
            {
                return mymessage;
            }
        }
    }
    public class CanNotEditException : Exception
    {
        private string mymessage;
        public CanNotEditException()
            : base()
        {
        }
        public CanNotEditException(string message)
            : base()
        {
            mymessage = message;
        }
        public override string Message
        {
            get
            {
                return mymessage;
            }
        }
    }
    public class CanNotDeleteException : Exception
    {
        public CanNotDeleteException() : base()
        {
        }
    }
    public class NullException : Exception
    {
        public NullException() : base()
        {
        }
    }
    public class FailException : Exception
    {
        private string mymessage;
        public FailException()
            : base()
        {
        }
        public FailException(string message)
            : base()
        {
            mymessage = message;
        }
        public override string Message
        {
            get
            {
                return mymessage;
            }
        }
    }
}
