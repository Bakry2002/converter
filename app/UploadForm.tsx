'use client'
import { useState } from 'react'

export function UploadForm() {
    const [file, setFile] = useState<File>()
    const [to, setTo] = useState('')
    const [id, setId] = useState('')

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        try {
            const data = new FormData()
            data.set('file', file) // file is the name of the field in the form
            data.set('to', to) // to field
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            })
            //handle error
            if (!res.ok) throw new Error(await res.text())

            setId((await res.json()).id) // set the id of the file that is coming from the server
        } catch (error: any) {
            console.error(error)
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0])} // what e.target.files?.[0] means? its to target the first file in the array which is the file we want to upload why the first file? because we can upload multiple files at once
                />
                <div>
                    <label>To</label>
                    <input
                        type="text"
                        name="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <input type="submit" value="Upload" />
            </form>
            <a href={`api/download/${id}`}>Download</a>
        </>
    )
}
