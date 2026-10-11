import React, { useState } from 'react';
import { Upload, Trash2, Filter, Image as ImageIcon } from 'lucide-react';
import Modal from '../../components/common/Modal';
import toast from 'react-hot-toast';

const GalleryManagement = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Mock Data
  const categories = ['All', 'Events', 'Daily Life', 'Cows', 'Facilities'];
  const [images, setImages] = useState(
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      url: `https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=400`,
      category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
      alt: `Gallery image ${i + 1}`
    }))
  );

  const filteredImages = selectedCategory === 'All' ? images : images.filter(img => img.category === selectedCategory);

  const handleDelete = (id) => {
    setImages(images.filter(img => img.id !== id));
    toast.success('Image deleted successfully');
  };

  const handleUpload = (e) => {
    e.preventDefault();
    toast.success('Images uploaded successfully');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Gallery Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage images shown on the website</p>
        </div>
        <button className="btn-primary flex items-center mt-4 sm:mt-0 px-4 py-2" onClick={() => setIsUploadModalOpen(true)}>
          <Upload size={18} className="mr-2" /> Upload Images
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat 
                ? 'bg-saffron-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map(img => (
            <div key={img.id} className="group relative rounded-xl overflow-hidden bg-gray-200 aspect-[4/3] border border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <ImageIcon size={40} />
              </div>
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${img.url})` }}
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-white/90 text-gray-900 text-xs font-semibold rounded backdrop-blur-sm">
                    {img.category}
                  </span>
                  <button 
                    onClick={() => handleDelete(img.id)}
                    className="p-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                    title="Delete Image"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-white text-xs truncate drop-shadow-md">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No images found</h3>
          <p className="text-gray-500">There are no images in the selected category.</p>
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload Images" size="md">
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="input-field" required>
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Files</label>
            <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-gray-300 border-dashed rounded-xl hover:bg-gray-50 cursor-pointer transition-colors bg-gray-50/50">
              <div className="space-y-2 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-saffron-600 hover:text-saffron-500 focus-within:outline-none">
                    <span>Click to upload</span>
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB (Multiple files allowed)</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" className="btn-outline px-4 py-2" onClick={() => setIsUploadModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn-primary px-4 py-2">Upload</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GalleryManagement;
