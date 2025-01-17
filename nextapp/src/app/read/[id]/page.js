import axios from "axios";

export default async function Read(props) {
    const { id } = await props.params;
    const response = await axios.get(`http://localhost:9999/topics/${id}`);
    const topic = response.data
    return (
        <>
            <h2>{topic.title}</h2>
            {topic.body}
        </>
    );
}
