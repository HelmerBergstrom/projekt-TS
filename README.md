# Om projektet - HB´s Universitet

Förutom grundkraven för projektet har en startsida tillämpats för webbplatsen. Även funktionalitet för att spara ramscheman har lagts till och funktionalitet för att ta bort enskilda sparade ramscheman.

Detta arbete är projektarbetet för kursen "Programmering i TypeScript". HB´s Universitet är ett fiktivt universitet som ger besökaren möjlighet att utforska kurser och möjligheten att skapa ett personligt ramschema. Syftet med projektet är att med hjälp av Angular och TypeScript, skapa en modern webbplats inriktat mot universitet, kurser och ramschema.


# Verktyg och utveckling

För att lyckas med projektet har verktyg och hjälpmedel använts för att skapa webbplatsen. Webbplatsen är skapad av TypeScript till största del, men även HTML och CSS. Data för webbplatsen är hämtad via en JSON-fil som innehåller kurser. Dessa kurser behandlas via TypeScript och HTML. Angular och TypeScript har använts för att behandla data och skriva ut till användaren. I Angular har kompenter, routing, services och interface använts för att skapa en god utvecklingsmiljö. HttpClient används för att hämta data från JSON-filen. Biblioteket rxjs med dess verktyg "Observable" och "BehaviorSubject".

# Funktioner på webbplatsen

### KURSER-sidan

På denna sida visas en tabell med alla kurser som finns hos det fiktiva universitetet som standard. Användare har möjlighet att sortera tabellen utifrån kurskod, kursnamn, poäng(högskolepoäng) och ämne. Användare kan även använda sökfält för att filtrera tabellen utifrån en sökfras, och kan även välja ett ämne i en meny och därmed endast visa kurser för det ämnet.

Tabellen innehåller:
- Kurskod
- Kursnamn
- Poäng(Högskolepoäng)
- Ämne
- Länk till kursplan
- Knapp för att lägga till i ramschemat. Knappen visar "Tillagd" efter klick.

### RAMSCHEMA-sidan

Denna sida visar likt föregående sida en tabell på tillagda kurser. Denna tabell är lik den förra, med undantag för funktionen att lägga till i ramschemat. Denna sida har istället en knapp för att ta bort enskilda kursen från ramschemat i den kolumnen. Denna sida har även en knapp under tabellen för att rensa hela ramschemat vid klick. Knappen visas endast om det finns kurser i schemat. Under tabellen på denna sida finns även en knapp för att spara ramschemat. Vid klick på denna knapp, som endast visas när det finns kurser i ramschemat, läggs kursens namn och poäng i minnet och visas längst ned på sidan i rutor. I dessa rutor visas totala antalet poäng och antalet kurser för det sparade ramschemat. En knapp finns i varje ruta för att ta bort sparade schemat.


### Startsida

Startsidan har ingen funktionalitet, utan är endast till för att välkomna besökare med lite information om det fiktiva universitetet med en välkomsttext, en bild och en lista med innehållet på hemsidan/universitetet.