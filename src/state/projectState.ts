import {Project, ProjectStatus} from '../models/project.js'
import {Listener} from '../utils/validate.js'

class State<T> {
    protected listeners: Listener<T>[] = []
    addListener(listener: Listener<T>) {
        this.listeners.push(listener)
    }
}

export class ProjectState extends State<Project> {
    private projects: Project[] = []
    private static instance: ProjectState
    
    private constructor(){
        super()
    }
    addProject(title : string, desc : string, people: number) {
        const newProject = new Project(Math.random().toString(), title, desc, people, ProjectStatus.Active)
        this.projects.push(newProject)
        this.updateListeners()
        return this.projects
    }
    moveProject(projectId : string, newStatus: ProjectStatus) {
        const project = this.projects.find(pro => pro.id === projectId)
        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListeners()
        }
    }
    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }
    private updateListeners(){
        for (let listener of this.listeners){
            listener(this.projects.slice())
        }
    }
}