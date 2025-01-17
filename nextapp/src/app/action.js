'use server'

import axios from 'axios'

export async function createTopic({ title, body }) {
    const data = { title, body }
    const headers = {
            "Content-Type": "application/json"
        }

    const response = await axios.post("http://localhost:9999/topics", data, headers)
    const newTopic = response.data

    return newTopic
}
