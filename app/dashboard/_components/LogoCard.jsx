'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Download, Trash2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

function LogoCard({ logo, onDelete }) {

  const downloadLogo = () => {

    const link = document.createElement("a");

    link.href = logo.image;
    link.download = `${logo.title}.png`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  }

  return (

    <div className='glass rounded-2xl p-5 transition-all duration-300 hover:shadow-xl mb-30'>

      <Dialog>

        <DialogTrigger asChild>

          <div className='overflow-hidden rounded-xl cursor-pointer'>

            <img
              src={logo.image}
              alt={logo.title}
              className='w-full aspect-square object-contain bg-white transition-transform duration-300 hover:scale-105'
            />

          </div>

        </DialogTrigger>

        <DialogContent className='max-w-4xl p-8'>

          <DialogTitle className="text-2xl font-bold">
            {logo.title}
          </DialogTitle>

          <img
            src={logo.image}
            alt={logo.title}
            className='w-full max-h-[80vh] object-contain rounded-lg'
          />

        </DialogContent>

      </Dialog>

      <h2 className='mt-5 text-xl font-semibold truncate'>
        {logo.title}
      </h2>

      <p className='text-sm text-muted-foreground'>
        {logo.createdAt?.toDate().toLocaleString()}
      </p>

      <div className='flex gap-3 mt-6'>

        <Button
          variant='outline'
          className='flex-1'
          onClick={downloadLogo}
        >
          <Download className='h-4 w-4 mr-2' />
          Download
        </Button>

        <Button
          variant='destructive'
          className='flex-1'
          onClick={() => onDelete(logo.id)}
        >
          <Trash2 className='h-4 w-4 mr-2' />
          Delete
        </Button>

      </div>

    </div>

  )
}

export default LogoCard