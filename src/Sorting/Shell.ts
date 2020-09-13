import { Sort } from './index'

export class Shell<T> extends Sort<T> {
    sort = (a: T[]): T[] => {
        this.trace = []
        this.addTrace(a)
        a = [...a]

        const n: number = a.length
        let h: number = 1
        while (h < Math.round(n / 3)) {
            h = 3 * h + 1
        }
        while (h >= 1) {
            for (let i = h; i < n; i++) {
                for (let j = i; j >= h && this.less(a[j], a[j - h]); j -= h) {
                    this.exchange(a, j, j - h)
                }
            }
            this.addTrace(a)
            h = Math.round(h / 3)
        }
        return a
    }
}