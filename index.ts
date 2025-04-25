const OBR = window.OBR;

class MapFilterExtension {
  private worker: Worker;
  private currentMap: any;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.worker = new Worker('./worker.js');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async initialize() {
    OBR.onReady(async () => {
      // Create UI panel
      const panel = await OBR.panel.create({
        id: "map-filter-panel",
        url: "/ui.html",
        height: 300,
      });

      // Handle map selection
      OBR.scene.onMapChange(async (map) => {
        this.currentMap = map;
        const image = await OBR.assets.getImage(map.imageId);
        await this.loadImage(image.url);
        panel.isOpen = true;
      });
    });
  }

  private async loadImage(url: string) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    await new Promise((resolve) => (img.onload = resolve));
    
    this.canvas.width = img.width;
    this.canvas.height = img.height;
    this.ctx.drawImage(img, 0, 0);
  }

  public async applyFilters(params: any) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    
    this.worker.postMessage({
      data: imageData.data.buffer,
      width: this.canvas.width,
      height: this.canvas.height,
      params
    }, [imageData.data.buffer]);

    this.worker.onmessage = (e) => {
      const processed = new ImageData(
        new Uint8ClampedArray(e.data.processed),
        this.canvas.width,
        this.canvas.height
      );
      this.ctx.putImageData(processed, 0, 0);
      
      // Update the map in Owlbear
      OBR.scene.updateMap(this.currentMap.id, {
        image: this.canvas.toDataURL()
      });
    };
  }
}

// Initialize extension
const extension = new MapFilterExtension();
extension.initialize();

// Expose filter application to UI
(window as any).applyFilters = (params: any) => extension.applyFilters(params);