import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mockup } from 'src/app/models/mockup.model';
import { MOCKUPS } from 'src/app/data/mockups-list.data';
import { fabric } from 'fabric';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mockup',
  templateUrl: './mockup.component.html',
  styleUrls: ['./mockup.component.scss']
})
export class MockupComponent {
  mockup: Mockup | undefined;
  canvas!: fabric.Canvas;
  orientation: string = 'horizontal';
  clipPath: fabric.Rect | undefined = undefined;
  title: string = 'Título';

  constructor(private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.mockup = MOCKUPS.find(mockup => mockup.id === id);
  }

  ngAfterViewInit() {
    this.initializeCanvas();
  }

  initializeCanvas() {
    if (this.canvas) {
      this.canvas.dispose();
    }

    this.canvas = new fabric.Canvas('canvas-mockup', {
      width: this.Width,
      height: this.Height,
      backgroundColor: 'white'
    })

    this.canvas.controlsAboveOverlay = true;

    this.applyOrientation();
    this.loadBackground();
    this.loadClipPath();
  }

  applyOrientation() {
    this.canvas.setWidth(this.Width);
    this.canvas.setHeight(this.Height);
    this.canvas.setDimensions({ width: this.CssWidth, height: this.CssHeight }, { cssOnly: true });

    this.loadBackground();
    this.loadClipPath();
  }

  loadBackground() {
    let background: string = this.mockup!.img;

    fabric.Image.fromURL(background, (bgMockup) => {
      bgMockup.set({
        originX: 'center',
        originY: 'center',
        left: this.canvas.getWidth() / 2,
        top: this.canvas.getHeight() / 2,
        angle: this.orientation === 'vertical' ? 90 : 0
      });

      this.canvas!.setBackgroundImage(bgMockup, this.canvas.renderAll.bind(this.canvas));
    });
  }

  loadClipPath() {
    let svg_clip: string = this.mockup!.svg;

    fabric.loadSVGFromURL(svg_clip, (objects, options) => {
      let svg = fabric.util.groupSVGElements(objects, options);

      const isVertical = this.orientation === 'vertical';
      const angle = isVertical ? 90 : 0;

      const centerX = this.canvas.getWidth() / 2;
      const centerY = this.canvas.getHeight() / 2;

      svg.set({
        originX: 'center',
        originY: 'center',
        left: centerX,
        top: centerY,
        angle: angle,
        absolutePositioned: true
      });

      this.canvas.clipPath = svg;
      this.canvas.renderAll();
    });
  }

  onOrientationChange() {
    this.applyOrientation();
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.canvas.getObjects().forEach((obj) => {
      if (obj.type === 'image') {
          this.canvas.remove(obj);
      }
  });

    const reader = new FileReader();
    reader.onload = (e: any) => {
      fabric.Image.fromURL(e.target.result, (img) => {
        img.scaleToWidth(this.Width - 130);
        img.scaleToHeight(this.Height - 130);

        img.set({
          originX: 'center',
          originY: 'center',
          left: this.canvas.getWidth() / 2,
          top: this.canvas.getHeight() / 2,
          borderColor: '#D40A77',
          transparentCorners: false,
          cornerSize: 20,
          cornerColor: '#D40A77',
          cornerStyle: 'circle'
        });

        img.globalCompositeOperation = 'multiply';

        this.canvas.add(img);
        this.canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  }

  async downloadMockup() {
    if (!this.canvas) return;

    this.toastr.info('Espere un momento por favor.', 'Descarga en proceso.', {
      tapToDismiss: false,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    });

    try {
      const dataURL = this.canvas.toDataURL({
        format: 'png',
        quality: 1.0
      });

      const link = document.createElement('a');
      link.href = dataURL;

      const fileName = this.title.trim() ? this.title : '(sin título)';
      link.download = `${fileName} mockup ${this.mockup!.shortTitle} ${this.orientation}.png`;
      link.click();
      link.remove();

      this.toastr.success('Tu archivo se descargará en formato imagen/PNG.', 'Descarga completada.', {
        tapToDismiss: true,
        positionClass: 'toast-bottom-right',
        newestOnTop: false
      });

    } catch (error) {
      this.toastr.error('Ha ocurrido un error al intentar descargar tu archivo. Pruebe nuevamente en unos minutos', 'Error inesperado', {
        tapToDismiss: true,
        positionClass: 'toast-bottom-right',
        newestOnTop: false
      });
    }
  }

  get Width() {
    return this.orientation === 'vertical' ? 1000 : 1400;
  }

  get Height() {
    return this.orientation === 'vertical' ? 1400 : 1000;
  }

  get CssWidth() {
    return this.orientation === 'vertical' ? '600px' : '800px';
  }

  get CssHeight() {
    return this.orientation === 'vertical' ? '800px' : '600px';
  }

  rotateImage(): void {
    const imgObject = this.canvas.getObjects().find(obj => obj.type === 'image') as fabric.Image;
    if (!imgObject) return;

    let currentAngle = imgObject.angle || 0;
    let newAngle = (currentAngle + 90) % 360;

    imgObject.rotate(newAngle);
    this.canvas.requestRenderAll();
  }

  centerImage(): void {
    const imgObject = this.canvas.getObjects().find(obj => obj.type === 'image') as fabric.Image;

    if (!imgObject) return;

      imgObject.set({
        left: this.canvas.getWidth() / 2,
        top: this.canvas.getHeight() / 2,
        originY: 'center',
        originX: 'center'
      });

    this.canvas.requestRenderAll();
  }
}
