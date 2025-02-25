using SI.Domain.Common.Utils;
using SI.Domain.Storage;
using SI.Infrastructure.Integrations.SimpleStorage;

class Terminal
{
    static void Main()
    {
        //var pass = "admin@123";
        //var genPass = pass.ToSHA256(",da1@Ban9**uong-nuoC@tr2n_c4yXanH");
        //Console.WriteLine(genPass);
        //Console.ReadLine();
        // GenerateGuidsToFile(600, @"../../../../guids.txt");
        // Console.WriteLine("600 GUIDs đã được tạo và lưu vào file 'guids.txt'.");
        // var a = StringUtils.CreateDeviceCode(0, 10);

        // foreach (var item in a)
        // {
        //     Console.WriteLine(item);
        // }

        // var b = StringUtils.CreateDeviceCode(a.Count());

        // Console.WriteLine(b);

        //  simpleStorage.NewBucket("testFromLocal1");
        // Console.ReadLine();
    }


    /// <summary>
    /// Sinh GUIDs và lưu vào file.
    /// </summary>
    /// <param name="count">Số lượng GUID cần sinh</param>
    /// <param name="filePath">Đường dẫn file lưu GUID</param>
    public static void GenerateGuidsToFile(int count, string filePath)
    {
        using StreamWriter writer = new(filePath);
        for (int i = 0; i < count; i++)
        {
            Guid guid = Guid.CreateVersion7();
            writer.WriteLine(guid);
        }
    }
}

//0193e2ce-ee41-7fcb-9b52-5bba105dc0bd -- id dev