"use client"

import { useRouter } from "next/navigation"
import { createTopic } from "../action"

export default function Create() {
    const router = useRouter()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        const body = event.target.body.value
        const newTopic = await createTopic({ title, body })
        router.push(`/read/${newTopic.id}`)
    }

    return(
        <form onSubmit={handleSubmit}>
            <p>
                <input type="text" name="title" placeholder="title" />
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create" />
            </p>
        </form>
    )
}