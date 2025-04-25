OBR.onReady(async () => {
  try {
    const items = await OBR.scene.items.getItems();
    console.log("Scene is ready. Found", items.length, "items.");

    let selectedId = null;

    const updateSelectedStyle = () => {
      if (!selectedId) return;

      const hue = document.getElementById("hue").value;
      const saturation = document.getElementById("saturation").value;
      const brightness = document.getElementById("brightness").value;
      const gamma = document.getElementById("gamma").value;
      const chroma = document.getElementById("chroma").value;

      const style = {
        transform: {
          hue: parseFloat(hue),
          saturation: parseFloat(saturation) / 100,
          brightness: parseFloat(brightness) / 100,
          gamma: parseFloat(gamma) / 100,
        },
        filters: {
          keyColor: chroma > 0 ? "#00ff00" : null,
          keyColorStrength: chroma > 0 ? parseFloat(chroma) / 100 : 0,
        }
      };

      OBR.scene.items.updateItems([{
        id: selectedId,
        style: style
      }]);
    };

    // Eseményfigyelők
    ["hue", "saturation", "brightness", "gamma", "chroma"].forEach(id => {
      document.getElementById(id).addEventListener("input", updateSelectedStyle);
    });

    // Kijelölés kezelése
    const updateSelection = async () => {
      const selection = await OBR.player.getSelection();
      if (selection.length > 0) {
        const selected = await OBR.scene.items.getItem(selection[0]);
        if (selected.type === "IMAGE" && selected.layer === "MAP") {
          selectedId = selected.id;
          console.log("Selected map image:", selectedId);
        } else {
          selectedId = null;
          console.log("Selected item is not a Map image.");
        }
      } else {
        selectedId = null;
        console.log("No item selected.");
      }
    };

    await updateSelection();

    OBR.player.onChange(updateSelection);
    OBR.scene.items.onChange(updateSelection);

  } catch (e) {
    console.warn("Scene is not available yet:", e.message);
    document.getElementById("no-selection-msg").style.display = "block";
  }
});
