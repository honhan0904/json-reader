/* JavaScript: Logic for the JSON editor using React and JSX */

/* TreeNode Component: Renders a single node in the JSON tree */
function TreeNode({ node, path, onUpdate }) {
    // State for node expansion, modal visibility, and editing
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [editValues, setEditValues] = React.useState({ ...node });

    // Toggle node expansion for folders
    const handleToggle = () => {
        if (node.isFolder) {
            setIsExpanded(!isExpanded);
        }
    };

    // Open edit modal with current node values
    const handleEdit = () => {
        setEditValues({ ...node });
        setShowEditModal(true);
    };

    // Update edit form values
    const handleEditChange = (key, value) => {
        setEditValues({ ...editValues, [key]: value });
    };

    // Save edited node values
    const handleEditSubmit = () => {
        try {
            ['title', 'description', 'href', 'icon'].forEach((key) => {
                if (editValues[key] !== node[key]) {
                    onUpdate(path, key, editValues[key]);
                }
            });
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating node:', error);
        }
    };

    // Add a new child node or folder
    const handleAddChild = (newChild) => {
        try {
            const newChildren = [...(node.children || []), newChild];
            onUpdate(path, 'children', newChildren);
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding child:', error);
        }
    };

    // Delete the current node
    const handleDelete = () => {
        try {
            onUpdate(path, null, null, true);
        } catch (error) {
            console.error('Error deleting node:', error);
        }
    };

    return (
        <div className="tree-node">
            {/* Node header with toggle, icon, title, and actions */}
            <div className="node-header" onClick={handleToggle}>
                {node.isFolder && (
                    <span className="text-blue-600 transition-transform duration-300">
                        {isExpanded ? '▼' : '▶'}
                    </span>
                )}
                <span className="text-lg">{node.icon || (node.isFolder ? '📁' : '📄')}</span>
                <span
                    onDoubleClick={handleEdit}
                    className="text-gray-900 font-medium hover:underline"
                >
                    {node.title || 'Untitled'}
                </span>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="ml-2 add-button action-button"
                    title="Add Child/Folder"
                >
                    ➕
                </button>
                <button
                    onClick={handleDelete}
                    className="ml-2 text-red-500 hover:text-red-600 action-button"
                    title="Delete Node"
                >
                    🗑️
                </button>
                <button
                    onClick={handleEdit}
                    className="ml-2 text-blue-500 hover:text-blue-600 action-button"
                    title="Edit Node"
                >
                    ✏️
                </button>
            </div>
            {/* Node content with description and href */}
            <div className="node-content">
                <div className="hover:text-gray-700">
                    {node.description || 'No description'}
                </div>
                <div className="hover:text-gray-700">
                    {node.href || 'No link'}
                </div>
            </div>
            {/* Modal for adding a new child/folder */}
            {showAddModal && (
                <div className="fixed inset-0 modal flex items-center justify-center z-50">
                    <div className="p-6 rounded-lg shadow-xl w-96 modal-content">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Add New Child/Folder</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                try {
                                    const newChild = {
                                        title: e.target.title.value || 'New Item',
                                        icon: e.target.icon.value || '📄',
                                        href: e.target.href.value || '',
                                        description: e.target.description.value || '',
                                        isFolder: e.target.isFolder.checked,
                                        children: []
                                    };
                                    handleAddChild(newChild);
                                } catch (error) {
                                    console.error('Error adding child:', error);
                                }
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    defaultValue="New Item"
                                    className="node-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Icon</label>
                                <input
                                    name="icon"
                                    type="text"
                                    defaultValue="📄"
                                    className="node-input"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Link (href)</label>
                                <input
                                    name="href"
                                    type="text"
                                    defaultValue=""
                                    className="node-input"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                                <input
                                    name="description"
                                    type="text"
                                    defaultValue=""
                                    className="node-input"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="flex items-center">
                                    <input
                                        name="isFolder"
                                        type="checkbox"
                                        className="mr-2"
                                    />
                                    <span className="text-gray-700">Is Folder</span>
                                </label>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="action-button bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="action-button bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Modal for editing the current node */}
            {showEditModal && (
                <div className="fixed inset-0 modal flex items-center justify-center z-50">
                    <div className="p-6 rounded-lg shadow-xl w-96 modal-content">
                        <h2 className="text-xl font-bold mb-4 text-gray-900">Edit Node</h2>
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={editValues.title || ''}
                                    onChange={(e) => handleEditChange('title', e.target.value)}
                                    className="node-input"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Icon</label>
                                <input
                                    type="text"
                                    value={editValues.icon || ''}
                                    onChange={(e) => handleEditChange('icon', e.target.value)}
                                    className="node-input"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Link (href)</label>
                                <input
                                    type="text"
                                    value={editValues.href || ''}
                                    onChange={(e) => handleEditChange('href', e.target.value)}
                                    className="node-input"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                                <input
                                    type="text"
                                    value={editValues.description || ''}
                                    onChange={(e) => handleEditChange('description', e.target.value)}
                                    className="node-input"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="action-button bg-gray-300 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleEditSubmit}
                                    className="action-button bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Render child nodes if expanded */}
            {node.children && node.children.length > 0 && (
                <div className={`children-container ${isExpanded ? 'expanded' : ''}`}>
                    {node.children.map((child, index) => (
                        <TreeNode
                            key={index}
                            node={child}
                            path={[...path, 'children', index]}
                            onUpdate={onUpdate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* App Component: Main application logic */
function App() {
    // State for JSON data, file name, loading, and errors
    const [jsonData, setJsonData] = React.useState([]);
    const [fileName, setFileName] = React.useState('toc.json');
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Handle JSON file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setFileName(file.name);
        setIsLoading(true);
        setError(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (!Array.isArray(data)) {
                    throw new Error('JSON must be an array of nodes');
                }
                setJsonData(data);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                setError('Invalid JSON file. Please upload a valid JSON array.');
            } finally {
                setIsLoading(false);
            }
        };
        reader.onerror = () => {
            console.error('Error reading file');
            setError('Failed to read the file. Please try again.');
            setIsLoading(false);
        };
        reader.readAsText(file);
    };

    // Update JSON data based on path and action
    const handleUpdate = (path, key, value, isDelete = false) => {
        try {
            setJsonData((prevData) => {
                const newData = JSON.parse(JSON.stringify(prevData));
                if (path.length === 1 && isDelete) {
                    newData.splice(path[0], 1);
                } else {
                    let current = newData;
                    for (let i = 0; i < path.length - 1; i += 2) {
                        if (!current[path[i]]) {
                            current[path[i]] = [];
                        }
                        current = current[path[i]][path[i + 1]];
                    }
                    if (isDelete) {
                        current.splice(path[path.length - 1], 1);
                    } else {
                        current[path[path.length - 1]][key] = value;
                    }
                }
                return newData;
            });
        } catch (error) {
            console.error('Error updating JSON:', error);
            setError('Failed to update JSON data. Please try again.');
        }
    };

    // Export JSON to file
    const handleExport = () => {
        try {
            const jsonString = JSON.stringify(jsonData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(url));
        } catch (error) {
            console.error('Error exporting JSON:', error);
            setError('Failed to export JSON. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar for file actions */}
            <div className="sidebar">
                <h1 className="text-2xl font-bold text-white mb-6">JSON Editor</h1>
                <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="border border-gray-600 rounded-lg p-2 bg-blue-800 text-white w-full mb-4"
                />
                <button
                    onClick={handleExport}
                    className="action-button bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
                >
                    Export JSON
                </button>
            </div>
            {/* Main content area for JSON tree */}
            <div className="flex-1 p-6 overflow-auto">
                <div className="min-h-screen bg-white rounded-lg shadow-lg p-6">
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : jsonData.length > 0 ? (
                        jsonData.map((node, index) => (
                            <TreeNode
                                key={index}
                                node={node}
                                path={[index]}
                                onUpdate={handleUpdate}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">
                            Upload a JSON file to start editing
                        </p>
                    )}
                </div>
            </div>
    );
}

/* Render the application */
ReactDOM.render(<App />, document.getElementById('root'));