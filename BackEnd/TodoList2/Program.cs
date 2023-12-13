using Microsoft.Extensions.Options;
using MongoDB.Driver;
using WebAppAPI.Models;
using WebAppAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<CommentStoreDatabaseSettings>(builder.Configuration.GetSection(nameof(CommentStoreDatabaseSettings)));
builder.Services.AddSingleton<ICommentStoreDatabaseSettings>(sp => sp.GetRequiredService<IOptions<CommentStoreDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient(builder.Configuration.GetValue<string>("CommentStoreDatabaseSettings:ConnectionString")));
builder.Services.AddScoped<ITodoService, TodoService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(p => p.AddPolicy("MyCors", build => { build.WithOrigins("*").AllowAnyMethod().AllowAnyHeader(); })) ;

var app = builder.Build();
app.UseCors("MyCors");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
