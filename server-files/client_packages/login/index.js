let loginBrowser = null;

mp.events.add('showLogin', () => {
    if (!loginBrowser) {
        loginBrowser = mp.browsers.new("package://login/ui/index.html");
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 500);
        mp.gui.chat.activate(false);
    }
});

mp.events.add('hideLogin', () => {
    if (loginBrowser) {
        loginBrowser.destroy();
        loginBrowser = null;
        mp.gui.cursor.show(false, false);
        mp.gui.chat.activate(true);
    }
});
