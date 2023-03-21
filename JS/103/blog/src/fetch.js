import { useState, useEffect } from "react";

// SL - nice! (but hooks usually return an array - I was thrown off by the return of an object. Nothing illegal, just a little unusual)
export default function useFetch(url) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);


    useEffect(
        () => {
            const abortCont = new AbortController();
            setLoading(true);
            setError();
            async function loadJson(url) {
                try {
                    const response = await fetch(url, { signal: abortCont.signal })
                    if (!response.ok) {
                        throw new Error('error loading data');
                    }
                    const data = await response.json();
                    setData(data);
                    setError(false)
                }
                catch (e) {
                    setError(true);
                    if (e.name === 'AbortError') {
                        console.log('fetch aborted');
                    }
                }
                setLoading(false);
            }
            loadJson(url);
            return () => { abortCont.abort() }
        }, []);
    return { data, loading, error };
}
