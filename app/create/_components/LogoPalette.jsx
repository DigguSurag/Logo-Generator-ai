'use client'
import React from 'react'
import HeadingDescription from './HeadingDescription'
import LogoTitleContent from '@/app/_data/LogoTitleContent'
import Colors from '@/app/_data/Colors'

function LogoPalette({onHandleInputChange, formData}) {

  const [selectedOption, setSeelectedOption] = React.useState(formData?.palette);
  return (
    <div className='my-12'>
      <HeadingDescription
        title={LogoTitleContent.ColorTitle}
        description={LogoTitleContent.ColorDesc}
      />

      <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-8'>
        {Colors.map((palette, index) => (
          <div key={index} className={`border-2 p-3 rounded-lg shadow-sm cursor-pointer ${selectedOption==palette.name&&'border rounded-lg border-primary'}`}
          onClick={()=> {setSeelectedOption(palette.name);
                    onHandleInputChange(palette.name)
                    }}>
            
            <h2 className='text-sm font-medium mb-2'>
              {palette.name}
            </h2>

            <div className='flex'>
              {palette.colors.map((color, i) => (
                <div
                  key={i}
                  className='h-12 w-12'
                  
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoPalette