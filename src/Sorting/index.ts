
export class Sort <T> {
    compare: (a : T, b: T) => number
    trace: T[][]

    constructor(compare: (a: T, b: T) => number){
        this.compare = compare
    }

    sort = (a : T[]) : T[] => a

    less = (v: T, w: T): boolean => this.compare(v, w) < 0

    exchange = (a: T[], i: number, j: number): void => {
        const t: T = a[i]
        a[i] = a[j]
        a[j] = t
    }

    show = (a: T[]): string => {
        const s: string = a.join(" ")
        console.log(s)
        return s
    }

    addTrace = (a: T[]): void => {
        this.trace = [...this.trace, [...a]]
    }

    showTrace = (): string[] => {
        return this.trace.map(this.show)
    }

    isSorted = (a : T[]): boolean => {
        for(let i : number = 1; i < a.length; i++){
            if(this.less(a[i], a[i-1])){
                return false
            }
        }
        return true
    } 
}