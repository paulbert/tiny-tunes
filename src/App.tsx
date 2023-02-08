import React from 'react';
import { Button, Container, Grid, GridItem } from '@chakra-ui/react';
import NoteForm from './NoteForm';

const TOTAL_NOTES = 16 * 13;

export type Note = {
  id: number;
  pitch: number;
  start: number;
  duration: number;
}

const DEFAULT_NOTE = {
  pitch: 1,
  start: 1,
  duration: 1
}

function App() {

  const [ notes, setNotes ] = React.useState<Note[]>([]);
  const addNote = React.useCallback(
    () => {
      const newId = notes.length === 0 ? 0 : Math.max(...notes.map(n => n.id)) + 1;
      setNotes([ ...notes, { id: newId, ...DEFAULT_NOTE }])
    },
    [setNotes, notes]
  );
  const onNoteChange = React.useCallback((note: Note) => {
    setNotes(notes.map(n => n.id === note.id ? note : n));
  }, [setNotes, notes])
  const onNoteDelete = React.useCallback((note: Note) => {
    setNotes(notes.filter(n => n.id !== note.id));
  }, [setNotes, notes]);

  console.log(notes);

  return (
    <Container maxWidth='48rem' marginTop='2rem'>
      <Grid templateColumns='repeat(16, 1fr)' templateRows='repeat(13,1fr)' marginBottom='1rem'>
        {Array(TOTAL_NOTES).fill(1).map((_, index) => {
          const isNote = notes.some(({ pitch, start, duration }) => {
            const noteStart = (pitch - 1) * 16 + (start - 1);
            const noteEnd = noteStart + duration;
            return index >= noteStart && index < noteEnd;
          });
          return <GridItem
            w='3rem'
            h='1rem'
            bg={ isNote ? 'orange.700' : 'blue.300' }
            border={isNote ? 'none' : '1px' }
            borderColor='gray.200'
          />
        })}
      </Grid>
      <Button onClick={addNote}>Add Note</Button>
      {
        notes.map(note => <NoteForm note={note} onNoteChange={onNoteChange} onNoteDelete={onNoteDelete} key={note.id} />)
      }
    </Container>
  );
}

export default App;
