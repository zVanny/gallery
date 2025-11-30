/// aqui van las funciones del CRUD

import { supabase } from "@/lib/supabase";
import { Note } from "../domain/note.interface";

export async function getNotes(): Promise<Note[]> {


    let { data, error } = await supabase
        .from('notas')
        .select('*');
    console.log(JSON.stringify(data))
    //retornar los registros
    return data ?? [];


}

//inserte o actualice una nota
export async function saveNote(note: Note): Promise<Note | null> {
    if (!note.id) {
        //si no hay ID (es nueva nota)

        const { data, error } = await supabase
            .from('notas')
            .insert([
                {
                    title: note.title,
                    description: note.description,

                }
            ])
            .select()

        //si data es array, tomar el primer elemento, sino retornar nulll

        return data !== null ? data[0] : null;
    } else {
        //mandar a actualizar


        //update Notas set title = 'hola', description = 'contenido'
        //where id = 1234
        const { data, error } = await supabase
            .from('notas')
            .update(
                {
                    title: note.title,
                    description: note.description,
                }
            )
            .eq('id', note.id)
            .select()
        //si data es array, tomar el primer elemento, sino retornar nulll
        return data !== null ? data[0] : null;

    }
}

//elimina una nota
export async function deleteNote(note: Note): Promise<Note | null> {

    const { data, error } = await supabase
        .from('notas')
        .delete()
        .eq('id', note.id)
        .select()

    if (error) {
        return null;
    }
    return data !== null ? data[0] : null;
}