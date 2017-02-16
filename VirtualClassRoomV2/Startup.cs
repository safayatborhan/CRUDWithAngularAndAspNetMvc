using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(VirtualClassRoomV2.Startup))]
namespace VirtualClassRoomV2
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
