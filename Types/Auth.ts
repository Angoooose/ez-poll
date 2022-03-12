export default interface Auth {
    isAuthed: boolean,
    user?: {
        id: string,
    }
}