import { useEffect } from 'react';
import { useAuth } from '@/frontend/src/hooks/use-auth-client';
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

import { backend_user } from '@/declarations/backend_user';
import { useNavigate } from 'react-router-dom';

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
  const { identity, logout } = useAuth();
  const navigate = useNavigate();

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
      const existingUser = await backend_user.getName(principal);

      if (existingUser != 'Stranger') {
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
      navigate('/home');
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
        <img
          src="https://res.cloudinary.com/dxcn5osfu/image/upload/f_auto,q_auto/v1/Triton/Website/cjfbhsmvgmeu7mndvmuu"
          alt="Triton Background"
          className="w-full h-full object-cover"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/4 space-y-6 bg-white backdrop-blur-lg p-10 rounded-2xl shadow-xl"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-pixel text-2xl">Name</FormLabel>
                <FormControl>
                  <Input
                    className="font-pixel"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="font-pixel text-md">
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
                <FormLabel className="font-pixel text-2xl">Email</FormLabel>
                <FormControl>
                  <Input
                    className="font-pixel"
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="font-pixel text-md">
                  Enter a valid email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-pixel text-2xl">
                  Date of Birth
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      //   'w-[280px] justify-start text-left font-normal',
                      //   !field.value && 'text-muted-foreground',
                      // )}
                      className="w-1/2 bg-white text-gray-500 font-pixel justify-start hover:bg-gray-200"
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
                <FormDescription className="font-pixel text-md">
                  Select your date of birth.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex flex-row gap-4 text-white">
            <Button
              className="w-full bg-green-500 hover:bg-green-500/80 rounded-xl font-pixel text-lg"
              type="submit"
            >
              Submit
            </Button>
            <Button
              className="w-full bg-red-500 hover:bg-red-500/80 rounded-xl shadow-xl font-pixel text-lg"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
