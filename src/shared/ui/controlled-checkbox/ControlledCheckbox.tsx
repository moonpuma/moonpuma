'use client'

import { Controller, useFormContext, type FieldPath, type FieldValues } from 'react-hook-form'
import { Checkbox, type CheckboxProps } from '@/shared/ui/checkbox'

interface ControlledCheckboxProps<TFieldValues extends FieldValues>
  extends Omit<CheckboxProps, 'name' | 'checked' | 'onChange' | 'onBlur'> {
  name: FieldPath<TFieldValues>
}

export function ControlledCheckbox<TFieldValues extends FieldValues>({
  name,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => <Checkbox {...checkboxProps} {...field} checked={Boolean(value)} />}
    />
  )
}
