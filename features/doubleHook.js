import settings from "../settings";

const doubleHook = /^(It\'s a Double Hook\! Woot woot\!|It's a Double Hook\!|Double Hook\!)$/;


// chat register double hook :3
register("chat", () => {
    if (settings.showDH)
    {
        ChatLib.command(`pc ${settings.DHMessage}`);
    }
}).setCriteria(doubleHook)
