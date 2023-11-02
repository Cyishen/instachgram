import {useCallback, useState} from 'react'
import {useDropzone, FileWithPath} from 'react-dropzone'
import { Button } from '../ui/button'


type FileUploaderProps = {
  fieldChange: (files: File[]) => void
  mediaUrl: string
}

const FileUploader = ( {fieldChange, mediaUrl}: FileUploaderProps) => {

  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(mediaUrl)

  const onDrop = useCallback( (acceptedFiles: FileWithPath[]) => {
    // Do something with the files
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      "image/*": ['.png', '.jpg', '.jpeg', '.svg', '.gif'],
      "video/*": ['.MP4', '.MOV', '.AVI']
    }
  })

  return (
    <div {...getRootProps()} className="flex flex-center flex-col bg-gray-200 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer"/>
      {
        fileUrl ? (
          <>
          <div className="flex flex-1 justify-center w-full p-5">
            <img 
              src={fileUrl}
              alt="image"
              className="file_uploader-img"
            />
          </div>
          <p className="file_uploader-label">replace photo</p>
          </>
        ) : (
          <div className="file_uploader-box">
            <img 
              src="/assets/icons/file-upload.svg"
              alt="file-upload"
              width={100}
              height={100}
            />
            <h3 className="mt-6 mb-2">Drag Photo here</h3>
            <p className="text-gray-500 small-regular">SVG, PNG, JPG</p>

            <Button className="bg-sky-200">Select from computer</Button>
          </div>
        )

      }
    </div>
  )
}

export default FileUploader