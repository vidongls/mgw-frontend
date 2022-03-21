export default interface DefaultPropsInterface {
    title?: string
    history?: {
        push: (url: string) => {}
    }
    match?: any
    location?: any
    path?: string
}
