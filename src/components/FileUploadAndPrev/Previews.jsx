import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

export function Previews({ files, setFiles }) {
  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const thumbs = files.map((file) => (
    <div
      className={cn(
        'relative mb-2 mr-2 box-border inline-flex flex-col items-center justify-center rounded-md  border border-gray-300 px-4 py-8'
      )}
      key={file.name}
    >
      <div className={cn('flex min-w-0 overflow-hidden')}>
        <Image
          width={100}
          height={100}
          alt={file.name}
          src={file.preview}
          className={cn('block h-full w-auto')}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      <button
        className={cn(
          'absolute -right-0 -top-0 aspect-square rounded-bl-md border bg-red-600 px-1 text-white transition-colors hover:border-red-600 hover:bg-white hover:text-red-600'
        )}
        onClick={() => {
          // Remove the file from the 'files' array
          const updatedFiles = files.filter((f) => f !== file);
          setFiles(updatedFiles);
        }}
      >
        <Trash className="aspect-square w-4" />
      </button>
    </div>
  ));

  return <aside className={cn('grid grid-cols-6 py-2')}>{thumbs}</aside>;
}
