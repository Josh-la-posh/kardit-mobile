import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  });

  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            autoCapitalize="none"
            error={errors.email?.message}
            keyboardType="email-address"
            label="Email"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            error={errors.password?.message}
            label="Password"
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            secureTextEntry
            value={field.value}
          />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>Continue</Button>
    </>
  );
}
