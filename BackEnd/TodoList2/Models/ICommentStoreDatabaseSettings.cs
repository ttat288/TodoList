namespace WebAppAPI.Models
{
    public interface ICommentStoreDatabaseSettings
    {
        string CommentCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
