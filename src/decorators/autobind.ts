export function autoBind(_ : any, _2 : string, descriptor: PropertyDescriptor){
    const originalMth = descriptor.value
    console.log(originalMth)
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMth.bind(this)
            console.log(boundFn)
            return boundFn
        }
    }
    console.log(adjDescriptor)
    return adjDescriptor
}