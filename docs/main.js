// Owlbear Rodeo Image Filter Extension - main.js

// Magyar nyelvű kommentekkel ellátva a működés magyarázatához

// A csúszkák HTML elemeinek kiválasztása az ID alapján
const hueSlider = document.getElementById('hue');
const saturationSlider = document.getElementById('saturation');
const brightnessSlider = document.getElementById('brightness');
const gammaSlider = document.getElementById('gamma');
const chromaSlider = document.getElementById('chroma');
const controlsDiv = document.getElementById('controls');
const noSelectionMsg = document.getElementById('no-selection-msg');

// Változók a jelenleg kiválasztott cél elem és az ahhoz tartozó effekt azonosítójának tárolására
let currentTargetId = null;
let currentEffectId = null;

// A shader kód (SkSL nyelven) multi-line string formában.
// Ez a shader a `scene` uniform segítségével lekéri a csatolt kép pixeleit, majd alkalmazza a beállított színkorrekciókat.
const filterShader = `
uniform shader scene;
uniform mat3 modelView;
uniform float hue;         // Hue eltolás fokban (0-360)
uniform float saturation;  // Telítettség szorzó (0.0-2.0)
uniform float brightness;  // Fényerő szorzó (0.0-2.0)
uniform float gamma;       // Gamma érték (0.1-3.0)
uniform vec3 keyColor;     // Kulcsszín a chroma key-hez (pl. zöld)
uniform float keyThreshold; // Tolerancia a kulcsszínre (0.0-1.0)

half4 main(float2 coord) {
    // A képkoordináták átalakítása a jelenet koordinátarendszerébe
    vec2 uv = (vec3(coord, 1) * modelView).xy;
    // Eredeti szín lekérése a jelenetből az adott koordinátán (a csatolt kép pixele)
    half4 baseColor = scene.eval(uv);
    half3 col = baseColor.rgb;
    half alpha = baseColor.a;

    // Chroma key: kulcsszín (pl. zöld) eltávolítása (áttetszővé tétele)
    half alphaFactor = 1.0;
    if (keyThreshold > 0.0) {
      // Kiszámítjuk az aktuális pixel színének távolságát a kulcsszíntől
      float dist = distance(col, keyColor);
      // Sima átmenet: ha a távolság kisebb, mint a threshold, akkor az alpha csökken (pixel átlátszóbb lesz)
      float soft = keyThreshold * 0.2; // a threshold 20%-a legyen az átmenet sávja
      alphaFactor = 1.0 - smoothstep(max(0.0, keyThreshold - soft), keyThreshold + soft, dist);
    }

    // Brightness (fényerő) alkalmazása: szorzás a színértékekre
    col *= brightness;
    // Gamma korrekció alkalmazása: a szín komponensek hatványozása (1/gamma kitevővel)
    col = pow(col, vec3(1.0 / max(0.001, gamma)));
    // Saturation (színtelítettség) alkalmazása:
    // Kiszámoljuk a pixel világosságát (luma) és interpolálunk a szürke (lum) és az eredeti szín között a telítettség arányában
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, saturation);
    // Hue (színárnyalat) eltolás:
    // A színárnyalatot a szürke tengely (egyenlő rgb komponensek) körül forgatjuk. 
    // Ehhez Rodrigues-féle forgatás formulát használunk az (1,1,1) tengely körül.
    float angle = 3.1415926 * hue / 180.0; // fok -> radián
    float cosA = cos(angle);
    float sinA = sin(angle);
    vec3 k = normalize(vec3(1.0, 1.0, 1.0)); // normált (1,1,1) tengely
    // Forgatás alkalmazása a col vektorra
    col = col * cosA + cross(k, col) * sinA + k * dot(k, col) * (1.0 - cosA);

    // A módosított szín visszaadása az új alfával (alpha * alphaFactor).
    return half4(col * alphaFactor, alpha * alphaFactor);
}
`;

// Ez a shader kód a következőket teszi pixelről pixelre a kiválasztott képen:
// 1. Eltávolítja (áttetszővé teszi) a keyColor-hoz közeli pixeleket a keyThreshold tolerancia alapján (chroma key).
// 2. Állítja a fényerőt (brightness) és gamma-görbét (gamma) – világosítás/sötétítés.
// 3. Állítja a telítettséget (saturation) – fekete-fehér felé tolás vagy élénkítés.
// 4. Elforgatja a színeket a szürke tengely körül (hue) – az összes színtónus eltolása.

// A kiválasztott elemhez tartozó effekt létrehozása, ha még nem létezik.
// Ha már van ilyen effekt (pl. korábban létrehozva), akkor azt használjuk újra.
async function ensureEffectFor(itemId) {
  // Megkeressük a már létező effektet, amely a kiválasztott elemhez van csatolva
  const existingEffects = await OBR.scene.local.getItems((item) =>
    item.type === 'EFFECT' &&
    item.attachedTo === itemId &&
    item.layer === 'POST_PROCESS'
  );
  let effect;
  if (existingEffects.length > 0) {
    effect = existingEffects[0];
    // Ha találunk meglévő effektet, azt újrafelhasználjuk.
    // (Feltételezzük, hogy ez a mi bővítményünk által létrehozott filter effekt.)
  } else {
    // Új effekt objektum létrehozása a kiválasztott képhez.
    effect = {
      // Az Owlbear automatikusan generál egy ID-t, ha nincs megadva.
      attachedTo: itemId,
      layer: 'POST_PROCESS',
      effectType: 'ATTACHMENT',
      sksl: filterShader,
      uniforms: [
        { name: 'hue', value: 0.0 },
        { name: 'saturation', value: 1.0 },
        { name: 'brightness', value: 1.0 },
        { name: 'gamma', value: 1.0 },
        { name: 'keyColor', value: { x: 0.0, y: 1.0, z: 0.0 } },  // kulcsszín: tiszta zöld
        { name: 'keyThreshold', value: 0.0 }
      ],
      locked: true,       // rögzítjük az effektelemet (ne lehessen mozgatni)
      disableHit: true,   // az effekt ne legyen interakciók által elérhető (kattintás, kijelölés)
      type: 'EFFECT'
    };
    // Hozzáadjuk az effektet a helyi jelenethez (lokálisan, a felhasználó nézetében)&#8203;:contentReference[oaicite:3]{index=3}.
    await OBR.scene.local.addItems([effect]);
    // Megjegyzés: Az Effect típusú elemek jelenleg "Local Only", azaz nem szinkronizálódnak automatikusan a többi játékosnak&#8203;:contentReference[oaicite:4]{index=4}.
    // Ezért szükség esetén a beállításokat manuálisan kellene továbbítani (pl. OBR.broadcast segítségével), ha azt szeretnénk, hogy minden játékos ugyanazt lássa.
    // Jelen implementáció a saját (lokális) nézetünket módosítja.
    const added = await OBR.scene.local.getItems((item) =>
      item.type === 'EFFECT' && item.attachedTo === itemId && item.layer === 'POST_PROCESS'
    );
    if (added.length > 0) {
      effect = added[0];
    }
  }
  // Beállítjuk a jelenlegi aktív effekt és cél elem azonosítóit a globális változókba
  currentTargetId = itemId;
  currentEffectId = effect.id;
}

// Kiválasztott elem ellenőrzése (hogy megfelelő típusú-e) és a UI frissítése ennek megfelelően
async function checkSelection() {
  const selection = await OBR.player.getSelection();  // jelenlegi kijelölt elemek ID-i&#8203;:contentReference[oaicite:5]{index=5}
  if (!selection || selection.length === 0) {
    // Nincs semmi kijelölve
    currentTargetId = null;
    // UI frissítés: üzenet megjelenítése, csúszkák elrejtése
    noSelectionMsg.style.display = 'block';
    controlsDiv.style.display = 'none';
    return;
  }
  // Lekérjük a kijelölt elemek adatait (feltételezzük, hogy csak egyet szeretnénk kezelni)&#8203;:contentReference[oaicite:6]{index=6}
  const items = await OBR.scene.items.getItems(selection);
  const item = items[0];
  // Ellenőrizzük, hogy az elem egy Map típusú kép-e (IMAGE típus, MAP réteg)
  if (item.type !== 'IMAGE' || item.layer !== 'MAP') {
    // Ha nem, akkor nem alkalmazzuk a filtert erre - csak Map (háttér) képre működik jelenleg
    currentTargetId = null;
    currentEffectId = null;
    noSelectionMsg.textContent = 'A kijelölt elem nem \"Map\" típusú kép. Válassz ki egy térkép képet.';
    noSelectionMsg.style.display = 'block';
    controlsDiv.style.display = 'none';
    return;
  }
  // Ha már az a kép van kijelölve, mint korábban, nem kell semmit változtatni
  if (item.id === currentTargetId && currentEffectId) {
    return;
  }
  // Eddig nem kezelt vagy új kép kijelölése esetén létrehozzuk/elővesszük az effektet
  await ensureEffectFor(item.id);
  // UI frissítés: csúszkák engedélyezése és alapértékek (ha új effekt jött létre, már alap beállításúak)
  noSelectionMsg.style.display = 'none';
  controlsDiv.style.display = 'block';
  // (Opcionálisan itt frissíthetnénk a csúszkák értékeit a meglévő effekt uniformjai alapján, ha újra kiválasztunk egy már szűrt képet.)
}

// Csúszka érték változás kezelése - frissíti a shader uniform változóját az aktuális effektben
async function updateUniforms() {
  if (!currentEffectId) return; // nincs aktív effekt, nincs mit frissíteni
  // Gyűjtsük be a csúszkák aktuális értékeit
  const hueVal = parseFloat(hueSlider.value);            // 0-360 (fok)
  const saturationVal = parseFloat(saturationSlider.value) / 100.0;  // 0-200 -> 0.0-2.0
  const brightnessVal = parseFloat(brightnessSlider.value) / 100.0;  // 0-200 -> 0.0-2.0
  const gammaVal = parseFloat(gammaSlider.value) / 100.0;            // 50-200 -> 0.5-2.0
  const chromaVal = parseFloat(chromaSlider.value) / 100.0;          // 0-100 -> 0.0-1.0

  // Az Owlbear SDK updateItems függvényével módosítjuk az effekt uniformjait&#8203;:contentReference[oaicite:7]{index=7}.
  await OBR.scene.local.updateItems(
    (item) => item.id === currentEffectId,
    (items) => {
      const effect = items[0];
      // Végigmegyünk az uniform listán és beállítjuk az új értékeket a megfelelő neveknél
      for (let u of effect.uniforms) {
        switch (u.name) {
          case 'hue':
            u.value = hueVal;
            break;
          case 'saturation':
            u.value = saturationVal;
            break;
          case 'brightness':
            u.value = brightnessVal;
            break;
          case 'gamma':
            u.value = gammaVal;
            break;
          case 'keyThreshold':
            u.value = chromaVal;
            break;
          // keyColor nem változik (fix érték: zöld), de ha szükséges, itt állíthatnánk.
        }
      }
    }
  );
  // Nincs szükség külön visszajelzésre, az Owlbear az update hatására automatikusan újrarajzolja az effektet a megadott uniformokkal.
}

// Eseménykezelők beállítása a csúszkákhoz (valós idejű frissítés az `input` eseményre, húzás közben)
hueSlider.addEventListener('input', updateUniforms);
saturationSlider.addEventListener('input', updateUniforms);
brightnessSlider.addEventListener('input', updateUniforms);
gammaSlider.addEventListener('input', updateUniforms);
chromaSlider.addEventListener('input', updateUniforms);

// Az Owlbear SDK inicializálása – várjuk meg, míg a bővítmény teljesen betöltődik az Owlbear környezetbe
OBR.onReady(() => {
  // Kiválasztott elem ellenőrzése az induláskor
  checkSelection();
  // Időzítővel figyeljük a kiválasztás változásait (pl. ha a felhasználó másik képet jelöl ki, vagy megszünteti a kijelölést)
  setInterval(checkSelection, 1000);
});
