using System;

namespace Help
{
    public static class GetMime
    {
        private static string retval;
        public static string MimeType(string strFileName)
        {
            retval = "";
            switch (System.IO.Path.GetExtension(strFileName).ToLower())
            {
                case ".bmp": retval = "image/bmp"; 
                    break;
                case ".doc": retval = "application/msword"; 
                    break;
                case ".docx": retval = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    break;
                case ".gif": retval = "image/gif"; 
                    break;
                case ".jpeg": retval = "image/jpeg"; 
                    break;
                case ".jpg": retval = "image/jpeg"; 
                    break;
                case ".mp3": retval = "audio/mpeg"; 
                    break;
                case ".pdf": retval = "application/pdf"; 
                    break;
                case ".png": retval = "image/png"; 
                    break;
                case ".ppt": retval = "application/vnd.ms-powerpoint"; 
                    break;
                case ".pptx": retval = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                    break;
                case ".rar": retval = "application/octet-stream"; 
                    break;
                case ".swf": retval = "application/x-shockwave-flash"; 
                    break;
                case ".txt": retval = "text/plain"; 
                    break;
                case ".wav": retval = "audio/wav"; 
                    break;
                case ".xls": retval = "application/vnd.ms-excel"; 
                    break;
                case ".xlsx": retval = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    break;
                case ".zip": retval = "application/zip"; 
                    break;
                default: retval = "application/octet-stream"; 
                    break;
            }
            return retval;
        }

    }
}
