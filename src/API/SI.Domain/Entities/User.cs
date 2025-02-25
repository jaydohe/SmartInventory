using SI.Domain.Common.Abstractions;
using SI.Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SI.Domain.Common.Primitives;
using SI.Domain.Common.Utils;
using SI.Domain.Events;

namespace SI.Domain.Entities;

public class User : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    public long? RefId { get; set; }

    [StringLength(512)]
    public string Name { get; set; } = null!;
    [StringLength(512)]
    public string LoginName { get; set; } = null!;
    [StringLength(512)]
    public string HashPassword { get; set; } = null!;
    public bool IsLogin { get; set; } = true;

    [ForeignKey(nameof(ZUnit))]
    public string? UnitId { get; set; }

    public CommonStatus Status { get; set; } = CommonStatus.ACTIVE;
    public UserRoles Role { get; set; } = UserRoles.MAINTENANCE;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual ZUnit? Unit { get; set; }

    public User(string id) : base(id) { }
    public User() : base() { }

    public TokenStore CreateToken()
    {
        return new TokenStore
        {
            CreatedAt = DateTimeOffset.UtcNow,
            UserId = this.Id,
            AccessToken = string.Empty,
            RefreshToken = string.Empty
        };
    }

    public void ActivityCreateUser(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.CREATED,
            $@"{userName} ({userRole}) đã thêm {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.USER,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityUpdateUser(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.UPDATED,
            $@"{userName} ({userRole}) đã cập nhật tài khoản {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.USER,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityLockUser(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.UPDATED,
            $@"{userName} ({userRole}) đã khóa tài khoản {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.USER,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityUnlockUser(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.UPDATED,
            $@"{userName} ({userRole}) đã mở khóa tài khoản {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.USER,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityUpdateUserRole(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.UPDATED,
            $@"{userName} ({userRole}) đã cập nhật phân quyền của {this.Name} thành {this.Role} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.USER,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityResetPass(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.UPDATED,
            $@"{userName} ({userRole}) đã cập nhật mật khẩu của {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.USER,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityDelUser(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.DELETED,
            $@"{userName} ({userRole}) đã xóa tài khoản {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.USER,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }
}

public class UserConfiguration() : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        var guidFilePath = @"../guids.txt";
        try {
            var guids = File.ReadAllLines(guidFilePath);
            
            var users = new List<User>();

            // account dev
            var dev = new User("0193e2ce-ee41-7fcb-9b52-5bba105dc0bd")
            {
                Name = "Develop",
                LoginName = "dev0",
                //dev@123
                HashPassword = "27dee27aa573be269f95143a213fe18e29a90e1124b371d280a6c4b88f85f749",
                Role = UserRoles.DEV
            };
            users.Add(dev);

            int index = 50;
            for(int i = 0; i < 50; i++)
            {
                //account admin in each unit
                var unitId = guids[i].ToString();
                users.Add(new User(guids[index].ToString())
                {
                    Name = $"Admin {i + 1}",
                    LoginName = $"admin{i + 1}",
                    //admin@123
                    HashPassword = "7ced44abd56279573d3e9730f7845fd68bb5e1d1b09dee076b066f53ca8e8247",
                    Role = UserRoles.ADMIN,
                    UnitId = unitId
                });
                int userIndex = 1;
                // 10 account user in each unit
                for(int j = index + 1; j <= index + 10; j++)
                {
                    users.Add(new User(guids[j].ToString())
                    {
                        Name = $"User-N{i+1}-{userIndex}",
                        LoginName = $"user-N{i + 1}-{userIndex}",
                        //user@123
                        HashPassword = "cfbff703c63d47180b95190dac7b4ca5e04e20af5b3c5ec515e4136710815d84",
                        Role = UserRoles.MAINTENANCE,
                        UnitId = unitId
                    });
                    userIndex++;
                }
                index += 11;
            }

            builder.HasData(users);
        }catch {
            
        }
       
        builder.HasIndex(e => e.RefId);
    }
}
