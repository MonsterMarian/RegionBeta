# Region Beta Activity Planner
## Tvůj kompas od každodenní rutiny k dlouhodobým cílům.

Většina to-do listů končí jako hřbitov dobrých úmyslů. Napsal jsem Region Beta Activity Planner, protože mě štvalo, jak mi běžné aplikace neukazují souvislosti mezi tím, co dělám dnes, a tím, kým chci být za rok. Tento nástroj propojuje běžné úkoly, návyky, časově omezené výzvy a dlouhodobé cíle do jednoho funkčního celku.

Žádné složité nastavování. Prostě si zapíšeš úkoly a systém ti pomůže udržet konzistenci pomocí taktických kartiček (Insight Cards) nebo sledováním streaků.

### Instalace (pro uživatele)
Aplikace poběží primárně jako nasazená webovka, takže si ji brzy budeš moct otevřít přímo v prohlížeči. Pokud si ji chceš zkusit lokálně už teď, postupuj podle návodu pro vývojáře níže.

### Instalace (pro vývojáře)
Aplikace využívá Next.js 14, React 18 a TailwindCSS. Budeš potřebovat Node.js.

```bash
# Naklonuj repozitář
git clone https://github.com/MonsterMarian/RegionBeta.git
cd RegionBeta

# Nainstaluj NPM balíčky
npm install

# Spusť lokální vývojový server
npm run dev
```
Vývojový server standardně poslouchá na `http://localhost:3001`.

### Jak přispívat
Chceš přidat novou funkci nebo opravit bug? Super. Tady je pár pravidel:
- Udržuj soubory pod 600 řádků. Raději kód rozděl na menší logické moduly.
- Mysli na responsivitu a dark mode.
- Pokud upravuješ Insight Cards, čerpej data primárně z `lib/insight-cards-data.ts`.

### Známé chyby a co drhne
- V souboru `lib/insight-cards-data.ts` je z nějakého důvodu duplikované ID `card-goal-filter`.
- Náhledy Insight Cards mohou být občas příliš dlouhé a narušují UI. Zkracuj na max dvě věty.

### Podpora
Ušetřila ti aplikace nervy a pomohla ti dosáhnout cílů? Budu rád, když mě podpoříš – hoď mi třeba něco na kafe na [Buy me a coffee](https://buymeacoffee.com/).
