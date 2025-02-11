import React, { useEffect } from 'react';
import { useAuth } from '@/frontend/src/components/utils/use-auth-client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from '../../hooks/use-toast';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';

import Aurora from '../../components/backgrounds/Aurora/Aurora';
import { backend_user } from '@/declarations/backend_user';

const FormSchema = z.object({
  name: z.string().min(5, {
    message: 'Name must be at least 5 characters.',
  }),
  email: z.string().email({ message: 'Invalid email address.' }),
  dob: z.date().refine((date) => date <= new Date(), {
    message: 'Date of birth cannot be in the future.',
  }),
});

export default function Login() {
  const [result, setResult] = React.useState('');
  const [date, setDate] = React.useState<Date>();
  const { identity } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      dob: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (identity) {
      const principal = identity.getPrincipal();
      console.log(principal.toText());

      const existingUser = await backend_user.getUserById(principal);

      if (existingUser) {
        await backend_user.updateUser(
          principal,
          data.name,
          data.email,
          data.dob.toString(),
        );
        toast({ title: 'User updated successfully.' });
      } else {
        await backend_user.register(
          principal,
          data.name,
          data.email,
          data.dob.toString(),
        );
        toast({ title: 'User registered successfully.' });
      }
    } else {
      console.error('Identity is null or undefined');
    }
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (identity) {
        const principal = identity.getPrincipal();
        const existingUser = await backend_user.getUserById(principal);

        if (existingUser) {
          form.setValue('name', await backend_user.getName(principal));
          form.setValue('email', await backend_user.getEmail(principal));
        }
      }
    };

    fetchUserDetails();
  }, [identity, form]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="absolute inset-0 w-full h-full -z-10">
        <Aurora colorStops={['#00FBFF', '#7CFF67', '#00D8FF']} speed={0.5} />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6 bg-white/30 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-white"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter a valid email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2" />
                      {field.value ? format(field.value, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your date of birth.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
