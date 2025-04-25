import OBR from "@owlbear-rodeo/sdk";

// ... (a többi része változatlan marad)

OBR.onReady(async () => {
  console.log("OBR ready");

  try {
    const items = await OBR.scene.items.getItems();
    console.log("Összes scene item:", items);

    const selected = items.find((item) => item.type === "IMAGE" && item.layer === "MAP");

    if (selected) {
      noSelectionMsg.style.display = "none";
      setupSliders(selected.id);
    } else {
      console.warn("Nincs megfelelő Map típusú item");
      noSelectionMsg.style.display = "block";
    }
  } catch (e) {
    console.error("Hiba a getItems() közben:", e);
    noSelectionMsg.style.display = "block";
  }

  // Context menü gomb regisztrálása
  OBR.contextMenu.create({
    id: "map-filter.apply-filter",
    icons: [
      {
        icon: "/icon.svg",
        label: "Térkép szűrő",
      },
    ],
    onClick(context) {
      const selected = context.items.find(
        (item) => item.type === "IMAGE" && item.layer === "MAP"
      );

      if (selected) {
        const randomId = "map-filter-ui-" + Math.floor(Math.random() * 1000000);

        OBR.popover.open({
          id: randomId,
          url: "/index.html",
          height: 400,
          width: 300,
          anchorElementId: selected.id,
        });
      }
    },
    filter: {
      every: [
        { key: "layer", value: "MAP" },
        { key: "type", value: "IMAGE" },
      ],
    },
  });
});
