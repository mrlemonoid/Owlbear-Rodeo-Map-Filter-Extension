import OBR from "@owlbear-rodeo/sdk";

OBR.onReady(async () => {
  console.log("[Map Filter Extension] Loaded!");

  OBR.contextMenu.create({
    id: "map-filter.apply-overlay",
    icons: [{ icon: "/icon.svg", label: "Színátfedés" }],
    filter: {
      every: [{ key: "type", value: "IMAGE" }],
    },
    onClick: async (context) => {
      const selected = context.items.find(item => item.type === "IMAGE");
      if (!selected) return;

      const color = prompt("Adj meg egy szín HEX kódot (pl. #ff0000):", "#ff0000");
      if (!color) return;

      const blendMode = prompt("Blend mód (pl. MULTIPLY):", "MULTIPLY");
      if (!blendMode) return;

      const opacity = parseFloat(prompt("Áttetszőség (0.0-1.0):", "0.5"));

      const overlayEffect = {
        type: "EFFECT",
        visible: true,
        name: "Map Color Overlay",
        position: selected.position,
        size: {
          width: selected.image.width,
          height: selected.image.height,
        },
        texture: {
          src: "https://dummyimage.com/1x1/ffffff/ffffff",
          tint: color,
        },
        opacity: isNaN(opacity) ? 0.5 : opacity,
        blendMode: blendMode.toUpperCase(),
      };

      try {
        await OBR.scene.items.addItems([overlayEffect]);
        console.log("Overlay sikeresen hozzáadva!");
      } catch (error) {
        console.error("Hiba overlay létrehozásakor:", error);
      }
    },
  });
});
