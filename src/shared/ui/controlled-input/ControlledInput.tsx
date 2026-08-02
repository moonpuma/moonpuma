'use client'

import { Controller, useFormContext, type FieldPath, type FieldValues } from 'react-hook-form'
import { Input, type InputProps } from '@/shared/ui/input'

interface ControlledInputProps<TFieldValues extends FieldValues>
  extends Omit<InputProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'error'> {
  name: FieldPath<TFieldValues>
}

export function ControlledInput<TFieldValues extends FieldValues>({
  name,
  ...inputProps
}: ControlledInputProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => <Input {...inputProps} {...field} error={fieldState.error?.message} />}
    />
  )
}
