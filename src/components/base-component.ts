export abstract class Component<T extends HTMLElement, U extends HTMLElement>{
    templateElem: HTMLTemplateElement
    hostElem: T
    element: U
    constructor(hostElemId: string, insertAtBegin: boolean, templateId: string, newElemId?: string) {
        this.templateElem = document.getElementById(templateId)! as HTMLTemplateElement
        this.hostElem = document.getElementById(hostElemId)! as  T
        const importedNode = document.importNode(this.templateElem.content, true)
        this.element = importedNode.firstElementChild as U
        if (newElemId) {
            this.element.id = newElemId
        }

        this.attach(insertAtBegin)
    }
    private attach(insertAtBegin: boolean) {
        this.hostElem.insertAdjacentElement(insertAtBegin ? 'afterbegin' : 'beforeend', this.element)
    }
    abstract configure(): void
    abstract renderContent(): void
}
