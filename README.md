# Om projektet - HB´s Universitet

Förutom grundkraven för projektet har en startsida tillämpats för webbplatsen. 

Detta arbete är projektarbetet för kursen "Programmering i TypeScript". HB´s Universitet är ett fiktivt universitet som ger besökaren möjlighet att utforska kurser och möjligheten att skapa ett personligt ramschema. Syftet med projektet är att med hjälp av Angular och TypeScript, skapa en modern webbplats inriktat mot universitet, kurser och ramschema.


# Verktyg och utveckling

För att lyckas med projektet har verktyg och hjälpmedel använts för att skapa webbplatsen. Funktionaliteten för webbplatsen är skapad med hjälp av en JSON-fil som innehåller kurser. Dessa kurser behandlas via TypeScript och HTML.

### Funktioner på webbplatsen

##### KURSER-sidan

På denna sida visas en tabell med alla kurser som finns hos det fiktiva universitetet som standard. Användare har möjlighet att sortera tabellen utifrån kurskod, kursnamn, poäng(högskolepoäng) och ämne. Användare kan även använda sökfält för att filtrera tabellen utifrån en sökfras, och kan även välja ett ämne i en meny och därmed endast visa kurser för det ämnet.

Tabellen innehåller:
- Kurskod
- Kursnamn
- Poäng(Högskolepoäng)
- Ämne
- Länk till kursplan
- Knapp för att lägga till i ramschemat. Knappen visar "Tillagd" efter klick.

##### RAMSCHEMA-sidan

Denna sida visar likt föregående sida en tabell på tillagda kurser. Denna tabell är lik den förra, med undantag för funktionen att lägga till i ramschemat. Denna sida har istället en knapp för att ta bort enskilda kursen från ramschemat i den kolumnen. Denna sida har även en knapp under tabellen för att rensa hela ramschemat vid klick. Knappen visas endast om det finns kurser i schemat.


##### Startsida

Startsidan har ingen funktionalitet, utan är endast till för att välkomna besökare med lite information om det fiktiva universitetet.