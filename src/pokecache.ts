export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}


export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId : NodeJS.Timeout | undefined = undefined;
    #interval: number = 0;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);

        if (!entry) {
            return undefined;
        }

        return entry.val;
    }

    #reap() {
        for (const [key, value] of this.#cache) {
            if (value.createdAt <= (Date.now() - this.#interval)) {
                this.#cache.delete(key);
            }
        }
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}