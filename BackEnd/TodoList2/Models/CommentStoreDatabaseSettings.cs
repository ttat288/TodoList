 using System;
namespace WebAppAPI.Models
{
    public class CommentStoreDatabaseSettings: ICommentStoreDatabaseSettings
    {
        public string CommentCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}
