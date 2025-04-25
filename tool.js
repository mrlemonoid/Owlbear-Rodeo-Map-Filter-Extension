import OBR, { buildEffect } from "@owlbear-rodeo/sdk";

const TOOL_ID = "com.example.mapfilter.tool";

OBR.onReady(() => {
  OBR.tool.create({
    id: TOOL_ID,
    icons: [{ icon: "icon.png", label: "Színszűrő" }],
    onClick: async (ctx, elId) => {
      const selectionIds = await OBR.player.getSelection();
      if (!selectionIds.length) {
        OBR.notification.show("Nincs kijelölt térkép elem!", "WARNING");
        return false;
      }
      const items = await OBR.scene.items.getItems(selectionIds);
      const mapItem = items.find(i => i.layer === "MAP" && i.type === "IMAGE");
      if (!mapItem) {
        OBR.notification.show("Kérjük jelölj ki egy 'Map' típusú képet.", "WARNING");
        return false;
      }

      const shader = `uniform shader scene; uniform mat3 modelView;
uniform float hueShift, saturation, brightness, gamma, alpha, chromaKey;
vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.,-1./3.,2./3.,-1.);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;float h=abs(q.z+(q.w-q.y)/(6.*d+e));float s=d/(q.x+e);float v=q.x;return vec3(h,s,v);}
vec3 hsv2rgb(vec3 c){vec4 K=vec4(1.,2./3.,1./3.,3.);vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);}
half4 main(float2 coord){vec2 uv=(vec3(coord,1.0)*modelView).xy;half4 col=scene.eval(uv);float3 hsv=rgb2hsv(col.rgb);hsv.x=fract(hsv.x+hueShift);hsv.y=clamp(hsv.y*saturation,0.,1.);hsv.z=clamp(hsv.z*brightness,0.,1.);float3 rgbNew=pow(hsv2rgb(hsv), float3(1.0/max(0.001, gamma)));half alphaVal=half(col.a*alpha);if(chromaKey>0.0&&distance(col.rgb,float3(0.,1.,0.))<chromaKey) alphaVal=0.0;return half4(rgbNew,alphaVal);}`;

      const effect = buildEffect()
        .effectType("ATTACHMENT")
        .attachedTo(mapItem.id)
        .layer("POST_PROCESS")
        .sksl(shader)
        .uniforms([
          { name: "hueShift", value: 0 },
          { name: "saturation", value: 1 },
          { name: "brightness", value: 1 },
          { name: "gamma", value: 1 },
          { name: "alpha", value: 1 },
          { name: "chromaKey", value: 0 }
        ])
        .locked(true)
        .disableHit(true)
        .build();

      await OBR.scene.local.addItems([effect]);
      await OBR.tool.setMetadata(TOOL_ID, { effectId: effect.id });
      OBR.popover.open({
        id: TOOL_ID + "/ui",
        url: "filter-ui.html",
        height: 300,
        width: 250,
        anchorElementId: elId,
        anchorOrigin: { horizontal: "CENTER", vertical: "BOTTOM" },
        transformOrigin: { horizontal: "CENTER", vertical: "TOP" }
      });

      return true;
    }
  });
});