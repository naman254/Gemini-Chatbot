import './ChatInput.css';

const ChatInput = ({
  input,
  setInput,
  onSend,
  isLoading,
  imagePreview,
  fileStatus,
  isUploading,
  fileInputRef,
  onUpload,
  onRemoveFile,
}) => {
  return (
    <div className="input-footer">
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Preview" />
          <button className="remove-preview" onClick={onRemoveFile}>
            ×
          </button>
        </div>
      )}
      {fileStatus && !imagePreview && (
        <div className="file-info">
          {fileStatus}
          {fileStatus.startsWith('✅') && (
            <button className="remove-file" onClick={onRemoveFile}>
              ×
            </button>
          )}
        </div>
      )}
      {!fileStatus && <div className="file-info"></div>}
      <div className="input-row">
        <label className={`upload-icon ${isUploading ? 'uploading' : ''}`}>
          {isUploading ? (
            <div className="spinner"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
              />
            </svg>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onUpload}
            hidden
            disabled={isUploading}
          />
        </label>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSend()}
          placeholder="Ask anything..."
        />
        <button onClick={onSend} className="send-btn" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;

