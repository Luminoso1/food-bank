import { createFileRoute, useRouter } from '@tanstack/react-router'
import {
  useForm,
  useController,
  FormProvider,
  type Path,
  type Control,
  type FieldValues,
} from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { recipientSchema } from '#/lib/recipients/schema'
import { insertRecipientFn } from '#/lib/recipients/fn'
import { toast } from 'sonner'

type RecipientType = z.infer<typeof recipientSchema>

export const Route = createFileRoute('/_protected/dashboard/recipients/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const methods = useForm<RecipientType>({
    resolver: zodResolver(recipientSchema),
    defaultValues: {
      id: crypto.randomUUID().toString(),
      lastNames: '',
      names: '',
      dni: '',
      isActive: true,
      email: '',
      primaryPhoneNumber: '',
      secondaryPhoneNumber: '',
      address: '',
      notes: '',
    },
  })

  const control = methods.control
  const isSubmitting = methods.formState.isSubmitting
  const onSubmit = async (data: RecipientType) => {
    try {
      await insertRecipientFn({ data })
      toast.custom((t) => {
        return (
          <div className="w-88 bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-4 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-green-500 dark:text-green-400">
                  Good job!
                </span>

                <button
                  onClick={() => toast.dismiss(t)}
                  className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  CLOSE
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-white/80 leading-relaxed font-medium">
                Successfully created
              </p>
            </div>
          </div>
        )
      })
      router.invalidate({
        filter: (d) => d.routeId !== '/_protected/dashboard/recipients/',
      })
      router.navigate({ to: '..' })
    } catch (err: any) {
      console.error(err)
      toast.custom((t) => {
        return (
          <div className="w-88 bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 p-4 shadow-xl backdrop-blur-md">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-red-500 dark:text-red-400">
                  Opps!
                </span>

                <button
                  onClick={() => toast.dismiss(t)}
                  className="text-xs text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  CLOSE
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-white/80 leading-relaxed font-medium">
                {err.message || 'An unexpected error has occurred'}
              </p>
            </div>
          </div>
        )
      })
    }
  }

  return (
    <section>
      <div className="lg:grid grid-cols-2 gap-4">
        <div className="bg-neutral-800">{/* upload / photo */}</div>
        <div>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
                <Input
                  control={control}
                  name="lastNames"
                  placeholder="Lopez Ariza"
                />
                <Input
                  control={control}
                  name="names"
                  placeholder="Gian Lucas"
                />
                <Input control={control} name="dni" placeholder="10405340134" />
                <Input
                  control={control}
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
                <Input
                  control={control}
                  name="primaryPhoneNumber"
                  label="Phone 1"
                  placeholder="3022073956"
                />
                <Input
                  control={control}
                  name="secondaryPhoneNumber"
                  label="Phone 2"
                  placeholder="3022073956"
                />

                <div className="sm:col-span-2">
                  <Input
                    control={control}
                    name="address"
                    placeholder="CL 22 # 18 - 43"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Notes
                  </label>
                  <textarea
                    {...methods.register('notes')}
                    rows={3}
                    className="bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-3 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all resize-none"
                    placeholder="Some additional notes about the recipient..."
                  />
                </div>

                <div className="sm:col-span-2 pt-3 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => methods.reset()}
                    className="px-8 py-4 text-dark border border-dark dark:border-white dark:text-white font-semibold dark:hover:bg-zinc-900 hover:bg-zinc-200 transition-colors duration-400"
                    type="button"
                  >
                    Clean
                  </button>

                  <button
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-white dark:bg-white dark:text-black font-bold px-8 py-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-color disabled:opacity-50 duration-400"
                    type="submit"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Recipient'}
                  </button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  )
}

interface InputProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>
  name: Path<T>
  label?: string
}

function Input<T extends FieldValues>({
  control,
  name,
  label,
  ...rest
}: InputProps<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, defaultValue: '' as any })
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
        {label ? label : name}
      </label>
      <input
        {...field}
        {...rest}
        className="uppercase bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white px-4 py-4 text-sm outline-none focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
      />
      {error && <span className="text-xs text-red-500">{error.message}</span>}
    </div>
  )
}
