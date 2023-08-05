import { NoteType, StatsType } from '../types/note.types';

export function calculateNotesStats(notes: NoteType[]): StatsType {
    const stats: StatsType = {};
    const categories = ['Task', 'Idea', 'Random Thought', 'Quote'];

    categories.forEach((category) => {
        stats[category] = { active: 0, archived: 0 };
    });

    notes.forEach((note) => {
        if (note.category in stats) {
            note.archived
                ? stats[note.category].archived++
                : stats[note.category].active++;
        }
    });

    return stats;
}
