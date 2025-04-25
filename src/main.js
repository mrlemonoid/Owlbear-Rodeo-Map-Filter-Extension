import OBR from "@owlbear-rodeo/sdk";

OBR.onReady(async () => {
  console.log("OBR ready");

  let selectedId = null;

  const updateSelectedStyle = () => {
    if (!selectedId) return;

    const hue = document.getElementById("hue").value;
    const saturation = document.getElementById("saturation").value;
    const brightness = document.getElementById("brightness").value;
    const gamma = document.getElementById("gamma").value;
    const chroma = document.getElementById("chroma").value;

    OBR.scene.items.updateItems([selectedId], (items) => {
      for (const item of items) {
        item.transform = {
          ...item.transform,
          hue: parseFloat(hue),
          saturation: parseFloat(saturation) / 100,
          brightness: parseFloat(brightness) / 100,
          gamma: parseFloat(gamma) / 100,
        };

        item.filters = {
          keyColor: chroma > 0 ? "#00ff00" : null,
          keyColorStrength: chroma > 0 ? parseFloat(chroma) / 100 : 0,
        };
      }
    });
  };

  ["hue", "saturation", "brightness", "gamma", "chroma"].forEach(id => {
    document.getElementById(id).addEventListener("input", updateSelectedStyle);
  });

  const updateSelection = async () => {
    const selection = await OBR.player.getSelection();
    if (selection.length > 0) {
      const selected = await OBR.scene.items.getItem(selection[0]);
      console.log("Selected:", selected);
      if (selected?.type === "IMAGE" && selected.layer === "MAP") {
        selectedId = selected.id;
        document.getElementById("no-selection-msg").style.display = "none";
      } else {
        selectedId = null;
        document.getElementById("no-selection-msg").style.display = "block";
      }
    } else {
      selectedId = null;
      document.getElementById("no-selection-msg").style.display = "block";
    }
  };

  await updateSelection();
  OBR.player.onSelectionChange(updateSelection);
  OBR.scene.items.onChange(updateSelection);
});
