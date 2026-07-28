'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from "sonner"

import { db } from "@/configs/FirebaseConfig";

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import { useUser } from "@clerk/nextjs";


import { Button } from '@/components/ui/button'

import {
  Loader2Icon,
  Download,
  Save
} from 'lucide-react'

function GenerateLogo({ formData }) {

  const { user } = useUser();

  const [loading, setLoading] = useState(false)
  const [logoImage, setLogoImage] = useState(null)
  const [error, setError] = useState(null)

  // Restore previous generated logo
  useEffect(() => {

    const savedLogo =
      localStorage.getItem("generated-logo")

    if (savedLogo) {
      setLogoImage(savedLogo)
    }

  }, [])


  const generateLogo = async () => {

    setLoading(true)
    setError(null)
    setLogoImage(null)

    const PROMPT = `
Professional logo icon.

Logo Idea:
${formData?.idea}

Description:
${formData?.desc}

Design Style:
${formData?.design}

Color Palette:
${formData?.palette}

Vector icon.

Minimal.

Professional branding.

NO TEXT.
NO LETTERS.
NO WORDS.
NO TYPOGRAPHY.

White background.
`.trim()

    try {

      const response = await axios.post(
        "/api/generate-logo",
        {
          prompt: PROMPT
        },
        {
          responseType: "blob"
        }
      )

      const reader = new FileReader()

      reader.onloadend = () => {

        const base64Image = reader.result

        setLogoImage(base64Image)

        localStorage.setItem(
          "generated-logo",
          base64Image
        )

      }

      reader.readAsDataURL(response.data)

    } catch (e) {

      console.log(e)

      toast.error("Failed to generate logo")

      setError(
        e?.response?.data?.error ??
        "Failed to generate logo"
      )

    } finally {

      setLoading(false)

    }

  }

  const createLogoCanvas = () => {

    const canvas =
      document.createElement("canvas")

    canvas.width = 450
    canvas.height = 420

    const ctx =
      canvas.getContext("2d")

    return new Promise((resolve) => {

      const img = new Image()

      img.onload = () => {

        ctx.fillStyle = "white"
        ctx.fillRect(
          0,
          0,
          canvas.width,
          canvas.height
        )

        const logoSize = 280

        const logoX =
          (canvas.width - logoSize) / 2

        const logoY = 20

        ctx.drawImage(
          img,
          logoX,
          logoY,
          logoSize,
          logoSize
        )

        ctx.fillStyle = "black"

        ctx.textAlign = "center"

        ctx.fillText(
          formData.title,
          canvas.width / 2,
          logoY + logoSize + 45
        )

        resolve(canvas)

      }

      img.src = logoImage

    })

  }
  const downloadImage = async () => {

    if (!logoImage) return

    const canvas = await createLogoCanvas()

    const link = document.createElement("a")

    link.download = `${formData.title}.png`

    link.href = canvas.toDataURL("image/png")

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

  }

  const saveLogo = async () => {

    if (!logoImage || !user) return;

    try {

      const canvas = await createLogoCanvas();

      const finalLogo = canvas.toDataURL("image/png");

      await addDoc(
        collection(db, "logos"),
        {

          userId: user.id,

          title: formData.title || "",

          description: formData.desc || "",

          idea: formData.idea || "",

          design: formData.design  || "",

          palette: formData.palette || "",

          image: finalLogo,

          createdAt: serverTimestamp()

        }
      );

      toast.success("Logo saved successfully!");

    }

    catch (err) {

      console.error("Firestore Error:", err);

      toast.error(err.message);

    }

  }

  return (

    <div className='my-16 flex flex-col items-center'>

      <Button
        onClick={generateLogo}
        disabled={loading}
        className='p-6'
      >

        {loading ? (

          <>

            <Loader2Icon
              className='mr-2 h-4 w-4 animate-spin'
            />

            Generating Logo...

          </>

        ) : (

          'Generate Logo'

        )}

      </Button>

      {error && (

        <p className='mt-6 text-red-500 font-medium'>
          {error}
        </p>

      )}

      {logoImage && (

        <div className='glass mt-10 rounded-3xl p-8 flex flex-col items-center gap-6'>

          <p className='text-green-600 font-semibold'>
            Logo Generated Successfully
          </p>

          <div className='bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center w-[400px]'>

            <img
              src={logoImage}
              alt='Generated Logo'
              className='w-72 object-contain'
            />

            <h2
              className='mt-6 text-4xl uppercase tracking-widest}'
            >
              {formData?.title}
            </h2>

          </div>

          <div className='flex gap-4'>

            <Button
              onClick={saveLogo}
              className='p-5'
            >

              <Save className='mr-2 h-4 w-4' />

              Save

            </Button>

            <Button
              onClick={downloadImage}
              variant='outline'
              className='p-5'
            >

              <Download className='mr-2 h-4 w-4' />

              Download

            </Button>

          </div>

        </div>

      )}

    </div>

  )

}

export default GenerateLogo