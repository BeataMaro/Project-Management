export interface Itask {
    title: string,
    order: number,
    description: string,
    isCompleted: boolean,
    _id: string,
    boardId: string,
    columnId: string,
    userId:	string,
    users: string[],
}

