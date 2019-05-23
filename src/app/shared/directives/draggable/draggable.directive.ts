import {Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {DragService} from '../../services/drag.service';

// 1
@Directive({
  selector: '[appDraggable]'
})

export class DraggableDirective implements OnInit, OnDestroy {

  // Events
  private onDragStart: Function;
  private onDragEnd: Function;

  // Options for the directive
  private options: DraggableOptions;

  // 2
  @Input()
  set appDraggable(options: DraggableOptions) {
    if (options) {
      this.options = options;
    }
  }

  constructor(private elementRef: ElementRef
    , private renderer: Renderer2
    , private dragService: DragService) {
    // 3
    this.renderer.setProperty(this.elementRef.nativeElement, 'draggable', true);
    this.renderer.addClass(this.elementRef.nativeElement, 'app-draggable');
  }

  // 4
  ngOnInit() {
    this.addDragEvents();
  }

  // 5
  ngOnDestroy() {
    // Remove events
    this.onDragStart();
    this.onDragEnd();
  }

  /**
   * @desc responsible for adding the drag events to the directive
   * @note transfers drag data using the Drag and Drop API (Browser)
   * @note known CSS issue where a draggable element cursor cant be set while dragging in Chrome
   */
  // 6
  private addDragEvents(): void {
    // 7
    this.onDragStart = this.renderer.listen(
      this.elementRef.nativeElement
      , 'dragstart'
      , (event: DragEvent): void => {
        // Fm begin
        console.log(`startDrag:  this(${this})` );
        console.log(this);
        // Fm end

        // fm this.dragService.startDrag(this.options.zones);        
        if (this.options.zones) {
          this.dragService.startDrag(this.options.zones);
        }
        

        // Transfer the data using Drag and Drop API (Browser)
		//if (this.options.data.payloadType && (this.options.data.payloadType === 'url') {
      if (this.options.data.payloadType && ["url", "Free Wille"].includes(this.options.data.payloadType) ) {
      
        console.log(JSON.stringify(this.options.data));

        // event.dataTransfer.setData("text/html", 
        //   `
        //   <figure class="image">
        //   <img src="https://i.ytimg.com/vi/bjJSA8hx35E/hqdefault.jpg" alt="">
        //   </figure>
        //   <p> <a href="https://www.youtube.com/watch?v=bjJSA8hx35E">play</a></p>
        //   `);

        event.dataTransfer.setData("text/html", this.options.data.payload);

			//event.dataTransfer.setData("text/uri-list", "http://www.mozilla.org");
			//event.dataTransfer.setData('text/plain', 'http://www.mozilla.org');
		} else {			
			event.dataTransfer
				.setData('Text', JSON.stringify(this.options.data));			
		}			
      });

    // 8
    this.onDragEnd = this.renderer.listen(
      this.elementRef.nativeElement
      , 'dragend'
      , (event: DragEvent): void => {
        console.log(`this.onDragEnd event=  ${event}`); //this.dragService.removeHighLightedAvailableZones();
      });
  }
}

// 9
export interface DraggableOptions {
  zones?: Array<string>;
  data?: any;
}
