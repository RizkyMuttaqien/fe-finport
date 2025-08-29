import { useState } from "react";
import { useCompareStore } from "../store/compareStore";

export default function CompareTextPage() {
    const { compareText } = useCompareStore();
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [isSensitive, setIsSensitive] = useState(false);

    const [result, setResult] = useState<string | null>(null);
    const handleCompare = async () => {
        const data = await compareText(text1, text2, isSensitive);
        if (data && text1 && text2) {
            setResult(`${data.count} matches found with ${data.percentage}% similarity.`);
        } else {
            setResult(null);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-6">
            <div className="w-full max-w-3xl flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-center">Compare Text</h1>

                <div className="flex flex-col md:flex-row gap-4">
                    <textarea className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="First Text" value={text1} onChange={(e) => setText1(e.target.value)} rows={4} />
                    <textarea className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Second Text" value={text2} onChange={(e) => setText2(e.target.value)} rows={4} />
                </div>

                <div className="flex items-center gap-4">
                    <span>Case Sensitive:</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={isSensitive} onChange={() => setIsSensitive(!isSensitive)} />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-purple-500 peer-focus:ring-2 peer-focus:ring-purple-300 transition-all"></div>
                        <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isSensitive ? "translate-x-5" : "translate-x-0"}`}></div>
                    </label>
                </div>

                <button onClick={handleCompare} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-xl font-semibold transition-all">
                    Compare
                </button>

                {result && <div className="mt-4 p-4 bg-gray-800 rounded-xl border border-gray-600 text-center font-medium">{result}</div>}
            </div>
        </div>
    );
}
