import { TrackerModelInterface, ITracker, TrackerDoc } from '../schema/tracker';

export interface IReturnTracker {
    
}

export default class Tracker {
    constructor(public Schema: TrackerModelInterface) { }

    async getTrackers(userId: string): Promise<IReturnTracker> {
        return await this.Schema.find({ user: userId });
    }

    async getOne(trackerId: string) {
        return await this.Schema.findById(trackerId);
    }

    async createNewTracker(data: ITracker): Promise<IReturnTracker> {
        console.log('data in createNewTracker:::', data);
        return await this.Schema.create(data);
    }
}