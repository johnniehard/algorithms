import { Sort } from './index'

export class Insertion<T> extends Sort<T> {
    sort = (a : T[]) : T[] => {
        this.trace = []
        this.addTrace(a)
        a = [...a]
        for(let i: number = 1; i < a.length; i++){
            for(let j: number = i; j > 0 && this.less(a[j], a[j -1]); j--){
                this.exchange(a, j, j-1)
                this.addTrace(a)
            }
        }
        return a
    }
}