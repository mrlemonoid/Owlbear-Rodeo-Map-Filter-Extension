import OBR from "@owlbear-rodeo/sdk";

OBR.onReady(() => {
  console.log("OBR ready - Very simple extension");

  OBR.contextMenu.create({
    id: "map-filter.simple-effect",
    icons: [{ icon: "/icon.svg", label: "Alap Effect Hozzáadása" }],
    onClick: async (context) => {
      const selected = context.items.find((item) => item.type === "IMAGE");
      if (!selected) {
        console.warn("Nincs kiválasztott kép.");
        return;
      }

      const effectId = `effect-${Date.now()}`;
      const effectUrl = "https://map-filter-extension.vercel.app/effect.js";

      const newEffect = {
        id: effectId,
        type: "EFFECT",
        name: "Simple Map Effect",
        visible: true,
        locked: true,
        transform: {
          width: selected.transform.width || 1,
          height: selected.transform.height || 1,
          scaleX: 1,
          scaleY: 1,
          rotation: selected.transform.rotation || 0,
          position: {
            x: selected.transform.position.x,
            y: selected.transform.position.y,
          },
        },
        zIndex: (selected.zIndex ?? 0) + 1,
        effect: {
          url: effectUrl,
          data: {
            hue: 0,
            saturation: 100,
            brightness: 100,
            gamma: 100,
            chroma: 0,
          },
        },
      };

      try {
        await OBR.scene.items.addItems([newEffect]);
        console.log("Effect létrehozva sikeresen!");
      } catch (error) {
        console.error("Hiba az effect létrehozásánál:", error);
      }
    },
    filter: {
      every: [{ key: "type", value: "IMAGE" }],
    },
  });
});
