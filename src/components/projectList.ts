import {Component} from './base-component.js'
import {ProjectItem} from './projectItem.js'
import {autoBind} from '../decorators/autobind.js'
import {Project, ProjectStatus} from '../models/project.js'
import {ProjectState} from '../state/projectState.js'
import {DropTarget} from '../models/drag-drop.js'

const projectState = ProjectState.getInstance()

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DropTarget {
    assignedProjects: Project[] = []

    constructor(private type: 'active' | 'finished') {
        super('app', false, 'project-list', `${type}-projects`)

        this.configure()
        this.renderContent()
    }
    @autoBind
    dragOverHandler(e: DragEvent) {
        if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain'){
            e.preventDefault()
            const listEl = this.element.querySelector('ul')!
            listEl.classList.add('droppable')
        }
         
    }
    @autoBind
    dropHandler(e: DragEvent) {
        const proId = e.dataTransfer!.getData('text/plain')
        projectState.moveProject(proId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }
    @autoBind
    dragLeaveHandler(_: DragEvent){
        const listEl = this.element.querySelector('ul')!
        listEl.classList.remove('droppable')
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('drop', this.dropHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active'){
                    return project.status === ProjectStatus.Active
                }
                return project.status === ProjectStatus.Finished
            })
            this.assignedProjects = relevantProjects
            this.renderProject()
        })
    }
    private renderProject() {
        const listElem = document.getElementById(`${this.type}-projects-lists`) as HTMLUListElement
        listElem.innerHTML = ''
        for (let i = 0; i < this.assignedProjects.length; i++){
            console.log(this.assignedProjects[i], this.element.id)
            new ProjectItem(this.element.querySelector('ul')!.id, this.assignedProjects[i])
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-lists`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} Projects`
    }
}