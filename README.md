## Parts4GamesClient

## Installieren:
    - Stellen sie sicher, dass npm und node.js installiert ist. (npm --version , node --version)
    - Ist das nicht der Fall -> run : sudo apt install nodejs -> run: sudo apt install npm
    - Clonen sie das Project.
    - Run: npm install (um alle node_modules zu installieren)
    - Run: echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p (um einen ENOSPC Fehler zu verhindern)

## Webservice Starten
    - Run: npm start (um den WebService zu starten)
    - Oder falls yarn installiert ist: yarn start

## Webbrowser-Plugins
    Damit die Cross-Origin-Responses funktionieren müssen cors im Browser deaktiviert werden.
    Wir empfehlen folgende Plugins:

    Firefox: CORS-Everywhere - https://addons.mozilla.org/de/firefox/addon/cors-everywhere/
    Google Chrome: Allow CORS: Access-Control-Allow-Origin - https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=de

## UseCase-Work-Flow

    1. Anmelden mit Google
        - Den Button "Log in with Google drücken"
        - Im Google Fenster Anmelden.
    
    2. Spiele Anforderungen finden:

        - Spielenamen in das Linke Suchfeld eingeben (z.B cyberpunk)-> Suchen drücken
        - Spiel aus der Liste auswählen
        - Details der Anforderungen einsehen
        - Radio Buttons über dem "Anforderungen Feld" benutzen, um zwischen Minimum Requirements und Reccomended Requirements zu wechseln.
    
    3. Ram Auswählen: 
        - Gewünschte Größe des RAM Riegels in das Rechte Suchfeld eingeben.
        - Gewünschtes Budget in Textfeld darunter eingeben
            -> Suchen Drücken
        - Gewünschte Ram aus der Liste Auswählen
        - Ram Spezifikationen erscheinen im "Details Feld" rechts neben der RAM-Liste. 
    
    4. Konfiguration Erstellen und Bearbeiten:
        - Mit dem Button "AddConfig" eine oder mehrere neue Konfigurationen erstellen.
        - Mit dem dem "Select" Button eine Konfiguration Auswählen.
        - Mit dem "Add to Config" Button, unter den "RAM Details" kann jetzt die Ausgewählte RAM zur Config hinzugefügt oder geändert werden.
        - Um die Ausgewählte Config zu löschen, wird der Button "Delete" verwendet.



## Anmerkung zu den Anfragen

    Funktionierende RAM Größen:
        8 , 16 , 32 , 64 (Andere Eingaben werden von der Ebay-Api nicht gefunden, da diese Zahlen Ihren filtern entspricht)



