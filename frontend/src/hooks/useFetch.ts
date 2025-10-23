import { useState, useEffect } from 'react';


export function useFetch<T>(promiseFactory: () => Promise<T>, deps: any[] = []) {
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<any>(null);


useEffect(() => {
let mounted = true;
setLoading(true);
promiseFactory()
.then(d => { if (mounted) setData(d); })
.catch(e => { if (mounted) setError(e); })
.finally(() => { if (mounted) setLoading(false); });
return () => { mounted = false; };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, deps);


return { data, loading, error };
}