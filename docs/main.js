
OBR.onReady(async () => {
  try {
    const items = await OBR.scene.items.getItems();
    console.log("Scene is ready. Found", items.length, "items.");
    // ide jöhet a többi logika:
    // Ide jön majd a teljes JS logika (rövid placeholder)
    console.log("Main.js loaded — implement shader logic here.");
  } catch (e) {
    console.warn("Scene is not available yet:", e.message);
    document.getElementById("no-selection-msg").style.display = "block";
  }
});
