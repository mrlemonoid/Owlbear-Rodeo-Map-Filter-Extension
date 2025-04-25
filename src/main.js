import OBR from "@owlbear-rodeo/sdk";

OBR.onReady(() => {
  OBR.contextMenu.create({
    id: "map-filter.apply-filter",
    icons: [{ icon: "/icon.svg", label: "Térkép szűrő" }],
    onClick(context) {
      const selected = context.items.find(item => item.type === "IMAGE");
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
      every: [{ key: "type", value: "IMAGE" }],
    },
  });
});
