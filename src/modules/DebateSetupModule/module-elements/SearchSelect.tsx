'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface SearchSelectProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  items: string[]
  loading?: boolean
  onSearch?: (query: string) => void
  searchDebounce?: number
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  value,
  onChange,
  placeholder,
  items,
  loading = false,
  onSearch,
  searchDebounce = 300,
}) => {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleInputChange = React.useCallback(
    (value: string) => {
      setInputValue(value)

      if (onSearch) {
        // Clear any existing timer
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }

        // Set a new timer to call onSearch after the debounce period
        debounceTimerRef.current = setTimeout(() => {
          onSearch(value)
        }, searchDebounce)
      }
    },
    [onSearch, searchDebounce]
  )

  // Clean up the timer when component unmounts
  React.useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-blue-900/30 border-blue-700/50 text-blue-100"
        >
          {value || placeholder}
          {loading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search public figure..."
            value={inputValue}
            onValueChange={handleInputChange}
          />
          <CommandList>
            {loading ? (
              <div className="flex items-center text-xs justify-center py-3 px-2 text-blue-600">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gathering data on famous public figures using AI...
              </div>
            ) : (
              <>
                <CommandEmpty>No public figure found.</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item}
                      value={item}
                      onSelect={() => {
                        onChange(item === value ? '' : item)
                        setOpen(false)
                        setInputValue('')
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === item ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
