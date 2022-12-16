import {Component} from './base-component.js'
import {autoBind} from '../decorators/autobind.js'
import {ProjectState} from '../state/projectState.js'
import {validate, Validatable} from '../utils/validate.js'

const projectState = ProjectState.getInstance()

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleElem: HTMLInputElement
    descElem: HTMLInputElement
    peopleELem: HTMLInputElement

    constructor() {
        super('app', true, 'project-input', 'user-input')
        this.titleElem = this.element.querySelector('#title') as HTMLInputElement
        this.descElem = this.element.querySelector('#description') as HTMLInputElement
        this.peopleELem = this.element.querySelector('#people') as HTMLInputElement
        this.configure()
    }
    renderContent(){

    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
    @autoBind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.getUserInput()
        if (Array.isArray(userInput)){
            const [title, desc, people] = userInput
            console.log(title, desc, people)
            projectState.addProject(title, desc, people)
            this.clearInputs()
        }
        

    }
    private getUserInput() : [string, string, number] | void{
        const enteredTitle = this.titleElem.value
        const enteredDesc = this.descElem.value
        const enteredPeople = this.peopleELem.value
        const titleValidate: Validatable = {
            value: enteredTitle,
            required: true,
            minLength: 5,
            maxLength: 20
        }
        const descValidate: Validatable = {
            value: enteredDesc,
            required: true,
            minLength: 5
        }
        const peopleValidate : Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }
        if (!validate(titleValidate) || !validate(descValidate) || !validate(peopleValidate)){
            alert('Please Enter valid inputs')
            return
        }
        return [enteredTitle, enteredDesc, parseInt(enteredPeople)]

    }
    private clearInputs(){
        this.titleElem.value = ''
        this.descElem.value = ''
        this.peopleELem.value = ''
    }
}