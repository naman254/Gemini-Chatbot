import { useState, useRef } from 'react';
import { uploadService } from '../services/api';

export const useFileUpload = (sessionId) => {
  const [fileStatus, setFileStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setImagePreview(dataUrl);
        setAttachedFile({
          name: file.name,
          type: file.type,
          dataUrl: dataUrl,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setAttachedFile({
        name: file.name,
        type: file.type,
        dataUrl: null,
      });
    }

    setFileStatus(`Uploading ${file.name}...`);
    setIsUploading(true);
    try {
      await uploadService.uploadFile(file, sessionId);
      setFileStatus(`✅ Attached: ${file.name}`);
    } catch (err) {
      setFileStatus('❌ Upload failed');
      setImagePreview(null);
      setAttachedFile(null);
    } finally {
      setIsUploading(false);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = () => {
    setImagePreview(null);
    setFileStatus('');
    setAttachedFile(null);
  };

  const clearFile = () => {
    setImagePreview(null);
    setFileStatus('');
    setAttachedFile(null);
  };

  return {
    fileStatus,
    isUploading,
    imagePreview,
    attachedFile,
    fileInputRef,
    handleUpload,
    removeFile,
    clearFile,
  };
};

