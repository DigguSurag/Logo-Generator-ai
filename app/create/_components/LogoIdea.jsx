import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import LogoTitleContent from '@/app/_data/LogoTitleContent'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'
import { Button } from '@/components/ui/button'
import { Loader2Icon } from 'lucide-react'

function LogoIdea({ formData, onHandleInputChange }) {

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState(formData?.idea)

  const generateLogoDesignIdea = async () => {

    setLoading(true)

    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
      .replace('{logoType}', formData?.design ?? '')
      .replace('{logoTitle}', formData?.title ?? '')
      .replace('{logoDesc}', formData?.desc ?? '')
      .replace('{logoPrompt}', formData?.design ?? '')

    try {

      const result = await axios.post("/api/ai-design-ideas", {
        prompt: PROMPT
      })

      console.log(result.data)

      setIdeas(result.data.ideas)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className='my-10'>

      <HeadingDescription
        title={LogoTitleContent.IdeaTitle}
        description={LogoTitleContent.IdeaDesc}
      />

      <Button
        onClick={generateLogoDesignIdea}
        disabled={loading}
        className='mt-8 p-5'
      >
        {loading ? 'Generating...' : 'Generate Ideas'}
      </Button>
      <div className='flex items-center justify-center'>
      {loading&&<Loader2Icon className='animate-spin my-10 size-5'/>}
      </div>

      <div className='mt-8 flex flex-wrap gap-3'>

        {ideas.map((item, index) => (

          <h2
            key={index}
            onClick={() => {setSelectedOption(item);
              onHandleInputChange(item)
            }}

            className={`p-2 rounded-full border px-4 cursor-pointer shadow-sm
            hover:border-primary ${selectedOption === item ? "border-primary" : ""}`}>
            {item}
          </h2>
        ))}
        <h2 
        onClick={() => {setSelectedOption('Let AI select the best Idea');
              onHandleInputChange('Let AI select the best Idea')
            }}className={`p-2 rounded-full border px-4 cursor-pointer shadow-sm
              hover:border-primary max-w-max ${selectedOption === 'Let AI select the best Idea'
  ? "border-primary"
  : ""}`}
  >
          Let AI select the best Idea
        </h2>
      </div>
        
    </div>
  )
}

export default LogoIdea