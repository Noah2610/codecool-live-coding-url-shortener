import { useState } from "react";

interface Short {
    name: string;
    shortUrl: string;
    longUrl: string;
}

export default function CreateShort() {
    const [name, setName] = useState("");
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [createdShort, setCreatedShort] = useState<Short | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const body = JSON.stringify({
            name,
            longUrl,
            shortUrl,
        });

        const response = await fetch("http://localhost:8090/short", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });
        const data = await response.json();
        setCreatedShort(data);
    };

    if (createdShort) {
        return (
            <>
                <h1>Short Created!</h1>
                <a href={createdShort.shortUrl} target="_blank">
                    {createdShort.shortUrl}
                </a>
            </>
        );
    }

    return (
        <>
            <h1>New Short</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    URL
                    <input
                        type="text"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                </label>

                <label>
                    Short
                    <input
                        type="text"
                        value={shortUrl}
                        onChange={(e) => setShortUrl(e.target.value)}
                    />
                </label>

                <button type="submit">Create Short</button>
            </form>
        </>
    );
}
