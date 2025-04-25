// index.ts
OBR.onReady(() => {
  // Create toolbar button
  OBR.toolbar.create({
    id: 'map-filter',
    icon: 'https://cdn-icons-png.flaticon.com/512/1378/1378873.png',
    title: 'Map Filter',
    onClick: () => {
      // Create overlay UI
      OBR.overlay.open({
        id: 'map-filter-ui',
        url: '/ui.html',
        height: 300
      });
    }
  });

  // Image processing logic goes here
  // (Use OBR.scene.getMapElements() and OBR.assets.getImage())
});