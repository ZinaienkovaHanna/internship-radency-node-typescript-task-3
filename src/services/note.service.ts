import { Request, Response } from 'express';
import {
    getNotesRepo,
    getNoteRepo,
    addNoteRepo,
    updateNoteRepo,
    deleteNoteRepo,
    getNotesStatsRepo,
} from '../repositories/note.repository';
import { validateNoteSchema } from '../models/validate.model';
import { NoteType } from '../types/note.types';

function handleError(res: Response, error: any): void {
    res.status(500).json({ error: error.message });
}

export async function getNotes(req: Request, res: Response): Promise<void> {
    try {
        const notes = await getNotesRepo();
        res.status(200).json(notes);
    } catch (err) {
        handleError(res, err);
    }
}

export async function getNote(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const note = await getNoteRepo(id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json(note);
        }
    } catch (err) {
        handleError(res, err);
    }
}

export async function addNote(req: Request, res: Response): Promise<void> {
    try {
        const newNoteData: NoteType = req.body;

        await validateNoteSchema.validate(newNoteData, { abortEarly: false });

        const newNote = await addNoteRepo(newNoteData);
        res.status(201).json(newNote);
    } catch (err) {
        handleError(res, err);
    }
}

export async function updateNote(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const updatedNoteData: NoteType = req.body;

        await validateNoteSchema.validate(updatedNoteData, {
            abortEarly: false,
        });

        const updatedNote = await updateNoteRepo(id, updatedNoteData);
        if (!updatedNote) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json(updatedNote);
        }
    } catch (err) {
        handleError(res, err);
    }
}

export async function deleteNote(req: Request, res: Response): Promise<void> {
    try {
        const id = req.params.id;
        const note = await deleteNoteRepo(id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json(note);
        }
    } catch (err) {
        handleError(res, err);
    }
}

export async function getNotesStats(
    req: Request,
    res: Response
): Promise<void> {
    try {
        const stats = await getNotesStatsRepo();
        res.status(200).json(stats);
    } catch (err) {
        handleError(res, err);
    }
}
