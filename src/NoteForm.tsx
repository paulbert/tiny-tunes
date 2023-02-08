import React from 'react';
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField
} from '@chakra-ui/react'
import { Note } from './App';

const NoteForm = ({ note, onNoteChange, onNoteDelete }: { note: Note, onNoteChange: (note: Note) => void, onNoteDelete: (note: Note) => void }) => {

  const handleChange = (field: string) => (_valueAsString: string, value: number) => {
    onNoteChange({
      ...note,
      [field]: value
    })
  }

  const handleDelete = () => {
    onNoteDelete(note);
  }

  return (
    <Card marginTop='0.5rem' padding='0.5rem'>
      <FormControl>
        <FormLabel>Pitch</FormLabel>
        <NumberInput min={1} max={13} defaultValue={note.pitch} onChange={handleChange('pitch')}>
          <NumberInputField />
        </NumberInput> 
      </FormControl>
      <FormControl>
        <FormLabel>Start</FormLabel>
        <NumberInput min={1} max={16} defaultValue={note.start} onChange={handleChange('start')}>
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Duration</FormLabel>
        <NumberInput min={1} max={16 - note.start + 1} defaultValue={note.duration} onChange={handleChange('duration')}>
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <Button marginTop='0.5rem' bgColor='red.200' onClick={handleDelete}>Delete</Button>
    </Card>
  )

};

export default NoteForm;
