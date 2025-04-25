import OBR from "@owlbear-rodeo/sdk";

const FILTER_STATE = {
  hue: 0,
  saturation: 100,
  brightness: 100,
  gamma: 100,
  chroma: 0,
};

const noSelectionMsg = document.getElementById("no-selection-msg");

function debounce(func, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function setupSliders(itemId) {
  const sliders = ["hue", "saturation", "brightness", "gamma", "chroma"];
  sliders.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", () => {
        FILTER_STATE[id] = Number(el.value);
        debouncedApplyFilters(itemId);
      });
    }
  });
}

const debouncedApplyFilters = debounce((itemId) => {
  const { hue, saturation, brightness, gamma, chroma } = FILTER_STATE;
  OBR.scene.items.updateItems([itemId], (items) => {
    for (const item of items) {
      item.metadata = {
        ...item.metadata,
        "map-filter-extension": {
          hue,
          saturation,
          brightness,
          gamma,
          chroma,
        },
      };
    }
  });
}, 200);

OBR.onReady(async () => {
  console.log("OBR ready");

  // 📌 Regisztráljuk a context menüt minden esetben (csak egyszer)
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
        OBR.popover.open({
          id: "map-filter-ui",
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

  // 📌 Csak akkor mutassuk meg az UI-t, ha egy MAP popoverből lett megnyitva
  const context = await OBR.popover.getContext();
  if (!context || !context.anchorElementId) {
    console.warn("Popover was not opened from a selected map. Exiting.");
    return;
  }

  try {
    const items = await OBR.scene.items.getItems();
    const selected = items.find(
      (item) => item.id === context.anchorElementId &&
                item.type === "IMAGE" &&
                item.layer === "MAP"
    );

    if (selected) {
      noSelectionMsg.style.display = "none";
      setupSliders(selected.id);
    } else {
      console.warn("A kiválasztott item nem megfelelő Map típusú.");
      noSelectionMsg.style.display = "block";
    }
  } catch (e) {
    console.error("Hiba a getItems() közben:", e);
    noSelectionMsg.style.display = "block";
  }
});
