export { }

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            globalCodigo: string
            globalSigla: string
        }
    }
}
