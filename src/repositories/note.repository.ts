import { calculateNotesStats } from '../helpers/note.helpers';
import { Note } from '../models/note.model';
import { NoteType, StatsType } from '../types/note.types';

export async function getNotesRepo(): Promise<NoteType[]> {
    try {
        return await Note.find().exec();
    } catch (err) {
        throw new Error('Error getting data');
    }
}

export async function getNoteRepo(id: string): Promise<NoteType | null> {
    try {
        return await Note.findById(id).exec();
    } catch (err) {
        throw new Error('Error getting note');
    }
}

export async function addNoteRepo(noteData: NoteType): Promise<NoteType> {
    try {
        const newNote = new Note(noteData);
        return await newNote.save();
    } catch (err) {
        throw new Error('Error adding record');
    }
}

export async function updateNoteRepo(
    id: string,
    updatedNote: NoteType
): Promise<NoteType | null> {
    try {
        return await Note.findByIdAndUpdate(id, updatedNote, {
            new: true,
        }).exec();
    } catch (err) {
        throw new Error('Error updating note');
    }
}

export async function deleteNoteRepo(id: string): Promise<NoteType | null> {
    try {
        return await Note.findByIdAndDelete(id).exec();
    } catch (err) {
        throw new Error('Error deleting note');
    }
}

export async function getNotesStatsRepo(): Promise<StatsType> {
    try {
        const notes = await Note.find().exec();
        const stats = calculateNotesStats(notes);
        return stats;
    } catch (err) {
        throw new Error('Error getting notes stats');
    }
}
