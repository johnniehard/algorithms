import { Sort } from './index'

export class Selection<T> extends Sort<T> {
    sort = (a : T[]) : T[] => {
        this.trace = []
        this.addTrace(a)
        a = [...a]
        for(let i: number = 0; i < a.length; i++){
            let min: number = i
            for(let j: number = i+1; j < a.length; j++){
                if(this.less(a[j], a[min])){
                    min = j
                }
            }
            this.exchange(a, i, min)
            this.addTrace(a)
        }
        return a
    }
}