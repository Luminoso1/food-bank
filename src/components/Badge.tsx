import { cn } from '#/lib/utils'

const STATUS_STYLES = {
  active:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
  inactive:
    'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20',
} as const

function Badge({ status }: { status: keyof typeof STATUS_STYLES }) {
  return (
    <span
      className={cn(
        'px-3 py-1 uppercase text-[10px] tracking-[0.2em] font-bold border transition-all',
        STATUS_STYLES[status],
      )}
    >
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  )
}

export default Badge
