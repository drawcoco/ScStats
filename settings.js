import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @DecimalSliderProperty,
    @PercentSliderProperty,
    @SliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant
} from "Vigilance";


@Vigilant("scStats", "scStats", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Informations", "Graphs", "Worm", "Party ping", "Others"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})


class Settings
{
    constructor() {
        this.initialize(this)

        this.addDependency("Double hook message", "Double hook party alert");

        this.addDependency("Receive ping Thunder", "Party ping Thunder");
        this.addDependency("Receive ping Jawbus", "Party ping Jawbus");

        //this.addDependency("Worm fishing Party Notifier", "Worm fishing Counter");
        //this.addDependency("Worm fishing Party Stats", "Worm fishing Counter");

        this.addDependency("Show graphs","Show Info");
        //this.addDependency("Thunder stats color","Show Info");
        //this.addDependency("Jawbus stats color","Show Info");
        //this.addDependency("Thunder stats color","Show graphs");
        //this.addDependency("Jawbus stats color","Show graphs");
        
        this.setCategoryDescription("Informations", `ScStats`);
    }



//##############################################################################
//                INFORMATIONS
//##############################################################################

    @ButtonProperty({
        name: "Discord",
        description: "You can join the Discord to see updates, give feature ideas, and report bugs! ",
        category: "Informations",
        placeholder: "Join Us !"
    })
    MyDiscord() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/8YcmJA7aeM"));
    }
        
    @DecimalSliderProperty({
        name: "Global Text Size",
        description: "global text size for all displays",
        category: "Informations",
        subcategory: "Global Variables",
        minF: 0.1,
        maxF: 2,
        decimalPlaces: 2
    })
    textSize = 1;

    @ButtonProperty({
        name: "Move GUI elements",
        description: "Click the button to move the elements on your screen",
        category: "Informations",
        subcategory: "GUI"
    })
    openBobberGUI() {
        ChatLib.command("moveGraph", true);
    }

//##############################################################################
//                GRAPHS
//##############################################################################

    @SwitchProperty({
        name: "Show Info",
        description: "show informations like average and catches since last catch on screen",
        category: "Graphs",
        subcategory: "On screen info"
    })
    showInfos = true;

    @SwitchProperty({
        name: "Show graphs",
        description: "show two graphs with the number of catches per big sea creature you had (keep the minimalite informations on screen)",
        category: "Graphs",
        subcategory: "On screen info"
    })
    showGraphs = true;
/*
    @ColorProperty({
        name: "Thunder stats color",
        description: "Pick a Color for the Thunder related infos",
        category: "Graphs",
        subcategory: "On screen info"
    })
    thunderColor = Color.BLUE;

    @ColorProperty({
        name: "Jawbus stats color",
        description: "Pick a Color for the Jawbus related infos",
        category: "Graphs",
        subcategory: "On screen info"
    })
    jawbusColor = Color.YELLOW;
*/

    //##############################################################################
    //                Worm
    //##############################################################################


    @SwitchProperty({
        name: "Worm fishing Counter",
        description: "count the number of worms near you, and send a party message when it cap",
        category: "Worm",
        subcategory: "Worm"
    })
    wormCounter = false;


    @SwitchProperty({
        name: "Worm fishing Party Notifier",
        description: "Notify the party when the cap for worms is reached",
        category: "Worm",
        subcategory: "Worm"
    })
    wormPartyNotifier = false;

    @SwitchProperty({
        name: "Worm fishing Party Stats",
        description: "Worm fishing Party Stats",
        category: "Worm",
        subcategory: "Worm"
    })
    wormStatsDisplay = false;

    @SwitchProperty({
        name: "Worm fishing Personal Stats",
        description: "Worm fishing Personal Stats",
        category: "Worm",
        subcategory: "Worm"
    })
    wormPersonalDisplay = false;


    //##############################################################################
    //                Party ping
    //##############################################################################

    @SwitchProperty({
        name: "Party ping Thunder",
        description: "send a ping message to the party when you get a Thunder.",
        category: "Party ping",
        subcategory: "Party ping"
    })
    sendThunder = true;

    @SwitchProperty({
        name: "Receive ping Thunder",
        description: "also receive ping messages from the party for Thunder.",
        category: "Party ping",
        subcategory: "Party ping"
    })
    getThunder = true;

    @SwitchProperty({
        name: "Party ping Jawbus",
        description: "send a ping message to the party when you get a Jawbus.",
        category: "Party ping",
        subcategory: "Party ping"
    })
    sendJawbus = true;

    @SwitchProperty({
        name: "Receive ping Jawbus",
        description: "also receive ping messages from the party for Jawbus.",
        category: "Party ping",
        subcategory: "Party ping"
    })
    getJawbus = true;

    //##############################################################################
    //                Others
    //##############################################################################

    @SwitchProperty({
        name: "Double hook party alert",
        description: "send a custom message to the party when you get a double hook! Woot Woot!",
        category: "Others",
        subcategory: "Double Hook"
    })
    showDH = true;

    @TextProperty({
        name: "Double hook message",
        description: "custom message sent to the party",
        category: "Others",
        subcategory: "Double Hook"
    })
    DHMessage = "Woot woot!";

    @SwitchProperty({
        name: "Deployable Detector",
        description: "Prevent when your deployable is about to run out.",
        category: "Others",
        subcategory: "Deployable detection"
    })
    flareFluxDetect = true;

    @SwitchProperty({
        name: "Boss bar",
        description: "Shows a boss bar for Thunders and Jawbuses. Caution, this option create some lag",
        category: "Others",
        subcategory: "Boss"
    })
    bossBar = false;

    @SwitchProperty({
        name: "Boss Screen Notification",
        description: "Shows a big message on the screen when you or your party spawns a Thunder or Jawbus",
        category: "Others",
        subcategory: "Boss"
    })
    bossNotif = false;

}
export default new Settings