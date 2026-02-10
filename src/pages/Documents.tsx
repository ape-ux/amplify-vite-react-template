const mockDocs = [
  { id: 'DOC-001', name: 'BOL-2026-0567.pdf', type: 'BOL', shipment: 'SH-2026-0891', uploaded: '2h ago', size: '245 KB' },
  { id: 'DOC-002', name: 'Commercial-Invoice.pdf', type: 'Invoice', shipment: 'SH-2026-0890', uploaded: '5h ago', size: '128 KB' },
  { id: 'DOC-003', name: 'Packing-List.xlsx', type: 'Packing List', shipment: 'SH-2026-0889', uploaded: '1d ago', size: '56 KB' },
  { id: 'DOC-004', name: 'Customs-Entry.pdf', type: 'Customs', shipment: 'SH-2026-0888', uploaded: '2d ago', size: '312 KB' },
]

export default function Documents() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-gray-400">Manage shipping documents and BOLs</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium">
          📤 Upload Document
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {['BOL', 'Invoice', 'Packing List', 'Customs'].map((type) => (
          <div key={type} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 cursor-pointer hover:border-gray-600">
            <p className="text-gray-400 text-sm">{type}</p>
            <p className="text-2xl font-bold text-white">{Math.floor(Math.random() * 50) + 10}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700/30">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium">Document</th>
              <th className="text-left p-4 text-gray-400 font-medium">Type</th>
              <th className="text-left p-4 text-gray-400 font-medium">Shipment</th>
              <th className="text-left p-4 text-gray-400 font-medium">Uploaded</th>
              <th className="text-left p-4 text-gray-400 font-medium">Size</th>
              <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDocs.map((doc) => (
              <tr key={doc.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <span className="text-white">{doc.name}</span>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{doc.type}</td>
                <td className="p-4 font-mono text-blue-400">{doc.shipment}</td>
                <td className="p-4 text-gray-400">{doc.uploaded}</td>
                <td className="p-4 text-gray-400">{doc.size}</td>
                <td className="p-4">
                  <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                  <button className="text-green-400 hover:text-green-300 mr-3">Download</button>
                  <button className="text-gray-400 hover:text-white">Share</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
