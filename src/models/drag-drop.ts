export interface Drageable {
    dragStartHandler(e : DragEvent) : void;
    dragEndHandler(e : DragEvent) : void;
}

export interface DropTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent) : void;
    dragLeaveHandler(event: DragEvent) : void
}