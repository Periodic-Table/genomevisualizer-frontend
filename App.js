import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function Home() {
  const [organism, setOrganism] = useState("");
  const [taxonId, setTaxonId] = useState(null);
  const [data, setData] = useState([]);

  async function fetchTaxonId() {
    const response = await fetch(`https://genomevisualizer-backend.vercel.app/api/convert-name-to-id?name=${organism}`);
    const result = await response.json();
    setTaxonId(result.taxon_id);
  }

  async function fetchData() {
    if (!taxonId) return;
    const response = await fetch(`https://genomevisualizer-backend.vercel.app/api/get-release-dates?taxon_id=${taxonId}`);
    const result = await response.json();
    setData(result.release_dates);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter organism..."
        className="p-2 border rounded w-full"
        value={organism}
        onChange={(e) => setOrganism(e.target.value)}
      />
      <button onClick={fetchTaxonId} className="p-2 mt-2 bg-blue-500 text-white rounded w-full">
        Get Taxon ID
      </button>
      {taxonId && (
        <button onClick={fetchData} className="p-2 mt-2 bg-green-500 text-white rounded w-full">
          Fetch Data
        </button>
      )}
      <LineChart width={600} height={300} data={data} className="mt-4">
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
