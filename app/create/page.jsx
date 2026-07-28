'use client'

import React, { useEffect, useState } from 'react'

import { Suspense } from "react";
import LogoTitle from './_components/LogoTitle'
import LogoDesc from './_components/LogoDesc'
import LogoPalette from './_components/LogoPalette'
import LogoDesigns from './_components/LogoDesigns'
import LogoIdea from './_components/LogoIdea'
import GenerateLogo from './_components/GenerateLogo'

import { Button } from '@/components/ui/button'

import {
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

function CreateLogo() {

  const [step, setStep] = useState(1)

  const [formData, setFormData] = useState({})

  useEffect(() => {

    const storedData =
      localStorage.getItem("logo-form-data");

    const storedStep =
      localStorage.getItem("logo-current-step");

    if (storedData) {

      setFormData(JSON.parse(storedData));

    }

    if (storedStep) {

      setStep(Number(storedStep));

    }

  }, []);

  const onHandleInputChange = (
    field,
    value
  ) => {

    const updatedData = {

      ...formData,

      [field]: value

    }

    setFormData(updatedData)

    localStorage.setItem(
      'logo-form-data',
      JSON.stringify(updatedData)
    )
  }

  const handleNext = () => {

    localStorage.setItem(
      'logo-form-data',
      JSON.stringify(formData)
    );

    localStorage.setItem(
      "logo-current-step",
      step + 1
    );

    setStep(step + 1)
  }

  const handlePrevious = () => {
    localStorage.setItem(
      "logo-current-step",
      step - 1
    );

    setStep(step - 1)
  }

  return (

    <div className='glass min-h-160 border rounded-xl py-20 px-5'>

      <div className='border rounded-2xl p-10 2xl:mx-20 shadow-xl'>

        {/* STEP 1 */}

        {step === 1 ? (
          <Suspense fallback={<div>Loading...</div>}>
            <LogoTitle
              onHandleInputChange={(v) =>
                onHandleInputChange(
                  'title',
                  v
                )
              }
              formData={formData}
            />
          </Suspense>

        ) :

          /* STEP 2 */

          step === 2 ? (

            <LogoDesc
              onHandleInputChange={(v) =>
                onHandleInputChange(
                  'desc',
                  v
                )
              }
              formData={formData}
            />

          ) :

            /* STEP 3 */

            step === 3 ? (

              <LogoPalette
                onHandleInputChange={(v) =>
                  onHandleInputChange(
                    'palette',
                    v
                  )
                }
                formData={formData}
              />

            ) :

              /* STEP 4 */

              step === 4 ? (

                <LogoDesigns
                  onHandleInputChange={(v) =>
                    onHandleInputChange(
                      'design',
                      v
                    )
                  }
                  formData={formData}
                />

              ) :

                /* STEP 5 */

                step === 5 ? (

                  <LogoIdea
                    onHandleInputChange={(v) =>
                      onHandleInputChange(
                        'idea',
                        v
                      )
                    }
                    formData={formData}
                  />

                ) :

                  /* STEP 6 */

                  step === 6 ? (

                    <GenerateLogo
                      formData={formData}
                    />

                  ) : null}

        {/* BUTTONS */}

        <div className='flex items-center justify-between mt-16'>

          {step !== 1 ? (

            <Button
              variant='outline'
              onClick={handlePrevious}
              className='p-5'
            >

              <ArrowLeft className='mr-2 size-4' />

              Previous

            </Button>

          ) : (

            <div />

          )}

          {step !== 6 && (

            <Button
              onClick={handleNext}
              className='p-5'
            >

              Continue

              <ArrowRight className='ml-2 size-4' />

            </Button>

          )}

        </div>

      </div>

    </div>
  )
}

export default CreateLogo