import {Component} from './base-component.js'
import {autoBind} from '../decorators/autobind.js'
import {Project} from '../models/project'
import {Drageable} from '../models/drag-drop.js'


export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Drageable{
    project: Project

    get persons(){
        if (this.project.people === 1) {
            return '1 person'
        }
        return `${this.project.people} persons`
    }
    constructor(hostId: string, project: Project){
        super(hostId, false, 'single-project', project.id)
        console.log(this.templateElem)
        this.project = project
        this.configure()
        this.renderContent()
    }
    @autoBind
    dragStartHandler(e: DragEvent) {
        e.dataTransfer!.setData('text/plain', this.project.id)
        e.dataTransfer!.effectAllowed = 'move'
    }
    dragEndHandler(_: DragEvent){
        console.log('drag end')
    }
    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndHandler)
    }
    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title
        this.element.querySelector('h3')!.textContent = this.persons + ' Assigned'
        this.element.querySelector('p')!.textContent = this.project.description
    }
}