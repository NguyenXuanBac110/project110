import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';

type FormValues = {
  fields: { value: string }[];
};

const DynamicFieldArray = () => {
  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      fields: [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <Container>
      <Typography variant="h4" textAlign="center" mb={2}>
        Dynamic Field Array
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" alignItems="center">
              <TextField
                {...register(`fields.${index}.value` as const)}
                defaultValue={field.value}
                label={`Field ${index + 1}`}
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => remove(index)}
                sx={{ ml: 2 }}
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => append({ value: '' })}
          >
            Add Field
          </Button>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default DynamicFieldArray;
