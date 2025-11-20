import { useState } from "react";
import AddLinkForm from "../components/AddLinkForm";
import LinkTable from '../components/LinkTable';
export default function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TinyLink Dashboard</h1>

      <AddLinkForm onCreated={() => setRefresh(refresh + 1)} />
      <LinkTable refresh={refresh} />
    </div>
  );
}
