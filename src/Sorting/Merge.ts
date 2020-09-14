import { Sort } from './index'

export class Merge<T> extends Sort<T> {

    merge = (a: T[], aux: T[], lo: number, mid: number, hi: number): T[] => {
        a = [...a]
        aux = [...a]

        let i: number = lo
        let j: number = mid + 1;

        for (let k: number = lo; k <= hi; k++) {
            if (i > mid) a[k] = aux[j++];
            else if (j > hi) a[k] = aux[i++];
            else if (this.less(aux[j], aux[i])) a[k] = aux[j++];
            else a[k] = aux[i++];
            this.addTrace(a)
        }


        return a
    }

    _sort = (a: T[], aux: T[], lo: number, hi: number): T[] => {
        if (hi <= lo) return a;
        let mid: number = Math.floor(lo + (hi - lo) / 2)
        console.log('MID', hi, lo, mid)
        a = this._sort(a, aux, lo, mid)
        a = this._sort(a, aux, mid + 1, hi)
        a = this.merge(a, aux, lo, mid, hi)
        return a
    }

    sort = (a: T[]): T[] => {
        a = [...a]
        this.trace = []
        this.addTrace(a)

        let aux = [...a]
        a = this._sort(a, aux, 0, a.length - 1)

        return a
    }


}