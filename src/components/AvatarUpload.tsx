import { UploadAvatarIcon, BinIcon } from '@/app/ux/IconApp';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AvatarUploadProps {
  currentAvatar: string;
  onAvatarChange: (url: string) => void;
  className?: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ currentAvatar, onAvatarChange, className }) => {
  const [previewUrl, setPreviewUrl] = useState(currentAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuth();

  useEffect(() => {
    setPreviewUrl(currentAvatar);
  }, [currentAvatar]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      setIsLoading(true);

      const uploadTime = new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
      });

      try {
        const response = await fetch('/api/upload-avatar', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const { avatarUrl } = await response.json();
          await uploadTime;
          const newAvatarUrl = `${avatarUrl}?v=${Date.now()}`;
          setPreviewUrl(newAvatarUrl);
          onAvatarChange(newAvatarUrl);
          updateUser({ avatar: newAvatarUrl });
        } else {
          console.error('Erreur lors du téléchargement');
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = () => {
    document.getElementById('avatar-upload')?.click();
  };

  const handleRemove = () => {
    const defaultAvatar = '/default-avatar.jpg';
    setPreviewUrl(defaultAvatar);
    onAvatarChange(defaultAvatar);
    updateUser({ avatar: defaultAvatar });
  };

  return (
    <div className={`flex flex-col group items-center gap-4 ${className}`}>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        id="avatar-upload"
      />

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <svg className="animate-spin w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          </div>
        )}
        {previewUrl && (
          <div className='w-40 relative h-40 overflow-hidden rounded-full hover:border-[#ff5e5b] transition border-8'>
            <Image
              src={previewUrl}
              alt="Avatar preview"
              fill
              className={`rounded-full transform transition-transform hover:opacity-50 ease-in-out hover:scale-110 ${isLoading ? 'opacity-50' : ''}`}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleUpdate}
        className="px-4 py-2 bg-[#ff5e5b] font-semibold flex items-center gap-2 rounded-full text-white"
        disabled={isLoading}
      >
        <UploadAvatarIcon className='w-4 h-4' />
        {'Upload'}
      </button>

      {previewUrl && previewUrl !== '/default-avatar.jpg' && (
        <button
          onClick={handleRemove}
          className="px-4 py-2 text-black border font-semibold border-black opacity-60 hover:bg-black hover:text-white rounded-full flex items-center gap-2 hover:opacity-100"
        >
          <BinIcon className='w-4 h-4' />
          {'Supprimer'}
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;