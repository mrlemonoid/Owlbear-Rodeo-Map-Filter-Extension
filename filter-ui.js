import OBR from "@owlbear-rodeo/sdk";

const TOOL_ID = "com.example.mapfilter.tool";

OBR.onReady(async () => {
  const data = await OBR.tool.getMetadata(TOOL_ID);
  const effectId = data.effectId;

  const updateUniform = (name, value) => {
    OBR.scene.local.updateItems([effectId], items => {
      const eff = items[0];
      const uniform = eff.uniforms.find(u => u.name === name);
      if (uniform) uniform.value = value;
    });
  };

  const sliders = [
    { id: "hue", name: "hueShift", scale: v => v / 360, display: v => `${v}°` },
    { id: "saturation", name: "saturation", scale: v => v / 100, display: v => `${v}%` },
    { id: "brightness", name: "brightness", scale: v => v / 100, display: v => `${v}%` },
    { id: "gamma", name: "gamma", scale: v => v / 100, display: v => (v / 100).toFixed(2) },
    { id: "alpha", name: "alpha", scale: v => v / 100, display: v => `${v}%` },
    { id: "chroma", name: "chromaKey", scale: v => v / 100, display: v => `${v}%` }
  ];

  sliders.forEach(({ id, name, scale, display }) => {
    const input = document.getElementById(id);
    const label = document.getElementById(id + "-val");
    input.addEventListener("input", () => {
      const val = parseFloat(input.value);
      label.innerText = display(val);
      updateUniform(name, scale(val));
    });
  });
});