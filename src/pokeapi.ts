import { Cache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheIntervalId: number) {
        this.cache = new Cache(cacheIntervalId);
    };

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL? pageURL : PokeAPI.baseURL + "/location-area/";

        const cached = this.cache.get<ShallowLocations>(url);

        if (cached) {
            return cached;

        } else {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        const data: ShallowLocations = await response.json();

        this.cache.add(url, data);

        console.log("Data is Cached");

        return data;

        }
    }

    async fetchLocation(locationName:string): Promise<Location> {
        throw new Error("not implemented");
    }


}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
        name: string;
        url: string;
    }[];
}

export type Location = {

}