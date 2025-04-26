// src/index.js
import OBR from "@owlbear-rodeo/sdk";

// Amikor az extension betöltödik
OBR.onReady(async () => {
  console.log("[Owlbear Map Filter] Extension loaded");

  // Context menü gomb regisztrálása
  OBR.contextMenu.create({
    id: "map-filter.apply-overlay",
    icons: [{ icon: "/icon.svg", label: "Színátfedés" }],
    filter: {
      every: [{ key: "type", value: "IMAGE" }],
    },
    onClick: async (context) => {
      const selected = context.items.find(item => item.type === "IMAGE");
      if (!selected) return;

      const color = prompt("Add meg a színt HEX formátumban (pl. #ff0000):", "#ff0000");
      if (!color) return;

      const blendMode = prompt("Add meg a blend módot (pl. MULTIPLY, SCREEN, OVERLAY, stb.):", "MULTIPLY");
      if (!blendMode) return;

      const opacity = parseFloat(prompt("Add meg az áttetszőséget (0.0 - 1.0):", "0.5"));

      const overlayEffect = {
        type: "EFFECT",
        position: selected.position,
        size: {
          width: selected.image.width,
          height: selected.image.height,
        },
        texture: {
          src: "https://dummyimage.com/1x1/ffffff/ffffff", // 1x1 pixeles fehér kép
          tint: color,
        },
        opacity: isNaN(opacity) ? 0.5 : opacity,
        blendMode: blendMode.toUpperCase(),
        visible: true,
        name: "Map Color Overlay",
      };

      try {
        await OBR.scene.items.addItems([overlayEffect]);
        console.log("Overlay sikeresen hozzáadva!");
      } catch (error) {
        console.error("Hiba az overlay létrehozásánál:", error);
      }
    },
  });
});
