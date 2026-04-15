import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState, useRef, useCallback } from 'react'
import {
  useForm,
  useController,
  FormProvider,
  type Path,
  type Control,
  type FieldValues,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { recipientSchema, type RecipientRow } from '#/lib/recipients/schema'
import { insertRecipientFn, extractImageDataFn } from '#/lib/recipients/fn'
import { toast } from 'sonner'
import Webcam from 'react-webcam'
import { Info, BadgeX } from 'lucide-react'

type State = 'IDLE' | 'ERROR' | 'CAPTURE' | 'IMAGE'

export const Route = createFileRoute('/_protected/dashboard/recipients/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const methods = useForm<RecipientRow>({
    resolver: zodResolver(recipientSchema),
    defaultValues: {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2) + Date.now().toString(36),
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
  const onSubmit = async (data: RecipientRow) => {
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

  const [recipient, setRecipient] = useState<RecipientRow | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string>('')
  const [state, setState] = useState<State>('IDLE')
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const webcampRef = useRef<Webcam>(null)

  const capture = useCallback(() => {
    if (!webcampRef.current) return

    const imageSrc = webcampRef.current?.getScreenshot()
    if (!imageSrc) return

    setLoading(true)

    setTimeout(() => {
      setImgSrc(imageSrc)
      setLoading(false)
    }, 600)
  }, [webcampRef])

  const videoConstraints = {
    facingMode: 'environment',
  }

  const handleAnalyze = async () => {
    try {
      if (!imgSrc) return
      setIsAnalyzing(true)

      const res = await fetch(imgSrc)
      const blob = await res.blob()
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

      const formData = new FormData()
      formData.append('image', file)

      const data = await extractImageDataFn({ data: formData })
      methods.reset({
        ...methods.getValues(),
        ...data,
        id:
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2) + Date.now().toString(36),
      })
      setRecipient(methods.getValues())
    } catch (err) {
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="border border-zinc-200 dark:border-zinc-800 h-102 p-2 lg:p-3">
            <div className="h-full">
              {/* info [IDLE] */}
              {state === 'IDLE' && (
                <div className="md:px-10 h-full flex flex-col justify-center items-center text-center gap-4">
                  <div>
                    <p className="text-sm">Drag & Drop your photo here</p>
                    <p className="my-2 inline-flex items-center gap-2 px-4 py-2 text-xs  bg-blue-500/10 text-blue-400 border border-blue-500/20 ">
                      <Info size={16} />
                      Make sure the information is ligible
                    </p>
                  </div>

                  <div className="flex items-center gap-4 w-full max-w-70">
                    <span className="h-px bg-zinc-300 dark:bg-zinc-800 w-full"></span>
                    <span className="text-sm text-zinc-400 dark:text-zinc-500">
                      or
                    </span>
                    <span className="h-px bg-zinc-300 dark:bg-zinc-800 w-full"></span>
                  </div>

                  <button
                    onClick={() => setState('CAPTURE')}
                    className="block py-2 px-4 text-sm text-black/70 border-dark/60 hover:bg-zinc-100 dark:text-white/70  border dark:border-white/50 dark:hover:bg-zinc-900 font-semibold tracking-wide transition-colors"
                  >
                    Caputre a photo
                  </button>
                </div>
              )}

              {/* error camera access denied [ERROR] */}
              {state === 'ERROR' && (
                <div className="md:px-10 h-full flex items-center justify-center w-full text-center">
                  <div>
                    <p className="text-sm">Check your permission settings</p>
                    <p className="my-2 inline-flex items-center gap-2 px-4 py-2 text-xs  bg-red-500/10 text-red-400 border border-red-500/20 ">
                      <BadgeX size={16} />
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* capture image [CAPTURE] */}
              {state === 'CAPTURE' && (
                <div className="w-full h-80">
                  <Webcam
                    ref={webcampRef}
                    audio={false}
                    videoConstraints={videoConstraints}
                    screenshotFormat="image/jpeg"
                    forceScreenshotSourceSize={true}
                    onUserMediaError={() => {
                      setState('ERROR')
                      setError('Check your permission settings or use HTTPS.')
                    }}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      capture()
                      setState('IMAGE')
                    }}
                    className="mt-3 py-2 px-4 text-sm bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
                  >
                    Capture photo
                  </button>
                </div>
              )}

              {/* loading [LOADING] */}
              {loading && (
                <div className="flex justify-center items-center h-full">
                  <span className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></span>
                </div>
              )}

              {/* capture image [IMAGE] */}
              {state === 'IMAGE' && imgSrc && (
                <div className="w-full h-80">
                  <img
                    src={imgSrc}
                    alt="Image capture by camera"
                    className="w-full h-full wimport OpenAI from 'jsr:@openai/openai';-full object-cover"
                  />

                  <div className="mt-2 flex gap-4">
                    <button
                      onClick={() => {
                        setImgSrc(null)
                        setState('CAPTURE')
                      }}
                      className="px-4 py-2 text-sm border-b dark:border-white dark:text-white hover:bg-zinc-900 dark:hover:bg-zinc-900 transition-colors"
                    >
                      New Photo
                    </button>

                    <button
                      onClick={handleAnalyze}
                      className="px-4 py-2 text-sm bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
                    >
                      {isAnalyzing ? '✨ Analyzing...' : '🔍 Analyze with IA'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          {/* test result */}
          {JSON.stringify(recipient)}

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
                    className="flex-1 bg-black text-white dark:bg-white dark:text-black font-bold px-8 py-4 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-color disabled:opacity-50 duration-400 disabled:bg-red-500!"
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
  } = useController({ control, name })
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
