export interface NoteType {
    name: string;
    date: Date;
    category: string;
    content: string;
    archived: boolean;
}

export interface StatsType {
    [key: string]: { active: number; archived: number };
}
